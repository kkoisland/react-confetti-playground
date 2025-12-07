import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const TOAST_DURATION = 5000;

const ToastPage = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, text: "Task 1", completed: false },
		{ id: 2, text: "Task 2", completed: false },
		{ id: 3, text: "Task 3", completed: false },
	]);
	const [showConfetti, setShowConfetti] = useState(false);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (!showConfetti) return;

		const timer = setTimeout(() => {
			setShowConfetti(false);
			setShowToast(false);
		}, TOAST_DURATION);

		return () => clearTimeout(timer);
	}, [showConfetti]);

	const handleToggle = (id: number) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task,
		);
		setTasks(updatedTasks);

		const allCompleted = updatedTasks.every((task) => task.completed);
		if (allCompleted) {
			setShowToast(true);
			setShowConfetti(true);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-full gap-8 p-4">
			<div className="flex flex-col gap-4 mt-10">
				{tasks.map((task) => (
					<div key={task.id} className="flex items-center gap-3">
						<input
							type="checkbox"
							id={String(task.id)}
							checked={task.completed}
							onChange={() => handleToggle(task.id)}
							className="w-5 h-5"
						/>
						<label
							htmlFor={String(task.id)}
							className={`text-xl cursor-pointer ${task.completed ? "line-through opacity-50" : ""}`}
						>
							{task.text}
						</label>
					</div>
				))}
			</div>
			{showConfetti && <Confetti />}
			{showToast && (
				<div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg z-50">
					All Completed!
				</div>
			)}
		</div>
	);
};

export default ToastPage;
