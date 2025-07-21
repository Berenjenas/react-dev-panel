import type { BaseControl } from "../types";

export interface SelectControl extends BaseControl {
	type: "select";
	value: string;
	options: string[] | { label: string; value: string }[];
	onChange: (value: string) => void;
}

export interface SelectControlProps {
	control: SelectControl;
}
