import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import { getDefaultArticleLanguage } from '../articles/article-data';
import type { ArticleId } from '../articles/article-id';
import { Language } from '../articles/language';
import { getArticlePath, getBlogPath } from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';
import { Error } from './error';

export const ArticleLoader: React.FC = () => {
    const { selectedCategory, selectedLanguage, setSelectedCategory, setSelectedLanguage } =
        useAppContext();
    const { articleId, language: rawLanguage } = useParams<{
        articleId: ArticleId;
        language: Language;
    }>();
    const language = rawLanguage ?? selectedLanguage;

    const currentArticle = articles.find((article) => article.metadata.id === articleId);
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (language !== selectedLanguage) {
            setSelectedLanguage(language);
        }
        if (currentArticle && currentArticle.metadata.category !== selectedCategory) {
            setSelectedCategory(currentArticle.metadata.category);
        }
    }, [articleId, language, currentArticle]);

    useEffect(() => {
        viewportRef.current?.scrollTo({ top: 0 });
    }, [articleId]);

    if (!currentArticle) {
        return <Error />;
    }

    /** Redirects:
     * /article/blackjack-05-dealer-card/invalid → /article/blackjack-05-dealer-card/<default-language>
     */
    if (!currentArticle.metadata.languages.includes(language)) {
        const defaultLanguage = getDefaultArticleLanguage(currentArticle.metadata);
        const defaultPath = getArticlePath(currentArticle.metadata.id, defaultLanguage);

        return <Navigate replace={true} to={defaultPath} />;
    }

    const articlePath = getArticlePath(currentArticle.metadata.id, language);
    const articleContent = currentArticle.content(language);

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
                        to={getBlogPath(selectedCategory, language)}
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
