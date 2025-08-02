import type { BooleanControl } from "./BooleanControl/types";
import type { ButtonControl } from "./ButtonControl/types";
import type { ButtonGroupControl } from "./ButtonGroupControl/types";
import type { ColorControl } from "./ColorControl/types";
import type { DateControl } from "./DateControl/types";
import type { MultiSelectControl } from "./MultiSelectControl/types";
import type { NumberControl } from "./NumberControl/types";
import type { RangeControl } from "./RangeControl/types";
import type { SelectControl } from "./SelectControl/types";
import type { SeparatorControl } from "./SeparatorControl/types";
import type { TextControl } from "./TextControl/types";

export interface BaseControl {
	label?: string;
	description?: string;
	disabled?: boolean;
}

export interface BaseInputControl extends BaseControl {
	event?: "onBlur" | "onChange";
	onChange: (value: string) => void;
}

export type Controls = {
	color: ColorControl;
	boolean: BooleanControl;
	select: SelectControl;
	multiselect: MultiSelectControl;
	text: TextControl;
	button: ButtonControl;
	number: NumberControl;
	range: RangeControl;
	date: DateControl;
	separator: SeparatorControl;
	buttonGroup: ButtonGroupControl;
};

export type ControlsNames = keyof Controls;

export type Control<Name extends ControlsNames> = Controls[Name];

export type ControlsGroup = Record<string, Control<ControlsNames>>;
