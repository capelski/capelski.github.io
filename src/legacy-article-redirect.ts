import { LoaderFunction, redirect } from 'react-router-dom';
import { articles } from './components/articles';
import { getDefaultArticleLanguage } from './components/articles/article-data';
import { ArticleId } from './components/articles/article-id';
import { Language } from './components/articles/language';
import { getArticlePath } from './components/routes';

/** Redirects:
 * - /blog/blackjack-05-dealer-card → /article/blackjack-05-dealer-card/<default-language>
 * - /blog/blackjack-05-dealer-card?language=ca → /article/blackjack-05-dealer-card/ca
 **/
export const legacyArticleRedirectLoader: LoaderFunction = ({ params, request }) => {
    const articleId = params.articleId as ArticleId | undefined;

    const currentArticle = articles.find((article) => article.metadata.id === articleId);
    if (!articleId || !currentArticle) {
        /* Renders the route element (i.e. the Error section) */
        return null;
    }

    const languageParam = new URL(request.url).searchParams.get('language') as Language | null;

    return redirect(
        getArticlePath(
            articleId,
            languageParam ?? getDefaultArticleLanguage(currentArticle.metadata)
        )
    );
};
