import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { defaultLanguage, Language } from './articles/language';

interface AppProps {
    isServerRendered: boolean;
}

export interface AppContext {
    selectedLanguage: Language;
    setSelectedLanguage: (language: Language) => void;
}

export const useAppContext = () => useOutletContext<AppContext>();

/** Layout route rendering whichever section matches the current url. The section
 * enter/exit animations are handled by the browser view transitions that
 * react-router-dom triggers on every navigation; see style/main.css
 */
export const App: React.FC<AppProps> = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);

    return (
        <div
            className="app-container"
            style={{
                height: '100%',
                opacity: props.isServerRendered ? 0 : undefined,
                overflowX: 'hidden'
            }}
        >
            <Outlet context={{ selectedLanguage, setSelectedLanguage }} />
        </div>
    );
};
