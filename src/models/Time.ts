export type Penalty = null | "DNF" | "+2";

export default interface Time {
	time: {
		minutes: number;
		seconds: number;
		hundredths: number;
	};
	formatted_time: string;
	penalty: Penalty;
	id: string;
}
