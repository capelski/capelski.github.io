import React from 'react';
import { NavLink } from 'react-router-dom';
import { Article as IArticle, ArticleMetadata, getArticleLanguage } from './articles/article-data';
import { Language } from './articles/language';
import { getArticlePath } from './routes';

const articleLinksContent: { [key: string]: { [Language.ca]: string; [Language.en]: string } } = {
    following: {
        ca: 'Següent',
        en: 'Following'
    },
    previous: {
        ca: 'Anterior',
        en: 'Previous'
    },
    postsTimeline: {
        ca: 'Històric de posts',
        en: 'Posts timeline'
    }
};

export interface ArticleNavigationProps {
    metadata: ArticleMetadata;
    nextArticle?: IArticle;
    previousArticle?: IArticle;
    selectedLanguage: Language;
    shareSentence: string;
    title: string;
}

export const ArticleNavigation: React.FC<ArticleNavigationProps> = (props) => {
    const shareHandler = async () => {
        try {
            await window.navigator.share({
                text: props.shareSentence,
                title: props.title,
                url: `${PRODUCTION_URL_BASE}${getArticlePath(props.metadata, props.selectedLanguage)}`
            });
        } catch (error) {}
    };

    const linkTextStyle: React.CSSProperties = { color: 'black', fontSize: 20 };
    const titlePreviewStyle: React.CSSProperties = { fontSize: 16, marginTop: 8 };

    return (
        <React.Fragment>
            <h3 className="posts-timeline" style={{ marginBottom: 0, marginTop: 32 }}>
                {articleLinksContent['postsTimeline'][props.selectedLanguage]}
            </h3>
            <div
                className="article-links"
                style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}
            >
                <div className="previous-link" style={{ margin: '16px 0' }}>
                    {props.previousArticle && (
                        <span className="link-text" style={linkTextStyle}>
                            <NavLink
                                viewTransition={true}
                                to={getArticlePath(
                                    props.previousArticle.metadata,
                                    props.selectedLanguage
                                )}
                                style={{ textDecoration: 'none' }}
                            >
                                ⬅️ {articleLinksContent['previous'][props.selectedLanguage]}
                            </NavLink>
                            <div className="title-preview" style={titlePreviewStyle}>
                                {
                                    props.previousArticle.content(
                                        getArticleLanguage(
                                            props.previousArticle.metadata,
                                            props.selectedLanguage
                                        )
                                    ).title
                                }
                            </div>
                        </span>
                    )}
                </div>
                <div className="next-link" style={{ margin: '16px 0', textAlign: 'right' }}>
                    {props.nextArticle && (
                        <span className="link-text" style={linkTextStyle}>
                            <NavLink
                                viewTransition={true}
                                to={getArticlePath(
                                    props.nextArticle.metadata,
                                    props.selectedLanguage
                                )}
                                style={{ textDecoration: 'none' }}
                            >
                                {articleLinksContent['following'][props.selectedLanguage]} ➡️
                            </NavLink>
                            <div className="title-preview" style={titlePreviewStyle}>
                                {
                                    props.nextArticle.content(
                                        getArticleLanguage(
                                            props.nextArticle.metadata,
                                            props.selectedLanguage
                                        )
                                    ).title
                                }
                            </div>
                        </span>
                    )}
                </div>
            </div>
            {typeof navigator !== 'undefined' && (
                <div className="share-button" style={{ cursor: 'pointer', margin: '16px 0' }}>
                    <img
                        src="/images/share.png"
                        onClick={shareHandler}
                        style={{ display: 'block', height: 48, margin: 'auto', width: 48 }}
                    />
                </div>
            )}
        </React.Fragment>
    );
};
