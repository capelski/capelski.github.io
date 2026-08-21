import React, { useState } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { defaultLanguage, getLanguageFromKey, Language } from './articles/language';
import { useIsMediumUp } from './breakpoints';

interface AppProps {
    isServerRendered: boolean;
}

const getInitialLanguage = (location: { search: string }) =>
    getLanguageFromKey(new URLSearchParams(location.search).get('language')) || defaultLanguage;

/** State shared by the app sections, exposed through the layout route Outlet */
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
    const location = useLocation();
    const isMediumUp = useIsMediumUp();
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(() =>
        getInitialLanguage(location)
    );

    return (
        <div
            className={`app-container${isMediumUp ? ' medium-up' : ''}`}
            style={{
                height: '100%',
                opacity: props.isServerRendered ? 0 : undefined,
                overflowX: 'hidden'
            }}
        >
            <Outlet context={{ selectedLanguage, setSelectedLanguage } satisfies AppContext} />
        </div>
    );
};
