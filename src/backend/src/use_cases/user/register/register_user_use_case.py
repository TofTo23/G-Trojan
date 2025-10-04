from sqlalchemy.orm import Session

from src.core.entities.user import User
from src.use_cases.exceptions.exceptions import ConflictError
from src.use_cases.use_case_base import UseCaseBase
from src.use_cases.user.authentication import hash_password
from src.use_cases.user.register.register_user_command import RegisterUserCommand
from src.use_cases.user.register.register_user_response_dto import RegisterUserResponseDto


class RegisterUserUseCase(UseCaseBase):
    def __init__(self, session: Session, request: RegisterUserCommand):
        self.session = session
        self.request = request

    def execute(self):
        existing_user = self.session.query(User).filter(User.login == self.request.login)
        if existing_user is not None:
            raise ConflictError(f"User with login {self.request.login} already exists")

        new_user = User(login=self.request.login, password=hash_password(self.request.password))

        self.session.add(new_user)
        self.session.commit()

        return RegisterUserResponseDto(id=new_user.id, login=new_user.login, hashed_pwd=new_user.password)

