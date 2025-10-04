# Src/Api/Fast_api/Routes/place_get_all.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.infrastructure.database import get_db
# ZMIANA: Importujemy nowy model odpowiedzi z pliku contracts
from src.use_cases.place.place_response_dto import PlaceResponse 
from src.use_cases.place.list_place.list_places_use_case import ListPlacesUseCase

router = APIRouter(prefix="/places", tags=["Places"])

# ZMIANA: Aktualizujemy response_model na listę nowych modeli
@router.get("/", response_model=list[PlaceResponse]) 
async def get_all_places(session: Session = Depends(get_db)):
    try:
        use_case = ListPlacesUseCase(session)
        result = use_case.execute()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))