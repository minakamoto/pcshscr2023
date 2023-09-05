import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/ja" },
      { text: "Web App", link: "/ja/README" },
    ],

    sidebar: [
      {
        text: "Hands-on for catch-up",
        items: [
          { text: "はじめに", link: "/ja/README" },
          { text: "Webアプリに関わる技術スタックの概要", link: "/ja/0th" },
          { text: "シンプルかつ簡単なUIを開発するハンズオン", link: "/ja/1st" },
          {
            text: "ほんの少しだけ複雑なUI＆独自APIを開発するハンズオン",
            link: "/ja/2nd",
          },
        ],
      },
    ],
  },
};
