import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, RouteChildrenProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Article } from '../article';
import { articles } from '../articles';
import { ArticleCategory, AllArticleCategories } from '../articles/article-category';
import { Language } from '../articles/language';
import { portfolioRoute } from '../routes';
import { SectionContainer } from '../section-container';
import { transitionsDuration } from '../variables';

export interface BlogAdditionalProps {
    selectedCategory: ArticleCategory;
    setSelectedCategory: (category: ArticleCategory) => void;
}

export type BlogProps = RouteChildrenProps & BlogAdditionalProps;

export const Blog: React.FC<BlogProps> = (props) => {
    // We need to keep an owned copy of props.selectedCategory value to control css exit transitions
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>(
        props.selectedCategory
    );

    return (
        <SectionContainer
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
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                {AllArticleCategories.map((category) => (
                    <CSSTransition
                        classNames="articles"
                        in={category === selectedCategory}
                        key={category}
                        onExited={() => props.setSelectedCategory(selectedCategory)}
                        timeout={transitionsDuration}
                        unmountOnExit={true}
                    >
                        <div className="articles">
                            {articles
                                .filter(
                                    (article) =>
                                        article.metadata.category === props.selectedCategory
                                )
                                .map((article) => (
                                    <Article
                                        key={article.metadata.id + category}
                                        {...article}
                                        preview={true}
                                        selectedLanguage={Language.en}
                                    />
                                ))}
                        </div>
                    </CSSTransition>
                ))}
            </React.Fragment>
        </SectionContainer>
    );
};
