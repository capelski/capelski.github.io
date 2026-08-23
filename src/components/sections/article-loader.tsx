import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import { defaultCategory } from '../articles/article-category';
import { getArticleLanguage, getDefaultArticleLanguage } from '../articles/article-data';
import { defaultLanguage, getLanguageFromKey, Language } from '../articles/language';
import { getArticlePath, getBlogCategoryPath } from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';
import { Error } from './error';

interface ArticleLoaderProps {
    /** Language stated in the url; undefined in the plain article route, which displays
     * the article in the language it defaults to (see the article routes in router-config.tsx)
     */
    language?: Language;
}

export const ArticleLoader: React.FC<ArticleLoaderProps> = (props) => {
    const { setSelectedLanguage } = useAppContext();
    const { articleId } = useParams();
    const [searchParams] = useSearchParams();

    /* The language used to be held in a query parameter (e.g. /blog/react-ssr?language=ca);
     * such urls get redirected to the language route the parameter refers to
     */
    const legacyLanguage = getLanguageFromKey(searchParams.get('language'));
    const urlLanguage = props.language || legacyLanguage;

    const viewportRef = useRef<HTMLDivElement>(null);

    // Protection against non-existing urls (e.g. /blog/non-existing)
    const currentArticle = articles.find((article) => article.metadata.id === articleId);

    // Ignore languages the article has no translations for
    const currentLanguage = currentArticle
        ? getArticleLanguage(currentArticle.metadata, urlLanguage)
        : defaultLanguage;

    /* The article url is the single source of truth for the displayed language, but the
     * selection outlives the article (e.g. it drives the blog previews language)
     */
    useEffect(() => {
        if (urlLanguage && urlLanguage === currentLanguage) {
            setSelectedLanguage(urlLanguage);
        }
    }, [articleId, currentLanguage]);

    useEffect(() => {
        /* The article is rendered inside the section viewport, which keeps its scroll
         * position when navigating from one article to another
         */
        (viewportRef.current as { scrollTo: (params: { top: number }) => void })?.scrollTo({
            top: 0
        });
    }, [articleId]);

    if (!currentArticle) {
        return <Error />;
    }

    const articlePath = getArticlePath(currentArticle.metadata, currentLanguage);

    /* The language an article is displayed in by default is implicit in the plain article
     * url, so urls stating it (e.g. /blog/react-ssr/en), as well as urls stating a
     * language the article has no translation for, are not canonical; neither are the
     * urls holding the language in the legacy query parameter
     */
    const isCanonicalUrl =
        !legacyLanguage &&
        (!props.language || currentLanguage !== getDefaultArticleLanguage(currentArticle.metadata));

    if (!isCanonicalUrl) {
        return <Navigate replace={true} to={articlePath} />;
    }

    const articleContent = currentArticle.content(currentLanguage);

    /* The article category drives the previous/next navigation and the link back to the
     * blog, so that the articles timeline matches the one displayed in the blog section
     */
    const selectedCategory = currentArticle ? currentArticle.metadata.category : defaultCategory;
    const filteredArticles = articles.filter(
        (article) => article.metadata.category === selectedCategory
    );

    const articleIndex = filteredArticles.findIndex(
        (article) => article.metadata.id === currentArticle.metadata.id
    );
    const nextArticle = articleIndex > 0 ? filteredArticles[articleIndex - 1] : undefined;
    const previousArticle =
        articleIndex < filteredArticles.length - 1 ? filteredArticles[articleIndex + 1] : undefined;

    return (
        <SectionContainer
            links={
                <React.Fragment>
                    <NavLink
                        to={getBlogCategoryPath(selectedCategory)}
                        className="link"
                        style={sectionLinkStyle}
                        viewTransition={true}
                    >
                        ⬇️ Blog
                    </NavLink>
                </React.Fragment>
            }
            sectionName="article-container"
            viewTransitionName="article"
            viewportRef={viewportRef}
        >
            <Helmet>
                <title>{`${articleContent.title} | Carles Capellas`}</title>
                <meta name="description" content={articleContent.description} />
                <meta property="og:site_name" content="Carles Capellas" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={articleContent.title} />
                <meta property="og:description" content={articleContent.description} />
                <meta property="og:url" content={`${PRODUCTION_URL_BASE}${articlePath}`} />
                {currentArticle.metadata.shareImage ? (
                    <meta
                        property="og:image"
                        content={`${PRODUCTION_URL_BASE}/images/blog/${currentArticle.metadata.id}/${currentArticle.metadata.shareImage}`}
                    />
                ) : undefined}
            </Helmet>
            <Article
                {...currentArticle}
                nextArticle={nextArticle}
                preview={false}
                previousArticle={previousArticle}
                selectedLanguage={currentLanguage}
            />
        </SectionContainer>
    );
};
