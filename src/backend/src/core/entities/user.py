from sqlalchemy import String, Text, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import EntityBase, SqlAlchemyBase

class User(EntityBase, SqlAlchemyBase):
    __tablename__ = "Users"

    login: Mapped[str] = mapped_column(String(200))
    password: Mapped[str] = mapped_column(Text)