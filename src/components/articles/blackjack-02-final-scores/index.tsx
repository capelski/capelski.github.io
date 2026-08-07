import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { catalan } from './catalan';
import { english } from './english';

export const blackjack02FinalScores: Article = {
    content: (language: Language) => (language === Language.ca ? catalan : english),
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2026-07-01',
        duration: 6,
        id: ArticleId.blackjack02FinalScores,
        languages: [Language.ca, Language.en],
        shareImage: 'dealer-hands-tree.png'
    }
};
