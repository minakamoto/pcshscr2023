import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Web App", link: "/README" },
      { text: "IoT", link: "/iot/README" },
      { text: "XR", link: "/xr/README" },
    ],

    sidebar: {
      "/": { base: "/", items: sidebarWebApp() },
      "/iot/": { base: "/iot/", items: sidebarIot() },
      "/xr/": { base: "/xr/", items: sidebarXr() },
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
            { text: "Introduction", link: "README" },
            { text: "Overview of web app technology stack", link: "0th" },
            { text: "Hands-on to develop simple & easy UI", link: "1st" },
            {
              text: "Hands-on to develop a slightly more complex UI & own API",
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

function sidebarIot(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "For Students",
      collapsed: false,
      items: [
        {
          text: "Introduction of various IoT cases",
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
        // add content for students here
      ],
    },
  ];
}
