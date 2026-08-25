export enum ArticleCategory {
    tech = 'tech',
    offTopic = 'off-topic'
}

export const AllArticleCategories: ArticleCategory[] = Object.values(ArticleCategory);

export const defaultCategory = ArticleCategory.tech;
