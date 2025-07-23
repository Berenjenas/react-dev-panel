import type { ButtonControl } from "../ButtonControl/types";
import type { BaseControl } from "../types";

export interface ButtonGroupControl extends BaseControl {
	type: "buttonGroup";
	buttons: {
		label: ButtonControl["label"];
		onClick: ButtonControl["onClick"];
		disabled?: ButtonControl["disabled"];
	}[];
}

export interface ButtonGroupControlProps {
	control: ButtonGroupControl;
}
