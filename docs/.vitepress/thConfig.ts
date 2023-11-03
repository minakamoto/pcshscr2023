import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const thConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/th/" },
      { text: "Web App", link: "/th/README" },
    ],

    sidebar: [
      {
        text: "For Teachers",
        items: [
          {
            text: "Hands-on for catch-up",
            items: [
              { text: "บทนำ", link: "/th/README" },
              {
                text: "ภาพรวมเกี่ยวกับเทคโนโลยีสำหรับพัฒนาเว็บแอปพลิเคชัน",
                link: "/th/0th",
              },
              {
                text: "ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ง่ายและสะดวก",
                link: "/th/1st",
              },
              {
                text: "ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ซับซ้อนขึ้นเล็กน้อยและ API ของตัวเอง",
                link: "/th/2nd",
              },
            ],
          },
        ],
      },
      {
        text: "For Students",
        items: [
          {
            text: "30-min experience with the latest web app dev tech",
            items: [
              { text: "บทนำ", link: "/th/students/README" },
              { text: "Todo List App", link: "/th/students/1st" },
            ],
          },
        ],
      },
    ],
  },
};
