import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const INITIAL_TIME = 3;
const COUNTDOWN_INTERVAL = 1000;
const CONFETTI_DURATION = 7000;

const CountdownPage = () => {
	const [count, setCount] = useState(INITIAL_TIME);
	const [isRunning, setIsRunning] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		if (!isRunning || count <= 0) return;

		const timer = setTimeout(() => {
			const newCount = count - 1;
			setCount(newCount);
			if (newCount === 0) {
				setIsRunning(false);
				setShowConfetti(true);
			}
		}, COUNTDOWN_INTERVAL);

		return () => clearTimeout(timer);
	}, [isRunning, count]);

	useEffect(() => {
		if (!showConfetti) return;

		const timer = setTimeout(() => {
			setShowConfetti(false);
			setCount(INITIAL_TIME);
		}, CONFETTI_DURATION);

		return () => clearTimeout(timer);
	}, [showConfetti]);

	const handleCountDown = () => {
		setIsRunning(true);
	};
	return (
		<div className="flex flex-col items-center justify-center h-full gap-8 p-4">
			{showConfetti && <Confetti />}
			<div className="text-8xl font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
				{count}
			</div>
			<div className="flex gap-4">
				<button
					type="button"
					onClick={handleCountDown}
					disabled={isRunning}
					className="px-6 py-3 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-gray-800 hover:text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Start
				</button>
				<button
					type="button"
					onClick={() => {
						setShowConfetti(false);
						setCount(INITIAL_TIME);
						setIsRunning(false);
					}}
					className="px-6 py-3 bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 hover:text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
				>
					Reset
				</button>
			</div>
			<div className="text-xl font-bold h-8">
				{count === 0 && "🎉 Countdown complete!"}
			</div>
		</div>
	);
};

export default CountdownPage;
