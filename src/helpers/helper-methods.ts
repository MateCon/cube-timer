import { Penalty } from "../models/Time";

export const format_time = (
	minutes: number,
	seconds: number,
	hundreads: number
): string => {
	const new_min = minutes.toString();
	const new_sec = seconds.toString();
	const new_hun = hundreads.toString();
	return new_min + ":" + (new_sec || "0") + "." + new_hun;
};

export const format_time_with_zeroes = (
	minutes: number,
	seconds: number,
	hundreads: number
): string => {
	const add_0 = (n: number) => (n < 10 ? "0" : "");
	const new_min = add_0(minutes) + minutes.toString();
	const new_sec = add_0(seconds) + seconds.toString();
	const new_hun = add_0(hundreads) + hundreads.toString();
	return new_min + ":" + new_sec + "." + new_hun;
};

export const format_inspection = (seconds: number): string =>
	(seconds < -2 && "DNF") || (seconds < 0 && "+2") || seconds.toString();

export const get_penalty = (seconds: number): string =>
	(seconds < -2 && "DNF") || (seconds < 0 && "+2") || "";

export const getTime = (time: string, penalty: Penalty) =>
	(penalty === "DNF" && penalty) ||
	(penalty === "+2" && time + penalty) ||
	time;

export const hundreadsToTime = (hundreads: number): number[] => {
	const newTime = [0, 0, 0];

	while (hundreads >= 6000) {
		newTime[0]++;
		hundreads -= 6000;
	}

	while (hundreads >= 100) {
		newTime[1]++;
		hundreads -= 100;
	}

	newTime[2] = hundreads;

	return newTime;
};
