import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const wordpressOnGoogleCloud: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2020-12-07',
        duration: 7,
        id: ArticleId.wordpressOnGoogleCloud,
        languages: [Language.en],
        shareImage: 'wordpress-site.png'
    }
};
