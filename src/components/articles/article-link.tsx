import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../app';
import { getArticlePath } from '../routes';
import { ArticleId } from './article-id';

interface ArticleLinkProps {
    articleId: ArticleId;
    children?: React.ReactNode;
}

export const ArticleLink: React.FC<ArticleLinkProps> = (props) => {
    const { selectedLanguage } = useAppContext();

    return (
        <NavLink to={getArticlePath(props.articleId, selectedLanguage)} viewTransition={true}>
            {props.children}
        </NavLink>
    );
};
