export const save = <T>(key: string, data: T): void => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const load = <T>(key: string): T | undefined => {
	const state = localStorage.getItem(key);
	return state ? JSON.parse(state) : undefined;
};
