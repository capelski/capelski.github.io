import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import { defaultCategory } from '../articles/article-category';
import { getArticleLanguage } from '../articles/article-data';
import { defaultLanguage, Language } from '../articles/language';
import { getArticlePath, getBlogCategoryPath } from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';
import { Error } from './error';

interface ArticleLoaderProps {
    /** Language stated in the url; undefined in the plain article route, which redirects
     * to the language the article defaults to (see the article routes in router-config.tsx)
     */
    language?: Language;
}

export const ArticleLoader: React.FC<ArticleLoaderProps> = (props) => {
    const { setSelectedLanguage } = useAppContext();
    const { articleId } = useParams();

    const viewportRef = useRef<HTMLDivElement>(null);

    // Protection against non-existing urls (e.g. /article/non-existing)
    const currentArticle = articles.find((article) => article.metadata.id === articleId);

    // Ignore languages the article has no translations for
    const currentLanguage = currentArticle
        ? getArticleLanguage(currentArticle.metadata, props.language)
        : defaultLanguage;

    /* The article url is the single source of truth for the displayed language, but the
     * selection outlives the article (e.g. it drives the blog previews language)
     */
    useEffect(() => {
        if (props.language && props.language === currentLanguage) {
            setSelectedLanguage(props.language);
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

    /* The language is always stated in the article urls, so the plain article url (e.g.
     * /article/react-ssr), as well as the urls stating a language the article has no
     * translation for (e.g. /article/provinenca-desconeguda/en), are not canonical
     */
    const isCanonicalUrl = props.language === currentLanguage;

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
