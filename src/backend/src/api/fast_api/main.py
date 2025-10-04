from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.fast_api.routes.places_api.get_places_by_lat_lgn import places_api_get

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # które domeny mają dostęp
    allow_credentials=True,
    allow_methods=["*"],             # GET, POST, PUT, DELETE, itp.
    allow_headers=["*"],             # wszystkie nagłówki (np. Authorization)
)

app.include_router(places_api_get.router)