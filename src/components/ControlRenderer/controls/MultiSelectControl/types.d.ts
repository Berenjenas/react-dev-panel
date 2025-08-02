import type { BaseControl } from "../types";

export interface MultiSelectControl extends BaseControl {
	type: "multiselect";
	value: string[];
	options: string[] | { label: string; value: string }[];
	onChange: (value: string[]) => void;
}

export interface MultiSelectControlProps {
	control: MultiSelectControl;
}
