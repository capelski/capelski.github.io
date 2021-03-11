import React from 'react';

interface InlineSnippetProps {
    text: string;
}

export const InlineSnippet: React.FC<InlineSnippetProps> = (props) => (
    <span className="inline-snippet">{props.text}</span>
);
