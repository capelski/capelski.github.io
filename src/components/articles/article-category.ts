export enum ArticleCategory {
    tech = '💻 Tech',
    offTopic = '🕹️ Off-topic'
}

export const AllArticleCategories: ArticleCategory[] = Object.values(ArticleCategory);

/** URL-friendly key (e.g. "tech") for a given category value */
export const getCategoryKey = (category: ArticleCategory): string =>
    Object.keys(ArticleCategory).find(
        (key) => ArticleCategory[key as keyof typeof ArticleCategory] === category
    )!;

/** Resolves a category from its URL-friendly key, or undefined when not recognized */
export const getCategoryFromKey = (key: string | null): ArticleCategory | undefined =>
    key && key in ArticleCategory
        ? ArticleCategory[key as keyof typeof ArticleCategory]
        : undefined;
