import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const dynamicSitemap: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2025-08-16',
        duration: 4,
        id: ArticleId.dynamicSitemap,
        languages: [Language.en],
        shareImage: 'indexing.jpg'
    }
};
