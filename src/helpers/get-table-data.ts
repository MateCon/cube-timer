import Time from "../models/Time";
import { format_time_with_zeroes, hundreadsToTime } from "./helper-methods";

// this function is quite bad, but I don't want to refactor it rn
const getTableData = (times: Time[]): string[][] => {
	const currData: [number, string, number[], number[], number[]] = [
		0,
		"",
		[],
		[],
		[],
	];
	const tableData: [string, string, string, string][] = [];
	let i = 1;

	for (let time of times) {
		currData[0] = i;
		currData[1] = format_time_with_zeroes(
			time.time.minutes,
			time.time.seconds,
			time.time.hundredths
		);
		currData[2].push(
			time.time.hundredths +
				time.time.seconds * 100 +
				time.time.minutes * 6000
		);
		currData[3].push(
			time.time.hundredths +
				time.time.seconds * 100 +
				time.time.minutes * 6000
		);
		// currData[4].push(time.time.hundredths + time.time.seconds * 100 + time.time.hundredths * 6000);
		if (currData[2].length > 5) currData[2].shift();
		if (currData[3].length > 12) currData[3].shift();
		// if (currData[4].length > 100) currData[2].shift();
		const ao5 = [...currData[2]];
		ao5[ao5.indexOf(ao5.reduce((a: any, b: any) => (a > b ? a : b)))] = 0;
		const ao12 = [...currData[3]];
		ao12[
			ao12.indexOf(ao12.reduce((a: any, b: any) => (a > b ? a : b)))
		] = 0;
		tableData.push([
			currData[0].toString(),
			currData[1],
			format_time_with_zeroes(
				...(hundreadsToTime(
					Math.round(ao5.reduce((a, b) => a + b) / 3)
				) as [number, number, number])
			),
			format_time_with_zeroes(
				...(hundreadsToTime(
					Math.round(ao12.reduce((a, b) => a + b) / 10)
				) as [number, number, number])
			),
		]);
		while (
			tableData[i - 1]![1]![0] === "0" ||
			tableData[i - 1]![1]![0] === ":"
		)
			tableData[i - 1]![1] = tableData[i - 1]![1]?.substring(1);
		if (tableData[i - 1]![1]![0] === ".")
			tableData[i - 1]![1] = `0${tableData[i - 1]![1]}`;
		while (
			tableData[i - 1]![2]![0] === "0" ||
			tableData[i - 1]![2]![0] === ":"
		)
			tableData[i - 1]![2] = tableData[i - 1]![2]?.substring(1);
		if (tableData[i - 1]![2]![0] === ".")
			tableData[i - 1]![2] = `0${tableData[i - 1]![2]}`;
		while (
			tableData[i - 1]![3]![0] === "0" ||
			tableData[i - 1]![3]![0] === ":"
		)
			tableData[i - 1]![3] = tableData[i - 1]![3]?.substring(1);
		if (tableData[i - 1]![3]![0] === ".")
			tableData[i - 1]![3] = `0${tableData[i - 1]![3]}`;
		if (currData[2]!.length < 5) tableData[i - 1]![2] = "-";
		if (currData[3]!.length < 12) tableData[i - 1]![3] = "-";
		i++;
	}

	return tableData;
};

export default getTableData;
