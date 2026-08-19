import React, { useRef, useState } from 'react';
import { Navigate, useLocation, useMatch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { articles } from './articles';
import { ArticleCategory, defaultCategory, getCategoryFromKey } from './articles/article-category';
import { ArticleId } from './articles/article-id';
import { defaultLanguage, getLanguageFromKey, Language } from './articles/language';
import {
    articleRoute,
    blogRoute,
    ComponentRoute,
    errorRoute,
    routes,
    supportedRoutes
} from './routes';
import { transitionsDuration } from './variables';

interface AppProps {
    isServerRendered: boolean;
}

const getInitialArticleId = (location: { pathname: string }) => {
    const articlePathname = articleRoute.path.split('/')[1];
    const urlParts = location.pathname.split('/');
    const isArticleUrl = urlParts.length > 2 && urlParts[1] === articlePathname;

    return isArticleUrl ? (urlParts[2] as ArticleId) : undefined;
};

const getInitialCategory = (location: { pathname: string; search: string }) => {
    const categoryFromQuery = getCategoryFromKey(
        new URLSearchParams(location.search).get('category')
    );
    if (categoryFromQuery) {
        return categoryFromQuery;
    }

    const initialArticleId = getInitialArticleId(location);
    let initialCategory = defaultCategory;

    if (initialArticleId) {
        const article = articles.find((a) => a.metadata.id === initialArticleId);
        if (article) {
            initialCategory = article.metadata.category;
        }
    }

    return initialCategory;
};

const getInitialLanguage = (location: { search: string }) =>
    getLanguageFromKey(new URLSearchParams(location.search).get('language')) || defaultLanguage;

interface RouteTransitionProps {
    route: ComponentRoute<any>;
}

/** Renders a route section regardless of the current url, so that the css enter/exit
 * transitions can be applied when the route starts/stops matching
 */
const RouteTransition: React.FC<RouteTransitionProps> = (props) => {
    const match = useMatch(props.route.path);
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <CSSTransition
            classNames="page"
            in={match != null}
            nodeRef={nodeRef}
            timeout={transitionsDuration}
            unmountOnExit={true}
        >
            <props.route.component
                containerRef={nodeRef}
                match={match}
                {...(props.route.additionalProps ? props.route.additionalProps : {})}
            />
        </CSSTransition>
    );
};

export const App: React.FC<AppProps> = (props) => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>(
        getInitialCategory(location)
    );
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(() =>
        getInitialLanguage(location)
    );

    blogRoute.additionalProps = {
        selectedCategory,
        selectedLanguage,
        setSelectedCategory
    };

    articleRoute.additionalProps = {
        selectedCategory,
        selectedLanguage,
        setSelectedLanguage
    };

    return (
        <div className={`app-container${props.isServerRendered ? ' server-rendered' : ''}`}>
            {routes.map((route) => (
                <RouteTransition key={route.path} route={route} />
            ))}

            {supportedRoutes.some((route) => route.test(location.pathname)) ? null : (
                <Navigate
                    replace={true}
                    to={location.pathname === '/' ? blogRoute.path : errorRoute.path}
                />
            )}
        </div>
    );
};
