import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/ja/" },
      { text: "Web App", link: "/ja/README" },
    ],

    sidebar: {
      "/ja": { base: "/ja/", items: sidebarWebApp() },
    },
  },
};

function sidebarWebApp(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "For Teachers",
      collapsed: false,
      items: [
        {
          text: "Hands-on for catch-up",
          items: [
            { text: "はじめに", link: "README" },
            { text: "Webアプリに関わる技術スタックの概要", link: "0th" },
            {
              text: "シンプルかつ簡単なUIを開発するハンズオン",
              link: "1st",
            },
            {
              text: "ほんの少しだけ複雑なUI＆独自APIを開発するハンズオン",
              link: "2nd",
            },
          ],
        },
      ],
    },
    {
      text: "For Students",
      collapsed: false,
      items: [
        {
          text: "30-min experience with the latest web app dev tech",
          items: [
            { text: "Introduction", link: "students/README" },
            { text: "Todo List App", link: "students/1st" },
          ],
        },
      ],
    },
  ];
}
