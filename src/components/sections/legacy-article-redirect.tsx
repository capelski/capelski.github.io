import React from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { articles } from '../articles';
import { getArticleLanguage } from '../articles/article-data';
import { ArticleId } from '../articles/article-id';
import { Language } from '../articles/language';
import { getArticlePath } from '../routes';
import { Error } from './error';

/** Redirects:
 * - /blog/blackjack-05-dealer-card → /article/blackjack-05-dealer-card/<default-language>
 * - /blog/blackjack-05-dealer-card?language=ca → /article/blackjack-05-dealer-card/ca
 **/
export const LegacyArticleRedirect: React.FC = () => {
    const { selectedLanguage } = useAppContext();
    const { articleId } = useParams<{ articleId: ArticleId }>();
    const [searchParams] = useSearchParams();

    const currentArticle = articles.find((article) => article.metadata.id === articleId);
    if (!articleId || !currentArticle) {
        return <Error />;
    }

    const languageParam = searchParams.get('language') as Language | null;
    const articleLanguage = getArticleLanguage(currentArticle.metadata, selectedLanguage);

    return (
        <Navigate replace={true} to={getArticlePath(articleId, languageParam ?? articleLanguage)} />
    );
};
