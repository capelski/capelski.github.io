import React, { useState } from 'react';
import { useIsMediumUp } from '../breakpoints';
import { ArticleId } from './article-id';

/** Widths, in pixels, the article contents can request through the className prop. The
 * 600px one only fits from the medium breakpoint up
 */
const imageWidths: { [className: string]: { mediumUpOnly?: boolean; width: number } } = {
    'image-300': { width: 300 },
    'image-600': { mediumUpOnly: true, width: 600 }
};

type ArticleImageProps = {
    articleId: ArticleId;
    className?: string;
    filename: string;
    footer?: string;
} & ({ alt: string; footer?: string } | { alt?: string; footer: string });

export const ArticleImage: React.FC<ArticleImageProps> = (props) => {
    const [loadError, setLoadError] = useState(false);
    const isMediumUp = useIsMediumUp();

    const requestedWidth = props.className ? imageWidths[props.className] : undefined;
    const width =
        requestedWidth && (!requestedWidth.mediumUpOnly || isMediumUp)
            ? requestedWidth.width
            : undefined;

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
                    // Grey box as a placeholder for image loading errors
                    backgroundColor: loadError ? '#f2f2f2' : undefined,
                    boxSizing: loadError ? 'border-box' : undefined,
                    display: 'block',
                    /* No bottom margin when a footer follows the image */
                    margin: props.footer ? '32px auto 0' : '32px auto',
                    maxWidth: '100%',
                    padding: loadError ? '96px 24px' : undefined,
                    /* A requested width takes precedence over the placeholder one */
                    width: width || (loadError ? '100%' : undefined)
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
