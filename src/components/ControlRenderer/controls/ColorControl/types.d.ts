import type { BaseControl } from "../types";

export interface ColorControl extends BaseControl {
	type: "color";
	value: string;
	onChange: (value: string) => void;
}

export interface ColorControlProps {
	control: ColorControl;
}
