import { PathMatch } from 'react-router-dom';
import { ArticleLoader, ArticleLoaderAdditionalProps } from './sections/article-loader';
import { Blog, BlogAdditionalProps } from './sections/blog';
import { Error } from './sections/error';
import { Portfolio } from './sections/portfolio';

/** Props injected into the route components by the App component. Replaces the
 * RouteChildrenProps type removed in react-router-dom v6; location and navigation
 * are accessed through the useLocation/useNavigate hooks instead
 */
export interface RouteComponentProps {
    /** Ref to the section root element, needed by react-transition-group nodeRef */
    containerRef?: React.RefObject<HTMLDivElement | null>;
    match: PathMatch | null;
}

export interface ComponentRoute<TAdditional = {}> {
    additionalProps?: TAdditional;
    component: React.FC<RouteComponentProps & TAdditional>;
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

export const routes: ComponentRoute<any>[] = [articleRoute, blogRoute, errorRoute, portfolioRoute];

export const supportedRoutes = routes.map((route) => route.pattern);
