import json


def read_data_from_json(file_path):
    with open(file_path, "r") as json_file:
        data = json.load(json_file)
    return data


if __name__ == "__main__":
    data = read_data_from_json("data.json")
    # dataを使って処理を続ける... TBD
    # 変換後のデータを格納するリスト
    store_data = data["stores"]
    menu_data = data["menus"]
    print(store_data)
    print(menu_data)
