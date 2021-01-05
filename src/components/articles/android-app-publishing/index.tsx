import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const androidAppPublishing: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2021-01-03',
        duration: 8,
        id: ArticleId.androidAppPublishing,
        languages: [Language.en],
        shareImage: 'play-console-home.png'
    }
};
