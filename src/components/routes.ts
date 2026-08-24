/** Url paths of the app sections. Kept in a separate module (i.e. no component imports)
 * so that article components can link to each other without circular dependencies
 */

import { ArticleCategory, defaultCategory, getCategoryKey } from './articles/article-category';
import { ArticleMetadata, getArticleLanguage } from './articles/article-data';
import { Language } from './articles/language';

export interface AppRoute {
    path: string;
}

const articleBasePath = '/article';

export const articleRoute: AppRoute = {
    path: `${articleBasePath}/:articleId`
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
 * take precedence over the legacy article routes, which have the very same shape
 */
export const getBlogCategoryPath = (category: ArticleCategory) =>
    `${blogRoute.path}/${getCategoryKey(category)}`;

/** Path of the article children routes, one per language (e.g. /article/:articleId/ca).
 * Declared as static paths (rather than as a single :language parameter) so that
 * unknown url segments end up in the error route
 */
export const getArticleLanguagePath = (language: Language) => `${articleRoute.path}/${language}`;

/** Paths of the blog children routes the articles used to live in, relative to the blog
 * route; they no longer render an article, but redirect to the article route (see
 * ArticleRedirect in sections/blog.tsx)
 */
export const legacyArticlePath = ':articleId';
export const legacyArticleLanguagePath = `${legacyArticlePath}/:language`;

/** Url an article used to be reachable at, either the plain one (e.g. /blog/react-ssr)
 * or the one stating the language in a url segment (e.g. /blog/existential-injustice/ca)
 */
export const getLegacyArticlePath = (metadata: ArticleMetadata, language?: Language) =>
    language ? `${blogRoute.path}/${metadata.id}/${language}` : `${blogRoute.path}/${metadata.id}`;

/** Url of an article in a given language (e.g. /article/existential-injustice/ca); every
 * translation has a url of its own, the language always being stated in the url.
 * Languages the article has no translation for fall back to the default one
 */
export const getArticlePath = (metadata: ArticleMetadata, language?: Language) =>
    `${articleBasePath}/${metadata.id}/${getArticleLanguage(metadata, language)}`;

/** Where the links to the blog section point at; the blog route itself only redirects */
export const defaultBlogPath = getBlogCategoryPath(defaultCategory);
