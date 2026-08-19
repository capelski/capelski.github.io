import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Article } from '../article';
import { articles } from '../articles';
import {
    AllArticleCategories,
    ArticleCategory,
    defaultCategory,
    getCategoryKey
} from '../articles/article-category';
import { Language } from '../articles/language';
import PatreonBadge from '../patreon-badge';
import { portfolioRoute, RouteComponentProps } from '../routes';
import { SectionContainer } from '../section-container';
import { transitionsDuration } from '../variables';

export interface BlogAdditionalProps {
    selectedCategory: ArticleCategory;
    selectedLanguage: Language;
    setSelectedCategory: (category: ArticleCategory) => void;
}

export type BlogProps = RouteComponentProps & BlogAdditionalProps;

interface ArticlesTransitionProps {
    children?: React.ReactNode;
    in: boolean;
    onExited: () => void;
}

/** react-transition-group requires a nodeRef since React 19 removed findDOMNode */
const ArticlesTransition: React.FC<ArticlesTransitionProps> = (props) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <CSSTransition
            classNames="articles"
            in={props.in}
            nodeRef={nodeRef}
            onExited={props.onExited}
            timeout={transitionsDuration}
            unmountOnExit={true}
        >
            <div className="articles" ref={nodeRef}>
                {props.children}
            </div>
        </CSSTransition>
    );
};

export const Blog: React.FC<BlogProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    // We need to keep an owned copy of props.selectedCategory value to control css exit transitions
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>(
        props.selectedCategory
    );

    const updateSelectedCategory = (category: ArticleCategory) => {
        setSelectedCategory(category);

        const params = new URLSearchParams(location.search);
        if (category === defaultCategory) {
            params.delete('category');
        } else {
            params.set('category', getCategoryKey(category));
        }
        navigate({ search: params.toString() }, { replace: true });
    };

    return (
        <SectionContainer
            containerRef={props.containerRef}
            links={
                <NavLink to={portfolioRoute.path} className="link">
                    Portfolio ➡️
                </NavLink>
            }
            sectionName="blog"
        >
            <Helmet>
                <title>Blog | Carles Capellas</title>
                <meta
                    name="description"
                    content="Blog with software development entries and other random thoughts that cross my mind"
                />
            </Helmet>
            <React.Fragment>
                <div className="blog-header">
                    <h1 className="blog-title">Blog</h1>
                    <div className="blog-categories">
                        {AllArticleCategories.map((category) => (
                            <span
                                key={category}
                                className={`category${
                                    selectedCategory === category ? ' selected-category' : ''
                                }`}
                                onClick={() => updateSelectedCategory(category)}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <PatreonBadge selectedLanguage={props.selectedLanguage} />
                {AllArticleCategories.map((category) => (
                    <ArticlesTransition
                        in={category === selectedCategory}
                        key={category}
                        onExited={() => props.setSelectedCategory(selectedCategory)}
                    >
                        {articles
                            .filter(
                                (article) => article.metadata.category === props.selectedCategory
                            )
                            .map((article) => (
                                <Article
                                    key={article.metadata.id + category}
                                    {...article}
                                    preview={true}
                                    selectedLanguage={props.selectedLanguage}
                                />
                            ))}
                    </ArticlesTransition>
                ))}
            </React.Fragment>
        </SectionContainer>
    );
};
