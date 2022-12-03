import React, { useState, useEffect, KeyboardEventHandler } from "react";
import { v4 as uuidV4 } from "uuid";
import useStopwatch from "../helpers/useStopwatch";
import useTimer from "../helpers/useTimer";
import {
	format_time,
	format_inspection,
	get_penalty,
	format_time_with_zeroes,
} from "../helpers/helper-methods";

const Stopwatch = ({ setLastSolve }: { setLastSolve: Function }) => {
	const { minutes, seconds, hundredths, start, pause, isRunning } =
		useStopwatch({ autoStart: false });
	const inspection = useTimer();
	const helperTimer = useStopwatch({ autoStart: false });
	const [showInspection, setShowInspection] = useState(false);
	const [color, setColor] = useState("white");
	const [penalty, setPenalty] = useState("");
	const [canStart, setCanStart] = useState(true);

	const onSpacePress = () => {
		console.log(isRunning);
		if (color === "white") inspection.reset();
		if (showInspection && color === "red") {
			setColor("yellow");
			helperTimer.start();
			return;
		}
		if (!isRunning) {
			if (!canStart) return;
			setShowInspection(true);
			setColor("green");
		} else {
			pause();
			setLastSolve({
				time: { minutes, seconds, hundredths },
				formatted_time: format_time(minutes, seconds, hundredths),
				penalty,
				id: uuidV4(),
			});
			setCanStart(false);
		}
	};

	const onSpaceRelease = () => {
		if (!canStart) {
			setCanStart(true);
		}
		if (!showInspection) return;
		if (!inspection.isRunning) {
			inspection.start();
			setColor("red");
			return;
		}
		if (color === "green") {
			setPenalty(get_penalty(inspection.seconds));
			setColor("white");
			setShowInspection(false);
			inspection.stop();
			start();
		} else {
			setColor("red");
			helperTimer.reset();
		}
	};

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.charCode === 32) onSpacePress();
	};

	const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.charCode === 0) onSpaceRelease();
	};

	useEffect(() => {
		if (helperTimer.hundredths >= 30 && showInspection && color !== "red") {
			setColor("green");
		}
	}, [helperTimer.hundredths, showInspection, color]);

	return (
		<div
			onKeyPressCapture={handleKeyDown}
			onKeyUpCapture={handleKeyUp}
			tabIndex={0}
			className="absolute w-full h-full grid place-items-center"
		>
			{showInspection ? (
				<p style={{ color }} className="text-8xl timer">{format_inspection(inspection.seconds)}</p>
			) : (
				<p style={{ color }} className="text-8xl timer">
					{format_time_with_zeroes(minutes, seconds, hundredths)}
				</p>
			)}
		</div>
	);
};

export default Stopwatch;
