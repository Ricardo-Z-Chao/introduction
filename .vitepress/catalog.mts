import { DefaultTheme } from "vitepress";

enum ContentType {
  NOTE = "notes",
  ARTICLE = "articles",
}

interface ContentConfig {
  text: string;
  type: ContentType;
  isFirst?: boolean;
  routeRewriteLink?: string;
}

interface CatalogConfig {
  nav: DefaultTheme.NavItem[];
  sidebar: DefaultTheme.Sidebar;
  rewrites: Record<string, string>;
}

let raw: ContentConfig[] = [];

function handler(raw: ContentConfig[]): DefaultTheme.SidebarMulti {
  let result = {
    [`/${ContentType.ARTICLE}/`]: [] as DefaultTheme.SidebarItem[],
    [`/${ContentType.NOTE}/`]: [] as DefaultTheme.SidebarItem[],
  };
  raw.forEach((e) => {
    result[`/${e.type}/`].push({
      text: e.text,
      link: `/${e.type}/${e.routeRewriteLink ?? e.text}`,
    });
  });
  return result;
}

function firstPage(type: ContentType): string {
  let rawConfig = raw.filter((e) => e.type === type).find((e) => e.isFirst);
  return `/${type}/${rawConfig?.routeRewriteLink ?? rawConfig?.text ?? ""}`;
}

function rewrites(raw: ContentConfig[]): Record<string, string> {
  let result = {};
  raw
    .filter((e) => e.routeRewriteLink !== undefined)
    .forEach((e) => {
      result[`:pkg/(.*)`] = `:pkg/${e.routeRewriteLink}.md`;
    });
  return result;
}

const catalog: CatalogConfig = {
  nav: [
    { text: "主页", link: "/" },
    {
      text: "文章",
      link: firstPage(ContentType.ARTICLE),
    },
    {
      text: "笔记",
      link: firstPage(ContentType.NOTE),
    },
  ],
  sidebar: handler(raw),
  rewrites: rewrites(raw),
};

export default catalog;
