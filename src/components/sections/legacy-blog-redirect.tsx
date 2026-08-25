import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../app';
import { ArticleCategory } from '../articles/article-category';
import { getBlogPath } from '../routes';

/** Redirects:
 *
 * - /blog → /blog/<default-category>/<default-language>
 * - /blog?category=off-topic → /blog/off-topic/en
 **/
export const LegacyBlogRedirect: React.FC = () => {
    const { selectedCategory, selectedLanguage } = useAppContext();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') as ArticleCategory | null;

    return (
        <Navigate replace={true} to={getBlogPath(category ?? selectedCategory, selectedLanguage)} />
    );
};
