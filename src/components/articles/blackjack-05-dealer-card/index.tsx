import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const blackjack05DealerCard: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2026-08-18',
        duration: 8,
        id: ArticleId.blackjack05DealerCard,
        languages: [Language.en],
        shareImage: 'dealer-card-unknown.png'
    }
};
