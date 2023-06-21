import { DefaultTheme, LocaleSpecificConfig, defineConfigWithTheme } from 'vitepress'


const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Web App', link: '/README' }
    ],

    sidebar: [
      {
        text: 'Hands-on for catch-up',
        items: [
          { text: 'Introduction', link: '/README' },
          { text: 'Overview of web app technology stack', link: '/0th' },
          { text: 'Hands-on to develop simple & easy UI', link: '/1st' },
        ]
      }
    ],
  }
}

const thConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Web App', link: '/th/README' }
    ],

    sidebar: [
      {
        text: 'Hands-on for catch-up',
        items: [
          { text: 'บทนำ', link: '/th/README' },
          { text: 'ภาพรวมเกี่ยวกับเทคโนโลยีสำหรับพัฒนาเว็บแอปพลิเคชัน', link: '/th/0th' },
          { text: 'ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ง่ายและสะดวก', link: '/th/1st' },
        ]
      }
    ],
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  ignoreDeadLinks: 'localhostLinks',
  locales: {
    root: { label: 'English', lang: 'en-US', link: '/', ...enConfig },
    th: { label: 'ไทย', lang: 'th', link: '/th/', ...thConfig },
  },
  title: "PCSHSCR2023",
  description: "Documents, resources and codes to be used in ICT subjects at Princess Chulabhorn Science High School Chiang Rai for the academic year 2023.",
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/minakamoto/pschs2023/' }
    ],

    footer: {
      copyright: 'Copyright (c) 2023 minakamoto',
      message: 'Released under the MIT License.',
    },
  }
})
