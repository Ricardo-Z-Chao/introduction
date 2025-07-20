import { defineConfig } from "vitepress";
import mermaidPlugin from "../plugins/markdown-it-mermaid";
import markdownItMathjax3 from 'markdown-it-mathjax3';
import * as config from "../config.mts";
import { GITHUB_PAGES } from "../constants/info-const.mjs";

export default defineConfig({
  title: "我的主页",
  srcDir: "src",
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(mermaidPlugin).use(markdownItMathjax3)
    },
  },
  themeConfig: {
    nav: config.navConfig(),
    sidebar: config.sidebarConfig(),
    search: {
      provider: "local",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    outline: {
      level: [1, 3],
    },
    logo: "/favicon.ico",
    socialLinks: [{ icon: "github", link: GITHUB_PAGES[0] }],
    footer: {
      message: `Released under the <a href="${GITHUB_PAGES[0]}/introduction/blob/master/LICENSE">MIT License</a>.`,
      copyright: `Copyright © 2025-present <a href="${GITHUB_PAGES[0]}">Ricardo.Z.Chao</a>`,
    },
  }
});
