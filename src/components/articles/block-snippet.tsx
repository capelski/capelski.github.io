import React from 'react';

export const BlockSnippet: React.FC<React.PropsWithChildren> = (props) => (
    <div className="article-block-snippet">{props.children}</div>
);
