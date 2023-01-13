import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const expressTypedApi: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2023-01-13',
        duration: 8,
        id: ArticleId.expressTypedApi,
        languages: [Language.en]
    }
};
