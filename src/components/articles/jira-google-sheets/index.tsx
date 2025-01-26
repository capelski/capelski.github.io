import { ArticleCategory } from '../article-category';
import { Article } from '../article-data';
import { ArticleId } from '../article-id';
import { Language } from '../language';
import { english } from './english';

export const jiraGoogleSheets: Article = {
    content: () => english,
    metadata: {
        category: ArticleCategory.tech,
        date: '2025-01-26',
        duration: 6,
        id: ArticleId.jiraGoogleSheets,
        languages: [Language.en],
        shareImage: 'jira-cloud-function-description.png'
    }
};
