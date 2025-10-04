from sqlalchemy.orm import Session
from src.core.entities.user import User
from src.use_cases.use_case_base import UseCaseBase
from src.use_cases.user.create_user.create_user_command import CreateUserCommand
from src.use_cases.user.create_user.create_user_response_dto import CreateUserResponseDto


class CreateUserUseCase(UseCaseBase):
    def __init__(self, session: Session, request: CreateUserCommand):
        self.session = session
        self.request = request

    def execute(self):
        new_user = User(
            firstname=self.request.firstname,
            lastname=self.request.lastname
        )

        self.session.add(new_user)
        self.session.commit()

        return CreateUserResponseDto(id=new_user.id, firstname=new_user.firstname, lastname=new_user.lastname)
