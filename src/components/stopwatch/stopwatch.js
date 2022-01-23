import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import useStopwatch from "../../helpers/useStopwatch";
import useTimer from "../../helpers/useTimer";
import {
	format_time,
	format_inspection,
	get_penalty,
} from "../../helpers/helper-methods";
import "./stopwatch-style.scss";

const Stopwatch = ({ setLastSolve }) => {
	const [{ minutes, seconds, hundredths, start, pause, isRunning }] =
		useStopwatch({ autoStart: false });
	const [inspection] = useTimer();
	const [helperTimer] = useStopwatch({ autoStart: false });
	const [showInspection, setShowInspection] = useState(false);
	const [color, setColor] = useState("white");
	const [penalty, setPenalty] = useState("");

	const onSpacePress = () => {
		if (color === "white") inspection.reset();
		if (showInspection && color === "red") {
			setColor("yellow");
			helperTimer.start();
			return;
		}
		if (!isRunning) {
			setShowInspection(true);
			setColor("green");
		} else {
			pause();
			setLastSolve({
				time: format_time(minutes, seconds, hundredths),
				penalty,
				id: uuidV4(),
			});
		}
	};

	const onSpaceRelease = () => {
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

	const handleKeyDown = (event) => {
		if (event.charCode === 32) onSpacePress();
	};

	const handleKeyUp = (event) => {
		if (event.charCode === 0) onSpaceRelease();
	};

	useEffect(() => {
		if (helperTimer.hundredths >= 30 && showInspection && color !== "red") {
			setColor("green");
		}
	}, [helperTimer.hundredths, showInspection, color]);

	return (
		<div
			id='stopwatch'
			onKeyPressCapture={handleKeyDown}
			onKeyUpCapture={handleKeyUp}
			tabIndex='0'
		>
			{showInspection ? (
				<p style={{ color }}>{format_inspection(inspection.seconds)}</p>
			) : (
				<p style={{ color }}>
					{format_time(minutes, seconds, hundredths)}
				</p>
			)}
		</div>
	);
};

export default Stopwatch;
