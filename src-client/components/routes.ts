import { RouteChildrenProps } from 'react-router-dom';
import { ArticleLoader, ArticleLoaderAdditionalProps } from './article-loader';
import { Blog, BlogAdditionalProps } from './blog';
import { Error } from './error';
import { Home } from './home';
import { Portfolio } from './portfolio';

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

export const homeRoute: ComponentRoute = {
    path: '/',
    name: 'home',
    component: Home,
    pattern: /^\/$/
};

export const portfolioRoute: ComponentRoute = {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio,
    pattern: /^\/portfolio\/?$/
};

export const routes: ComponentRoute[] = [
    homeRoute,
    articleRoute,
    blogRoute,
    errorRoute,
    portfolioRoute
];

export const supportedRoutes = routes.map((route) => route.pattern);
