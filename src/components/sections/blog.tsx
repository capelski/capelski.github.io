import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    matchPath,
    NavLink,
    UNSAFE_ViewTransitionContext,
    useLocation,
    useParams
} from 'react-router-dom';
import { useAppContext } from '../app';
import { Article } from '../article';
import { articles } from '../articles';
import { AllArticleCategories, ArticleCategory } from '../articles/article-category';
import { Language } from '../articles/language';
import PatreonBadge from '../patreon-badge';
import { articleRoute, getBlogPath, portfolioRoute } from '../routes';
import { SectionContainer, sectionLinkStyle } from '../section-container';

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
    return !!matchPath(
        articleRoute,
        currentLocation.pathname === pathname ? nextLocation.pathname : currentLocation.pathname
    );
};

const displayCategories: Record<ArticleCategory, string> = {
    [ArticleCategory.tech]: '💻 Tech',
    [ArticleCategory.offTopic]: '🕹️ Off-topic'
};

export const Blog: React.FC = () => {
    const { selectedLanguage, selectedCategory, setSelectedLanguage, setSelectedCategory } =
        useAppContext();
    const { category, language: languageRaw } = useParams<{
        category: ArticleCategory;
        language: Language;
    }>();
    const isArticleTransition = useIsArticleTransition();
    const language = languageRaw ?? selectedLanguage;

    useEffect(() => {
        if (language !== selectedLanguage) {
            setSelectedLanguage(language);
        }
        if (category && category !== selectedCategory) {
            setSelectedCategory(category);
        }
    }, [language, category]);

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
                        {AllArticleCategories.map((c) => {
                            const isSelected = category === c;

                            return (
                                <NavLink
                                    key={c}
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
                                    to={getBlogPath(c, language)}
                                >
                                    {displayCategories[c]}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <PatreonBadge selectedLanguage={language} />
                <div className="articles">
                    {articles
                        .filter((article) => article.metadata.category === category)
                        .map((article) => (
                            <Article
                                key={article.metadata.id}
                                {...article}
                                preview={true}
                                selectedLanguage={language}
                            />
                        ))}
                </div>
            </React.Fragment>
        </SectionContainer>
    );
};
