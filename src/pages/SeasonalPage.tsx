import { useState } from "react";
import Confetti from "react-confetti";

const THEME_SWITCH_DELAY = 100;

export const themes = [
	{
		id: "sakura",
		name: "Sakura",
		emoji: "🌸",
		description: "Cherry blossom petals gently swirl and flutter in the breeze",
		colors: ["#FFB7C5", "#FFC0CB"],
		numberOfPieces: 100,
		gravity: 0.02,
		wind: 0.01,
		initialVelocityY: -3,
	},
	{
		id: "snow",
		name: "Snow",
		emoji: "❄️",
		description: "Snowflakes softly fall straight down (dark mode recommended)",
		colors: ["#FFFFFF", "#E0F2F7"],
		numberOfPieces: 300,
		gravity: 0.01,
		initialVelocityY: -7,
	},
	{
		id: "koyo",
		name: "Autumn",
		emoji: "🍁",
		description: "Autumn leaves dance and swirl in the wind",
		colors: ["#FF6347", "#FFA500"],
		numberOfPieces: 200,
		gravity: 0.08,
		wind: 0.02,
	},
	{
		id: "star",
		name: "Star",
		emoji: "✨",
		description:
			"Gold, silver, and sand shimmer and gently float (dark mode recommended)",
		colors: ["#DAA520", "#E8E8E8", "#E6BE8A"],
		numberOfPieces: 150,
		gravity: 0.0005,
		initialVelocityY: -9,
	},
	{
		id: "christmas",
		name: "Christmas",
		emoji: "🎄",
		description: "Festive confetti bursts and spreads in celebration",
		colors: ["#FF0000", "#00FF00", "#DAA520", "#4169E1"],
		numberOfPieces: 500,
		gravity: 0.06,
		initialVelocityX: 5,
	},
];

const SeasonalPage = () => {
	const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(
		null,
	);
	const currentTheme =
		selectedThemeIndex !== null ? themes[selectedThemeIndex] : null;
	const [showConfetti, setShowConfetti] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopyCode = () => {
		if (!currentTheme) return;

		const jsxCode = `<Confetti
    colors={${JSON.stringify(currentTheme.colors)}}
    numberOfPieces={${currentTheme.numberOfPieces}}
    gravity={${currentTheme.gravity}}${
			currentTheme.wind !== undefined
				? `\n  
  wind={${currentTheme.wind}}`
				: ""
		}${
			currentTheme.initialVelocityY !== undefined
				? `\n  
  initialVelocityY={${currentTheme.initialVelocityY}}`
				: ""
		}${
			currentTheme.initialVelocityX !== undefined
				? `\n  initialVelocityX={${currentTheme.initialVelocityX}}`
				: ""
		}
  />`;

		navigator.clipboard.writeText(jsxCode);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div className="flex flex-col items-center justify-center h-full gap-8 p-4">
			<div className="flex flex-col md:flex-row gap-4">
				{themes.map((t, index) => {
					const isSelected = index === selectedThemeIndex;
					return (
						<button
							type="button"
							key={t.id}
							onClick={() => {
								setShowConfetti(false);
								setSelectedThemeIndex(index);
								setTimeout(() => {
									setShowConfetti(true);
								}, THEME_SWITCH_DELAY);
							}}
							className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${
								isSelected
									? "bg-gradient-to-r from-orange-100 to-pink-200 text-gray-800"
									: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							{t.emoji} {t.name}
						</button>
					);
				})}
			</div>
			{/* Description */}
			{currentTheme && (
				<p className="text-xl text-gray-600 dark:text-gray-400">
					{currentTheme.description}
				</p>
			)}

			{showConfetti && (
				<button
					type="button"
					onClick={() => setShowConfetti(false)}
					className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
				>
					Stop Confetti
				</button>
			)}

			{/* Confetti */}
			{showConfetti && currentTheme && (
				<Confetti
					colors={currentTheme.colors}
					numberOfPieces={currentTheme.numberOfPieces}
					gravity={currentTheme.gravity}
					wind={currentTheme.wind}
					initialVelocityY={currentTheme.initialVelocityY}
					initialVelocityX={currentTheme.initialVelocityX}
				/>
			)}

			{/* Parameters */}
			{showConfetti && currentTheme && (
				<div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-start justify-between gap-4">
						<div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
							<div>
								<span className="font-semibold">Theme:</span>{" "}
								{currentTheme.name}
							</div>
							<div>
								<span className="font-semibold">Colors:</span>{" "}
								{currentTheme.colors.join(", ")}
							</div>
							<div>
								<span className="font-semibold">Pieces:</span>{" "}
								{currentTheme.numberOfPieces}
							</div>
							<div>
								<span className="font-semibold">Gravity:</span>{" "}
								{currentTheme.gravity}
							</div>
							{currentTheme.wind !== undefined && (
								<div>
									<span className="font-semibold">Wind:</span>{" "}
									{currentTheme.wind}
								</div>
							)}
							{currentTheme.initialVelocityY !== undefined && (
								<div>
									<span className="font-semibold">InitialVelocityY:</span>{" "}
									{currentTheme.initialVelocityY}
								</div>
							)}
							{currentTheme.initialVelocityX !== undefined && (
								<div>
									<span className="font-semibold">InitialVelocityX:</span>{" "}
									{currentTheme.initialVelocityX}
								</div>
							)}
						</div>
						<button
							type="button"
							onClick={handleCopyCode}
							className="w-20 px-2 py-1 text-xs bg-gradient-to-r from-orange-100 to-pink-200 text-gray-800 font-semibold rounded hover:from-orange-200 hover:to-pink-300 transition-all whitespace-nowrap"
						>
							{copied ? "Copied!" : "Copy Code"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SeasonalPage;
