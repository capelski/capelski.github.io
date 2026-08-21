import React, { useState } from 'react';
import { useIsMediumUp } from '../breakpoints';
import { ArticleId } from './article-id';

/** Widths, in pixels, an article image can be displayed at. The 600px one does not fit
 * below the medium breakpoint, where the image is stretched to the container instead
 */
export type ArticleImageWidth = 300 | 600;

const mediumUpOnlyWidths: ArticleImageWidth[] = [600];

type ArticleImageProps = {
    articleId: ArticleId;
    filename: string;
    footer?: string;
    width?: ArticleImageWidth;
} & ({ alt: string; footer?: string } | { alt?: string; footer: string });

export const ArticleImage: React.FC<ArticleImageProps> = (props) => {
    const [loadError, setLoadError] = useState(false);
    const isMediumUp = useIsMediumUp();

    const width =
        props.width && (isMediumUp || !mediumUpOnlyWidths.includes(props.width))
            ? props.width
            : undefined;

    return (
        <div>
            <img
                className={`article-image${props.footer ? ' with-footer' : ''}${
                    loadError ? ' image-placeholder' : ''
                }${props.width ? ` image-${props.width}` : ''}`}
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
                    /* The requested width takes precedence over the placeholder one */
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
