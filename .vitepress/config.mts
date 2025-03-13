import { defineConfig } from "vitepress";

export default defineConfig({
  title: "我的主页",
  srcDir: "src",
  cleanUrls: true,
  themeConfig: {
    outline: {
      level: [1, 3],
    },
    logo: "/favicon.ico",
    nav: [
      { text: "主页", link: "/" },
      { text: "文章", link: "" },
      { text: "笔记", link: "" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Ricardo-Z-Chao" },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/Ricardo-Z-Chao/introduction/blob/master/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2025-present <a href="https://github.com/Ricardo-Z-Chao">Ricardo.Z.Chao</a>',
    },
  },
});
