from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from pydantic import BaseModel

app = FastAPI()


# Dependency
# This dependency will create a new SQLAlchemy SessionLocal
# that will be used in a single request,
# and then close it once the request is finished.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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


# API to get a list of stores
# `@app.get` to indicate that it is a GET method,
# and its first argument specifies the path.
# And We can use response_model to define the response type
@app.get("/stores", response_model=list[Store])
def read_stores(db: Session = Depends(get_db)):
    # Get all items from Store table
    result = db.query(models.Store).all()
    # Exception handling when result does not exist
    if not result:
        raise HTTPException(status_code=404, detail="Store not found")
    return result


# API to get the specified store ID
@app.get("/stores/{store_id}", response_model=Store)
def read_store(store_id: int, db: Session = Depends(get_db)):
    # Get data matching the specified store_id and Id from the Store table
    result = db.query(models.Store).filter(models.Store.id == store_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Store not found")
    return result


# API to get the menu list of the specified store ID
@app.get("/stores/{store_id}/menus", response_model=list[Menu])
def read_menus(store_id: int, db: Session = Depends(get_db)):
    result = db.query(models.Menu).filter(models.Menu.storeId == store_id).all()
    if not result:
        raise HTTPException(status_code=404, detail="Menus not found")
    return result


# API to get the menu with the specified store ID and menu ID
@app.get("/stores/{store_id}/menus/{menu_id}", response_model=Menu)
def read_menu(store_id: int, menu_id: int, db: Session = Depends(get_db)):
    # To get data, specify multiple conditions in the Menu table.
    condition = [models.Menu.storeId == store_id, models.Menu.id == menu_id]
    result = db.query(models.Menu).filter(*condition).first()
    if not result:
        raise HTTPException(status_code=404, detail="Menu not found")
    return result
