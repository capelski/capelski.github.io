import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const expoSocialSignIn: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2021-02-20',
        duration: 8,
        id: ArticleId.expoSocialSignIn,
        languages: [Language.en],
        shareImage: 'firebase-auth-providers.png'
    }
};
