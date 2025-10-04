from dataclasses import dataclass


@dataclass
class RegisterUserCommand:
    login: str
    password: str