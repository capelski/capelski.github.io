import { ArticleCategory } from './articles/article-category';
import { ArticleId } from './articles/article-id';
import { Language } from './articles/language';

export const articleRoute = `/article/:articleId/:language`;
export const articleLegacyRoute = '/blog/:articleId';

export const blogRoute = '/blog/:category/:language';
export const blogLegacyRoute = '/blog';

export const portfolioRoute = '/portfolio';

export const getArticlePath = (articleId: ArticleId, language: Language) =>
    articleRoute.replace(':articleId', articleId).replace(':language', language);

export const getBlogPath = (category: ArticleCategory, language: Language) =>
    `${blogRoute.replace(':category', category).replace(':language', language)}`;
