import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const thConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/th/" },
      { text: "Web App", link: "/th/README" },
      { text: "IoT", link: "/th/iot/README" },
      { text: "XR", link: "/th/xr/README" },
    ],

    sidebar: {
      "/th": { base: "/th/", items: sidebarWebApp() },
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
              text: "ภาพรวมเกี่ยวกับเทคโนโลยีสำหรับพัฒนาเว็บแอปพลิเคชัน",
              link: "0th",
            },
            {
              text: "ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ง่ายและสะดวก",
              link: "1st",
            },
            {
              text: "ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ซับซ้อนขึ้นเล็กน้อยและ API ของตัวเอง",
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
            { text: "บทนำ", link: "students/README" },
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
        // add content for students here
      ],
    },
  ];
}
