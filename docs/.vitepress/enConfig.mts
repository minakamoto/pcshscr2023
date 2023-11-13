import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Web App", link: "/en/webapp/README" },
      { text: "IoT", link: "/en/iot/README" },
      { text: "XR", link: "/en/xr/README" },
    ],

    sidebar: {
      "/en/webapp/": { base: "/en/webapp/", items: sidebarWebApp() },
      "/en/iot/": { base: "/en/iot/", items: sidebarIot() },
      "/en/xr/": { base: "/en/xr/", items: sidebarXr() },
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
            { text: "Introduction", link: "teachers/README" },
            {
              text: "Overview of web app technology stack",
              link: "teachers/0th",
            },
            {
              text: "Hands-on to develop simple & easy UI",
              link: "teachers/1st",
            },
            {
              text: "Hands-on to develop a slightly more complex UI & own API",
              link: "teachers/2nd",
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
