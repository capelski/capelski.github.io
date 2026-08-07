import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, RouteChildrenProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Article } from '../article';
import { articles } from '../articles';
import { ArticleCategory, defaultCategory, getCategoryKey } from '../articles/article-category';
import { Article as IArticle } from '../articles/article-data';
import { defaultLanguage, Language } from '../articles/language';
import { articleRoute, blogRoute } from '../routes';
import { SectionContainer } from '../section-container';
import { transitionsDuration } from '../variables';
import { Error } from './error';

export interface ArticleLoaderAdditionalProps {
    selectedCategory: ArticleCategory;
    selectedLanguage: Language;
    setSelectedLanguage: (language: Language) => void;
}

export type ArticleLoaderProps = RouteChildrenProps<{ articleId?: string }> &
    ArticleLoaderAdditionalProps;

export const ArticleLoader: React.FC<ArticleLoaderProps> = (props) => {
    const articleIdInUrl = props.match?.params['articleId'];

    // We need to keep an owned copy of props.match?.params['articleId'] value
    // to control css exit transitions
    const [currentArticleId, setCurrentArticleId] = useState(articleIdInUrl);

    const viewportRef = useRef<HTMLDivElement>(null);
    const filteredArticles = articles.filter(
        (article) => article.metadata.category === props.selectedCategory
    );

    // Ignore languages the article has no translations for
    const getArticleLanguage = (article: IArticle) =>
        article.metadata.languages.includes(props.selectedLanguage)
            ? props.selectedLanguage
            : defaultLanguage;

    // Protection against non-existing urls (e.g. /blog/non-existing)
    const currentArticle = filteredArticles.find(
        (article) => article.metadata.id === currentArticleId
    );
    const currentLanguage = currentArticle ? getArticleLanguage(currentArticle) : defaultLanguage;
    const articleContent = currentArticle?.content(currentLanguage);

    useEffect(() => {
        // When the articleId in the url is modified we need to update the currentArticleId,
        // except when articleId is undefined (e.g. the component is being unmounted)
        articleIdInUrl && setCurrentArticleId(articleIdInUrl);
    }, [articleIdInUrl]);

    useEffect(() => {
        // The language query parameter is only available in article urls; it gets removed
        // from the url when navigating back to the blog section
        if (!articleIdInUrl) {
            return;
        }

        const params = new URLSearchParams(props.location.search);
        if (currentLanguage === defaultLanguage) {
            params.delete('language');
        } else {
            params.set('language', currentLanguage);
        }
        props.history.replace({ search: params.toString() });
    }, [articleIdInUrl, currentLanguage]);

    const onArticleExit = () => {
        (viewportRef.current as { scrollTo: (params: { top: number }) => void })?.scrollTo({
            top: 0
        });
    };

    return currentArticle ? (
        <SectionContainer
            links={
                <React.Fragment>
                    <NavLink
                        to={{
                            pathname: blogRoute.path,
                            search:
                                props.selectedCategory === defaultCategory
                                    ? ''
                                    : `?category=${getCategoryKey(props.selectedCategory)}`
                        }}
                        className="link"
                    >
                        ⬇️ Blog
                    </NavLink>
                </React.Fragment>
            }
            sectionName="article-container"
            viewportRef={viewportRef}
        >
            <Helmet>
                <title>{articleContent!.title} | Carles Capellas</title>
                <meta name="description" content={articleContent!.description} />
                <meta property="og:site_name" content="Carles Capellas" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={articleContent!.title} />
                <meta property="og:description" content={articleContent!.description} />
                <meta
                    property="og:url"
                    content={`${PRODUCTION_URL_BASE}${articleRoute.path.replace(
                        ':articleId',
                        currentArticle.metadata.id
                    )}`}
                />
                {currentArticle.metadata.shareImage ? (
                    <meta
                        property="og:image"
                        content={`${PRODUCTION_URL_BASE}/images/blog/${currentArticle.metadata.id}/${currentArticle.metadata.shareImage}`}
                    />
                ) : undefined}
            </Helmet>
            {filteredArticles.map((article) => {
                const articleIndex = filteredArticles.findIndex(
                    (a) => a.metadata.id === article.metadata.id
                );
                const nextArticle =
                    articleIndex > 0 ? filteredArticles[articleIndex - 1] : undefined;
                const previousArticle =
                    articleIndex < filteredArticles.length - 1
                        ? filteredArticles[articleIndex + 1]
                        : undefined;

                return (
                    <CSSTransition
                        classNames="article"
                        in={article.metadata.id === currentArticleId}
                        key={article.metadata.id}
                        onExited={onArticleExit}
                        timeout={transitionsDuration}
                        unmountOnExit={true}
                    >
                        <Article
                            {...article}
                            nextArticle={nextArticle}
                            onArticleNavigation={setCurrentArticleId}
                            preview={false}
                            previousArticle={previousArticle}
                            selectedLanguage={getArticleLanguage(article)}
                            setSelectedLanguage={props.setSelectedLanguage}
                        />
                    </CSSTransition>
                );
            })}
        </SectionContainer>
    ) : (
        <Error />
    );
};
