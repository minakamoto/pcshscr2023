import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const thConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Web App", link: "/th/README" },
    ],

    sidebar: [
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
};
