import type { BaseControl } from "../types";

export interface BooleanControl extends BaseControl {
	type: "boolean";
	value: boolean;
	onChange: (value: boolean) => void;
}

export interface BooleanControlProps {
	control: BooleanControl;
}
