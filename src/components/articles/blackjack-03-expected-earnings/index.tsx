import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { catalan } from './catalan';
import { english } from './english';

export const blackjack03ExpectedEarnings: Article = {
    content: (language: Language) => (language === Language.ca ? catalan : english),
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2023-07-24',
        duration: 6,
        id: ArticleId.blackjack03ExpectedEarnings,
        languages: [Language.ca, Language.en],
        shareImage: 'bullseye.png'
    }
};
