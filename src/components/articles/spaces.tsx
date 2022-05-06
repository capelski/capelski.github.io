import React from 'react';

export interface SpacesProps {
    number: number;
}

export const Spaces: React.FC<SpacesProps> = (props) => (
    <span>{Array(props.number).fill('\u00A0').join('')}</span>
);
