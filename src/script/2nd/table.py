from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


class store(Base):
    # Storeテーブルの定義
    __tablename__ = "store"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    img = Column(String)
    category = Column(String)


class menu(Base):
    # Menuテーブルの定義
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, index=True)
    storeId = Column(Integer, ForeignKey("store.id"))
    name = Column(String, index=True)
    img = Column(String)
    author = Column(String)
    price = Column(String)
    description = Column(String)


class option(Base):
    # Optionカラムの定義
    __tablename__ = "option"

    id = Column(Integer, primary_key=True, index=True)
    menuId = Column(Integer, ForeignKey("menu.id"))
    name = Column(String)
    price = Column(String)
