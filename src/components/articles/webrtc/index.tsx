import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const webRTC: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2023-07-12',
        duration: 7,
        id: ArticleId.webRTC,
        languages: [Language.en],
        shareImage: 'webrtc-connection-diagram.png'
    }
};
