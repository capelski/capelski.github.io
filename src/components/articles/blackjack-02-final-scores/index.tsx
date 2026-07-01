import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const blackjack02FinalScores: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2026-07-01',
        duration: 6,
        id: ArticleId.blackjack02FinalScores,
        languages: [Language.en],
        shareImage: 'dealer-hands-tree.png'
    }
};
