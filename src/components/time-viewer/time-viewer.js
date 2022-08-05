import React from "react";
import "./time-viewer-style.scss";

const TimeViewer = ({ times }) => {
	const getTime = (time, penalty) =>
		(penalty === "DNF" && penalty) ||
		(penalty === "+2" && time + penalty) ||
		time;

	return (
		<div id='time-viewer'>
			{times.map((data, index) => {
				let time = data["time"];
				if (time[0] === "0" && time[1] === ":") time = time.substring(2);
				return (
					<div key={data.id}>
						<div>{index + 1}</div>
						<div>{getTime(time, data["penalty"])}</div>
					</div>
				);
			})}
		</div>
	);
};

export default TimeViewer;
