# dish-delight/backend/src/backend/schemas.py
from pydantic import BaseModel


# Store type definition
class Store(BaseModel):
    id: int
    name: str
    img: str
    category: str

    class Config:
        from_attributes = True


# Type definition for menu options
class Option(BaseModel):
    id: int
    menuId: int
    name: str
    price: str

    class Config:
        from_attributes = True


# Menu type definition
class Menu(BaseModel):
    id: int
    storeId: int
    name: str
    img: str
    author: str
    price: str
    description: str
    options: list[Option] = []

    class Config:
        from_attributes = True
