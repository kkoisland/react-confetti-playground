import { type ReactNode, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { type Locale, useLocaleContext } from "./i18n";

export const NAV_HOVER_STYLES =
	"hover:text-indigo-600 dark:hover:text-indigo-300";

const LOCALES = [
	{ code: "en-US", label: "English" },
	{ code: "ja-JP", label: "日本語" },
	{ code: "zh-CN", label: "中文" },
	{ code: "ko-KR", label: "한국어" },
	{ code: "es-ES", label: "Español" },
	{ code: "fr-FR", label: "Français" },
	{ code: "de-DE", label: "Deutsch" },
	{ code: "it-IT", label: "Italiano" },
	{ code: "nl-NL", label: "Nederlands" },
	{ code: "sv-SE", label: "Svenska" },
] as const;

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem("react-confetti-playground:darkMode");
		if (saved !== null) return JSON.parse(saved);
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	const { locale, setLocale } = useLocaleContext();

	const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
								onChange={(e) => setLocale(e.target.value as Locale)}
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
						React Confetti Playground by kkoisland (Keiko) |{" "}
					<FormattedMessage id="layout.builtWith" />{" "}
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
							<FormattedMessage id="layout.footerViewSource" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
