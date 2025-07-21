import type { BaseControl } from "../types";

export interface ButtonControl extends BaseControl {
	type: "button";
	label: string;
	onClick: () => void;
}

export interface ButtonControlProps {
	control: ButtonControl;
}
