from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "sqlite:///./university.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_session():
    return SessionLocal()


def create_tables():
    Base.metadata.create_all(bind=engine)


def drop_table(table_name, engine=engine):
    Base.metadata.reflect(bind=engine)
    table = Base.metadata.tables[table_name]
    if table is not None:
        Base.metadata.drop_all(engine, [table], checkfirst=True)


def drop_all_table(engine=engine):
    Base.metadata.reflect(bind=engine)
    Base.metadata.drop_all(engine)
