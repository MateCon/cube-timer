import { useState, useEffect } from "react";

const useStopwatch = ({
	autoStart = false,
}: {
	autoStart: boolean;
}): {
	minutes: number;
	seconds: number;
	hundredths: number;
	start: () => void;
	pause: () => void;
	reset: () => void;
	isRunning: boolean;
} => {
	const [isRunning, setIsRunning] = useState(autoStart);
	const [startDate, setStartDate] = useState(Date.now());
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [hundredths, setHundredths] = useState(0);

	const start = () => {
		setIsRunning(true);
		setStartDate(Date.now());
	};

	const pause = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setIsRunning(false);
		setMinutes(0);
		setSeconds(0);
		setHundredths(0);
	};

	useEffect(() => {
		let interval = setInterval(() => {
			if (isRunning) {
				var diff = Date.now() - startDate;
				const newTimes = {
					hundredths: Math.floor(diff / 10),
					minutes: -1,
					seconds: -1,
				};

				while (newTimes.hundredths >= 100) {
					newTimes.hundredths -= 100;
				}

				newTimes["seconds"] = Math.floor(diff / 1000);

				while (newTimes.seconds >= 60) {
					newTimes.seconds -= 60;
				}

				newTimes["minutes"] = Math.floor(diff / 60000);

				setMinutes(newTimes.minutes);
				setSeconds(newTimes.seconds);
				setHundredths(newTimes.hundredths);
			}
		}, 1);

		return () => {
			clearInterval(interval);
		};
	}, [isRunning, startDate]);

	return { minutes, seconds, hundredths, start, pause, reset, isRunning };
};

export default useStopwatch;
