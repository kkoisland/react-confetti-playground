import { createContext, useContext, useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import type { ReactNode } from "react";

import enUS from "./locales/en-US.json";
import jaJP from "./locales/ja-JP.json";
import zhCN from "./locales/zh-CN.json";
import koKR from "./locales/ko-KR.json";
import esES from "./locales/es-ES.json";
import frFR from "./locales/fr-FR.json";
import deDE from "./locales/de-DE.json";
import itIT from "./locales/it-IT.json";
import nlNL from "./locales/nl-NL.json";
import svSE from "./locales/sv-SE.json";

export type Locale =
	| "en-US"
	| "ja-JP"
	| "zh-CN"
	| "ko-KR"
	| "es-ES"
	| "fr-FR"
	| "de-DE"
	| "it-IT"
	| "nl-NL"
	| "sv-SE";

export const SUPPORTED_LOCALES: readonly Locale[] = [
	"en-US",
	"ja-JP",
	"zh-CN",
	"ko-KR",
	"es-ES",
	"fr-FR",
	"de-DE",
	"it-IT",
	"nl-NL",
	"sv-SE",
] as const;

const messages: Record<Locale, Record<string, string>> = {
	"en-US": enUS,
	"ja-JP": jaJP,
	"zh-CN": zhCN,
	"ko-KR": koKR,
	"es-ES": esES,
	"fr-FR": frFR,
	"de-DE": deDE,
	"it-IT": itIT,
	"nl-NL": nlNL,
	"sv-SE": svSE,
};

type LocaleContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export const useLocaleContext = () => {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error("useLocaleContext must be used within IntlProvider");
	}
	return context;
};

const getInitialLocale = (): Locale => {
	const saved = localStorage.getItem("react-confetti-playground:language");
	if (saved && SUPPORTED_LOCALES.includes(saved as Locale))
		return saved as Locale;
	const browser = navigator.language;
	// Try exact match first (e.g. "ja-JP"), then language-only match (e.g. "ja" → "ja-JP")
	const exact = SUPPORTED_LOCALES.find((l) => l === browser);
	if (exact) return exact;
	const lang = browser.split("-")[0];
	const partial = SUPPORTED_LOCALES.find((l) => l.startsWith(lang));
	return partial ?? "en-US";
};

type IntlProviderProps = {
	children: ReactNode;
};

export const IntlProvider = ({ children }: IntlProviderProps) => {
	const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

	const setLocale = (newLocale: Locale) => {
		setLocaleState(newLocale);
	};

	useEffect(() => {
		localStorage.setItem("react-confetti-playground:language", locale);
	}, [locale]);

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<ReactIntlProvider
				messages={messages[locale]}
				locale={locale}
				defaultLocale="en-US"
			>
				{children}
			</ReactIntlProvider>
		</LocaleContext.Provider>
	);
};
