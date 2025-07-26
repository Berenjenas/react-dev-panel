import type { BaseInputControl } from "../types";

export interface RangeControl extends BaseInputControl {
	type: "range";
	value: number;
	min?: number;
	max?: number;
	step?: number;
	onChange: (value: number) => void;
}

export interface RangeControlProps {
	control: RangeControl;
}
