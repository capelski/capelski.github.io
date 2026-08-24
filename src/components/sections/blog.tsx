import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    LoaderFunctionArgs,
    matchPath,
    Navigate,
    NavLink,
    replace,
    UNSAFE_ViewTransitionContext,
    useLocation,
    useSearchParams
} from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import {
    AllArticleCategories,
    ArticleCategory,
    defaultCategory,
    getCategoryFromKey
} from '../articles/article-category';
import { AllLanguages, getLanguageFromKey } from '../articles/language';
import PatreonBadge from '../patreon-badge';
import {
    articleRoute,
    getArticleLanguagePath,
    getArticlePath,
    getBlogCategoryPath,
    portfolioRoute
} from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';

/** Paths of the article routes; the ones stating a language included (e.g. /article/react-ssr/ca) */
const articlePaths = [articleRoute].concat(AllLanguages.map(getArticleLanguagePath));

const isArticlePath = (pathname: string) =>
    articlePaths.some((articlePath) => !!matchPath(articlePath, pathname));

/** True while a view transition to or from an article is running, which makes the blog
 * animate vertically instead of sideways; see style/main.css.
 *
 * useViewTransitionState is no use here: it needs the very url the transition goes to,
 * which the blog does not know (any of the articles it lists might be the one). The
 * context that hook reads from carries the locations, which can be matched against the
 * article route paths
 */
const useIsArticleTransition = () => {
    const { pathname } = useLocation();
    const viewTransition = React.useContext(UNSAFE_ViewTransitionContext);

    if (!viewTransition.isTransitioning) {
        return false;
    }

    // The blog is on one side of the transition; the article is looked for on the other one
    const { currentLocation, nextLocation } = viewTransition;
    return isArticlePath(
        currentLocation.pathname === pathname ? nextLocation.pathname : currentLocation.pathname
    );
};

/** Sends the blog route to the default category, honouring the category query parameter
 * that used to hold the selection (e.g. /blog?category=offTopic → /blog/offTopic)
 */
export const BlogRedirect: React.FC = () => {
    const [searchParams] = useSearchParams();
    const category = getCategoryFromKey(searchParams.get('category')) || defaultCategory;

    return <Navigate replace={true} to={getBlogCategoryPath(category)} />;
};

/** Sends the urls the articles used to live in (e.g. /blog/existential-injustice/ca, or
 * /blog/existential-injustice?language=ca for the older ones, which held the language in
 * a query parameter) to the article route the given article and language map to.
 *
 * A route loader (rather than a Navigate element) so that the redirect happens before the
 * route renders: the prerendered legacy pages then hold the article markup, metadata
 * included, instead of the empty markup of a route that navigates away once rendered
 */
export const articleRedirectLoader = ({ params, request }: LoaderFunctionArgs) => {
    // Non-existing urls (e.g. /blog/non-existing) fall through to the route element
    const currentArticle = articles.find((article) => article.metadata.id === params.articleId);

    if (!currentArticle) {
        return null;
    }

    const urlLanguage = getLanguageFromKey(
        params.language || new URL(request.url).searchParams.get('language')
    );

    /* Replacing the history entry, so that going back from the article does not land on
     * the legacy url, which would redirect to the article again */
    return replace(getArticlePath(currentArticle.metadata, urlLanguage));
};

interface BlogProps {
    /** The url is the single source of truth for the selected category (see the blog
     * children routes in router.tsx), so that the articles list is swapped inside the
     * view transition triggered by the navigation
     */
    selectedCategory: ArticleCategory;
}

export const Blog: React.FC<BlogProps> = (props) => {
    const { selectedLanguage } = useAppContext();
    const isArticleTransition = useIsArticleTransition();

    return (
        <SectionContainer
            links={
                <NavLink
                    to={portfolioRoute}
                    className="link"
                    style={sectionLinkStyle}
                    viewTransition={true}
                >
                    Portfolio ➡️
                </NavLink>
            }
            linksStyle={{ justifyContent: 'flex-end' }}
            sectionName="blog"
            viewTransitionName={isArticleTransition ? 'blog-article' : 'blog'}
        >
            <Helmet>
                <title>Blog | Carles Capellas</title>
                <meta
                    name="description"
                    content="Blog with software development entries and other random thoughts that cross my mind"
                />
            </Helmet>
            <React.Fragment>
                <div
                    className="blog-header"
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        /* Captured on its own so that it stays in place while the articles
                         * list slides on a category change */
                        viewTransitionName: 'blog-header'
                    }}
                >
                    <h1 className="blog-title">Blog</h1>
                    <div className="blog-categories">
                        {AllArticleCategories.map((category) => {
                            const isSelected = props.selectedCategory === category;

                            return (
                                <NavLink
                                    key={category}
                                    className={`category${isSelected ? ' selected-category' : ''}`}
                                    /* A category is not worth a history entry: going back
                                     * from the blog lands on the previous section */
                                    replace={true}
                                    style={{
                                        fontWeight: isSelected ? 700 : undefined,
                                        marginRight: 8,
                                        padding: 8,
                                        textDecoration: 'none'
                                    }}
                                    to={getBlogCategoryPath(category)}
                                >
                                    {category}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <PatreonBadge selectedLanguage={selectedLanguage} />
                <div className="articles">
                    {articles
                        .filter((article) => article.metadata.category === props.selectedCategory)
                        .map((article) => (
                            <Article
                                key={article.metadata.id}
                                {...article}
                                preview={true}
                                selectedLanguage={selectedLanguage}
                            />
                        ))}
                </div>
            </React.Fragment>
        </SectionContainer>
    );
};
