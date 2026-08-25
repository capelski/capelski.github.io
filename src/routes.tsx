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
import { Portfolio } from './components/sections/portfolio';
import { legacyArticleRedirectLoader } from './legacy-article-redirect';
import { legacyBlogRedirectLoader } from './legacy-blog-redirect';

export const routes: RouteObject[] = [
    {
        element: <App />,
        children: [
            { index: true, element: <Navigate replace={true} to={blogLegacyRoute} /> },
            { path: articleRoute, element: <ArticleLoader /> },
            { path: blogRoute, element: <Blog /> },
            { path: portfolioRoute, element: <Portfolio /> },

            /** The redirects happen on a loader (instead of rendering a Navigate element) so that the
             * router resolves it on initialization; renderToString never runs the effects a Navigate
             * element relies on, which would leave the prerendered page empty
             * */
            { path: blogLegacyRoute, loader: legacyBlogRedirectLoader },
            {
                path: articleLegacyRoute,
                element: <Error />,
                loader: legacyArticleRedirectLoader
            },

            { path: '*', element: <Error /> }
        ]
    }
];
