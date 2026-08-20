/** Url paths of the app sections. Kept in a separate module (i.e. no component imports)
 * so that article components can link to each other without circular dependencies
 */

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
