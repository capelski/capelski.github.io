import React from 'react';

export interface SectionContainerProps {
    children?: React.ReactNode;
    links: React.JSX.Element;
    sectionName: string;
    viewportRef?: React.RefObject<HTMLDivElement | null>;
}

export const SectionContainer: React.FC<SectionContainerProps> = (props) => (
    <div className={props.sectionName}>
        <div className="section-viewport" ref={props.viewportRef}>
            <div className="section-content">{props.children ? props.children : null}</div>
        </div>
        <div className="section-links">{props.links}</div>
    </div>
);
