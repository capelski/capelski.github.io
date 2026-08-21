import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../app';
import { articleRoute } from '../routes';
import { ArticleId } from './article-id';
import { articles } from './index';
import { defaultLanguage } from './language';

interface ArticleLinkProps {
    articleId: ArticleId;
    children?: React.ReactNode;
}

/** Links to another article, carrying over the selected language when the target
 * article has a translation for it
 */
export const ArticleLink: React.FC<ArticleLinkProps> = (props) => {
    const { selectedLanguage } = useAppContext();

    /* The articles index imports the article contents, which in turn import this module;
     * accessing it at render time (i.e. once every module has been evaluated) keeps the
     * circular dependency harmless
     */
    const targetArticle = articles.find((article) => article.metadata.id === props.articleId);
    const targetLanguage = targetArticle?.metadata.languages.includes(selectedLanguage)
        ? selectedLanguage
        : defaultLanguage;

    return (
        <NavLink
            to={{
                pathname: articleRoute.path.replace(':articleId', props.articleId),
                search: targetLanguage === defaultLanguage ? '' : `?language=${targetLanguage}`
            }}
            viewTransition={true}
        >
            {props.children}
        </NavLink>
    );
};
