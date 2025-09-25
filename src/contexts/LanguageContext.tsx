import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { translations, productTranslations } from '@/i18n/translations';
import type { ProductItem } from '@/data/products';

export type LanguageCode = 'en' | 'am';

interface LanguageContextValue {
	language: LanguageCode;
	setLanguage: (code: LanguageCode) => void;
	t: (key: string) => string;
	translateProduct: (p: ProductItem) => ProductItem;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const useLanguage = (): LanguageContextValue => {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
	return ctx;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [language, setLanguageState] = useState<LanguageCode>('en');

	useEffect(() => {
		const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
		if (stored === 'en' || stored === 'am') setLanguageState(stored);
	}, []);

	const setLanguage = useCallback((code: LanguageCode) => {
		setLanguageState(code);
		try { localStorage.setItem('lang', code); } catch {}
	}, []);

	const t = useCallback((key: string) => {
		const table = translations[language] || {};
		return (table[key] as string) ?? key;
	}, [language]);

	const translateProduct = useCallback((p: ProductItem): ProductItem => {
		if (language === 'en') return p;
		const tr = productTranslations[p.id]?.[language];
		if (!tr) return p;
		return { ...p, name: tr.name ?? p.name, description: tr.description ?? p.description };
	}, [language]);

	const value = useMemo(() => ({ language, setLanguage, t, translateProduct }), [language, setLanguage, t, translateProduct]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};




