from pydantic import BaseModel


class RegisterUserResponseDto(BaseModel):
    id: int
    login: str
    hashed_pwd: str