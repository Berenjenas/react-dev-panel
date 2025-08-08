import type { BaseInputControl } from "../types";

export interface TextControl extends BaseInputControl {
	type: "text";
	value: string;
	placeholder?: string;
	disableAutoExpand?: boolean;
}

export interface TextControlProps {
	control: TextControl;
}
