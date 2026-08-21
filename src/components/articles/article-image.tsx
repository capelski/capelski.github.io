import React, { useState } from 'react';
import { ArticleId } from './article-id';

type ArticleImageProps = {
    articleId: ArticleId;
    className?: string;
    filename: string;
    footer?: string;
} & ({ alt: string; footer?: string } | { alt?: string; footer: string });

export const ArticleImage: React.FC<ArticleImageProps> = (props) => {
    const [loadError, setLoadError] = useState(false);
    return (
        <div>
            <img
                className={`article-image${props.footer ? ' with-footer' : ''}${
                    loadError ? ' image-placeholder' : ''
                }${props.className ? ' ' + props.className : ''}`}
                src={`/images/blog/${props.articleId}/${props.filename}`}
                alt={props.alt || props.footer}
                onError={() => {
                    setLoadError(true);
                }}
                style={{
                    display: 'block',
                    /* No bottom margin when a footer follows the image */
                    margin: props.footer ? '32px auto 0' : '32px auto',
                    maxWidth: '100%'
                }}
            />
            {props.footer ? (
                <p className="article-image-footer" style={{ marginTop: 0, textAlign: 'center' }}>
                    {props.footer}
                </p>
            ) : null}
        </div>
    );
};
