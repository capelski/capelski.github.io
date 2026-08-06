export enum Language {
    ca = 'ca',
    en = 'en'
}

export const AllLanguages: Language[] = Object.keys(Language).map(
    (languageKey) => Language[languageKey as Language]
);

/** Implicit default language; not persisted in the URL query string */
export const defaultLanguage = Language.en;

/** Resolves a language from its URL-friendly key, or undefined when not recognized */
export const getLanguageFromKey = (key: string | null): Language | undefined =>
    key && key in Language ? Language[key as keyof typeof Language] : undefined;
