import { LoaderFunction, redirect } from 'react-router-dom';
import { ArticleCategory, defaultCategory } from './components/articles/article-category';
import { defaultLanguage } from './components/articles/language';
import { getBlogPath } from './components/routes';

/** Redirects:
 * - /blog → /blog/<default-category>/<default-language>
 * - /blog?category=off-topic → /blog/off-topic/en
 **/
export const legacyBlogRedirectLoader: LoaderFunction = ({ request }) => {
    const category = new URL(request.url).searchParams.get('category') as ArticleCategory | null;

    return redirect(getBlogPath(category ?? defaultCategory, defaultLanguage));
};
