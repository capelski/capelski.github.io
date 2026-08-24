import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import { defaultCategory } from '../articles/article-category';
import { Language } from '../articles/language';
import { getArticlePath, getBlogCategoryPath } from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';
import { Error } from './error';

export const ArticleLoader: React.FC = () => {
    const { selectedLanguage, setSelectedLanguage } = useAppContext();
    const { articleId, language: languageRaw } = useParams();
    const language = languageRaw as Language;

    const currentArticle = articles.find((article) => article.metadata.id === articleId);
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (language !== selectedLanguage) {
            setSelectedLanguage(language);
        }
    }, [articleId, language]);

    useEffect(() => {
        viewportRef.current?.scrollTo({ top: 0 });
    }, [articleId]);

    if (!currentArticle) {
        return <Error />;
    }

    const articlePath = getArticlePath(currentArticle.metadata, language);

    if (!currentArticle.metadata.languages.includes(language)) {
        return <Navigate replace={true} to={articlePath} />;
    }

    const articleContent = currentArticle.content(language);

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
                selectedLanguage={language}
            />
        </SectionContainer>
    );
};
