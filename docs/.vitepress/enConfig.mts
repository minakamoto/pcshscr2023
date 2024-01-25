import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Web App", link: "/webapp/README" },
      { text: "IoT", link: "/iot/README" },
      { text: "XR", link: "/xr/README" },
    ],

    sidebar: {
      "/webapp/": { base: "/webapp/", items: sidebarWebApp() },
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
            { text: "Introduction", link: "teachers/README" },
            {
              text: "(0th) Overview of web app technology stack",
              link: "teachers/0th",
            },
            {
              text: "(1st) Hands-on to develop simple & easy UI",
              link: "teachers/1st",
            },
            {
              text: "(2nd) Hands-on to develop a slightly more complex UI & own API",
              link: "teachers/2nd",
            },
            {
              text: "(3rd) Hands-on mobile app development with web app technology stack",
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
            { text: "(1st) Todo List App", link: "students/1st" },
            { text: "(2nd) Weather Forecast App", link: "students/2nd" },
            { text: "(3rd) Weather Forecast Mobile App", link: "students/3rd" },
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
        {
          text: "Introduction of various XR cases",
          items: [{ text: "Introduction", link: "students/README" }],
        },
      ],
    },
  ];
}
