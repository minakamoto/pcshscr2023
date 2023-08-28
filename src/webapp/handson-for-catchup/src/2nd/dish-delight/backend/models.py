# dish-delight/backend/src/backend/models.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

# Import Base defined in database.py
from database import Base


# Define a model for each table by inheriting from Base
class Store(Base):
    # Define Store table
    __tablename__ = "stores"

    # Define columns and attributes
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    img = Column(String)
    category = Column(String)

    # Define the relationship
    menus = relationship("Menu", back_populates="store")


class Menu(Base):
    # Define Menu table
    __tablename__ = "menus"

    id = Column(Integer, primary_key=True, index=True)
    storeId = Column(Integer, ForeignKey("stores.id"))
    name = Column(String, index=True)
    img = Column(String)
    author = Column(String)
    price = Column(String)
    description = Column(String)

    store = relationship("Store", back_populates="menus")
    options = relationship("Option", back_populates="menu")


class Option(Base):
    # Define Option table
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    menuId = Column(Integer, ForeignKey("menus.id"))
    name = Column(String)
    price = Column(String)

    menu = relationship("Menu", back_populates="options")