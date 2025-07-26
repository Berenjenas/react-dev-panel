import type { BaseInputControl } from "../types";

export interface DateControl extends BaseInputControl {
	type: "date";
	value: string; // ISO date string (YYYY-MM-DD)
	min?: string; // ISO date string
	max?: string; // ISO date string
	onChange: (value: string) => void;
}

export interface DateControlProps {
	control: DateControl;
}
