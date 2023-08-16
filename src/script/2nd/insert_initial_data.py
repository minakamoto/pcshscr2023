from read_json import read_data_from_json
from insert_data import insert_data_to_tables


if __name__ == "__main__":
    data = read_data_from_json("data.json")

    insert_data_to_tables(data)
