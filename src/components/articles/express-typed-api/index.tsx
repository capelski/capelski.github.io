import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const expressTypedApi: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: 'TODO',
        duration: -1, // TODO
        id: ArticleId.expressTypedApi,
        languages: [Language.en]
    }
};
