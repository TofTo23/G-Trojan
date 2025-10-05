import os
from typing import Generator
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

load_dotenv()

ZMIENNA_BOKSIK = os.environ.get("DATABASE_URL")

engine = create_engine(ZMIENNA_BOKSIK)

SessionLocal = sessionmaker(bind=engine, autoflush=True)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()