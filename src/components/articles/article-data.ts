import { ArticleId } from './article-id';
import { defaultLanguage, Language } from './language';
import { ArticleCategory } from './article-category';

export interface ArticleContent {
    body: React.JSX.Element | React.FC<{}>;
    description: string;
    introduction: React.JSX.Element;
    shareSentence?: string;
    title: string;
}

export interface ArticleMetadata {
    category: ArticleCategory;
    date: string;
    duration: number;
    id: ArticleId;
    languages: Language[];
    shareImage?: string;
}

export interface Article {
    content: (language: Language) => ArticleContent;
    following?: ArticleId;
    metadata: ArticleMetadata;
    previous?: ArticleId;
}

/** Language an article is displayed in when no language is specified: the default one,
 * or the only available language for articles with no default language translation
 */
export const getDefaultArticleLanguage = (metadata: ArticleMetadata): Language =>
    metadata.languages.includes(defaultLanguage) ? defaultLanguage : metadata.languages[0];

/** Language an article is displayed in for a given language selection; languages the
 * article has no translation for are ignored
 */
export const getArticleLanguage = (metadata: ArticleMetadata, language?: Language): Language =>
    language && metadata.languages.includes(language)
        ? language
        : getDefaultArticleLanguage(metadata);
