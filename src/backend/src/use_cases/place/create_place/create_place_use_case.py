from sqlalchemy.orm import Session
from src.core.entities.place import Place
from src.use_cases.use_case_base import UseCaseBase
# Zmieniamy importy na nowe kontrakty
from src.use_cases.place.place_response_dto import CreatePlaceRequest, PlaceResponse, Coordinate

class CreatePlaceUseCase(UseCaseBase):
    def __init__(self, session: Session, request: CreatePlaceRequest):
        self.session = session
        self.request = request

    def execute(self) -> PlaceResponse:
        new_place = Place(
            name=self.request.name,
            description=self.request.description,
            image_url=self.request.imageUrl,
            # --- TUTAJ "SPŁASZCZAMY" ZAGNIEŻDŻONY OBIEKT ---
            latitude=self.request.coordinates.lat,
            longitude=self.request.coordinates.lng
        )
        self.session.add(new_place)
        self.session.commit()
        self.session.refresh(new_place)

        # Zwracamy odpowiedź zgodną z kontraktem
        return PlaceResponse(
            name=new_place.name,
            description=new_place.description,
            imageUrl=new_place.image_url,
            coordinates=Coordinate(lat=new_place.latitude, lng=new_place.longitude)
        )