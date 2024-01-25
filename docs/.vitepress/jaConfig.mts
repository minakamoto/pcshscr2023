import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/ja/" },
      { text: "Web App", link: "/ja/webapp/README" },
      { text: "IoT", link: "/ja/iot/README" },
      { text: "XR", link: "/ja/xr/README" },
    ],

    sidebar: {
      "/ja/webapp/": { base: "/ja/webapp/", items: sidebarWebApp() },
      "/ja/iot/": { base: "/ja/iot/", items: sidebarIot() },
      "/ja/xr/": { base: "/ja/xr/", items: sidebarXr() },
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
            { text: "はじめに", link: "teachers/README" },
            {
              text: "0th Webアプリに関わる技術スタックの概要",
              link: "teachers/0th",
            },
            {
              text: "1st シンプルかつ簡単なUIを開発するハンズオン",
              link: "teachers/1st",
            },
            {
              text: "2nd ほんの少しだけ複雑なUI＆独自APIを開発するハンズオン",
              link: "teachers/2nd",
            },
            {
              text: "3rd Webアプリ開発技術を利用してモバイルアプリを開発するハンズオン",
              link: "teachers/3rd",
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
            { text: "1st Todo List App", link: "students/1st" },
            { text: "2nd Weather Forecast App", link: "students/2nd" },
            { text: "3rd Weather Forecast Mobile App", link: "students/3rd" },
          ],
        },
      ],
    },
  ];
}

function sidebarIot(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "For Students",
      collapsed: false,
      items: [
        {
          text: "さまざまなIoT事例の紹介",
          items: [{ text: "Introduction", link: "students/README" }],
        },
      ],
    },
  ];
}

function sidebarXr(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "For Students",
      collapsed: false,
      items: [
        {
          text: "さまざまなXR事例の紹介",
          items: [{ text: "Introduction", link: "students/README" }],
        },
      ],
    },
  ];
}
