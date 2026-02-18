import { type ReactNode, useEffect, useState } from "react";

export const NAV_HOVER_STYLES =
	"hover:text-indigo-600 dark:hover:text-indigo-300";

const LOCALES = [
	{ code: "en", label: "English" },
	{ code: "ja", label: "日本語" },
	{ code: "zh", label: "中文" },
	{ code: "ko", label: "한국어" },
	{ code: "es", label: "Español" },
	{ code: "fr", label: "Français" },
	{ code: "de", label: "Deutsch" },
	{ code: "pt", label: "Português" },
	{ code: "it", label: "Italiano" },
	{ code: "ru", label: "Русский" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

const getInitialLocale = (): Locale => {
	const saved = localStorage.getItem("react-confetti-playground:language");
	if (saved && LOCALES.some((l) => l.code === saved)) return saved as Locale;
	const browser = navigator.language.split("-")[0];
	return (LOCALES.find((l) => l.code === browser)?.code ?? "en") as Locale;
};

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem("react-confetti-playground:darkMode");
		if (saved !== null) return JSON.parse(saved);
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	const [locale, setLocale] = useState<Locale>(getInitialLocale);

	const toggleTheme = () => setIsDarkMode(!isDarkMode);

	const handleLocaleChange = (newLocale: Locale) => {
		setLocale(newLocale);
		localStorage.setItem("react-confetti-playground:language", newLocale);
	};

	useEffect(() => {
		localStorage.setItem(
			"react-confetti-playground:darkMode",
			JSON.stringify(isDarkMode),
		);
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
			<header className="backdrop-blur-md shadow-sm sticky top-0 z-10">
				<nav className="px-4 py-2">
					<div className="flex justify-between items-center">
						<div>
							<span className="text-2xl font-bold">
								React Confetti Playground
							</span>
						</div>

						<div className="flex items-center gap-4">
							<select
								value={locale}
								onChange={(e) => handleLocaleChange(e.target.value as Locale)}
								className="text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer"
							>
								{LOCALES.map((l) => (
									<option key={l.code} value={l.code}>
										{l.label}
									</option>
								))}
							</select>

							<button type="button" onClick={toggleTheme}>
								{isDarkMode ? "☀️" : "🌙"}
							</button>
						</div>
					</div>
				</nav>
			</header>

			<main className="flex-grow">{children}</main>

			<footer className="py-4 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
				<div className="flex flex-col gap-2">
					<div>
						React Confetti Playground by kkoisland (Keiko) | Built with{" "}
						<a
							href="https://github.com/alampros/react-confetti"
							target="_blank"
							rel="noopener noreferrer"
							className={`underline ${NAV_HOVER_STYLES}`}
						>
							react-confetti
						</a>
					</div>
					<div>
						<a
							href="https://github.com/kkoisland/react-confetti-playground"
							target="_blank"
							rel="noopener noreferrer"
							className={`underline ${NAV_HOVER_STYLES}`}
						>
							View Source on GitHub
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
