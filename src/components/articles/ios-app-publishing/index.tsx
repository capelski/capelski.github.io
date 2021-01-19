import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const iosAppPublishing: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2021-01-18',
        duration: 9,
        id: ArticleId.iosAppPublishing,
        languages: [Language.en],
        shareImage: 'apple-developer-portal-3.png'
    }
};
