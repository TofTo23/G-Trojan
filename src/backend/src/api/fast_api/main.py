from fastapi import FastAPI

from src.api.fast_api.routes.places_api.get_places_by_lat_lgn import places_api_get

app = FastAPI()

app.include_router(places_api_get.router)