from sqlalchemy.orm import Session
from src.core.entities.place import Place
from src.use_cases.use_case_base import UseCaseBase
from src.use_cases.place.place_response_dto import PlaceResponse, Coordinate

class ListPlacesUseCase(UseCaseBase):
    def __init__(self, session: Session):
        self.session = session

    def execute(self) -> list[PlaceResponse]:
        all_places = self.session.query(Place).order_by(Place.name).all()

        # Konwertujemy płaski model z bazy na zagnieżdżony model API
        return [
            PlaceResponse(
                name=place.name,
                description=place.description,
                imageUrl=place.image_url,
                # --- TUTAJ TWORZYMY ZAGNIEŻDŻONY OBIEKT ---
                coordinates=Coordinate(lat=place.latitude, lng=place.longitude)
            )
            for place in all_places
        ]