import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const reactSsr: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2025-03-18',
        duration: 7,
        id: ArticleId.reactSsr,
        languages: [Language.en],
        shareImage: 'server-rendering.jpg'
    }
};
