# ほんの少しだけ複雑な UI＆独自 API を開発するハンズオン

## 0. はじめに

このハンズオンの目的と趣旨は[1st](./1st#0-はじめに)と同じであるため、割愛します。

### 作るもの

API を作成し、それらを呼び出し、その情報を画面に表示します。[1st](./1st)よりほんの少し複雑な UI を構築します。  
具体的なイメージは、学食や社食、自治会レベルの地域の祭りで出す露店のメニューを表示する UI です。
まず、一店舗のメニュー表示の実装から始め、最終的には複数店舗のメニュー表示(オプション課題)に対応できるようにします。

### 主な技術スタック

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)

TIPS:

- `Next.js`について
  - `Next.js`は、`React`をベースにした UI フレームワークで、SSR/SSG、ファイルベースルーティング、Fast Refresh、画像最適化、ゼロコンフィグなどの機能を提供しています。これらの機能により、Web ページの読み込み速度が高速化され、`SEO`に有利な構造が実現され、開発効率が向上します。Next.js はモダンかつ強力なフロントエンドフレームワークであり、様々な長所を持っています。
  - また、[React 公式サイト](https://react.dev/learn/start-a-new-react-project#nextjs)においても豊富な機能やコミュニティのサポートなどを理由に、あらゆるサイズの React アプリを作成に適しており、`Next.js`の利用を推奨しています。
- `FastAPI`について
  - `FastAPI`は、以下の特徴があります。
    - 高速: `FastAPI`は、`Starlette`と`Uvicorn`に基づいており、非常に高速なパフォーマンスを実現しています。
    - 簡潔: `FastAPI`は、簡潔な構文を採用しており、コードが読みやすく、書きやすくなっています。
    - バリデーション: `FastAPI`は、`Pydantic`を使用してリクエストとレスポンスのバリデーションを行うことができます。
      - `Pydantic`は、データの型安全性を確保するためのライブラリであり、データの型を宣言的に定義することができます。これにより、`FastAPI`は、`タイプセーフ`な Web アプリケーションの構築をサポートしています。
      - `タイプセーフ`とは、プログラムが実行される前に型エラーが検出されることを指します。これにより、`ランタイムエラー`を防ぐことができます。
    - 自動ドキュメント生成: `FastAPI`は、`Swagger UI`と`ReDoc`を使用して、自動的に API ドキュメントを生成することができます。
    - 非同期サポート: FastAPI は、非同期処理をサポートしており、非同期コードを簡単に書くことができます。

**注意事項**:

- Python のパッケージマネージャーについて
  - 今回のハンズオンで使用する Python のパッケージマネージャーは[rye](https://github.com/mitsuhiko/rye)です。依存関係のインストールとアンインストール、仮想環境の管理などを行える、便利なツールです。ただし、以下が公式ページに記載されているとおり、Experimental な状態です。この資料を書いている時点では利用可能ですが、ハンズオンを行う際にその利用可否は保証できません。もし、利用できない場合は、他のツール([poetry](https://python-poetry.org/) や [pip](https://pypi.org/project/pip/) など)の利用を検討してください。
    > An Experimental Package Management Solution for Python
- ***

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
          - TODO
            - > This setting will soon be deprecated. Please use the Autopep8 extension or the Black Formatter extension. Learn more here: https://aka.ms/AAlgvkb.
      - `Python › Linting: Flake8 Enabled`の設定変更
        - VSCode の設定（File > Preferences > Settings）を開くか、ショートカット（Ctrl+,）を使用します。
        - 設定の中で「python.linting.flake8Enabled」を検索し、チェックボックスにチェックを入れます。
          - TODO
            - > This setting will soon be deprecated. Please use the Flake8 extension. Learn more here: https://aka.ms/AAlgvkb.
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
rye init --no-pin
# このProjectで使用するPythonのバージョンを指定
rye pin 3.11
# 同期化し、virtualenv作成
rye sync
```

以下のコマンドを実行して、`Python 3.11.X`(X は最新のマイナーバージョンの数字。例: `Python 3.11.3`)と表示されることを確認してください。

```
python --version
```

#### 必要なライブラリやツールのインストール

以下のコマンドを実行してください。

```sh
# 必要なライブラリの追加
rye add fastapi uvicorn sqlalchemy
# 必要な開発用のツールの追加
rye add --dev black flake8
# 同期化し、インストール
rye sync
```

## 2. １店舗のみを想定したメニューの一覧と詳細表示の実装

TODO: 「１店舗のみ」構成の見直し

TODO: Figma で作成したイメージを参考に紹介する

### メニュー一覧ページとメニュー詳細ページを作成

Next.js と Tailwind CSS を使用して、メニュー一覧ページとメニュー詳細ページを作成します。  
Frontend のみの実装で Backend にはまだ接続しません。

TIPS:

- 今回、Tailwind CSS のインストールや設定は不要です。Nextjs プロジェクト作成時に Tailwind CSS を使用するオプションを指定しているためです。

#### 開発サーバーの起動

以下のコマンドを実行してください。

```sh
cd ../frontend
npm run dev
```

ブラウザを開いて http://localhost:3000 にアクセスし、Nextjs のデフォルト画面が表示されることを確認してください。

**注意事項**:すでに 3000 ポートを使用している場合は、別のポートが指定されます。その場合は、以下のようにコマンドライン上に表示されます

```sh
- warn Port 3000 is in use, trying 3001 instead.
- ready started server on 0.0.0.0:3001, url: http://localhost:3001
```

開発サーバーはそのまま起動しておいてください。停止したい場合は、コマンドラインで「Ctrl + c」で停止することができます。

#### globals.css の設定修正

デフォルトで設定されている globals.css の設定を修正します。  
`dish-delight/frontend/app/globals.css`を開き、その内容を以下のコードに置き換えます：

TODO あとでコードの内容確認

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  color: rgb(255, 255, 255);
  background: rgb(0, 0, 0);
}
```

#### 外部画像サイトの設定

今回、Next.js が提供する[Image コンポーネント](https://nextjs.org/docs/pages/building-your-application/optimizing/images)を使用します。Next.js の`Imageコンポーネント`は、HTML の`<img>`要素の拡張で、現代の Web のニーズに適応したものです。良い Core Web Vitals を達成するため、様々な組み込みのパフォーマンス最適化が含まれています。

また、今回外部画像を使用するため、`next.config.js`にて、`remotePatterns`プロパティの設定が必要です。詳しくは[公式サイトの説明](https://nextjs.org/docs/pages/api-reference/components/image#configuration-options)を参照してください。

`dish-delight/frontend/next.config.js`を開き、その内容を以下のコードに置き換えます：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
```

#### Home 画面を実装する

`dish-delight/frontend/app/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import jojoUnivLogo from "../public/logo_jojo_univ.svg";

// stores info(now, only one store)
// Support multiple stores with optional issue
const stores = [
  {
    id: 1,
    name: "Sakura-tei",
    img: "/sakura_tei_logo.jpeg",
    category: "Japanese",
  },
];

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-sky-500 p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src={jojoUnivLogo}
            alt="Logo of Jojo University"
            width={45}
            height={45}
          />
          <span className="font-semibold text-lg tracking-tight pl-2">
            Jojo University Cafeteria
          </span>
        </div>
      </nav>
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">
          Welcome to Jojo University Cafeteria!
        </h1>
        {/* Do not display this image for mobile */}
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={500}
          height={375}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={300}
                  height={300}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{store.name}</div>
                  <p className="text-gray-700 text-base">{store.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

TODO:

- Consider mobile first design.
  - ブラウザの開発者ツールでモバイルレイアウトの表示を説明する。そのあとは、モバイルレイアウトで表示してもらう。
- how to share static image file
  - ロゴなどの静的ファイルの共有 or 配布方法を検討する

#### Navbar をコンポーネント化する

メニュー一覧やメニュー詳細画面でも同じ Navbar を使用したいため、Navbar をコンポーネント化します。

`dish-delight/frontend/components/Navbar.tsx`ファイルを作成し、その内容を以下のコードに置き換えます：

```tsx
// components/Navbar.tsx
import Image from "next/image";
import jojoUnivLogo from "../public/logo_jojo_univ.svg";

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-sky-500 p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src={jojoUnivLogo}
            alt="Logo of Jojo University"
            width={45}
            height={45}
          />
          <span className="font-semibold text-lg tracking-tight pl-2">
            Jojo University Cafeteria
          </span>
        </div>
      </nav>
    </>
  );
}
```

`dish-delight/frontend/app/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

const stores = [
  {
    id: 1,
    name: "Sakura-tei",
    img: "/sakura_tei_logo.jpeg",
    category: "Japanese",
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">
          Welcome to Jojo University Cafeteria!
        </h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={500}
          height={375}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={300}
                  height={300}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{store.name}</div>
                  <p className="text-gray-700 text-base">{store.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

`dish-delight/frontend/public`にロゴを 4 つを配置します：

対象の画像は[Github Repository](https://github.com/minakamoto/pschs2023/tree/main/docs/static/img/2nd/logo)からすべて取得してください。

注意事項:

- これらの画像は、Bing 上から`Image Creator`(`DALL-E`)を使用して作成しています。

動作・見た目を確認します。(上記に添付した Figma でも見た目は確認できます)

- 見た目は以下となっていること
  - TODO キャプチャ添付
- `Sakura-tei`の Card をクリックすると、メニュー一覧画面に遷移すること
  - 画面はまだ作っていないので、"404 This page could not be found"と表示されます

ブラウザの開発者ツールを開き、いずれかのスマホもしくはスマホのサイズになるように画面を調節してください。

TODO 開発ツールの手順

- コマンド、メニューからの操作方法
- Responsive の操作方法

スマホと同等のサイズにした場合、以下の見た目になっていることを確認してください。
TODO キャプチャーを貼る

注意事項:
このアプリはモバイルファーストを前提とし、これ以降はこの状態での動作確認を前提とします。

TIPS:
タブレットサイズにすると、列は 2 つになります。

#### メニュー一覧画面を実装する

Home 画面で店舗を選択後に表示されるメニュー一覧画面を実装します。

`dish-delight/frontend/app/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

// TODO 型の定義は最初からでも良さそう
type Store = {
  id: number;
  name: string;
  img: string;
  category: string;
};

export const stores: Store[] = [
  {
    id: 1,
    name: "Sakura-tei",
    img: "/sakura_tei_logo.jpeg",
    category: "Japanese",
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">
          Welcome to Jojo University Cafeteria!
        </h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={500}
          height={375}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={300}
                  height={300}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{store.name}</div>
                  <p className="text-gray-700 text-base">{store.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

`dish-delight/frontend/app/stores/[storeId]/page.tsx`ファイルを作成し、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/stores/[storeId]/page.tsx
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { stores } from "@/app/page";
import Image from "next/image";

// TODO データが多すぎるので、後で減らす
// まずはfrontendで固定でメニュー情報を保持します。
// 画像は[Unsplash](https://unsplash.com/)のデータを使用しています。
export const menus = [
  {
    id: 1,
    storeId: 1,
    name: "Soy sauce ramen",
    img: "https://images.unsplash.com/photo-1632709810780-b5a4343cebec",
    author: "@5amramen",
    price: "900 yen",
    description:
      "A classic Japanese ramen noodle soup that is made with a soy sauce-based broth.",
    options: [
      {
        name: "Extra noodles",
        price: "100 yen",
      },
      {
        name: "Extra char siu",
        price: "100 yen",
      },
      {
        name: "Barikata(very hard noodles)",
        price: "0 yen",
      },
    ],
  },
  {
    id: 2,
    storeId: 1,
    name: "Sanuki Udon",
    img: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3",
    author: "@jinomono",
    price: "800 yen",
    description:
      "A type of thick, chewy udon noodle that is made in Kagawa Prefecture, Japan.",
    options: [
      {
        name: "Chicken tempura",
        price: "100 yen",
      },
      {
        name: "Squid tempura",
        price: "100 yen",
      },
      {
        name: "Vegetable tempura",
        price: "100 yen",
      },
      {
        name: "Large size",
        price: "100 yen",
      },
      {
        name: "Small size",
        price: "-50 yen",
      },
    ],
  },
  {
    id: 3,
    storeId: 1,
    name: "Zaru soba",
    img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1",
    author: "@gaspanik",
    price: "1,000 yen",
    description: "A cold soba noodle dish served with a dipping sauce.",
    options: [
      {
        name: "Large size",
        price: "200 yen",
      },
    ],
  },
  {
    id: 4,
    storeId: 1,
    name: "Spicy Miso Ramen",
    img: "https://images.unsplash.com/photo-1637024696628-02cb19cc1829",
    author: "@5amramen",
    price: "900 yen",
    description: "A spicy miso ramen with a rich and flavorful broth.",
    options: [
      {
        name: "Large size",
        price: "100 yen",
      },
      {
        name: "Extra char siu",
        price: "100 yen",
      },
      {
        name: "Seasoned egg",
        price: "100 yen",
      },
    ],
  },
  {
    id: 5,
    storeId: 1,
    name: "Tempura bowl and soba set",
    img: "https://images.unsplash.com/photo-1593357871477-00fd350cc0f8",
    author: "@bady",
    price: "1,200 yen",
    description:
      "A set meal consisting of a tempura bowl and a bowl of soba noodles.",
  },
  {
    id: 6,
    storeId: 1,
    name: "Seafood bowl",
    img: "https://images.unsplash.com/photo-1565967531713-45739e0cad63",
    author: "@jangus231",
    price: "2,000 yen",
    description:
      "A bowl of rice topped with a variety of seafood, such as salmon, tuna, shrimp, and scallops.",
  },
  {
    id: 7,
    storeId: 1,
    name: "Daily set lunch",
    img: "https://images.unsplash.com/photo-1565941072372-0f0f10c8b7dd",
    author: "@roppongi",
    price: "1,000 yen",
    description: "A daily set meal that changes daily.",
    options: [
      {
        name: "Mixed grain rice",
        price: "100 yen",
      },
      {
        name: "Pork soup",
        price: "100 yen",
      },
    ],
  },
  {
    id: 8,
    storeId: 2,
    name: "Khao soi",
    img: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12",
    author: "@ural_8_low",
    price: "60 baht",
    description:
      "Khao Soi is a Northern Thai curry noodle soup with a rich and flavorful broth.",
  },
];

export default function StoreMenu({ params }: { params: { storeId: string } }) {
  const storeId = Number(params.storeId);
  const store = stores.find((store) => store.id === storeId);
  return (
    <div>
      <Navbar storeName={store?.name} storeId={store?.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {menus.map((menu) => (
          <Link href={`/stores/${storeId}/menus/${menu.id}`} key={menu.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
              <Image
                className="w-full"
                src={menu.img}
                alt={menu.name}
                width={300}
                height={300}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{menu.name}</div>
                <p className="text-gray-700 text-base">{menu.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

`dish-delight/frontend/components/Navbar.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/components/Navbar.tsx
import Image from "next/image";
import jojoUnivLogo from "../public/logo_jojo_univ.svg";
import Link from "next/link";

// type definition of props
type NavbarProps = {
  storeName?: string;
  storeId?: number;
};

export default function Navbar({ storeName, storeId }: NavbarProps) {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-sky-500 p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <Image
              src={jojoUnivLogo}
              alt="Logo of Jojo University"
              width={45}
              height={45}
            />
          </Link>
          {/* If the store is not set up (i.e., only for Home), give the name of the university. */}
          {!storeName && (
            <span className="font-semibold text-lg md:text-xl tracking-tight pl-2">
              Jojo University Cafeteria
            </span>
          )}
          {/* Only when the store name is set, the store name and a link to Home are displayed. */}
          {storeName && (
            <>
              <span className="font-semibold text-lg md:text-xl tracking-tight px-2">
                {storeName}
              </span>
              <Link
                href="/"
                className="text-gray-200 text-base ml-3 px-1 hover:bg-sky-600"
              >
                Home
              </Link>
            </>
          )}
          {/* Display a link to the menu list only when the store name and store ID are set */}
          {storeName && storeId && (
            <Link
              href={`/stores/${storeId}`}
              key={storeId}
              className="text-gray-200 text-base ml-3 px-1 hover:bg-sky-600"
            >
              Menus
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
```

動作・見た目を確認します。

- Home 画面にて`Sakura-tei`の Card をクリックすると、メニュー一覧画面に遷移すること
- 見た目は以下となっていること
  - TODO キャプチャ添付
- Navbar の"HOME"を押すと HOME 画面に遷移すること、"MENUS"を押すとメニュー一覧画面のままであること
- メニュー一覧画面のいずれかのメニューの Card をクリックすると、メニュー詳細画面に遷移すること
  - 画面はまだ作っていないので、"404 This page could not be found"と表示されます

#### リファクタリング(Bakcend の API 呼び出しのための準備)

TODO
現状 Frontend で固定でデータを持っていますが、後ほどの手順で Bakcend の API 呼び出しによるデータ取得に変更するため、メニュー詳細画面に入る前に、まずはそのための準備のリファクタリングをします。

リファクタリングの流れ(細かなステップ)としては以下のとおりです。  
ただし、この流れは手順を示すだけにしておきます。これまで通り、修正後のコードを各ファイルに上書きする方法で記載します。  
もし、余力がある方はこの流れに沿ってご自身でリファクタリングを実施し、修正後のコードと比べてみてください。

1. `dish-delight/frontend/app/page.tsx`から店舗の固定データを`dish-delight/frontend/lib/api.tsx`に移動します。
1. `dish-delight/frontend/lib/api.tsx`に`getStores`メソッドを作って、店舗データをすべて返すようにする
1. `dish-delight/frontend/app/page.tsx`で店舗の固定データを呼び出していたところを`dish-delight/frontend/lib/api.tsx`の`getStores`メソッドを呼ぶようにする
1. `dish-delight/frontend/app/stores/[storeId]/page.tsx`からメニューの固定データを`dish-delight/frontend/lib/api.tsx`に移動する
1. `dish-delight/frontend/lib/api.tsx`に`getStore`メソッドを作って指定された店舗だけを返すようにする
1. `dish-delight/frontend/app/stores/[storeId]/page.tsx`で`dish-delight/frontend/app/page.tsx`の`stores`を呼び出していたところを`dish-delight/frontend/lib/api.tsx`の`getStore`メソッドを呼ぶようにする
1. `dish-delight/frontend/lib/api.tsx`に`getMenus`メソッドを作って指定された店舗のメニューをすべて返すようにする
   - 動作確認用に別店舗のデータを固定データに加えています
   - レスポンスの型を指定したいので、メニューの型定義も行っています
1. `dish-delight/frontend/app/stores/[storeId]/page.tsx`で`dish-delight/frontend/app/page.tsx`の`menus`は`dish-delight/frontend/lib/api.tsx`の一旦`getMenus`メソッドを呼び、取得するようにする

`dish-delight/frontend/lib/api.tsx`を作成し、その内容を以下のコードに置き換えます：

```tsx
// lib/api.js
// まずはfrontendで固定でメニュー情報を保持します。

type Store = {
  id: number;
  name: string;
  img: string;
  category: string;
};

export const stores: Store[] = [
  {
    id: 1,
    name: "Sakura-tei",
    img: "/sakura_tei_logo.jpeg",
    category: "Japanese",
  },
];

// メニューのオプションの型定義
type MenuOption = {
  name: string;
  price: string;
};

// TODO データが多すぎるので、後で減らす
// 画像は[Unsplash](https://unsplash.com/)のデータを使用しています。
const menus = [
  {
    id: 1,
    storeId: 1,
    name: "Soy sauce ramen",
    img: "https://images.unsplash.com/photo-1632709810780-b5a4343cebec",
    author: "@5amramen",
    price: "900 yen",
    description:
      "A classic Japanese ramen noodle soup that is made with a soy sauce-based broth.",
    options: [
      {
        name: "Extra noodles",
        price: "100 yen",
      },
      {
        name: "Extra char siu",
        price: "100 yen",
      },
      {
        name: "Barikata(very hard noodles)",
        price: "0 yen",
      },
    ],
  },
  {
    id: 2,
    storeId: 1,
    name: "Sanuki Udon",
    img: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3",
    author: "@jinomono",
    price: "800 yen",
    description:
      "A type of thick, chewy udon noodle that is made in Kagawa Prefecture, Japan.",
    options: [
      {
        name: "Chicken tempura",
        price: "100 yen",
      },
      {
        name: "Squid tempura",
        price: "100 yen",
      },
      {
        name: "Vegetable tempura",
        price: "100 yen",
      },
      {
        name: "Large size",
        price: "100 yen",
      },
      {
        name: "Small size",
        price: "-50 yen",
      },
    ],
  },
  {
    id: 3,
    storeId: 1,
    name: "Zaru soba",
    img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1",
    author: "@gaspanik",
    price: "1,000 yen",
    description: "A cold soba noodle dish served with a dipping sauce.",
    options: [
      {
        name: "Large size",
        price: "200 yen",
      },
    ],
  },
  {
    id: 4,
    storeId: 1,
    name: "Spicy Miso Ramen",
    img: "https://images.unsplash.com/photo-1637024696628-02cb19cc1829",
    author: "@5amramen",
    price: "900 yen",
    description: "A spicy miso ramen with a rich and flavorful broth.",
    options: [
      {
        name: "Large size",
        price: "100 yen",
      },
      {
        name: "Extra char siu",
        price: "100 yen",
      },
      {
        name: "Seasoned egg",
        price: "100 yen",
      },
    ],
  },
  {
    id: 5,
    storeId: 1,
    name: "Tempura bowl and soba set",
    img: "https://images.unsplash.com/photo-1593357871477-00fd350cc0f8",
    author: "@bady",
    price: "1,200 yen",
    description:
      "A set meal consisting of a tempura bowl and a bowl of soba noodles.",
  },
  {
    id: 6,
    storeId: 1,
    name: "Seafood bowl",
    img: "https://images.unsplash.com/photo-1565967531713-45739e0cad63",
    author: "@jangus231",
    price: "2,000 yen",
    description:
      "A bowl of rice topped with a variety of seafood, such as salmon, tuna, shrimp, and scallops.",
  },
  {
    id: 7,
    storeId: 1,
    name: "Daily set lunch",
    img: "https://images.unsplash.com/photo-1565941072372-0f0f10c8b7dd",
    author: "@roppongi",
    price: "1,000 yen",
    description: "A daily set meal that changes daily.",
    options: [
      {
        name: "Mixed grain rice",
        price: "100 yen",
      },
      {
        name: "Pork soup",
        price: "100 yen",
      },
    ],
  },
  {
    id: 8,
    storeId: 2,
    name: "Khao soi",
    img: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12",
    author: "@ural_8_low",
    price: "60 baht",
    description:
      "Khao Soi is a Northern Thai curry noodle soup with a rich and flavorful broth.",
  },
];

export async function getStores(): Promise<Store[]> {
  return stores;
}

export async function getStore(storeId: number): Promise<Store | undefined> {
  return stores.find((store) => store.id === storeId);
}

export async function getMenus(storeId: number): Promise<Menu[]> {
  return menus.filter((menu) => menu.storeId === storeId);
}
```

注意事項:  
固定データの取得に非同期処理のための async/await を付ける必要はまったくないです。Backend API に置き換えたとき、修正が少ないように async/await を付けています。

`dish-delight/frontend/app/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getStores } from "@/lib/api";

export default async function Home() {
  const stores = await getStores();
  return (
    <div>
      <Navbar />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">
          Welcome to Jojo University Cafeteria!
        </h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={500}
          height={375}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={300}
                  height={300}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{store.name}</div>
                  <p className="text-gray-700 text-base">{store.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

`dish-delight/frontend/app/stores/[storeId]/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/stores/[storeId]/page.tsx
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import { getMenus, getStore } from "@/lib/api";

export default async function StoreMenu({
  params,
}: {
  params: { storeId: string };
}) {
  const storeId = Number(params.storeId);
  const store = await getStore(storeId);
  const menus = await getMenus(storeId);

  // 該当する店舗が存在しないとき
  if (!store) {
    return (
      <div>
        <Navbar />
        <div className="m-3">
          <p>
            該当する店舗が存在しません。お手数ですが、HOMEから再度店舗を選択してください。
          </p>
        </div>
      </div>
    );
  }

  // 該当するメニューが存在しないとき
  if (menus.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="m-3">
          <p>
            該当する店舗のメニューが存在しません。お手数ですが、HOMEから再度店舗を選択してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {menus.map((menu) => (
          <Link href={`/stores/${storeId}/menus/${menu.id}`} key={menu.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
              <Image
                className="w-full"
                src={menu.img}
                alt={menu.name}
                width={300}
                height={300}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{menu.name}</div>
                <p className="text-gray-700 text-base">{menu.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

動作や見た目に変更がないことを確認します。  
なお、このリファクタリングにて、店舗やメニューが存在しない場合の処理を加えています。  
一時的にコードを書き換えてみて(例: 取得データを 0 にする、if 文を外すなど)、動作確認をしてみてください。店舗の場合は以下になります。

<div align="center">
<img src="../static/img/2nd/docs/store_not_found.png" alt="Store not found" width="375">
</div>

注意事項:

- このハンズオンの例外処理について
  - `Frontend`、`Backend`ともに本ハンズオンでは、Web アプリ開発の体験を優先しているため、例外処理は簡易的に実装しています。実際の開発では、要件や技術要素を加味して適切に実装してください。

#### メニュー詳細画面を実装する

メニュー一覧画面にてメニューを選択後に表示されるメニュー詳細画面を実装します。

TODO 見直し
メニュー詳細画面を実装すると、ディレクトリ構成は以下となります。

```
dish-delight/frontend
├── lib/
│   ├── api.ts                 // backend APIを呼び出す処理を集める
├── app/
│   ├── _app.ts
│   ├── index.ts
│   └── stores/
│       ├── [storeId]/
│       │   └── page.tsx
│       └── menus/
│           └── [menuId]/
│               └── page.tsx
├── components/
│   └── Navbar.tsx
├── public/
│   ├── logo_jojo_univ.svg
│   ├── sakura_tei_logo.jpeg
│   ├── xxxxx_logo.jpeg        // TBD
│   └── yyyyy_logo.jpeg        // TBD
├── styles/
│   └── globals.css
└── tailwind.config.js
```

TODO
TIPS:
props よりも fetch した方が良さそう。React が後ろでメモ化してくれるから
https://nextjs.org/docs/app/building-your-application/caching#request-memoization

`dish-delight/frontend/lib/api.tsx`を作成し、以下のコードを最下部に加えます：

```tsx
// lib/api.tsx
export async function getMenu(
  storeId: number,
  menuId: number
): Promise<Menu | undefined> {
  return menus.find((menu) => menu.storeId === storeId && menu.id === menuId);
}
```

`dish-delight/frontend/app/stores/[storeId]/menus/[menuId]/page.tsx`を作成し、以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/stores/[storeId]/menus/[menuId]/page.tsx
import Image from "next/image";
import { getMenu, getStore } from "@/lib/api";
import Navbar from "@/components/Navbar";

export default async function Menu({
  params,
}: {
  params: { storeId: string; menuId: string };
}) {
  const storeId = Number(params.storeId);
  const menuId = Number(params.menuId);
  const store = await getStore(storeId);
  const menu = await getMenu(storeId, menuId);

  // 該当する店舗が存在しないとき
  if (!store) {
    return (
      <div>
        <Navbar />
        <div className="m-3">
          <p>
            該当する店舗が存在しません。お手数ですが、HOMEから再度店舗を選択してください。
          </p>
        </div>
      </div>
    );
  }

  // 該当するメニューが存在しないとき
  if (!menu) {
    return (
      <div>
        <Navbar />
        <div className="m-3">
          <p>
            該当する店舗のメニューが存在しません。お手数ですが、HOMEから再度店舗を選択してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 md:mx-auto">
        <Image
          className="w-full"
          src={menu.img}
          alt={menu.name}
          width={300}
          height={300}
          priority={false}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{menu.name}</div>
          <p className="text-gray-500 text-base mt-2">{menu.price}</p>
          <div className="text-base mt-3">{menu.description}</div>
          {menu.options && (
            <div>
              <p className="font-bold text-gray-500 text-lg mt-5">Option</p>
              {menu.options.map((option) => (
                <ul key={option.name}>
                  <li className="list-disc list-inside text-base mt-3">
                    {option.name}{" "}
                    <span className="text-gray-500">{option.price}</span>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

動作・見た目を確認します。

- メニュー一覧画面のいずれかのメニューの Card をクリックすると、メニュー詳細画面に遷移すること
  - 該当のメニュー画像や説明、Option などが表示されること
- Navbar の"HOME"を押すと HOME 画面に、"MENUS"を押すとメニュー一覧画面に遷移すること
- 店舗やメニューが存在しない場合のエラー画面
  - イメージはメニュー一覧画面と同じ

#### リファクタリング(データ取得のエラー画面のコンポーネント化)

店舗やメニューのデータ取得時に存在しなかった場合の画面が冗長な(今回でいうと同じようなコードが複数ある)ため、コンポーネント化します。

リファクタリングの対象は以下の 2 つです。それぞれ、店舗やメニューのデータ取得時に存在しなかった場合の画面を実装しています。これを共通化します。

- `dish-delight/frontend/app/stores/[storeId]/page.tsx`
- `dish-delight/frontend/app/stores/[storeId]/menus/[menuId]/page.tsx`

固定のメッセージを格納するために、`dish-delight/frontend/lib/constants.ts`ファイルを作成し、その内容を以下のコードに置き換えます：

```ts
// dish-delight/frontend/lib/constants.ts

export const DATA_NOT_FOUND_MESSAGE = {
  STORE:
    "該当する店舗が存在しません。お手数ですが、HOMEから再度店舗を選択してください。",
  MENU: "該当する店舗のメニューが存在しません。お手数ですが、HOMEから再度店舗を選択してください。",
};
```

`dish-delight/frontend/components/DataNotFound.tsx`ファイルを作成し、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/components/DataNotFound.tsx

import Navbar from "./Navbar";

type DataNotFoundProps = {
  message: string;
};

export default function DataNotFound({ message }: DataNotFoundProps) {
  return (
    <>
      <Navbar />
      <div className="m-3">
        <p>{message}</p>
      </div>
    </>
  );
}
```

`dish-delight/frontend/app/stores/[storeId]/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/stores/[storeId]/page.tsx
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import { getMenus, getStore } from "@/lib/api";
import DataNotFound from "@/components/DataNotFound";
import { DATA_NOT_FOUND_MESSAGE } from "@/lib/constants";

export default async function StoreMenu({
  params,
}: {
  params: { storeId: string };
}) {
  const storeId = Number(params.storeId);
  const store = await getStore(storeId);
  const menus = await getMenus(storeId);

  // 該当する店舗が存在しないとき
  if (!store) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.STORE} />;
  }

  // 該当するメニューが存在しないとき
  if (menus.length === 0) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.MENU} />;
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {menus.map((menu) => (
          <Link href={`/stores/${storeId}/menus/${menu.id}`} key={menu.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
              <Image
                className="w-full"
                src={menu.img}
                alt={menu.name}
                width={300}
                height={300}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{menu.name}</div>
                <p className="text-gray-700 text-base">{menu.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

`dish-delight/frontend/app/stores/[storeId]/menus/[menuId]/page.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/stores/[storeId]/menus/[menuId]/page.tsx
import Image from "next/image";
import { getMenu, getStore } from "@/lib/api";
import Navbar from "@/components/Navbar";
import DataNotFound from "@/components/DataNotFound";
import { DATA_NOT_FOUND_MESSAGE } from "@/lib/constants";

export default async function Menu({
  params,
}: {
  params: { storeId: string; menuId: string };
}) {
  const storeId = Number(params.storeId);
  const menuId = Number(params.menuId);
  const store = await getStore(storeId);
  const menu = await getMenu(storeId, menuId);

  // 該当する店舗が存在しないとき
  if (!store) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.STORE} />;
  }

  // 該当するメニューが存在しないとき
  if (!menu) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.MENU} />;
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 md:mx-auto">
        <Image
          className="w-full"
          src={menu.img}
          alt={menu.name}
          width={300}
          height={300}
          priority={false}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{menu.name}</div>
          <p className="text-gray-500 text-base mt-2">{menu.price}</p>
          <div className="text-base mt-3">{menu.description}</div>
          {menu.options && (
            <div>
              <p className="font-bold text-gray-500 text-lg mt-5">Option</p>
              {menu.options.map((option) => (
                <ul key={option.name}>
                  <li className="list-disc list-inside text-base mt-3">
                    {option.name}{" "}
                    <span className="text-gray-500">{option.price}</span>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

動作・見た目に変更がないことを確認します。

#### サイトのタイトルと favicon の設定

上記で Frontend 部分は終わりですが、最後にサイトのタイトルと favicon だけ修正します。

TODO
タイトルのキャプチャ

`dish-delight/frontend/app/layout.tsx`を開き、その内容を以下のコードに置き換えます：

```tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jojo University Cafeteria",
  description: "This site shows the menu of Jojo University Cafeteria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

`dish-delight/frontend/app/favicon.ico`を置き換えます：

TODO ロゴの配置場所 or 配布場所
対象の画像は[Github Repository](https://github.com/minakamoto/pschs2023/tree/main/docs/static/img/2nd)から取得してください。

動作・見た目を確認します。

- サイトのタイトルと favicon が以下のキャプチャと同じであることを確認する
  - TODO キャプチャ

####

####

####

## 3. データベースに接続してデータを返す

### データベースの接続設定を行う

`ORM`の`SQLAlchemy`による`SQLite`データベースへの接続設定を行います。

`dish-delight/backend/src/backend/database.py`ファイルを作成し、その内容を以下のコードに置き換えます：

```py
# dish-delight/backend/src/backend/database.py

# Quoting the official [FastAPI website](https://fastapi.tiangolo.com/ja/tutorial/sql-databases/)

# import the SQLAlchemy parts
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Create a database URL for SQLAlchemy
# connecting to a SQLite database (opening a file with the SQLite database).
DATABASE_URL = "sqlite:///./university.db"

# Create a SQLAlchemy "engine"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create a SessionLocal class.
# Each instance of the SessionLocal class will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class.
# Later we will inherit from this class to create each of the database models or classes (the ORM models)
Base = declarative_base()

```

TIPS(TODO):

- `ORM`とは
- `SQLite`について
  - 今回ハンズオンのデータベースには`SQLite`を使用している。`SQLite`は...
- `SQLAlchemy`について
  - 今回ハンズオンの ORM には`SQLAlchemy`を使用している。`SQLAlchemy`は...
- データベースや SQL 周りのコードや説明は[FastAPI 公式サイト](https://fastapi.tiangolo.com/ja/tutorial/sql-databases)を引用しています。詳しく知りたい方はそちらをご確認ください。

注意事項(TODO):

- Pylance が rye 自動構築の仮想環境を認識できておらず、import で警告がでる場合の対処
  1. コマンドパレットにて、`Python: Select Interpreter`を選択、`{各自の作業ディレクトリの絶対パス}/dish-delight/backend/.venv/bin/python)`を指定する
  1. ワークスペース(各自の作業ディレクトリ)の.vscode/setting.json の`"python.languageServer": "Pylance",`の下にを指定、未検証（未解決）
  ```json
  "python.analysis.extraPaths": [
      "${workspaceFolder}/dish-delight/backend/.venv/lib/python3.11/site-packages"
    ],
    "python.envFile": "${workspaceFolder}/dish-delight/backend/.venv/bin/python"
  ```

### テーブル(データベースモデル)定義を行う

`SQLAlchemy`によるテーブル(データベースモデル)定義を行います。

`dish-delight/backend/src/backend/models.py`ファイルを作成し、その内容を以下のコードに置き換えます：

```py
# dish-delight/backend/src/backend/models.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

# Import Base defined in database.py
from database import Base


# Define a model for each table by inheriting from Base
class Store(Base):
    # Storeテーブルの定義
    __tablename__ = "stores"

    # Define columns and attributes
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    img = Column(String)
    category = Column(String)

    # Define the relationship
    menus = relationship("Menu", back_populates="store")


class Menu(Base):
    # Menuテーブルの定義
    __tablename__ = "menus"

    id = Column(Integer, primary_key=True, index=True)
    storeId = Column(Integer, ForeignKey("stores.id"))
    name = Column(String, index=True)
    img = Column(String)
    author = Column(String)
    price = Column(String)
    description = Column(String)

    store = relationship("Store", back_populates="menus")
    options = relationship("Option", back_populates="menu")


class Option(Base):
    # Optionテーブルの定義
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    menuId = Column(Integer, ForeignKey("menus.id"))
    name = Column(String)
    price = Column(String)

    menu = relationship("Menu", back_populates="options")

```

### データベースに初期データを登録する

データベースに初期データを登録します。初期データ登録用に簡単なスクリプトを用意しています。  
[Github リポジトリ](https://github.com/minakamoto/pschs2023/tree/main/src/script/2nd)にあるファイルをすべてダウンロードし、`dish-delight/backend/src/backend`配下に置きます。

対象のファイルは以下の 4 つです。

- data.json
- insert_data.py
- insert_initial_data.py
- read_json.py

`dish-delight/backend/src/backend`にて、以下のコマンドを実行します。

```sh
python insert_initial_data.py
```

`dish-delight/backend/src/backend`配下に`university.db`ファイルができていれば成功です。

TIPS(TODO):

- データを変えて、再度データベースに登録したい場合は`university.db`ファイルを消して、もう一度実行します。要確認

注意事項(TODO):

- 初期データ登録のスクリプトの目的は今回のハンズオンの初期データ登録の一度きりのみです。実際の開発において、データベースを扱う場合にはマイグレーションツール(FastAPI であれば、[Alembic](https://alembic.sqlalchemy.org/en/latest/))の導入を検討してください。

### データベースから店舗一覧とメニュー一覧とメニュー詳細のデータを取得して返す API を作成する

API で使用するデータの型(`Pydantic`のモデル)とデータベースから店舗一覧、メニュー一覧とメニュー詳細を取得する API を作成します。

`dish-delight/backend/src/backend/main.py`ファイルを作成し、その内容を以下のコードに置き換えます：

```py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from pydantic import BaseModel

app = FastAPI()


# Dependency
# This dependency will create a new SQLAlchemy SessionLocal that will be used in a single request,
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


# Menu type definition
class Menu(BaseModel):
    id: int
    storeId: int
    name: str
    img: str
    author: str
    price: str
    description: str

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


# API to get a list of stores
# `@app.get`でGETメソッド, `()`の"/stores"でパスを指定します
@app.get("/stores", response_model=list[Store])
def read_stores(db: Session = Depends(get_db)):
    # `-> list[Store]`で戻り値の型を定義
    # `db.query(store).all()`でStoreテーブルから全件取得
    result = db.query(models.Store).all()
    # 結果が存在しない場合の例外処理
    if not result:
        raise HTTPException(status_code=404, detail="Store not found")
    return result


# API to get the specified store ID
@app.get("/stores/{store_id}", response_model=Store)
def read_store(store_id: int, db: Session = Depends(get_db)):
    # `db.query(store).filter(store.id == store_id)`で
    # Storeテーブルから指定されたstore_idとIdが合致するデータを取得
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
    # MenuテーブルのstoreIdとIDの複数条件を指定
    condition = [models.Menu.storeId == store_id, models.Menu.id == menu_id]
    result = db.query(models.Menu).filter(*condition).first()
    if not result:
        raise HTTPException(status_code=404, detail="Menu not found")
    return result

```

TIPS(TODO):

- `models.py`で作成したモデルは`SQLAlchemy`のモデルであり、データベース用のモデルです。
- 今回のハンズオンではモデルが少ないため、`main.py`の中に API と合わせて、`Pydantic`のモデルを実装しました。しかし、モデルが多いなどの場合は別モジュールにすることを検討してください。
  - `Pydantic`のモデルは API でデータを読み込んだり、作成したりするときに使用します。
  - [FastAPI の公式サイト](https://fastapi.tiangolo.com/ja/tutorial/sql-databases/#create-the-pydantic-models)の例では、`SQLAlchemy`のモデルと区別するため、`schemas.py`の中に定義されています。
- ハンズオンと[FastAPI の公式サイト](https://fastapi.tiangolo.com/ja/tutorial/sql-databases)との相違点
  - [FastAPI の公式サイト](https://fastapi.tiangolo.com/ja/tutorial/sql-databases)では`Pydantic`のモデルは各モデルクラスの`Base`クラス(例:`User`なら`UserBase`)とそれらを継承した`Create`用クラス(例:`UserCreate`)と`Read`用クラス(例:`User`)を作る説明がされています。`Create`時と`Read`時で必要な情報、渡したくない情報(例:`password`)が異なるためです。
    - このハンズオンでは`CRUD`関数のうち、`R(read)`のみを作成します。そのため、クラスは 1 つのみ作成しています。
      - CRUD comes from: Create, Read, Update, and Delete.
  - [FastAPI の公式サイト](https://fastapi.tiangolo.com/ja/tutorial/sql-databases)では、`CRUD`関数の Util モジュールを作成し、それらを各 API 関数で呼ぶようにしています。コードの再利用性、テスト容易性、保守性などを考慮したためです。
    - このハンズオンでは Web アプリ開発体験を優先するため、各 API 関数内で直接実装しています。実際の開発にあたっては、要件等を勘案して設計・実装を行なってください。

注意事項(TODO):

- ハンズオンを記載している時点の[FastAPI の公式サイト](https://fastapi.tiangolo.com/ja/tutorial/sql-databases)を参考に、上記の実装をしています。このハンズオンを書いている時点で、以下のとおり記載があり、`Pydantic v2`に対応するため説明と異な実装をしているところもあります。
  - また、ハンズオン資料の作成時に参考にした資料は、ハンズオン実施時に`Pydantic v2`に対応した新しい Version の資料に変わっている可能性があります。
    > These docs are about to be updated. 🎉
    >
    > The current version assumes Pydantic v1, and SQLAlchemy versions less than 2.0.
    >
    > The new docs will include Pydantic v2 and will use SQLModel (which is also based on SQLAlchemy) once it is updated to use Pydantic v2 as well.

## OpenAPI を使用して、API の動作確認を行う

`FastAPI`ではデフォルトで API ドキュメントを`OpenAPI`仕様に基づいて自動で生成されます。`Swagger UI`を使用して、Web ブラウザで確認することができます。
`FastAPI`を起動します。

```sh
rye run uvicorn main:app --reload
```

ブラウザを開いて http://127.0.0.1:8000/docs にアクセスし、以下の画面が表示されることを確認してください。

TODO: キャプチャ貼る

注意事項:

もし、該当のポートを使用中であった場合は別のポートに振り返られている可能性があります。`FastAPI`を起動した際のログを確認してください。起動ポートは以下のように表示されます。

```sh
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

各 API を開いて、必要に応じて`Parameters`を入力して動作を確認してみてください。

手順

- 確認した API を開く
- `Try it out`ボタンを押す
- 確認したい内容に応じて`Parameters`を入力する
- `Execute`ボタンを押す
- `Code`が 200 であることを確認し、`Details`の中身が意図したデータであることを確認する

例：指定した店舗のメニューを取得 API(`/stores/{store_id}/menus`)の動作確認は以下になります。

- `Parameters`の`store_id`に`3`を代入する
  - 実行前の画面 TODO キャプチャ貼る
- `Execute`ボタンを押す
- `Code`が 200 であることを確認し、`Details`の中身が以下であること
  ```sh
  [
  {
    "id": 12,
    "storeId": 3,
    "name": "Margherita",
    "img": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
    "author": "@amir_v_ali",
    "price": "6 Euro",
    "description": "A pizza with tomato sauce, mozzarella cheese, and basil."
  },
  {
    "id": 13,
    "storeId": 3,
    "name": "Bolognese",
    "img": "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
    "author": "@dacakockica",
    "price": "7 Euro",
    "description": "A pasta dish with a meat sauce made with ground beef, pork, and veal."
  },
  {
    "id": 14,
    "storeId": 3,
    "name": "Carbonara",
    "img": "https://images.unsplash.com/photo-1612874742237-6526221588e3",
    "author": "@robwicks",
    "price": "9 Euro",
    "description": "A pasta dish with a cream sauce made with guanciale, eggs, and Parmesan cheese."
  }
  ]
  ```

TIPS:

- API 周りについて

  - API はプログラム間の通信インターフェースであり、一般的に`RestAPI`と`GraphQL`に大別されます。
    - `RestAPI`は HTTP プロトコルを通じてリソースを操作するための形式であり、`GraphQL`は柔軟なデータ取得と操作を行うためのクエリ言語とエンジンを提供する形式です。どちらも異なるアプリケーションやサービス間で情報の共有や通信を行う際に使用される一般的な手段です。
  - `OpenAPI`仕様は、`RestAPI`の設計、記述、ドキュメント化、テストを支援するための仕様です。
  - `Swagger UI`は `OpenAPI`仕様に基づいて API ドキュメントを視覚的に確認し、API をテストするためのツールです。

- FastAPI の起動について
  - 今回の`rye`を使用しているため、`rye run`をつけますが、`rye`を使用しない場合は以下です。
  ```sh
  uvicorn main:app --reload
  ```

### Backend の API からデータを取得するように Frontend を修正する

`Backend`の API からデータを取得するように`Frontend`を修正します。  
`dish-delight/frontend/lib/api.ts`を開き、その内容を以下のコードに置き換えます：

```ts
// dish-delight/frontend/lib/api.ts

// 店舗の型定義
type Store = {
  id: number;
  name: string;
  img: string;
  category: string;
};

// メニューの型定義
type Menu = {
  id: number;
  storeId: number;
  name: string;
  img: string;
  author: string;
  price: string;
  description: string;
  options?: MenuOption[];
};

// メニューのオプションの型定義
type MenuOption = {
  name: string;
  price: string;
};

const url = "http://127.0.0.1:8000";

export async function getStores(): Promise<Store[]> {
  const res = await fetch(`${url}/stores`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getStore(storeId: number): Promise<Store | undefined> {
  const res = await fetch(`${url}/stores/${storeId}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMenus(storeId: number): Promise<Menu[]> {
  const res = await fetch(`${url}/stores/${storeId}/menus`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMenu(
  storeId: number,
  menuId: number
): Promise<Menu | undefined> {
  const res = await fetch(`${url}/stores/${storeId}/menus/${menuId}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
```

動作・見た目を確認します。  
店舗やメニューを変えてひとしきり動作確認を行なってみてください。`Home`だけでなく`Navbar`のボタンも使用してみてください。

注意事項:

- `Backend`の接続先`URL`について
  - 本ハンズオンでは、ローカル環境でのみ動作させるため、簡易的に実装しています。実際の開発では、`env`ファイル等に定義するようにしてください。なお、`Backend`(`FastAPI`)も同様です(デプロイする場合には、`CORS`の設定を行う必要がある、など)。

## (Option)4. Frontend のリファクタリング

TBD：要不要を検討

### Frontend 店舗の切り替え機能を追加する
