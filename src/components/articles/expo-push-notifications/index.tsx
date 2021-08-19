import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const expoPushNotifications: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2021-08-19',
        duration: 12,
        id: ArticleId.expoPushNotifications,
        languages: [Language.en],
        shareImage: 'push-token-notification.png'
    }
};
