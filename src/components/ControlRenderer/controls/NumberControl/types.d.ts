import type { BaseControl } from "../types";

export interface NumberControl extends BaseControl {
	type: "number";
	value: number;
	min?: number;
	max?: number;
	step?: number;
	onChange: (value: number) => void;
}

export interface NumberControlProps {
	control: NumberControl;
}
