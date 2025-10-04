# Src/Api/Fast_api/Routes/place_create.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.infrastructure.database import get_db
# ZMIANA: Importujemy nowe modele z pliku contracts
from src.use_cases.place.place_response_dto import CreatePlaceRequest, PlaceResponse 
from src.use_cases.place.create_place.create_place_use_case import CreatePlaceUseCase

router = APIRouter(prefix="/places", tags=["Places"])

# ZMIANA: Aktualizujemy response_model na nowy model odpowiedzi
@router.post("/", response_model=PlaceResponse, status_code=201)
# ZMIANA: Typ danych wejściowych to teraz CreatePlaceRequest
async def create_place(place_request: CreatePlaceRequest, session: Session = Depends(get_db)): 
    try:
        # ZMIANA: Przekazujemy place_request do use case'a
        use_case = CreatePlaceUseCase(session, place_request) 
        new_place = use_case.execute()
        return new_place
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))