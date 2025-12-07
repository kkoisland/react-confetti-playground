import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const NAV_ACTIVE_STYLES = "text-indigo-600 dark:text-indigo-300 font-bold";
export const NAV_HOVER_STYLES =
	"hover:text-indigo-600 dark:hover:text-indigo-300";

const Layout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem("react-confetti-app:darkMode");
		if (saved !== null) return JSON.parse(saved);
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});
	const toggleTheme = () => setIsDarkMode(!isDarkMode);

	useEffect(() => {
		localStorage.setItem(
			"react-confetti-app:darkMode",
			JSON.stringify(isDarkMode),
		);
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	const navLinks = [
		{ to: "/basic", label: "Basic" },
		{ to: "/countdown", label: "Countdown" },
		{ to: "/toast", label: "Toast" },
		{ to: "/seasonal", label: "Seasonal" },
		{ to: "/playground", label: "Playground" },
	];

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
			<header className="backdrop-blur-md shadow-sm sticky top-0 z-10">
				<nav className="px-4 py-2">
					<div className="flex justify-between items-center">
						<div>
							<Link
								to="/"
								className={`text-2xl font-bold ${NAV_HOVER_STYLES} transition-colors`}
							>
								React Confetti
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex space-x-8">
							{navLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									className={({ isActive }) =>
										`${NAV_HOVER_STYLES} transition-colors ${
											isActive ? NAV_ACTIVE_STYLES : ""
										}`
									}
								>
									{link.label}
								</NavLink>
							))}
						</div>

						{/* Right side buttons */}
						<div className="flex items-center gap-4">
							<button type="button" onClick={toggleTheme}>
								{isDarkMode ? "☀️" : "🌙"}
							</button>

							<div className="md:hidden">
								<button
									type="button"
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className={`text-3xl ${NAV_HOVER_STYLES} transition-colors`}
								>
									{isMenuOpen ? "✕" : "☰"}
								</button>
							</div>
						</div>
					</div>

					{isMenuOpen && (
						<div className="md:hidden mt-4">
							{navLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									onClick={() => setIsMenuOpen(false)}
									className={({ isActive }) =>
										`block py-3 px-4 text-lg ${NAV_HOVER_STYLES} transition-colors font-bold ${
											isActive ? NAV_ACTIVE_STYLES : ""
										}`
									}
								>
									{link.label}
								</NavLink>
							))}
						</div>
					)}
				</nav>
			</header>

			<main className="flex-grow">
				<Outlet />
			</main>

			<footer className="py-4 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
				<div className="flex flex-col gap-2">
					<div>
						React Confetti Sample App by kkoisland (Keiko) | Built with{" "}
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
							href="https://github.com/kkoisland/react-confetti-app"
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
