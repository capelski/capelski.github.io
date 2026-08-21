import React from 'react';
import { useIsLargeUp, useIsMediumUp } from './breakpoints';

const linksHeight = 64;
const mobilePadding = 16;
const desktopPadding = 32;

export const sectionLinkStyle: React.CSSProperties = {
    color: 'black',
    cursor: 'pointer',
    fontSize: 24,
    lineHeight: '32px',
    padding: 16,
    textDecoration: 'none'
};

export interface SectionContainerProps {
    children?: React.ReactNode;
    /** Merged into the section content styles (e.g. to center the error section) */
    contentStyle?: React.CSSProperties;
    links: React.JSX.Element;
    /** Merged into the links bar styles (e.g. to align the section links) */
    linksStyle?: React.CSSProperties;
    sectionName: string;
    /** Name the browser uses to animate the section in and out; see style/main.css */
    viewTransitionName: string;
    viewportRef?: React.RefObject<HTMLDivElement | null>;
}

export const SectionContainer: React.FC<SectionContainerProps> = (props) => {
    const isMediumUp = useIsMediumUp();
    const isLargeUp = useIsLargeUp();

    return (
        <div className={props.sectionName} style={{ height: '100%' }}>
            <div
                className="section-viewport"
                ref={props.viewportRef}
                style={{
                    height: `calc(100% - ${linksHeight}px)`,
                    overflowY: 'auto',
                    viewTransitionName: props.viewTransitionName
                }}
            >
                <div
                    className="section-content"
                    style={{
                        boxSizing: 'border-box',
                        margin: isMediumUp ? 'auto' : undefined,
                        maxWidth: isLargeUp ? 960 : isMediumUp ? 720 : undefined,
                        minHeight: '100%',
                        overflowX: 'hidden',
                        padding: isMediumUp
                            ? `${desktopPadding}px 0 0 0`
                            : `${mobilePadding * 1.5}px ${mobilePadding}px 0 ${mobilePadding}px`,
                        ...props.contentStyle
                    }}
                >
                    {props.children ? props.children : null}
                </div>
            </div>
            <div
                className="section-links"
                style={{
                    alignItems: 'center',
                    boxShadow: '-2px 0px 3px lightgrey',
                    display: 'flex',
                    height: linksHeight,
                    /* Shared across every section, so that the links bar stays in place (and
                     * cross-fades its contents) instead of sliding along with the section */
                    viewTransitionName: 'section-links',
                    ...props.linksStyle
                }}
            >
                {props.links}
            </div>
        </div>
    );
};
