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

TIPS:

- Next.js を選択した理由
  - TODO

---

## 1. Setup

### 前提条件

- Node.js 16 or above
- Code Editor (e.g., Visual Studio Code)
