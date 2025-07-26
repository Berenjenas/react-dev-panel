import type { BaseControl } from "../types";

export interface SeparatorControl extends BaseControl {
	type: "separator";
	style?: "line" | "space" | "label";
	// Note: SeparatorControl doesn't need onChange or value as it's purely visual
}

export interface SeparatorControlProps {
	control: SeparatorControl;
}
