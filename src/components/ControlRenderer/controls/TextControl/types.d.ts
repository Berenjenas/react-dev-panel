import type { BaseInputControl } from "../types";

export interface TextControl extends BaseInputControl {
	type: "text";
	value: string;
	placeholder?: string;
}

export interface TextControlProps {
	control: TextControl;
}
