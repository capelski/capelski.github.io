import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const otfMigrations: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2024-08-07',
        duration: 6,
        id: ArticleId.otfMigrations,
        languages: [Language.en],
        shareImage: 'hard-drive.jpg'
    }
};
