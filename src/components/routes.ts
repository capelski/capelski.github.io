/** Url paths of the app sections. Kept in a separate module (i.e. no component imports)
 * so that article components can link to each other without circular dependencies
 */

import { ArticleCategory, defaultCategory, getCategoryKey } from './articles/article-category';

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

/** Where the links to the blog section point at; the blog route itself only redirects */
export const defaultBlogPath = getBlogCategoryPath(defaultCategory);
