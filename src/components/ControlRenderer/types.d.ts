import type { Control, ControlsNames } from "./controls/types";

export interface ControlRendererProps<Name extends ControlsNames> {
	name: string;
	control: Control<Name>;
}
