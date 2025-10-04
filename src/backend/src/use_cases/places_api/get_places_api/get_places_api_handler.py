from src.use_cases.places_api.get_places_api.get_places_api_query import GetPlacesApiQuery
from src.use_cases.places_api.get_places_api.queries import fetch_monuments
from src.use_cases.places_api.get_places_api.responses import Coordinate, PlacesListRetrievalContract
from src.use_cases.use_case_base import UseCaseBase
import requests


# Klucze do Google Custom Search API
GOOGLE_API_KEY = "AIzaSyDIIM7M24G_BVlo8AzAxHWXJNKXSkyot0o"
SEARCH_ENGINE_ID = "119832e5e4e734053"


def get_image_from_google(query: str):
    """Pobierz pierwsze zdjęcie z Google Grafika dla zapytania"""
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "q": query,
        "cx": SEARCH_ENGINE_ID,
        "key": GOOGLE_API_KEY,
        "searchType": "image",
        "num": 1
    }
    try:
        resp = requests.get(url, params=params).json()
        if "items" in resp:
            return resp["items"][0]["link"]
    except Exception:
        pass
    return None


class GetPlacesApiHandler(UseCaseBase):
    def __init__(self, request: GetPlacesApiQuery):
        self.request = request
        
    def execute(self):
        data = fetch_monuments(self.request.lat, self.request.lgn)
        monuments = []

        for element in data.get("elements", []):
            if "tags" in element and "name" in element["tags"]:
                name = element["tags"]["name"]
            else:
                name = "Monument bez nazwy"

            # współrzędne - node ma lat/lon, way/relation ma 'center'
            if "lat" in element and "lon" in element:
                coords = Coordinate(lat=element["lat"], lgn=element["lon"])
            elif "center" in element:
                coords = Coordinate(lat=element["center"]["lat"], lgn=element["center"]["lon"])
            else:
                continue

            # Pobieranie opisu
            description = "Brak opisu"
            imageUrl = None
            tags = element.get("tags", {})

            # Wikipedia -> REST API
            if "wikipedia" in tags:
                try:
                    lang, title = tags["wikipedia"].split(":", 1)
                    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{title}"
                    resp = requests.get(url).json()
                    description = resp.get("extract", "Brak opisu")
                    imageUrl = resp.get("thumbnail", {}).get("source")
                except Exception:
                    pass

            # Wikidata -> EntityData
            elif "wikidata" in tags:
                try:
                    qid = tags["wikidata"]
                    url = f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
                    resp = requests.get(url).json()
                    entity = resp["entities"][qid]
                    description = entity.get("descriptions", {}).get("pl", {}).get("value") \
                                  or entity.get("descriptions", {}).get("en", {}).get("value") \
                                  or "Brak opisu"
                except Exception:
                    description = f"Wikidata ID: {tags['wikidata']} (nie udało się pobrać opisu)"

            # Zdjęcie z Google Images (fallback, jeśli nie ma miniaturki z Wikipedii)
            if not imageUrl:
                imageUrl = get_image_from_google(name)

            monuments.append(
                PlacesListRetrievalContract(
                    name=name,
                    coordinates=coords,
                    description=description,
                    imageUrl=imageUrl
                )
            )

        return monuments
