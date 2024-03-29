import React, { useState } from 'react';
import { Redirect, Route, RouteChildrenProps, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { articles } from './articles';
import { ArticleCategory } from './articles/article-category';
import { ArticleId } from './articles/article-id';
import { articleRoute, blogRoute, errorRoute, routes, supportedRoutes } from './routes';
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

const getInitialCategory = (location: { pathname: string }) => {
    const initialArticleId = getInitialArticleId(location);
    let initialCategory = ArticleCategory.tech;

    if (initialArticleId) {
        const article = articles.find((a) => a.metadata.id === initialArticleId);
        if (article) {
            initialCategory = article.metadata.category;
        }
    }

    return initialCategory;
};

export const App: React.FC<AppProps> = (props) => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>(
        getInitialCategory(location)
    );

    blogRoute.additionalProps = {
        selectedCategory,
        setSelectedCategory
    };

    articleRoute.additionalProps = {
        selectedCategory
    };

    return (
        <div className={`app-container${props.isServerRendered ? ' server-rendered' : ''}`}>
            {routes.map((route) => (
                <Route key={route.path} exact={true} path={route.path}>
                    {(childrenProps: RouteChildrenProps<any>) => (
                        <CSSTransition
                            in={childrenProps.match != null}
                            timeout={transitionsDuration}
                            classNames="page"
                            unmountOnExit={true}
                        >
                            <route.component
                                {...childrenProps}
                                {...(route.additionalProps ? route.additionalProps : {})}
                            />
                        </CSSTransition>
                    )}
                </Route>
            ))}

            {supportedRoutes.some((route) =>
                route.test(location.pathname)
            ) ? null : location.pathname === '/' ? (
                <Route path={'/'}>
                    <Redirect from={'/'} to={blogRoute.path} />
                </Route>
            ) : (
                <Route path={location.pathname}>
                    <Redirect from={location.pathname} to={errorRoute.path} />
                </Route>
            )}
        </div>
    );
};
