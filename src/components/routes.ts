/** Url paths of the app sections. Kept in a separate module (i.e. no component imports)
 * so that article components can link to each other without circular dependencies
 */

import { ArticleCategory, defaultCategory, getCategoryKey } from './articles/article-category';
import {
    ArticleMetadata,
    getArticleLanguage,
    getDefaultArticleLanguage
} from './articles/article-data';
import { Language } from './articles/language';

export interface AppRoute {
    path: string;
}

export const articleRoute: AppRoute = {
    path: '/blog/:articleId'
};

export const blogRoute: AppRoute = {
    path: '/blog'
};

export const errorRoute: AppRoute = {
    path: '/error'
};

export const portfolioRoute: AppRoute = {
    path: '/portfolio'
};

/** Path of the blog children routes, one per article category (e.g. /blog/offTopic).
 * Declared as static paths (rather than as a single :categoryKey parameter) so that they
 * take precedence over the article route, which has the very same shape
 */
export const getBlogCategoryPath = (category: ArticleCategory) =>
    `${blogRoute.path}/${getCategoryKey(category)}`;

/** Path of the article children routes, one per language (e.g. /blog/:articleId/ca).
 * Declared as static paths (rather than as a single :languageKey parameter) so that
 * unknown url segments end up in the error route
 */
export const getArticleLanguagePath = (language: Language) => `${articleRoute.path}/${language}`;

/** Url of an article in a given language. The language an article is displayed in by
 * default is implicit in the url (e.g. /blog/react-ssr), the remaining translations
 * being explicit (e.g. /blog/existential-injustice/ca)
 */
export const getArticlePath = (metadata: ArticleMetadata, language?: Language) => {
    const articleLanguage = language ? getArticleLanguage(metadata, language) : undefined;

    return articleLanguage && articleLanguage !== getDefaultArticleLanguage(metadata)
        ? `${blogRoute.path}/${metadata.id}/${articleLanguage}`
        : `${blogRoute.path}/${metadata.id}`;
};

/** Where the links to the blog section point at; the blog route itself only redirects */
export const defaultBlogPath = getBlogCategoryPath(defaultCategory);
