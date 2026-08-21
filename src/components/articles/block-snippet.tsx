import React from 'react';

export const BlockSnippet: React.FC<React.PropsWithChildren> = (props) => (
    <div
        className="article-block-snippet"
        style={{
            background: 'rgb(242, 242, 242)',
            fontFamily: 'monospace',
            fontSize: 16,
            marginTop: 16,
            padding: 8
        }}
    >
        {props.children}
    </div>
);
