import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { App } from './app';
import { AllArticleCategories, getCategoryKey } from './articles/article-category';
import { articleRoute, blogRoute, errorRoute, portfolioRoute } from './routes';
import { ArticleLoader } from './sections/article-loader';
import { Blog, BlogRedirect } from './sections/blog';
import { Error } from './sections/error';
import { Portfolio } from './sections/portfolio';

export const createAppRoutes = (isServerRendered: boolean): RouteObject[] => [
    {
        element: <App isServerRendered={isServerRendered} />,
        children: [
            { index: true, element: <Navigate replace={true} to={blogRoute.path} /> },
            {
                path: blogRoute.path,
                children: [
                    { index: true, element: <BlogRedirect /> },
                    ...AllArticleCategories.map((category) => ({
                        path: getCategoryKey(category),
                        element: <Blog selectedCategory={category} />
                    }))
                ]
            },
            { path: articleRoute.path, element: <ArticleLoader /> },
            { path: portfolioRoute.path, element: <Portfolio /> },
            { path: errorRoute.path, element: <Error /> },
            { path: '*', element: <Navigate replace={true} to={errorRoute.path} /> }
        ]
    }
];
