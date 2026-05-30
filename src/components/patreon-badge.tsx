import React from 'react';
import { Anchor } from './articles/anchor';

const PatreonBadge: React.FC = () => {
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
            Do you enjoy my writing? Support me on <Anchor url={patreonUrl}>Patreon</Anchor> 💸🙏
        </div>
    );
};

export default PatreonBadge;
