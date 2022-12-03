import React, { useState, useEffect } from "react";
import { scrambler3x3 } from "../helpers/scramblers";
import Time from "../models/Time";

const LENGTH_3X3 = 20;

const ScrambleViewer = ({ lastSolve }: { lastSolve: Time | undefined }) => {
	const [scramble, setScramble] = useState(scrambler3x3(LENGTH_3X3));

	useEffect(() => {
		setScramble(scrambler3x3(LENGTH_3X3));
	}, [lastSolve]);

	return (
		<div className="w-full border-b border-slate-600 text-center py-4">
			<p className="text-2xl font-semibold">{scramble}</p>
		</div>
	);
};

export default ScrambleViewer;
