import type { BaseControl } from "../types";

export interface LocalStorageControl extends BaseControl {
	type: "localStorage";
	onRefresh?: () => void;
}

export interface LocalStorageControlProps {
	control: LocalStorageControl;
}

export interface LocalStorageItem {
	key: string;
	value: string;
}
