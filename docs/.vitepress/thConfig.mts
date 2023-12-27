import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const thConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/th/" },
      { text: "Web App", link: "/th/webapp/README" },
      { text: "IoT", link: "/th/iot/README" },
      { text: "XR", link: "/th/xr/README" },
    ],

    sidebar: {
      "/th/webapp/": { base: "/th/webapp/", items: sidebarWebApp() },
      "/th/iot/": { base: "/th/iot/", items: sidebarIot() },
      "/th/xr/": { base: "/th/xr/", items: sidebarXr() },
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
            { text: "บทนำ", link: "students/README" },
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
          text: "บทนำเกี่ยวกับกรณี IoT ต่างๆ",
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
          text: "บทนำเกี่ยวกับกรณี XR ต่างๆ",
          items: [{ text: "Introduction", link: "students/README" }],
        },
      ],
    },
  ];
}
