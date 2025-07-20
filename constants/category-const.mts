export enum Category {
    NOTE = "notes",
    ARTICLE = "articles"
}

export const CATEGORYS: Record<Category, CategoryDetail> = {
    [Category.NOTE]: {
        name: "笔记",
        route: "/notes"
    },
    [Category.ARTICLE]: {
        name: "文章",
        route: "/articles"
    }
}