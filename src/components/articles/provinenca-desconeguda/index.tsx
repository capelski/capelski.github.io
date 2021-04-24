import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { catalan } from './catalan';

export const provinencaDesconeguda: Article = {
    content: () => catalan,
    metadata: {
        category: ArticleCategory.offTopic,
        date: '2020-04-27',
        duration: 3,
        id: ArticleId.provinencaDesconeguda,
        languages: [Language.ca]
    }
};
