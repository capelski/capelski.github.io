import React from 'react';

const linksHeight = 64;

export interface SectionContainerProps {
    children?: React.ReactNode;
    /** Merged into the section content styles (e.g. to center the error section) */
    contentStyle?: React.CSSProperties;
    links: React.JSX.Element;
    /** Merged into the links bar styles (e.g. to align the section links) */
    linksStyle?: React.CSSProperties;
    sectionName: string;
    /** Name the browser uses to animate the section in and out; see style/animations.scss */
    viewTransitionName: string;
    viewportRef?: React.RefObject<HTMLDivElement | null>;
}

export const SectionContainer: React.FC<SectionContainerProps> = (props) => (
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
            <div className="section-content" style={props.contentStyle}>
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
