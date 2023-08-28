# dish-delight/backend/src/backend/database.py

# Quoting the official [FastAPI website](https://fastapi.tiangolo.com/ja/tutorial/sql-databases/)

# import the SQLAlchemy parts
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Create a database URL for SQLAlchemy
# connecting to a SQLite database (opening a file with the SQLite database).
DATABASE_URL = "sqlite:///./university.db"

# Create a SQLAlchemy "engine"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create a SessionLocal class.
# Each instance of the SessionLocal class will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class.
# Later we will inherit from this class to create each of the database models or classes (the ORM models)
Base = declarative_base()
