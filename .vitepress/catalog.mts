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

let rawContentConfig: ContentConfig[] = [
  {
    text: "包管理器",
    type: ContentType.NOTE,
    isFirst: true,
    routeRewriteLink: "package-manager",
  },
  {
    text: "Maven",
    type: ContentType.NOTE,
    routeRewriteLink: "maven",
  },
  {
    text: "Docker",
    type: ContentType.NOTE,
    routeRewriteLink: "docker",
  },
  {
    text: "CMake查找外部依赖",
    type: ContentType.ARTICLE,
    isFirst: true,
    routeRewriteLink: "cmake-find-package",
  },
];

function handler(): DefaultTheme.SidebarMulti {
  let result = {
    [`/${ContentType.ARTICLE}/`]: [] as DefaultTheme.SidebarItem[],
    [`/${ContentType.NOTE}/`]: [] as DefaultTheme.SidebarItem[],
  };
  rawContentConfig.forEach((e) => {
    result[`/${e.type}/`].push({
      text: e.text,
      link: `/${e.type}/${e.routeRewriteLink ?? e.text}`,
    });
  });
  return result;
}

function firstPage(type: ContentType): string {
  let filteredRawConfig = rawContentConfig
    .filter((e) => e.type === type)
    .find((e) => e.isFirst);
  return `/${type}/${
    filteredRawConfig?.routeRewriteLink ?? filteredRawConfig?.text ?? ""
  }`;
}

function rewrites(): Record<string, string> {
  let result = {};
  rawContentConfig
    .filter((e) => e.routeRewriteLink !== undefined)
    .forEach((e) => {
      result[`${e.type}/${e.text}.md`] = `${e.type}/${e.routeRewriteLink}.md`;
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
  sidebar: handler(),
  rewrites: rewrites(),
};

export default catalog;
