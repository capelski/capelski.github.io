import { RouteChildrenProps } from 'react-router-dom';
import { ArticleLoader, ArticleLoaderAdditionalProps } from './sections/article-loader';
import { Blog, BlogAdditionalProps } from './sections/blog';
import { Error } from './sections/error';
import { Portfolio } from './sections/portfolio';

export interface ComponentRoute<TAdditional = {}> {
    additionalProps?: TAdditional;
    component: React.FC<RouteChildrenProps & TAdditional>;
    name: string;
    path: string;
    pattern: RegExp;
}

export const articleRoute: ComponentRoute<ArticleLoaderAdditionalProps> = {
    path: '/blog/:articleId',
    name: 'article',
    component: ArticleLoader,
    pattern: /^\/blog\/[^\/]+\/?$/
};

export const blogRoute: ComponentRoute<BlogAdditionalProps> = {
    path: '/blog',
    name: 'blog',
    component: Blog,
    pattern: /^\/blog\/?$/
};

export const errorRoute: ComponentRoute = {
    path: '/error',
    name: 'error',
    component: Error,
    pattern: /^\/error$/
};

export const portfolioRoute: ComponentRoute = {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio,
    pattern: /^\/portfolio\/?$/
};

export const routes: ComponentRoute[] = [articleRoute, blogRoute, errorRoute, portfolioRoute];

export const supportedRoutes = routes.map((route) => route.pattern);
