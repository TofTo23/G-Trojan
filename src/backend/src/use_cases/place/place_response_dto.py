# Src/Use_cases/Place/place_contracts.py
from pydantic import BaseModel

# Dokładne odwzorowanie "export interface Coordinate"
class Coordinate(BaseModel):
    lat: float
    lng: float # Używam 'lng', jest to bardziej standardowe niż 'lgn'

# Dokładne odwzorowanie "export interface PlacesListRetrievalContract"
# Ten model będzie służył do odpowiedzi z API (GET)
class PlaceResponse(BaseModel):
    name: str
    coordinates: Coordinate
    description: str | None
    imageUrl: str | None

# Model dla danych przychodzących do API (POST)
class CreatePlaceRequest(BaseModel):
    name: str
    coordinates: Coordinate
    description: str | None
    imageUrl: str | None