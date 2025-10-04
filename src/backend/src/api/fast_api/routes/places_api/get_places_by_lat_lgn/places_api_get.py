
from typing import List
from fastapi import APIRouter, Depends

from src.use_cases.places_api.get_places_api.get_places_api_handler import GetPlacesApiHandler
from src.use_cases.places_api.get_places_api.get_places_api_query import GetPlacesApiQuery
from src.use_cases.places_api.get_places_api.responses import PlacesListRetrievalContract
from src.api.fast_api.exception_converter import convert_to_http_exception
from src.infrastructure.database import get_db

router = APIRouter(prefix="/places-api")

@router.get(
    "/",
    response_model=List[PlacesListRetrievalContract]
)
async def get_api_places(lat: float, lgn: float):
    request = GetPlacesApiQuery(lat, lgn)
    handler = GetPlacesApiHandler(request)

    try:
        places_list = handler.execute()
    except Exception as e:
        raise convert_to_http_exception(e)

    return places_list
