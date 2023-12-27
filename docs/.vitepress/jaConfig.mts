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
      text: "For Students",
      collapsed: false,
      items: [
        {
          text: "30-min experience with the latest web app dev tech",
          items: [
            { text: "Introduction", link: "students/README" },
            { text: "Todo List App", link: "students/1st" },
            { text: "Weather Forecast App", link: "students/2nd" },
            { text: "Weather Forecast Mobile App", link: "students/3rd" },
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
