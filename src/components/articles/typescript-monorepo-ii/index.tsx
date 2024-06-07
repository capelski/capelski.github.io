import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const typescriptMonorepoII: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2024-06-07',
        duration: 5,
        id: ArticleId.typescriptMonorepoII,
        languages: [Language.en]
    }
};
