import React from 'react';
import { Anchor } from './articles/anchor';
import { Language } from './articles/language';

const badgeContent: { [key: string]: { [Language.ca]: string; [Language.en]: string } } = {
    sentence: {
        ca: "T'agrada el que escric? Dóna'm suport a",
        en: 'Do you enjoy my writing? Support me on'
    }
};

export interface PatreonBadgeProps {
    selectedLanguage: Language;
}

const PatreonBadge: React.FC<PatreonBadgeProps> = (props) => {
    const patreonUrl = 'https://www.patreon.com/cw/capelski';

    return (
        <div
            className="patreon-badge"
            style={{
                backgroundColor: 'rgb(217, 231, 225)',
                borderRadius: 4,
                color: 'rgb(9, 89, 57)',
                marginBottom: 16,
                marginTop: 16,
                padding: 8,
                textAlign: 'center'
            }}
        >
            {badgeContent.sentence[props.selectedLanguage]}{' '}
            <Anchor url={patreonUrl}>Patreon</Anchor>
        </div>
    );
};

export default PatreonBadge;
