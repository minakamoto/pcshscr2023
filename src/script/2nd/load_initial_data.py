from read_json import read_data_from_json
from database import create_tables
from insert_data import insert_data_to_tables


if __name__ == "__main__":
    data = read_data_from_json("data.json")

    create_tables()

    insert_data_to_tables(data)
