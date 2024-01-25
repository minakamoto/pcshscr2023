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
      text: "For Teachers",
      collapsed: false,
      items: [
        {
          text: "Hands-on for catch-up",
          items: [
            { text: "บทนำ", link: "README" },
            {
              text: "(0th) ภาพรวมเกี่ยวกับเทคโนโลยีสำหรับพัฒนาเว็บแอปพลิเคชัน",
              link: "teachers/0th",
            },
            {
              text: "(1st) ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ง่ายและสะดวก",
              link: "teachers/1st",
            },
            {
              text: "(2nd) ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ซับซ้อนขึ้นเล็กน้อยและ API ของตัวเอง",
              link: "teachers/2nd",
            },
            {
              text: "(3rd) ภาคปฏิบัติ(hands-on) เพื่อพัฒนาแอพมือถือด้วยสแต็คเทคโนโลยีเว็บแอพ",
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
            { text: "บทนำ", link: "students/README" },
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
