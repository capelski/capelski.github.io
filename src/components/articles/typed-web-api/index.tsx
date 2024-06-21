import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const typedWebApi: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2024-06-21',
        duration: 5,
        id: ArticleId.typedWebApi,
        languages: [Language.en],
        shareImage: 'antenna.jpg'
    }
};
