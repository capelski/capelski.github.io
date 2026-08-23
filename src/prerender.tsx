import React from 'react';
import { renderToString } from 'react-dom/server.edge';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { parseLinks } from 'vite-prerender-plugin/parse';
import { AllArticleCategories } from './components/articles/article-category';
import { ArticleId } from './components/articles/article-id';
import { createAppRoutes } from './components/router-config';
import { articleRoute, blogRoute, getBlogCategoryPath, portfolioRoute } from './components/routes';

type HeadElement = {
    props: { [attribute: string]: string };
    type: string;
};

const parseMetaTags = (metaMarkup: string): HeadElement[] => {
    const tags = metaMarkup.match(/<meta\s+[^>]*>/g) || [];

    return tags.map((tag) => {
        const props: { [attribute: string]: string } = {};
        const attributes = tag.matchAll(/([\w:-]+)="([^"]*)"/g);

        for (const [, name, value] of attributes) {
            props[name] = value;
        }

        return {
            props,
            type: 'meta'
        };
    });
};

const extractLang = (htmlAttributesMarkup: string): string | undefined => {
    const langMatch = htmlAttributesMarkup.match(/lang="([^"]+)"/);
    return langMatch ? langMatch[1] : undefined;
};

const extractTitle = (helmet: HelmetServerState): string | undefined => {
    const titleMarkup = helmet.title.toString();
    const titleMatch = titleMarkup.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    return titleMatch ? titleMatch[1] : undefined;
};

/** Routes that are not reachable by crawling the links of the prerendered pages (e.g. the
 * article pages of a category that is not the default one) and must be prerendered too
 */
const additionalRoutes: string[] = [blogRoute.path, portfolioRoute.path]
    .concat(AllArticleCategories.map(getBlogCategoryPath))
    .concat(
        Object.values(ArticleId).map((articleId) =>
            articleRoute.path.replace(':articleId', articleId)
        )
    );

export async function prerender(data: { url?: string }) {
    const router = createMemoryRouter(createAppRoutes(true), {
        initialEntries: [data?.url || '/']
    });

    const helmetContext: { helmet?: HelmetServerState } = {};

    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <RouterProvider router={router} />
        </HelmetProvider>
    );

    const links = new Set([...parseLinks(html), ...additionalRoutes]);
    const helmet = helmetContext.helmet;
    const headElements = helmet ? parseMetaTags(helmet.meta.toString()) : [];

    return {
        head: {
            elements: new Set(headElements),
            lang: helmet ? extractLang(helmet.htmlAttributes.toString()) : undefined,
            title: helmet ? extractTitle(helmet) : undefined
        },
        html,
        links
    };
}
