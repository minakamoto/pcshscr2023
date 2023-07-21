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
- [pydantic](https://pydantic.dev/)

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
- Python 3.8 or above
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
- rye のインストール
  - [rye の公式サイト](https://rye-up.com/guide/installation/)にアクセスし、Windows 用の exe ファイル(`rye-x86_64-windows.exe for 64bit Intel Windows`)をダウンロードし、インストールします。
  - [rye の公式サイト](https://rye-up.com/guide/installation/#add-shims-to-path)の説明のとおり、環境変数 Path に shims を登録し、その優先順位を上げます。 TODO Check on windows
  - 変更を保存し、コマンドプロンプトを再起動します。
  - 以下のコマンドを実行して、エラーが rye のコマンドがエラーなく、実行されることを確認します。
    ```sh
      rye
    ```
- Visual Studio Code(VS Code)のインストール
  - [1st](./1st#1-setup)参照
- VS Code の拡張機能のインストール・設定
  - Javascript に関しては[1st](./1st#1-setup)参照
    - (追加の設定オプション)保存時に自動的に ESLint でコードを修正するように設定します。
    - `Editor: Code Actions On Save`の設定変更
      - VSCode の設定（File > Preferences > Settings）を開くか、ショートカット（Ctrl+,）を使用します。
      - 設定の中で「Editor: Code Actions On Save」または「editor.codeActionsOnSave」を検索し、「Edit in setting.json」を押します。
        - **このハンズオン以外でこの設定を使用したくない場合は`User`タブから`Workspace`タブに切り替えて設定してください。**
      - 以下の設定に変更します。
        ```json
        {
          "editor.codeActionsOnSave": {
            "source.fixAll": true
          }
        }
        ```
  - (Option)Python の開発にあたって、以下の拡張機能をインストールして、Web アプリの開発体験を向上させることをお勧めします：
    - Visual Studio Code を起動します。
    - 左サイドバーの四角いアイコンをクリックするか、Ctrl+Shift+X を押して、Extensions サイドバーを開きます。
    - 以下の拡張機能を検索し、各拡張機能の横にある「インストール」ボタンをクリックします：
      - Python
    - 拡張機能の設定
      - **このハンズオン以外でこの設定を使用したくない場合は`User`タブから`Workspace`タブに切り替えて設定してください。**
      - `Python › Formatting: Provider`の設定変更
        - VSCode の設定（File > Preferences > Settings）を開くか、ショートカット（Ctrl+,）を使用します。
        - 設定の中で「python.formatting.provider」を検索し、値を「black」にします。
      - `Python › Linting: Flake8 Enabled`の設定変更
        - VSCode の設定（File > Preferences > Settings）を開くか、ショートカット（Ctrl+,）を使用します。
        - 設定の中で「python.linting.flake8Enabled」を検索し、チェックボックスにチェックを入れます。
      - `Python: Language Server`の設定変更
        - VSCode の設定（File > Preferences > Settings）を開くか、ショートカット（Ctrl+,）を使用します。
        - 設定の中で「python.languageServer」を検索し、値を「Pylance」にします。

### プロジェクト作成

#### プロジェクトディレクトリの作成

`dish-delight`ディレクトリを作成し、その中に`frontend`ディレクトリと `backend`ディレクトリを作成します。以下のコマンドを実行します。

```sh
mkdir dish-delight/backend dish-delight/frontend
cd dish-delight
```

#### Frontend(Next.js) プロジェクト作成

以下のコマンドを実行してください。

```sh
cd frontend
npx create-next-app .
```

上記コマンドを実行すると、プロンプト上で質問されます。以下のとおり、質問に回答してください。

```sh
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias? … No
```

#### Backend プロジェクトの初期化

以下のコマンドを実行してください。

```sh
cd ../backend
# Projectの初期化
rye init
# このProjectで使用するPythonのバージョンを指定
rye pin 3.11
```

#### 必要なライブラリやツールのインストール

以下のコマンドを実行してください。

```sh
# 必要なライブラリの追加
rye add fastapi uvicorn
# 必要な開発用のツールの追加
rye add --dev black flake8
# インストール
rye sync
```

## 2. １店舗のみを想定したメニューの一覧と詳細表示の構築

### メニュー一覧ページとメニュー詳細ページを作成

Next.js と MUI を使用して、メニュー一覧ページとメニュー詳細ページを作成します。  
frontend のみの実装で backend にはまだ接続しません。

#### frontend/app ディレクトリに\_app.tsx ファイルを作成し、MUI のスタイルシートを追加します。

```tsx
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";
import theme from "../theme";

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

#### frontend ディレクトリ直下に theme.tsx ファイルを作成し、MUI のテーマを定義します。

```tsx
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
```

####

####

####
