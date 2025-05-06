import { defineConfig } from "vitepress";
import catalog from "./catalog.mts";
import mermaidPlugin from "../plugins/markdown-it-mermaid.mts";
import markdownItMathjax3 from 'markdown-it-mathjax3';

const GITHUB = "https://github.com/Ricardo-Z-Chao";

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
    nav: catalog.nav,
    sidebar: catalog.sidebar,
    socialLinks: [{ icon: "github", link: GITHUB }],
    footer: {
      message: `Released under the <a href="${GITHUB}/introduction/blob/master/LICENSE">MIT License</a>.`,
      copyright: `Copyright © 2025-present <a href="${GITHUB}">Ricardo.Z.Chao</a>`,
    },
  },
  rewrites: catalog.rewrites,
});
