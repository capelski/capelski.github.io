import React from 'react';

interface AnchorProps {
    url: string;
}

export const Anchor: React.FC<AnchorProps> = (props) => (
    <a href={props.url} target="_blank">
        {props.children}
    </a>
);
