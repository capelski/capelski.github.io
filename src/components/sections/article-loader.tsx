import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Article, ArticleProps } from '../article';
import { articles } from '../articles';
import { ArticleCategory, defaultCategory, getCategoryKey } from '../articles/article-category';
import { Article as IArticle } from '../articles/article-data';
import { defaultLanguage, Language } from '../articles/language';
import { articleRoute, blogRoute, RouteComponentProps } from '../routes';
import { SectionContainer } from '../section-container';
import { transitionsDuration } from '../variables';
import { Error } from './error';

export interface ArticleLoaderAdditionalProps {
    selectedCategory: ArticleCategory;
    selectedLanguage: Language;
    setSelectedLanguage: (language: Language) => void;
}

export type ArticleLoaderProps = RouteComponentProps & ArticleLoaderAdditionalProps;

interface ArticleTransitionProps {
    articleProps: ArticleProps;
    in: boolean;
    onExited: () => void;
}

/** react-transition-group requires a nodeRef since React 19 removed findDOMNode */
const ArticleTransition: React.FC<ArticleTransitionProps> = (props) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <CSSTransition
            classNames="article"
            in={props.in}
            nodeRef={nodeRef}
            onExited={props.onExited}
            timeout={transitionsDuration}
            unmountOnExit={true}
        >
            <Article {...props.articleProps} containerRef={nodeRef} />
        </CSSTransition>
    );
};

export const ArticleLoader: React.FC<ArticleLoaderProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
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

        const params = new URLSearchParams(location.search);
        if (currentLanguage === defaultLanguage) {
            params.delete('language');
        } else {
            params.set('language', currentLanguage);
        }
        navigate({ search: params.toString() }, { replace: true });
    }, [articleIdInUrl, currentLanguage]);

    const onArticleExit = () => {
        (viewportRef.current as { scrollTo: (params: { top: number }) => void })?.scrollTo({
            top: 0
        });
    };

    return currentArticle ? (
        <SectionContainer
            containerRef={props.containerRef}
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
                <title>{`${articleContent!.title} | Carles Capellas`}</title>
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
                    <ArticleTransition
                        articleProps={{
                            ...article,
                            nextArticle,
                            onArticleNavigation: setCurrentArticleId,
                            preview: false,
                            previousArticle,
                            selectedLanguage: getArticleLanguage(article),
                            setSelectedLanguage: props.setSelectedLanguage
                        }}
                        in={article.metadata.id === currentArticleId}
                        key={article.metadata.id}
                        onExited={onArticleExit}
                    />
                );
            })}
        </SectionContainer>
    ) : (
        <Error containerRef={props.containerRef} />
    );
};
