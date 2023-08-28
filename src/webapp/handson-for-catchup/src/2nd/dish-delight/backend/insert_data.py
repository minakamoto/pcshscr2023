from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import SessionLocal, Base, engine
from models import Store, Menu, Option


def _create_tables():
    Base.metadata.create_all(bind=engine)


def insert_data_to_tables(data):
    session: Session = SessionLocal()

    try:
        # 全テーブルを作成
        _create_tables()

        # Storeデータを挿入
        db_stores = [Store(**store) for store in data["stores"]]
        session.add_all(db_stores)

        db_options = []
        for menu in data["menus"]:
            # Menuデータを設定
            db_menu = Menu(**{k: v for k, v in menu.items() if k != "options"})
            session.add(db_menu)
            session.commit()

            for option in menu.get("options", []):
                # Optionデータを設定
                db_option = Option(menuId=db_menu.id, **option)
                db_options.append(db_option)

        # Optionデータを挿入
        session.add_all(db_options)

        session.commit()
    except SQLAlchemyError as e:
        # 通常ならちゃんとした例外処理をすべきです
        print(f"An error occurred: {e}")
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    from .read_json import data

    insert_data_to_tables(data)
