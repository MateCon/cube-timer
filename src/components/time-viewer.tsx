import React, { useEffect, useState } from "react";
import getTableData from "../helpers/get-table-data";
import Time from "../models/Time";

const TimeViewer = ({ times, setTimes }: { times: Time[], setTimes: Function }) => {
	const [tableData, setTableData] = useState<string[][]>(() => getTableData(times));

	useEffect(() => {
		setTableData(getTableData(times));
	}, [times]);

	const del = (index: number) => {
		setTimes([...times.slice(0, index - 1), ...times.slice(index)]);
	}

	return (
		<table className="table-auto h-fit border-r border-slate-600 text-center w-fit z-10">
			<thead className="border-b border-slate-600">
				<tr>
					<th className="px-2 py-1 border-r border-slate-600">nº</th>
					<th className="px-2 py-1 border-r border-slate-600">time</th>
					<th className="px-2 py-1 border-r border-slate-600">ao5</th>
					<th className="px-2 py-1">ao12</th>
				</tr>
			</thead>
			<tbody>
				{tableData.map((row) => (
					<tr key={row[0]} className="border-b border-slate-600">
						<td className="border-r border-slate-600">{row[0]}</td>
						<td onClick={() => del(parseInt(row[0]!))} className="border-r border-slate-600 hover:bg-[rgb(50,50,50)] transition select-none cursor-pointer">{row[1]}</td>
						<td className="border-r border-slate-600">{row[2]}</td>
						<td>{row[3]}</td>
					</tr>
				)).reverse()}
			</tbody>
		</table>
	);
};

export default TimeViewer;
