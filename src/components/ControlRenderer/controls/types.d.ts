import type { BooleanControl } from "./BooleanControl/types";
import type { ButtonControl } from "./ButtonControl/types";
import type { ColorControl } from "./ColorControl/types";
import type { NumberControl } from "./NumberControl/types";
import type { SelectControl } from "./SelectControl/types";
import type { TextControl } from "./TextControl/types";

export interface BaseControl {
	label?: string;
	description?: string;
	disabled?: boolean;
}

export type Controls = {
	color: ColorControl;
	boolean: BooleanControl;
	select: SelectControl;
	text: TextControl;
	button: ButtonControl;
	number: NumberControl;
};

export type ControlsNames = keyof Controls;

export type Control<Name extends ControlsNames> = Controls[Name];

export type ControlsGroup = Record<string, Control<ControlsNames>>;
