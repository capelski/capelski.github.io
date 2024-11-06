import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const webApiProxyMigration: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2024-11-06',
        duration: 8,
        id: ArticleId.webApiProxyMigration,
        languages: [Language.en],
        shareImage: 'web-proxy.png'
    }
};
