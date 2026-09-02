import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const blackjack06Doubling: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2026-09-02',
        duration: 5,
        id: ArticleId.blackjack06Doubling,
        languages: [Language.en],
        shareImage: 'doubling.png'
    }
};
