import React from 'react';
import { renderToString } from 'react-dom/server.edge';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { parseLinks } from 'vite-prerender-plugin/parse';
import { articles } from './components/articles';
import { AllArticleCategories } from './components/articles/article-category';
import { getDefaultArticleLanguage } from './components/articles/article-data';
import { createAppRoutes } from './components/router-config';
import {
    blogRoute,
    getArticlePath,
    getBlogCategoryPath,
    getLegacyArticlePath,
    portfolioRoute
} from './components/routes';

type HeadElement = {
    props: { [attribute: string]: string };
    type: string;
};

type ExtractedHead = {
    elements: HeadElement[];
    html: string;
    title: string | undefined;
};

const decodeEntities = (value: string): string =>
    value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');

const parseAttributes = (tagMarkup: string): { [attribute: string]: string } => {
    const props: { [attribute: string]: string } = {};
    const attributes = tagMarkup.matchAll(/([\w:.-]+)="([^"]*)"/g);

    for (const [, name, value] of attributes) {
        props[name] = decodeEntities(value);
    }

    return props;
};

/** On React 19 react-helmet-async renders the document metadata as regular elements and
 * lets React hoist them into the head. renderToString does not render a full document,
 * so the metadata ends up inlined in the body markup; it must be pulled out of the html
 * and handed over to the prerender plugin, which places it inside the head element
 */
const extractHead = (html: string): ExtractedHead => {
    const elements: HeadElement[] = [];
    let title: string | undefined;

    const htmlWithoutMeta = html
        .replace(/<title[^>]*>([\s\S]*?)<\/title>/g, (_match, titleContent: string) => {
            title = decodeEntities(titleContent);
            return '';
        })
        .replace(/<meta\s+[^>]*>/g, (match) => {
            elements.push({ props: parseAttributes(match), type: 'meta' });
            return '';
        });

    return { elements, html: htmlWithoutMeta, title };
};

/** Routes that are not reachable by crawling the links of the prerendered pages (e.g. the
 * article pages of a category that is not the default one) and must be prerendered too
 */
const additionalRoutes: string[] = [blogRoute.path, portfolioRoute.path]
    .concat(AllArticleCategories.map(getBlogCategoryPath))
    .concat(
        /* One url per article translation (e.g. /article/existential-injustice/ca) */
        articles.flatMap((article) =>
            article.metadata.languages.map((language) => getArticlePath(article.metadata, language))
        )
    )
    .concat(
        /* The urls the articles used to live in, so that the pages redirecting to the
         * article route (see ArticleRedirect in sections/blog.tsx) are served too. The
         * language an article was displayed in by default mapped to the plain url, the
         * remaining translations stating the language in a url segment
         */
        articles.flatMap((article) => [
            getLegacyArticlePath(article.metadata),
            ...article.metadata.languages
                .filter((language) => language !== getDefaultArticleLanguage(article.metadata))
                .map((language) => getLegacyArticlePath(article.metadata, language))
        ])
    );

export async function prerender(data: { url?: string }) {
    const router = createMemoryRouter(createAppRoutes(true), {
        initialEntries: [data?.url || '/']
    });

    /* Some urls redirect to another one on a route loader (e.g. the legacy article urls;
     * see articleRedirectLoader in components/sections/blog.tsx). RouterProvider runs the
     * loaders on mount, which renderToString does not get to, so the navigation is
     * started here and waited for: the snapshot then holds the markup of the url the
     * redirect lands on, metadata included, rather than no markup at all
     */
    router.initialize();
    await new Promise<void>((resolve) => {
        const isSettled = () =>
            router.state.initialized && router.state.navigation.state === 'idle';

        if (isSettled()) {
            resolve();
            return;
        }

        const unsubscribe = router.subscribe(() => {
            if (isSettled()) {
                unsubscribe();
                resolve();
            }
        });
    });

    const renderedHtml = renderToString(
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    );

    const { elements, html, title } = extractHead(renderedHtml);
    const links = new Set([...parseLinks(html), ...additionalRoutes]);

    return {
        head: {
            elements: new Set(elements),
            title
        },
        html,
        links
    };
}
