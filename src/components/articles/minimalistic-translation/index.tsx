import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const minimalisticTranslation: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2024-11-24',
        duration: 10,
        id: ArticleId.minimalisticTranslation,
        languages: [Language.en],
        shareImage: 'translation-art.jpg'
    }
};
