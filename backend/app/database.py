from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


DATABASE_URL = "sqlite:///./taskmanager.db"
engine = create_engine(DATABASE_URL, echo=True)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_session():
    return sessionLocal()
