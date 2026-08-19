import React from 'react';

export const InlineSnippet: React.FC<React.PropsWithChildren> = (props) => (
    <span className="article-inline-snippet">{props.children}</span>
);
