import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import { defaultCategory, getCategoryKey } from '../articles/article-category';
import { Article as IArticle } from '../articles/article-data';
import { defaultLanguage } from '../articles/language';
import { articleRoute, blogRoute } from '../routes';
import { SectionContainer } from '../section-container';
import { Error } from './error';

export const ArticleLoader: React.FC = () => {
    const { selectedLanguage, setSelectedLanguage } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { articleId } = useParams();

    const viewportRef = useRef<HTMLDivElement>(null);

    // Ignore languages the article has no translations for
    const getArticleLanguage = (article: IArticle) =>
        article.metadata.languages.includes(selectedLanguage) ? selectedLanguage : defaultLanguage;

    // Protection against non-existing urls (e.g. /blog/non-existing)
    const currentArticle = articles.find((article) => article.metadata.id === articleId);
    const currentLanguage = currentArticle ? getArticleLanguage(currentArticle) : defaultLanguage;
    const articleContent = currentArticle?.content(currentLanguage);

    /* The article category drives the previous/next navigation and the link back to the
     * blog, so that the articles timeline matches the one displayed in the blog section
     */
    const selectedCategory = currentArticle ? currentArticle.metadata.category : defaultCategory;
    const filteredArticles = articles.filter(
        (article) => article.metadata.category === selectedCategory
    );

    useEffect(() => {
        /* The article is rendered inside the section viewport, which keeps its scroll
         * position when navigating from one article to another
         */
        (viewportRef.current as { scrollTo: (params: { top: number }) => void })?.scrollTo({
            top: 0
        });
    }, [articleId]);

    useEffect(() => {
        /* The language query parameter is only available in article urls; it gets removed
         * from the url when navigating back to the blog section
         */
        const params = new URLSearchParams(location.search);
        if (currentLanguage === defaultLanguage) {
            params.delete('language');
        } else {
            params.set('language', currentLanguage);
        }
        navigate({ search: params.toString() }, { replace: true });
    }, [articleId, currentLanguage]);

    if (!currentArticle) {
        return <Error />;
    }

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
                        to={{
                            pathname: blogRoute.path,
                            search:
                                selectedCategory === defaultCategory
                                    ? ''
                                    : `?category=${getCategoryKey(selectedCategory)}`
                        }}
                        className="link"
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
            <Article
                {...currentArticle}
                nextArticle={nextArticle}
                preview={false}
                previousArticle={previousArticle}
                selectedLanguage={currentLanguage}
                setSelectedLanguage={setSelectedLanguage}
            />
        </SectionContainer>
    );
};
