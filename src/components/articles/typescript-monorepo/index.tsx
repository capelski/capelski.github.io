import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const typescriptMonorepo: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2022-06-25',
        duration: 11,
        id: ArticleId.typescriptMonorepo,
        languages: [Language.en],
        shareImage: 'weather-now-ui.png'
    }
};
