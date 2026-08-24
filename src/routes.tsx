import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { App } from './components/app';
import { AllArticleCategories, getCategoryKey } from './components/articles/article-category';
import { AllLanguages } from './components/articles/language';
import {
    articleRoute,
    blogRoute,
    errorRoute,
    getArticleLanguagePath,
    legacyArticleLanguagePath,
    legacyArticlePath,
    portfolioRoute
} from './components/routes';
import { ArticleLoader } from './components/sections/article-loader';
import { articleRedirectLoader, Blog, BlogRedirect } from './components/sections/blog';
import { Error } from './components/sections/error';
import { Portfolio } from './components/sections/portfolio';

export const routes: RouteObject[] = [
    {
        element: <App />,
        children: [
            { index: true, element: <Navigate replace={true} to={blogRoute.path} /> },
            {
                path: blogRoute.path,
                children: [
                    { index: true, element: <BlogRedirect /> },
                    ...AllArticleCategories.map((category) => ({
                        path: getCategoryKey(category),
                        element: <Blog selectedCategory={category} />
                    })),
                    /* The articles used to live under the blog route; those urls are kept
                     * around, redirecting to the article route. Only the urls of articles
                     * that do not exist make it to the route element */
                    {
                        path: legacyArticlePath,
                        element: <Error />,
                        loader: articleRedirectLoader
                    },
                    {
                        path: legacyArticleLanguagePath,
                        element: <Error />,
                        loader: articleRedirectLoader
                    }
                ]
            },
            /* The plain article route states no language, so it redirects to the language
             * the article defaults to */
            { path: articleRoute.path, element: <ArticleLoader /> },
            /* One route per language, so that each article translation has a url of its
             * own (e.g. /article/existential-injustice/ca) */
            ...AllLanguages.map((language) => ({
                path: getArticleLanguagePath(language),
                element: <ArticleLoader language={language} />
            })),
            { path: portfolioRoute.path, element: <Portfolio /> },
            { path: errorRoute.path, element: <Error /> },
            { path: '*', element: <Navigate replace={true} to={errorRoute.path} /> }
        ]
    }
];
