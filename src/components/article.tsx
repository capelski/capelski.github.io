import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArticleNavigation } from './article-navigation';
import { Article as IArticle, getArticleLanguage } from './articles/article-data';
import { Language } from './articles/language';
import { useIsMediumUp } from './breakpoints';
import PatreonBadge from './patreon-badge';
import { getArticlePath } from './routes';

interface ArticleBaseProps extends IArticle {
    selectedLanguage: Language;
}

export interface ArticlePreviewProps extends ArticleBaseProps {
    preview: true;
}

export interface ArticleFullProps extends ArticleBaseProps {
    nextArticle?: IArticle;
    preview: false;
    previousArticle?: IArticle;
}

export type ArticleProps = ArticlePreviewProps | ArticleFullProps;

export const Article: React.FC<ArticleProps> = (props) => {
    const navigationRef = useRef<HTMLAnchorElement>(null);
    const isMediumUp = useIsMediumUp();

    // Ignore languages the article has no translations for (e.g. in the blog previews)
    const articleLanguage = getArticleLanguage(props.metadata, props.selectedLanguage);
    const content = props.content(articleLanguage);

    const containerClickHandler = () => {
        if (props.preview) {
            navigationRef.current?.click();
        }
    };

    const titleStyle: React.CSSProperties = { marginBottom: isMediumUp ? 8 : undefined };

    const detailStyle: React.CSSProperties = {
        display: 'inline-block',
        marginTop: 8,
        paddingRight: 8,
        whiteSpace: 'nowrap'
    };

    return (
        <div
            className={`article ${props.metadata.id}${props.preview ? '  preview-mode' : ''}`}
            onClick={props.preview ? containerClickHandler : undefined}
            lang={articleLanguage}
            style={{ cursor: props.preview ? 'pointer' : undefined }}
        >
            <div
                className="article-info"
                style={{
                    alignItems: isMediumUp ? 'baseline' : undefined,
                    display: isMediumUp ? 'flex' : undefined
                }}
            >
                {props.preview ? (
                    <h3 className="article-title" style={titleStyle}>
                        {content.title}
                    </h3>
                ) : (
                    <h2 className="article-title" style={titleStyle}>
                        {content.title}
                    </h2>
                )}
                <div
                    className="article-details"
                    style={{ margin: isMediumUp ? '8px 0 8px 16px' : '8px 0' }}
                >
                    <span className="article-date" style={detailStyle}>
                        📅 {props.metadata.date}
                    </span>
                    <span className="article-duration" style={detailStyle}>
                        🕐 {props.metadata.duration} mins
                    </span>
                    {props.metadata.languages.map((language) => {
                        const isSelected = articleLanguage === language;

                        const languageStyle: React.CSSProperties = {
                            ...detailStyle,
                            fontWeight: !props.preview && isSelected ? 700 : undefined
                        };

                        /* Each translation has a url of its own (see the article routes in
                         * router-config.tsx), so switching language is a navigation. It is
                         * not worth a history entry: going back from an article lands on
                         * the section it was reached from
                         */
                        return props.preview ? (
                            <span key={language} style={languageStyle}>
                                🌎 {language}
                            </span>
                        ) : (
                            <NavLink
                                key={language}
                                className={`article-language${
                                    isSelected ? ' selected-language' : ''
                                }`}
                                replace={true}
                                style={{
                                    ...languageStyle,
                                    cursor: isSelected ? 'default' : 'pointer',
                                    textDecoration: 'none'
                                }}
                                to={getArticlePath(props.metadata, language)}
                            >
                                🌎 {language}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            {!props.preview && <PatreonBadge selectedLanguage={articleLanguage} />}
            <div className="article-body">
                {content.introduction}
                {props.preview
                    ? null
                    : typeof content.body === 'function'
                      ? React.createElement(content.body)
                      : content.body}
                {props.preview ? (
                    <NavLink
                        viewTransition={true}
                        ref={navigationRef}
                        to={getArticlePath(props.metadata, articleLanguage)}
                        className="programmatic-link"
                        style={{ display: 'none' }}
                    />
                ) : (
                    <React.Fragment>
                        <PatreonBadge selectedLanguage={articleLanguage} />
                        <ArticleNavigation
                            metadata={props.metadata}
                            shareSentence={content.shareSentence || content.description}
                            nextArticle={props.nextArticle}
                            previousArticle={props.previousArticle}
                            selectedLanguage={articleLanguage}
                            title={content.title}
                        />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
