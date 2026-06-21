import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const blackjack01SolidDecisions: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2026-06-21',
        duration: 8,
        id: ArticleId.blackjack01SolidDecisions,
        languages: [Language.en],
        shareImage: 'sample-15-upcoming-unknown.png'
    }
};
