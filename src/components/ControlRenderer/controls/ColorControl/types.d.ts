import type { BaseControl } from "../types";

export interface ColorControl extends BaseControl {
	type: "color";
	value: string;
	onChange: (value: string) => void;
	/**
	 * Format to display/parse colors
	 * @default "any" - Accepts any valid CSS color format
	 */
	format?: "hex" | "rgb" | "hsl" | "any";
	/**
	 * Predefined color palette for quick selection
	 */
	presets?: string[];
	/**
	 * Allow transparency/alpha values
	 * @default false
	 */
	allowAlpha?: boolean;
}

export interface ColorControlProps {
	control: ColorControl;
}
