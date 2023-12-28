# 1stと2ndで体験したWebアプリ開発技術を利用してモバイルアプリを開発してみるハンズオン

## 0. はじめに

このハンズオンでは、1stと2ndで使用したWebアプリ開発技術(主にJavaScript/TypeScript, React)を利用して、モバイルアプリを体験してみるハンズオンです。[1st](1st.md)や[2nd](2nd.md)と同様、開発体験を楽しみ、Webアプリ開発技術に興味を持ってもらうことを主眼にしています。

そのため、あまり詳しい解説は行っていません。また、簡易な実装にとどめています。必要に応じて、TIPSや参考となるWebサイトのリンクを提供しています。

### 作るもの

[2nd](2nd.md)で作成したバックエンドAPIを呼び出し、その情報をモバイルアプリに表示します。機能およびUIは[2nd](2nd.md)で作成したWebアプリとほぼ同じです。

### 主な技術スタック

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[Typescript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)/[Expo](https://expo.dev/)

TIPS:

- React Nativeについて
  - TODO
  -
- Expoについて
  - TODO

## 1. Setup

### 前提条件

- Node.js 18+ or 20+
- Code Editor (e.g., Visual Studio Code)
- [2nd](2nd.md#3-データベースに接続してデータを返す)のバックエンドAPIをローカルに実装済みであること

**注意事項**：  
ここに記載されている必要なソフトウェアのインストール手順は、Windowsユーザーを対象としています。
これは、このハンズオンの最初のターゲットユーザーが、Windowsユーザーであるためです。実際にソフトウェアをインストールする際には、ご自身の環境に応じたインストール手順で行ってください。

### Windowsユーザー向けの詳細な手順

- Node.jsのインストール
  - [1st](./1st.md#1-setup)参照
- Visual Studio Code(VS Code)のインストール
  - [1st](./1st.md#1-setup)参照
- VS Codeの拡張機能のインストール・設定
  - [2st](2nd.md#1-setup)参照
- Expo Goのインストール
  - TODO

## 2. モバイルアプリ作成

### Expoプロジェクトの作成

ターミナルでカレントディレクトリが[2nd](2nd.md#1-setup)で各自作成した`dish-delight`ディレクトリに移動してください。`dish-delight`ディレクトリへ移動したことを確認し、以下のコマンドを実行します。

```sh
npx create-expo-app mobile  -t blank-typescript@49 
```

**注意事項**：  
このハンズオンではExpo SDK49を使用します。Expo SDKは年に3回更新されます。次のバージョンのSDK50はbreaking changeや新機能もたくさんあるため、実際に開発する場合には最新の公式サイトを参照してください。

### 必要なライブラリのインストール

必要なライブラリのインストールをします。  
以下のコマンドを実行してください。

```sh
cd mobile
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
npm install react-native-paper
```

TODO: TIPS

- about React Navigation
  - TODO Expo Routerにする
- about React Native Paper

注意事項:  
今回は必要なライブラリをマニュアルでインストールする方法を採用しています。  
Quick Startという方法もあります。必要なライブラリのインストールや次の手順の設定も自動で行われます。ただし、使用しないライブラリがインストールされたり、不要なファイルが作成されたりします。  
今回は開発する機能に対して、マニュアルインストールの方が手間や影響が少ないと判断したため、マニュアルインストールを採用しています。インストール方法について、詳しく知りたい場合は[公式サイト](https://docs.expo.dev/router/installation/)をご確認ください。

### 設定の修正

Expo Routerを導入したことに必要な設定の修正を行います。

注意事項:  
このハンズオンで必要な箇所のみ修正しています。実際の開発の場合、必要な設定を[公式サイト](https://docs.expo.dev/router/installation/)で確認してください。

#### エントリーポイントの修正

エントリーポイントの修正をします。`dish-delight/mobile/package.json`を開き、4行目の`"main"`の値を以下に修正します。

```json
  "main": "expo-router/entry",
```

`dish-delight/mobile/package.json`全体では以下のようになります。

注意事項:  
インストールのタイミングによって、ライブラリのマイナーバージョン(例: `"expo"`の`49.XX.XX`の部分)が異なるため、まったく同一の値にはなりません。

```json
{
  "name": "mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.18",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.6"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  },
  "private": true
}
```

#### プロジェクト設定の修正

`dish-delight/mobile/app.json`を開き、その内容を以下のコードに置き換えます。  
(`scheme`の定義を追加しているだけです。)

```json
{
  "expo": {
    "name": "mobile",
    "slug": "mobile",
    "scheme": "dish-delight",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": ["expo-router"]
  }
}
```

#### babel.config.jsの修正

`dish-delight/mobile/babel.config.js`を開き、その内容を以下のコードに置き換えます。

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel'],
  };
};
```

TIPS:

- babel.config.jsとは？ TODO

### 開発サーバーの起動

デフォルトのアプリのまま開発サーバを起動し、お手持ちのスマホでアプリが起動できることを確認します。

以下のコマンドを実行してください。

```sh
npm run start -c
```

Expo GoアプリをインストールしたiOSまたはAndroidを作業しているPCと同じワイヤレスネットワークに接続します。Androidの場合、Expo Goアプリを使用してPCのターミナルに表示されるQRコードをスキャンし、プロジェクトを開きます。iOSの場合、デフォルトのiOSカメラアプリの内蔵QRコードスキャナーを使用します。

下記のExpo Routerのデフォルト画面が表示されることを確認してください。表示されたら、下部にある`touch app/index.js`ボタンを押してください。

<img src="../../../static/img/3rd/docs/expo_router_default_screen.png" alt="Expo default screen" width="300">

`touch app/index.js`ボタンを押すと、以下になることを確認してください。

- 下記の画面に変わること
- VSCodeに戻ると、`dish-delight/mobile/app/index.tsx`が作成されていること

<img src="../../../static/img/3rd/docs/expo_router_first_screen.png" alt="Expo default screen" width="300">

### Splash Screen等の画像をカスタマイズ

アプリ起動時に表示されるSplash Screenやアプリのロゴ等をこのhands-on用に変更します。合わせて、各店舗のロゴも取得・配置しておきます([2nd](2nd.md#2-フロントエンドのみのhomeとメニュー一覧と詳細画面の実装)と同様の画像ファイルです)。

対象の画像は[Github Repository](https://github.com/minakamoto/pschs2023/tree/main/docs/static/img/3rd/assets)からすべて取得してください。以下の7つのファイルです。  

- adaptive-icon.png
- aroy_logo.jpeg
- buono_logo.jpeg
- icon.png
- logo_jojo.png
- sakura_tei_logo.jpeg
- splash.png

`dish-delight/mobile/assets`に配置(上書き)してください。  

`dish-delight/mobile/app.json`を開き、その内容を以下のコードに置き換えます：

```json
{
  "expo": {
    "name": "Jojo University Cafeteria",
    "slug": "jojoUnivCafe",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

お手持ちのスマホで起動時のSplash Screenが変更されることを確認してください。

<img src="../../../static/img/3rd/docs/updated_splash_screen.png" alt="Updated Splash Screen" width="300">

TODO：TIPS

- Expo GOの起動しなおし or DevToolの起動の仕方
  - ターミナル上の`r`とスマホ版

### 固定文字を表示する3画面とそれらの画面遷移を実装する

このhands-onで構築する画面は[2nd](2nd.md)と同様、Homeとメニュー一覧とメニュー詳細画面の3つです。APIからデータを取得したり、それに合わせた画面を実装する前に、まずは、固定文字のみを表示させ、3画面の画面遷移を実装します。

`dish-delight/mobile/App.tsx`を開き、その内容を以下のコードに置き換えます：

TODO
タイトル＆Textを固定文字にして、遷移させるくらいで良さそう

```tsx

```

Expo Goを開いて、以下の画面が表示されることを確認してください。
TODO: キャプチャ画像

### Home画面のヘッダーを変更する

TODO Jojo仕様にする

### 固定のデータでmobile側のAPI呼び出しを実装する

[2nd](2nd.md)では、まず各画面コンポーネントで固定のデータや型を持ち、リファクタリング後にAPI呼び出しコンポーネントを作成しました。しかし、今回は説明の簡略化のため、先に固定データでのAPI呼び出しコンポーネントを作成します。

### TODO データが存在しない場合のコンポーネントを実装する

API呼び出しと同様、[2nd](2nd.md)ではリファクタリング後に行っていましたが、コンポーネント化を先に実施します。  
リファクタリングまでの流れがわからない場合は、[2nd](2nd.md)で復習してみてください。

### Home画面を固定のデータで表示する

[2nd](2nd.md)と同じく、APIからデータを取得する前にfrontend上で保持する固定データを表示するようにします。

### メニューリスト画面を固定のデータで表示する

[2nd](2nd.md)と同じく、APIからデータを取得する前にfrontend上で保持する固定データを表示するようにします。

### メニュー詳細画面を固定のデータで表示する

[2nd](2nd.md)と同じく、APIからデータを取得する前にfrontend上で保持する固定データを表示するようにします。

### mobile側のAPI呼び出しを修正する

固定データを返していた実装をbackendを呼び出すように変更します。

### 各Screenの実装をバックエンドAPIから取得したデータに変更する

TODO: 要らないはず

### 作業しているPCのIPアドレスを確認し、バックエンドAPIを起動する

```sh
rye run uvicorn main:app --reload --host xxx.xxx.xxx.xxx
```

`xxx.xxx.xxx.xxx`はあなたのPCのIPアドレス

TODO
調べ方: Windows版＆Mac版→Expo起動時に自分のアドレスが出ているはずだから、それでもOK

## 終わりに
