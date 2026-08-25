import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { App } from './components/app';
import {
    articleLegacyRoute,
    articleRoute,
    blogLegacyRoute,
    blogRoute,
    portfolioRoute
} from './components/routes';
import { ArticleLoader } from './components/sections/article-loader';
import { Blog } from './components/sections/blog';
import { Error } from './components/sections/error';
import { LegacyArticleRedirect } from './components/sections/legacy-article-redirect';
import { LegacyBlogRedirect } from './components/sections/legacy-blog-redirect';
import { Portfolio } from './components/sections/portfolio';

export const routes: RouteObject[] = [
    {
        element: <App />,
        children: [
            { index: true, element: <Navigate replace={true} to={blogLegacyRoute} /> },
            { path: articleRoute, element: <ArticleLoader /> },
            { path: blogRoute, element: <Blog /> },
            { path: portfolioRoute, element: <Portfolio /> },
            { path: blogLegacyRoute, element: <LegacyBlogRedirect /> },
            { path: articleLegacyRoute, element: <LegacyArticleRedirect /> },
            { path: '*', element: <Error /> }
        ]
    }
];
