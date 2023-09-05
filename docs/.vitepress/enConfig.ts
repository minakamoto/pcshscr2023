import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Web App", link: "/README" },
    ],

    sidebar: [
      {
        text: "Hands-on for catch-up",
        items: [
          { text: "Introduction", link: "/README" },
          { text: "Overview of web app technology stack", link: "/0th" },
          { text: "Hands-on to develop simple & easy UI", link: "/1st" },
          {
            text: "Hands-on to develop a slightly more complex UI & own API",
            link: "/2nd",
          },
        ],
      },
    ],
  },
};
