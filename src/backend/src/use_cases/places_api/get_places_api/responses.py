from pydantic import BaseModel
from typing import List, Optional

class Coordinate(BaseModel):
    lat: float
    lgn: float   # UWAGA: frontend ma literówkę, więc backend też musi to zwracać

class PlacesListRetrievalContract(BaseModel):
    name: str
    coordinates: Coordinate
    description: Optional[str] = None
    imageUrl: Optional[str] = None
