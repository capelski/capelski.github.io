import React from 'react';

interface AnchorProps {
    children?: React.ReactNode;
    url: string;
}

export const Anchor: React.FC<AnchorProps> = (props) => (
    <a href={props.url} target="_blank">
        {props.children}
    </a>
);
