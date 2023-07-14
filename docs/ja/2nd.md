# ほんの少しだけ複雑な UI＆独自 API を開発するハンズオン

## 0. はじめに

このハンズオンの目的と趣旨は[1st](./1st#0-はじめに)と同じであるため、割愛します。

### 作るもの

API を作成し、それらを呼び出し、その情報を画面に表示します。[1st](./1st)よりほんの少し複雑な UI を構築します。

### 主な技術スタック

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)

**注意事項**:

- Python のパッケージマネージャーについて

  - 今回のハンズオンで使用する Python のパッケージマネージャーは[rye](https://github.com/mitsuhiko/rye)です。依存関係のインストールとアンインストール、仮想環境の管理などを行える、便利なツールです。ただし、以下の記載が公式ページに記載されているとおり、Experimental な状態です。この資料を書いている時点では利用可能ですが、ハンズオンを行う際にその利用可否は保証できません。もし、利用できない場合は、他のツール([poetry](https://python-poetry.org/) や [pip](https://pypi.org/project/pip/) など)の利用を検討してください。
    > An Experimental Package Management Solution for Python

- FastAPI を選択した理由

  - TODO
  - pydantic とは
    - TODO

TIPS:

- Next.js を選択した理由
  - TODO

---

## 1. Setup

### 前提条件

- Node.js 16 or above
- Python 3.7 or above
- Code Editor (e.g., Visual Studio Code)

**注意事項**：  
ここに記載されている必要なソフトウェアのインストール手順は、Powershell や WSL も使用しない Windows ユーザーを対象としています。
これは、このハンズオンの最初のターゲットユーザーが、Powershell や WSL を使用しない Windows ユーザーであるためです。実際にソフトウェアをインストールする際には、ご自身の環境に応じたインストール手順で行ってください。

### Windows ユーザー向けの詳細な手順

- Node.js のインストール
  - [1st](./1st#1-setup)参照
- Python のインストール
  - [Python の公式サイト](https://www.python.org/downloads/windows/)にアクセスし、最新バージョンの Python をダウンロードします。
  - ダウンロードしたインストーラーを実行します。
  - インストールウィザードが表示されます。`Add Python to PATH` オプションを選択し、`Install Now` または `Customize installation` をクリックします。
  - インストールが完了したら、コマンドプロンプトを開き、以下のコマンドを実行して、Python が正しくインストールされていることを確認します。
    ```sh
    python --version
    ```
  - 既に Python がインストールされている場合、上記の手順に従って最新バージョンの Python をインストールすることでアップデートすることができます。ただし、複数のバージョンの Python が同時にインストールされている場合は、環境変数の設定を確認して、適切なバージョンの Python が使用されるようにする必要があります。
    - スタートメニューから`システムのプロパティ`を検索し、開きます。
    - `詳細設定`タブをクリックし、`環境変数`ボタンをクリックします。
    - `システム環境変数`セクションで、`Path`変数を選択し、`編集`ボタンをクリックします。
    - `Path`変数の値に、新しくインストールした Python の実行ファイルがあるディレクトリ（通常は C:\Users\[ユーザー名]\AppData\Local\Programs\Python\Python[バージョン]\）を追加します。
    - 変更を保存し、コマンドプロンプトを再起動します。
    - 以下のコマンドを実行して、新しいバージョンの Python が使用されていることを確認します。
      ```sh
      python --version
      ```
