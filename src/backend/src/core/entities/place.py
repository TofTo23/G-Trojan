# file: place.py

from sqlalchemy import String, Text, Float
from sqlalchemy.orm import Mapped, mapped_column

from .base import EntityBase, SqlAlchemyBase

class Place(EntityBase, SqlAlchemyBase):
    __tablename__ = "Places"

    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)