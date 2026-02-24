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

const GitHubIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
	</svg>
);

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
							<span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
								for react-confetti
							</span>
						</div>

						<div className="flex items-center gap-4">
							<a
								href="https://github.com/kkoisland/react-confetti-playground"
								target="_blank"
								rel="noopener noreferrer"
								className={NAV_HOVER_STYLES}
								aria-label="View source on GitHub"
							>
								<GitHubIcon />
							</a>

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
							href="https://github.com/kkoisland/react-confetti-playground/issues"
							target="_blank"
							rel="noopener noreferrer"
							className={`underline ${NAV_HOVER_STYLES}`}
						>
							<FormattedMessage id="layout.feedbackLink" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
