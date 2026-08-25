import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { ArticleCategory, defaultCategory } from './articles/article-category';
import { defaultLanguage, Language } from './articles/language';

export interface AppContext {
    selectedCategory: ArticleCategory;
    selectedLanguage: Language;
    setSelectedCategory: (category: ArticleCategory) => void;
    setSelectedLanguage: (language: Language) => void;
}

export const useAppContext = () => useOutletContext<AppContext>();

export const App: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>(defaultCategory);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);

    return (
        <div className="app-container" style={{ height: '100%', overflowX: 'hidden' }}>
            <Outlet
                context={
                    {
                        selectedCategory,
                        setSelectedCategory,
                        selectedLanguage,
                        setSelectedLanguage
                    } satisfies AppContext
                }
            />
        </div>
    );
};
