import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const mongoDbOptimization: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2026-05-26',
        duration: 8,
        id: ArticleId.mongoDbOptimization,
        languages: [Language.en],
        shareImage: 'database-optimization.jpg'
    }
};
