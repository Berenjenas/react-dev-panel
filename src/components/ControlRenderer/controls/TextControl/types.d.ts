import type { BaseControl } from "../types";

export interface TextControl extends BaseControl {
	type: "text";
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
}

export interface TextControlProps {
	control: TextControl;
}
