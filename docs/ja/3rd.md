# 1stと2ndで体験したWebアプリ開発技術を利用してモバイルアプリを開発してみるハンズオン

## 0. はじめに

このハンズオンでは、1stと2ndで使用したWebアプリ開発技術(主にJavaScript/TypeScript, React)を利用して、モバイルアプリを体験してみるハンズオンです。[1st](./1st.md)や[2nd](./2nd.md)と同様、開発体験を楽しみ、Webアプリ開発技術に興味を持ってもらうことを主眼にしています。

そのため、あまり詳しい解説は行っていません。また、簡易な実装にとどめています。必要に応じて、TIPSや参考となるWebサイトのリンクを提供しています。

### 作るもの

[2nd](./2nd.md)で作成したAPIを呼び出し、その情報をモバイルアプリに表示します。機能およびUIは[2nd](./2nd.md)で作成したWebアプリと同じです。

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

- Node.js 16 or above
- Code Editor (e.g., Visual Studio Code)
- [2nd](./2nd.md#3-データベースに接続してデータを返す)のバックエンドAPIをローカルに実装済みであること

**注意事項**：  
ここに記載されている必要なソフトウェアのインストール手順は、Windowsユーザーを対象としています。
これは、このハンズオンの最初のターゲットユーザーが、Windowsユーザーであるためです。実際にソフトウェアをインストールする際には、ご自身の環境に応じたインストール手順で行ってください。

### Windowsユーザー向けの詳細な手順

- Node.jsのインストール
  - [1st](./1st.md#1-setup)参照
- Visual Studio Code(VS Code)のインストール
  - [1st](./1st.md#1-setup)参照
- VS Codeの拡張機能のインストール・設定
  - [2st](./2nd.md#1-setup)参照
- Expo Goのインストール
  - TODO

## 2. モバイルアプリ作成

### Expoプロジェクトの作成

ターミナルでカレントディレクトリが[2nd](./2nd.md#1-setup)で各自作成した`dish-delight`ディレクトリに移動してください。`dish-delight`ディレクトリへ移動したことを確認し、以下のコマンドを実行します。

```sh
npx create-expo-app -t expo-template-blank-typescript mobile
```

### 必要なライブラリのインストール

以下のコマンドを実行してください。

```sh
cd mobile
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install react-native-paper
```

TODO: TIPS

- about React Navigation
- about React Native Paper

### 開発サーバーの起動

デフォルトのアプリのまま開発サーバを起動し、お手持ちのスマホでアプリが起動できることを確認します。

以下のコマンドを実行してください。

```sh
npm run start
```

Expo GoアプリをインストールしたiOSまたはAndroidに作業しているPCと同じワイヤレスネットワークに接続します。Androidの場合、Expo Goアプリを使用してPCのターミナルに表示されるQRコードをスキャンし、プロジェクトを開きます。iOSの場合、デフォルトのiOSカメラアプリの内蔵QRコードスキャナーを使用します。

Expoのデフォルト画面が表示されることを確認してください。

TODO: 画像のキャプチャ

### Splash Screen等の画像をカスタマイズ

アプリ起動時に表示されるSplash Screenやアプリのロゴ等をこのhands-on用に変更します。合わせて、各店舗のロゴも取得・配置しておきます([2nd](./2nd.md#2-フロントエンドのみのhomeとメニュー一覧と詳細画面の実装)と同様の画像ファイルです)。

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
    "name": "mobile",
    "slug": "mobile",
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
TODO：キャプチャ画像

TODO：TIPS

- Expo GOの起動しなおし or DevToolの起動の仕方
  - ターミナル上の`r`とスマホ版

### 固定文字を表示する3画面とそれらの画面遷移を実装する

このhands-onで構築する画面は[2nd](2nd.md)と同様、Homeとメニュー一覧とメニュー詳細画面の3つです。APIからデータを取得したり、それに合わせた画面を実装する前に、まずは、固定文字のみを表示させ、3画面の画面遷移を実装します。

`dish-delight/mobile/App.tsx`を開き、その内容を以下のコードに置き換えます：

TODO

```tsx

```

Expo Goを開いて、以下の画面が表示されることを確認してください。
TODO: キャプチャ画像
