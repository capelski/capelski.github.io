import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const blackjack03PredictingEarnings: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2023-07-24',
        duration: 6,
        id: ArticleId.blackjack03PredictingEarnings,
        languages: [Language.en],
        shareImage: 'bullseye.png'
    }
};
