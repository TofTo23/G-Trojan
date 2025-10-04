

from src.use_cases.places_api.get_places_api.get_places_api_query import GetPlacesApiQuery
from src.use_cases.places_api.get_places_api.queries import fetch_monuments
from src.use_cases.places_api.get_places_api.responses import Coordinate, PlacesListRetrievalContract
from src.use_cases.use_case_base import UseCaseBase


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
            monuments.append(
                PlacesListRetrievalContract(
                    name=name,
                    coordinates=coords,
                    description=element["tags"].get("wikidata", "Brak opisu"),
                    imageUrl=None  # można później podpiąć np. z Wikimedia API
                )
            )

        return monuments
        

    