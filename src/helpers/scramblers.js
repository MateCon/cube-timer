const addDirection = move => {
	const direction = ['2', "'", ''][Math.floor(Math.random() * 3)];
	return direction === '2' && move + '2' || direction === "'" && move + "'" || move;
}

export const scrambler3x3 = move_count => {
	const getMove = last_move => {
		const options = ['L', 'R', 'U', 'D', 'F', 'B'];
		let move = options[Math.floor(Math.random() * options.length)];
		while(last_move === move) {
			move = options[Math.floor(Math.random() * options.length)];
		}
		return move;
	}
	let result = '', last_move = '';

	for(let i = 0; i < move_count; i++) {
		const move = getMove(last_move);
		result += addDirection(move) + ' ';
		last_move = move;
	}

	return result;
}