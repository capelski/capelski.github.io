import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    NavLink,
    useLocation,
    useNavigate,
    useSearchParams,
    useViewTransitionState
} from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import {
    AllArticleCategories,
    ArticleCategory,
    defaultCategory,
    getCategoryFromKey,
    getCategoryKey
} from '../articles/article-category';
import PatreonBadge from '../patreon-badge';
import { articleRoute, portfolioRoute } from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';

export const Blog: React.FC = () => {
    const { selectedLanguage } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* The url is the single source of truth for the selected category, so that the
     * articles list is swapped inside the view transition triggered by the navigation
     */
    const selectedCategory = getCategoryFromKey(searchParams.get('category')) || defaultCategory;

    /* True while a view transition to or from an article is running (the hook matches the
     * article path against both the current and the next location), which makes the blog
     * animate vertically instead of sideways; see style/main.css
     */
    const isArticleTransition = useViewTransitionState(articleRoute.path);

    const updateSelectedCategory = (category: ArticleCategory) => {
        const params = new URLSearchParams(location.search);
        if (category === defaultCategory) {
            params.delete('category');
        } else {
            params.set('category', getCategoryKey(category));
        }
        navigate({ search: params.toString() }, { replace: true, viewTransition: true });
    };

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
                        {AllArticleCategories.map((category) => (
                            <span
                                key={category}
                                className={`category${
                                    selectedCategory === category ? ' selected-category' : ''
                                }`}
                                onClick={() => updateSelectedCategory(category)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: selectedCategory === category ? 700 : undefined,
                                    marginRight: 8,
                                    padding: 8
                                }}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <PatreonBadge selectedLanguage={selectedLanguage} />
                <div className="articles">
                    {articles
                        .filter((article) => article.metadata.category === selectedCategory)
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
