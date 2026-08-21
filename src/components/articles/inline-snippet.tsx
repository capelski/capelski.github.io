import React from 'react';

export const InlineSnippet: React.FC<React.PropsWithChildren> = (props) => (
    <span
        className="article-inline-snippet"
        style={{
            background: 'rgb(242, 242, 242)',
            fontFamily: 'monospace',
            padding: '2px 4px'
        }}
    >
        {props.children}
    </span>
);
