import { useState, useEffect } from "react";

const useTimer = (initialLength = 15) => {
	const [length, setLength] = useState(initialLength);
	const [startDate, setStartDate] = useState(Date.now());
	const [seconds, setSeconds] = useState(initialLength);
	const [isRunning, setIsRunning] = useState(false);

	const start = () => {
		setStartDate(Date.now());
		setIsRunning(true);
	};

	const stop = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setSeconds(initialLength);
	};

	useEffect(() => {
		if (!isRunning) return;
		let interval = setInterval(() => {
			var diff = Date.now() - startDate;
			setSeconds(initialLength - Math.floor(diff / 1000));
		}, 10);

		return () => {
			clearInterval(interval);
		};
	}, [isRunning, initialLength, startDate]);

	return [{ seconds, isRunning, setLength, start, stop, reset }];
};

export default useTimer;
