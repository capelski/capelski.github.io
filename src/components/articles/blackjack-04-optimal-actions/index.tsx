import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const blackjack04OptimalActions: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2026-08-05',
        duration: 7,
        id: ArticleId.blackjack04OptimalActions,
        languages: [Language.en],
        shareImage: 'domino-effect.png'
    }
};
