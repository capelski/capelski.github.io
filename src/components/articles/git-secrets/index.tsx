import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const gitSecrets: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2026-03-03',
        duration: 9,
        id: ArticleId.gitSecrets,
        languages: [Language.en],
        shareImage: 'secure-storage.jpg'
    }
};
