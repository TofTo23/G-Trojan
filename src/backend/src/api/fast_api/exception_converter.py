from fastapi import HTTPException

from src.use_cases.exceptions.exceptions import NotFoundError, ConflictError

UNEXPECTED_ERROR_MESSAGE = "Unexpected error occurred"

def convert_to_http_exception(exception) -> HTTPException:
    match exception:
        case NotFoundError() as e:
            return HTTPException(
                404,
                e.args[0]
            )
        case ConflictError() as e:
            return HTTPException(409, e.args[0])
        case _:
            return HTTPException(
                500,
                UNEXPECTED_ERROR_MESSAGE
            )
