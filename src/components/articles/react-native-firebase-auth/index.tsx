import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const reactNativeFirebaseAuth: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2021-01-28',
        duration: 7,
        id: ArticleId.reactNativeFirebaseAuth,
        languages: [Language.en],
        shareImage: 'firebase-auth-providers.png'
    }
};
