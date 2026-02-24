import { useState } from "react";
import Confetti from "react-confetti";
import { FormattedMessage, useIntl } from "react-intl";
import { NAV_HOVER_STYLES } from "../Layout";
import { themes } from "../data/themes";

const DEFAULT_VALUES = {
	numberOfPieces: 200,
	gravity: 0.1,
	wind: 0,
	initialVelocityX: 4,
	initialVelocityY: 10,
	friction: 0.99,
	opacity: 1,
	useCustomColors: false,
	customColors: ["#FF0000", "#00FF00", "#0000FF", "", ""],
};

type ParameterSliderProps = {
	id: string;
	label: string;
	value: number;
	defaultValue: number;
	min: number;
	max: number;
	step: number;
	onChange: (value: number) => void;
	onReset: () => void;
};

const ParameterSlider = ({
	id,
	label,
	value,
	defaultValue,
	min,
	max,
	step,
	onChange,
	onReset,
}: ParameterSliderProps) => {
	const intl = useIntl();

	return (
		<div className="flex-1">
			<div className="flex items-center mb-1">
				<label
					htmlFor={id}
					className="text-base font-medium text-gray-700 dark:text-gray-300"
				>
					{label}: {value}{" "}
					{intl.formatMessage(
						{ id: "playground.defaultValue" },
						{ defaultValue },
					)}
				</label>
				<button
					type="button"
					onClick={() => {
						onChange(defaultValue);
						onReset();
					}}
					className={`ml-2 text-sm px-1.5 py-0.5 rounded ${NAV_HOVER_STYLES}`}
					title={intl.formatMessage({ id: "playground.resetTooltip" })}
				>
					↺
				</button>
			</div>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				onMouseUp={onReset}
				onTouchEnd={onReset}
				className="w-full"
			/>
		</div>
	);
};

const PlaygroundPage = () => {
	const intl = useIntl();

	const [numberOfPieces, setNumberOfPieces] = useState(200);
	const [gravity, setGravity] = useState(0.1);
	const [wind, setWind] = useState(0);
	const [initialVelocityX, setInitialVelocityX] = useState(4);
	const [initialVelocityY, setInitialVelocityY] = useState(10);
	const [friction, setFriction] = useState(0.99);
	const [opacity, setOpacity] = useState(1);
	const [useCustomColors, setUseCustomColors] = useState(false);
	const [customColors, setCustomColors] = useState([
		"#FF0000",
		"#00FF00",
		"#0000FF",
		"",
		"",
	]);

	const [copied, setCopied] = useState(false);
	const [showConfetti, setShowConfetti] = useState(true);
	const [showAllParameters, setShowAllParameters] = useState(false);
	const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
	const [showCodePanel, setShowCodePanel] = useState(
		() => window.innerWidth >= 768,
	);

	const confettiColors = useCustomColors
		? customColors.filter((c) => c !== "")
		: undefined; // undefined uses React Confetti's default 17 colors

	const restartConfetti = () => {
		setShowConfetti(false);
		setTimeout(() => setShowConfetti(true), 100);
	};

	const generateCodeSnippet = () => {
		let params: string[] = [];

		if (showAllParameters) {
			// Show all parameters
			params = [
				`numberOfPieces={${numberOfPieces}}`,
				`gravity={${gravity}}`,
				`wind={${wind}}`,
				`initialVelocityX={${initialVelocityX}}`,
				`initialVelocityY={${initialVelocityY}}`,
				`friction={${friction}}`,
				`opacity={${opacity}}`,
				...(useCustomColors && confettiColors && confettiColors.length > 0
					? [`colors={${JSON.stringify(confettiColors)}}`]
					: []),
			];
		} else {
			// Show only changed parameters
			params = [
				...(numberOfPieces !== DEFAULT_VALUES.numberOfPieces
					? [`numberOfPieces={${numberOfPieces}}`]
					: []),
				...(gravity !== DEFAULT_VALUES.gravity ? [`gravity={${gravity}}`] : []),
				...(wind !== DEFAULT_VALUES.wind ? [`wind={${wind}}`] : []),
				...(initialVelocityX !== DEFAULT_VALUES.initialVelocityX
					? [`initialVelocityX={${initialVelocityX}}`]
					: []),
				...(initialVelocityY !== DEFAULT_VALUES.initialVelocityY
					? [`initialVelocityY={${initialVelocityY}}`]
					: []),
				...(friction !== DEFAULT_VALUES.friction
					? [`friction={${friction}}`]
					: []),
				...(opacity !== DEFAULT_VALUES.opacity ? [`opacity={${opacity}}`] : []),
				...(useCustomColors && confettiColors && confettiColors.length > 0
					? [`colors={${JSON.stringify(confettiColors)}}`]
					: []),
			];
		}

		return params.length === 0
			? "<Confetti />"
			: `<Confetti\n  ${params.join("\n  ")}\n/>`;
	};

	const handleCopyCode = () => {
		const code = generateCodeSnippet();
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleResetParameters = () => {
		setNumberOfPieces(DEFAULT_VALUES.numberOfPieces);
		setGravity(DEFAULT_VALUES.gravity);
		setWind(DEFAULT_VALUES.wind);
		setInitialVelocityX(DEFAULT_VALUES.initialVelocityX);
		setInitialVelocityY(DEFAULT_VALUES.initialVelocityY);
		setFriction(DEFAULT_VALUES.friction);
		setOpacity(DEFAULT_VALUES.opacity);
		restartConfetti();
	};

	const handleResetColors = () => {
		setCustomColors(DEFAULT_VALUES.customColors);
		setUseCustomColors(DEFAULT_VALUES.useCustomColors);
		restartConfetti();
	};

	const handleResetAll = () => {
		setNumberOfPieces(DEFAULT_VALUES.numberOfPieces);
		setGravity(DEFAULT_VALUES.gravity);
		setWind(DEFAULT_VALUES.wind);
		setInitialVelocityX(DEFAULT_VALUES.initialVelocityX);
		setInitialVelocityY(DEFAULT_VALUES.initialVelocityY);
		setFriction(DEFAULT_VALUES.friction);
		setOpacity(DEFAULT_VALUES.opacity);
		setCustomColors(DEFAULT_VALUES.customColors);
		setUseCustomColors(DEFAULT_VALUES.useCustomColors);
		setSelectedThemeId(null);
		restartConfetti();
	};

	const handlePreset = (themeId: string) => {
		const theme = themes.find((t) => t.id === themeId);
		if (!theme) return;
		setNumberOfPieces(theme.numberOfPieces);
		setGravity(theme.gravity);
		setWind(theme.wind ?? DEFAULT_VALUES.wind);
		setInitialVelocityX(
			theme.initialVelocityX ?? DEFAULT_VALUES.initialVelocityX,
		);
		setInitialVelocityY(
			theme.initialVelocityY ?? DEFAULT_VALUES.initialVelocityY,
		);
		setFriction(DEFAULT_VALUES.friction);
		setOpacity(DEFAULT_VALUES.opacity);

		// Set colors from theme
		const themeColors = [...theme.colors];
		while (themeColors.length < 5) {
			themeColors.push("");
		}
		setCustomColors(themeColors);
		setUseCustomColors(true);
		setSelectedThemeId(themeId);
		restartConfetti();
	};

	return (
		<div className="flex flex-col min-h-full">
			{/* Controls */}
			<div className="p-3">
				{/* Row 1: 3 sliders */}
				<div className="flex gap-3 mb-3">
					<ParameterSlider
						id="numberOfPieces"
						label={intl.formatMessage({ id: "playground.numberOfPieces" })}
						value={numberOfPieces}
						defaultValue={DEFAULT_VALUES.numberOfPieces}
						min={50}
						max={500}
						step={10}
						onChange={setNumberOfPieces}
						onReset={restartConfetti}
					/>
					<ParameterSlider
						id="gravity"
						label={intl.formatMessage({ id: "playground.gravity" })}
						value={gravity}
						defaultValue={DEFAULT_VALUES.gravity}
						min={0}
						max={0.3}
						step={0.001}
						onChange={setGravity}
						onReset={restartConfetti}
					/>
					<ParameterSlider
						id="wind"
						label={intl.formatMessage({ id: "playground.wind" })}
						value={wind}
						defaultValue={DEFAULT_VALUES.wind}
						min={-0.1}
						max={0.1}
						step={0.01}
						onChange={setWind}
						onReset={restartConfetti}
					/>
				</div>
				{/* Row 2: 2 sliders */}
				<div className="flex gap-3 mb-3">
					<ParameterSlider
						id="initialVelocityX"
						label={intl.formatMessage({ id: "playground.initialVelocityX" })}
						value={initialVelocityX}
						defaultValue={DEFAULT_VALUES.initialVelocityX}
						min={-10}
						max={10}
						step={1}
						onChange={setInitialVelocityX}
						onReset={restartConfetti}
					/>
					<ParameterSlider
						id="initialVelocityY"
						label={intl.formatMessage({ id: "playground.initialVelocityY" })}
						value={initialVelocityY}
						defaultValue={DEFAULT_VALUES.initialVelocityY}
						min={-20}
						max={20}
						step={1}
						onChange={setInitialVelocityY}
						onReset={restartConfetti}
					/>
				</div>

				{/* Row 3: 2 sliders */}
				<div className="flex gap-3 mb-3">
					<ParameterSlider
						id="friction"
						label={intl.formatMessage({ id: "playground.friction" })}
						value={friction}
						defaultValue={DEFAULT_VALUES.friction}
						min={0.9}
						max={1.0}
						step={0.01}
						onChange={setFriction}
						onReset={restartConfetti}
					/>
					<ParameterSlider
						id="opacity"
						label={intl.formatMessage({ id: "playground.opacity" })}
						value={opacity}
						defaultValue={DEFAULT_VALUES.opacity}
						min={0}
						max={1}
						step={0.1}
						onChange={setOpacity}
						onReset={restartConfetti}
					/>
				</div>
				{/* Row 4: Colors */}
				<div className="mb-3">
					<div className="mb-2">
						<div className="block text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
							<FormattedMessage id="playground.colorsLabel" />
						</div>
						<div className="flex gap-3">
							<div className="flex items-center">
								<input
									id="defaultColors"
									type="radio"
									name="colorMode"
									checked={!useCustomColors}
									onChange={() => setUseCustomColors(false)}
									className="w-4 h-4 mr-2"
								/>
								<label
									htmlFor="defaultColors"
									className="text-base text-gray-700 dark:text-gray-300"
								>
									<FormattedMessage id="playground.defaultColors" />
								</label>
							</div>

							<div className="flex items-center">
								<input
									id="customColors"
									type="radio"
									name="colorMode"
									checked={useCustomColors}
									onChange={() => setUseCustomColors(true)}
									className="w-4 h-4 mr-2"
								/>
								<label
									htmlFor="customColors"
									className="text-base text-gray-700 dark:text-gray-300"
								>
									<FormattedMessage id="playground.customColors" />
								</label>
							</div>
						</div>
					</div>

					{useCustomColors && (
						<div className="flex flex-wrap gap-2 items-center">
							{customColors.map((color, index) => (
								<div key={`${index}-${color}`} className="flex flex-col gap-1">
									<input
										type="color"
										value={color || "#000000"}
										onChange={(e) => {
											const newColors = [...customColors];
											newColors[index] = e.target.value;
											setCustomColors(newColors);
										}}
										className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
									/>
									<input
										type="text"
										value={color}
										placeholder="#000000"
										onChange={(e) => {
											const newColors = [...customColors];
											let value = e.target.value;
											if (value && !value?.startsWith("#")) {
												value = `#${value}`;
											}
											newColors[index] = value;
											setCustomColors(newColors);
										}}
										className="w-16 px-1 py-0.5 text-xs border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
									/>
								</div>
							))}
						</div>
					)}
				</div>
				{/* Row 5: Preset buttons */}
				<div className="mb-3">
					<div className="block text-base font-medium mb-1 text-gray-700 dark:text-gray-300">
						<FormattedMessage id="playground.presetThemes" />
					</div>
					<div className="flex flex-wrap gap-1.5">
						{themes.map((theme) => (
							<button
								key={theme.id}
								type="button"
								onClick={() => handlePreset(theme.id)}
								className={`px-2 py-1 text-base rounded border transition-colors ${
									selectedThemeId === theme.id
										? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-500"
										: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
								}`}
							>
								{theme.emoji} {theme.name}
							</button>
						))}
					</div>
					{selectedThemeId && (
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
							{intl.formatMessage({
								id: `seasonal.theme.${selectedThemeId}.description`,
							})}
						</p>
					)}
				</div>

				{/* Row 6: Control buttons */}
				<div className="flex flex-wrap gap-1.5">
					<button
						type="button"
						onClick={() => setShowConfetti(!showConfetti)}
						className="px-3 py-1 text-md bg-gradient-to-r from-blue-200 to-purple-300 hover:from-blue-400 hover:to-purple-500 text-gray-800 hover:text-white rounded font-semibold transition-all"
					>
						{showConfetti ? (
							<FormattedMessage id="playground.stopButton" />
						) : (
							<FormattedMessage id="playground.startButton" />
						)}
					</button>
					<button
						type="button"
						onClick={handleResetColors}
						className="px-3 py-1 text-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
					>
						<FormattedMessage id="playground.resetColorsButton" />
					</button>
					<button
						type="button"
						onClick={handleResetParameters}
						className="px-3 py-1 text-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
					>
						<FormattedMessage id="playground.resetSlidersButton" />
					</button>
					<button
						type="button"
						onClick={handleResetAll}
						className="px-3 py-1 text-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
					>
						<FormattedMessage id="playground.resetAllButton" />
					</button>
				</div>
			</div>

			{/* Mobile: scroll space to view confetti without controls */}
			<div className="md:hidden min-h-[60vh] flex items-end justify-center pb-4">
				<span className="text-xs text-gray-400 dark:text-gray-600">
					↑ scroll up for controls
				</span>
			</div>

			{/* Confetti (fullscreen) */}
			{showConfetti && (
				<Confetti
					numberOfPieces={numberOfPieces}
					gravity={gravity}
					wind={wind}
					initialVelocityX={initialVelocityX}
					initialVelocityY={initialVelocityY}
					friction={friction}
					opacity={opacity}
					colors={confettiColors}
					style={{ position: "fixed" }}
				/>
			)}

			{/* Bottom right: Code snippet panel */}
			{showCodePanel ? (
				<div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80">
					<div className="flex flex-col gap-3">
						{/* Buttons row */}
						<div className="flex items-center justify-end gap-2">
							{showAllParameters ? (
								<button
									type="button"
									onClick={() => setShowAllParameters(false)}
									className="px-3 py-1 text-xs bg-gradient-to-r from-blue-200 to-purple-300 hover:from-blue-400 hover:to-purple-500 text-gray-800 hover:text-white font-semibold rounded transition-all whitespace-nowrap"
								>
									<FormattedMessage id="playground.changesOnlyButton" />
								</button>
							) : (
								<button
									type="button"
									onClick={() => setShowAllParameters(true)}
									className="px-3 py-1 text-xs bg-gradient-to-r from-blue-200 to-purple-300 hover:from-blue-400 hover:to-purple-500 text-gray-800 hover:text-white font-semibold rounded transition-all whitespace-nowrap"
								>
									<FormattedMessage id="playground.showAllButton" />
								</button>
							)}
							<button
								type="button"
								onClick={handleCopyCode}
								className="w-20 px-2 py-1 text-xs bg-gradient-to-r from-blue-200 to-purple-300 hover:from-blue-400 hover:to-purple-500 text-gray-800 hover:text-white font-semibold rounded transition-all whitespace-nowrap"
							>
								{copied ? (
									<FormattedMessage id="common.copiedButtonShort" />
								) : (
									<FormattedMessage id="common.copyCodeButtonShort" />
								)}
							</button>
							<button
								type="button"
								onClick={() => setShowCodePanel(false)}
								className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded transition-colors"
								aria-label="Close code panel"
							>
								×
							</button>
						</div>

						{/* Code snippet - fixed height with wrapping */}
						<pre className="text-xs text-gray-600 dark:text-gray-400 h-44 leading-4 whitespace-pre-wrap break-all">
							<code>{generateCodeSnippet()}</code>
						</pre>
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={() => setShowCodePanel(true)}
					className="fixed bottom-4 right-4 px-3 py-2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 font-mono text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					aria-label="Show code panel"
				>
					{"</>"}
				</button>
			)}
		</div>
	);
};

export default PlaygroundPage;
