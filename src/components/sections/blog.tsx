import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    matchPath,
    Navigate,
    NavLink,
    PathMatch,
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
import { AllLanguages } from '../articles/language';
import PatreonBadge from '../patreon-badge';
import {
    articleRoute,
    getArticleLanguagePath,
    getBlogCategoryPath,
    portfolioRoute
} from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';

/** Paths of the article routes; the ones stating a language included (e.g. /blog/react-ssr/ca) */
const articlePaths = [articleRoute.path].concat(AllLanguages.map(getArticleLanguagePath));

/** Tells the article urls (e.g. /blog/react-ssr) from the category urls (e.g.
 * /blog/offTopic), which the article route paths match just the same
 */
const isArticlePath = (pathname: string) => {
    const match = articlePaths.reduce<PathMatch<'articleId'> | null>(
        (reduced, articlePath) => reduced || matchPath(articlePath, pathname),
        null
    );
    return !!match && !getCategoryFromKey(match.params.articleId!);
};

/** True while a view transition to or from an article is running, which makes the blog
 * animate vertically instead of sideways; see style/main.css.
 *
 * useViewTransitionState is no use here: it matches a path pattern against both sides of
 * the transition, and the article path matches the category urls the blog itself lives
 * in. The context that hook reads from carries the locations, which can be told apart
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
                    to={portfolioRoute.path}
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
                                    viewTransition={true}
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
