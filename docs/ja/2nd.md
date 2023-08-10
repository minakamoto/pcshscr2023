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
rye add fastapi uvicorn
# 必要な開発用のツールの追加
rye add --dev black flake8
# 同期化し、インストール
rye sync
```

## 2. １店舗のみを想定したメニューの一覧と詳細表示の実装

TODO: Figma で作成したイメージを参考に紹介する

### メニュー一覧ページとメニュー詳細ページを作成

Next.js と Tailwind CSS を使用して、メニュー一覧ページとメニュー詳細ページを作成します。  
frontend のみの実装で backend にはまだ接続しません。

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

今回、Next.js が提供する[Image コンポーネント](https://nextjs.org/docs/pages/building-your-application/optimizing/images)を使用します。Next.js の`Imageコンポーネント`は、HTML の <img> 要素の拡張で、現代の Web のニーズに適応したものです。良い Core Web Vitals を達成するため、様々な組み込みのパフォーマンス最適化が含まれています。

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
        <h1 className="text-3xl font-bold">Welcome to University Cafeteria!</h1>
        {/* Do not display this image for mobile */}
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={350}
          height={350}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={100}
                  height={100}
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
// app/page.tsx
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
        <h1 className="text-3xl font-bold">Welcome to University Cafeteria!</h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={350}
          height={350}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={100}
                  height={100}
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

`dish-delight/frontend/public`にロゴ 2 つ(logo_jojo_univ.svg, sakura_tei_logo.jpeg)を配置します：

TODO ロゴの配置場所 or 配布場所
対象の画像は[Github Repository](https://github.com/minakamoto/pschs2023/tree/main/docs/static/img/2nd)から取得してください。

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
        <h1 className="text-3xl font-bold">Welcome to University Cafeteria!</h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={350}
          height={350}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={100}
                  height={100}
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

`dish-delight/frontend/app/stores/[id]/page.tsx`ファイルを作成し、その内容を以下のコードに置き換えます：

```tsx
// dish-delight/frontend/app/stores/[id]/page.tsx
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { stores } from "@/app/page";
import Image from "next/image";

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
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <Image
                className="w-full"
                src={menu.img}
                alt={menu.name}
                width={200}
                height={200}
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
import Image from "next/image";
import jojoUnivLogo from "../public/logo_jojo_univ.svg";
import Link from "next/link";

export default function Navbar({
  storeName,
  storeId,
}: {
  storeName?: string;
  storeId?: number;
}) {
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
                Sakura-tei
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

動作・見た目を確認します。(上記に添付した Figma でも見た目は確認できます)

- Home 画面にて`Sakura-tei`の Card をクリックすると、メニュー一覧画面に遷移すること
- 見た目は以下となっていること
  - TODO キャプチャ添付
- Navbar の"HOME"を押すと HOME 画面に、"MENUS"を押すとメニュー一覧画面のままであること
- メニュー一覧画面のいずれかのメニューの Card をクリックすると、メニュー詳細画面に遷移すること
  - 画面はまだ作っていないので、"404 This page could not be found"と表示されます

####　リファクタリング
TODO
現状 Frontend で固定でデータを持っていますが、後ほどの手順で Bakcend の API 呼び出しによるデータ取得に変更するため、メニュー詳細画面に入る前に、まずはそのための準備のリファクタリングをします。

リファクタリングの流れ(細かなステップ)としては以下のとおりです。  
ただし、この流れは手順を示すだけにしておきます。これまで通り、修正後のコードを各ファイルに上書きする方法で記載します。  
もし、余力がある方はこの流れに沿ってご自身でリファクタリングを実施し、修正後のコードと比べてみてください。

1. `dish-delight/frontend/app/page.tsx`から店舗の固定データを`dish-delight/frontend/lib/api.tsx`に移動します。
1. `dish-delight/frontend/lib/api.tsx`に`getStores`メソッドを作って、店舗データをすべて返すようにする (async/await を忘れるな)
1. `dish-delight/frontend/app/page.tsx`で店舗の固定データを呼び出していたところを`dish-delight/frontend/lib/api.tsx`の`getStores`メソッドを呼ぶようにする (async/await を忘れるな)
1. `dish-delight/frontend/app/stores/[storeId]/page.tsx`からメニューの固定データを`dish-delight/frontend/lib/api.tsx`に移動する
1. `dish-delight/frontend/lib/api.tsx`に`getStore`メソッドを作って指定された店舗だけを返すようにする (async/await を忘れるな)
1. `dish-delight/frontend/app/stores/[storeId]/page.tsx`で`dish-delight/frontend/app/page.tsx`の`stores`を呼び出していたところを`dish-delight/frontend/lib/api.tsx`の`getStore`メソッドを呼ぶようにする (async/await を忘れるな)
1. `dish-delight/frontend/lib/api.tsx`に`getMenus`メソッドを作って指定された店舗のメニューをすべて返すようにする (async/await を忘れるな).
   - 動作確認用に別店舗のデータを固定データに加えています
   - レスポンスの型を指定したいので、メニューの型定義も行っています
1. `dish-delight/frontend/app/stores/[storeId]/page.tsx`で`dish-delight/frontend/app/page.tsx`の`menus`は`dish-delight/frontend/lib/api.tsx`の一旦`getMenus`メソッドを呼び、取得するようにする (async/await を忘れるな)

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
        <h1 className="text-3xl font-bold">Welcome to University Cafeteria!</h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={350}
          height={350}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={100}
                  height={100}
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
  // TODO storeが存在しないときの処理
  if (!store) {
    return (
      <p>
        該当する店舗が存在しません。お手数ですが、HOMEから再度店舗を選択してください。
      </p>
    );
  }

  // TODO menuが一件もないときの処理
  if (menus.length === 0) {
    return (
      <p>
        該当する店舗のメニューが存在しません。お手数ですが、HOMEから再度店舗を選択してください。
      </p>
    );
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {menus.map((menu) => (
          <Link href={`/stores/${storeId}/menus/${menu.id}`} key={menu.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <Image
                className="w-full"
                src={menu.img}
                alt={menu.name}
                width={200}
                height={200}
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

#### メニュー詳細画面を実装する

メニュー一覧画面にてメニューを選択後に表示されるメニュー詳細画面を実装します。

TODO 見直し
メニュー詳細画面を実装すると、ディレクトリ構成は以下となります。

```
dish-delight/
├── lib/
│   ├── api.js                 // backend APIを呼び出す処理を集める
├── app/
│   ├── _app.js
│   ├── index.js
│   └── stores/
│       ├── [storeId]/
│       │   └── page.js
│       └── menus/
│           └── [menuId]/
│               └── page.js
├── components/
│   └── Navbar.js
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
// app/stores/menus/[id]/page.tsx
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

  // TODO storeが存在しないときの処理
  if (!store) {
    return (
      <p>
        該当する店舗が存在しません。お手数ですが、HOMEから再度店舗を選択してください。
      </p>
    );
  }

  // TODO menuが存在しないときの処理
  if (!menu) {
    return (
      <p>
        該当するメニューが存在しません。お手数ですが、HOMEから再度店舗を選択してください。
      </p>
    );
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg m-4">
        <Image
          className="w-full"
          src={menu.img}
          alt={menu.name}
          width={200}
          height={200}
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
TODO

####

####

####

####

## 3. データベースに接続してデータを返す

### データベースを Setup する

### FastAPI からデータベースに接続し、メニュー一覧とメニュー詳細のデータを取得して返す

## (Option)4. 複数店舗に対応したメニューの一覧と詳細表示の実装

### Frontend 店舗の切り替え機能を追加する

### Backend 店舗ごとのメニュー一覧とメニュー詳細の API を作成する
