import requests

OVERPASS_URL = "http://overpass-api.de/api/interpreter"

def get_monuments_query(lat: float, lon: float, radius = 2000) -> str:
    return f"""
    [out:json];
    (
      node(around:{radius},{lat},{lon})[historic=monument];
      way(around:{radius},{lat},{lon})[historic=monument];
      relation(around:{radius},{lat},{lon})[historic=monument];
    );
    out center;
    """

def fetch_monuments(lat: float, lon: float):
    query = get_monuments_query(lat, lon)
    response = requests.get(OVERPASS_URL, params={"data": query})
    return response.json()
