import { defineConfigWithTheme } from "vitepress";
import { enConfig } from "./enConfig.mts";
import { thConfig } from "./thConfig.mts";
import { jaConfig } from "./jaConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  ignoreDeadLinks: "localhostLinks",
  locales: {
    root: { label: "English", lang: "en-US", link: "/", ...enConfig },
    th: { label: "ไทย", lang: "th", link: "/th/", ...thConfig },
    ja: { label: "日本語", lang: "ja", link: "/ja/", ...jaConfig },
  },
  title: "PCSHSCR2023",
  description:
    "Documents, resources and codes to be used in ICT subjects at Princess Chulabhorn Science High School Chiang Rai for the academic year 2023.",
  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/minakamoto/pcshscr2023/" },
    ],

    footer: {
      copyright: "Copyright (c) 2023 minakamoto",
      message: "Released under the MIT License.",
    },
  },
});
