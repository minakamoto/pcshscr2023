from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_session
from table import store as Store, menu as Menu, option as Option


def insert_data_to_tables(data):
    session: Session = get_session()

    try:
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
