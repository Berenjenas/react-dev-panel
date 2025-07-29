import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";

export type DevPanelHotkeyConfig = Pick<HotkeyConfig, "key" | "shiftKey" | "altKey" | "ctrlKey" | "metaKey">;

export interface DevPanelProps {
	panelTitle?: string;
	/**
	 * Hotkey configuration for toggling the DevPanel visibility.
	 * If not provided, defaults to
	 * ```json
	 * {
	 *   key: "f",
	 *   shiftKey: true,
	 *   altKey: true,
	 *   ctrlKey: false,
	 *   metaKey: false,
	 * }
	 * ```
	 */
	hotKeyConfig?: DevPanelHotkeyConfig;
}

export interface DevPanelSection {
	name: string;
	controls: ControlsGroup;
	isCollapsed?: boolean;
}

export interface DevPanelState {
	isVisible: boolean;
	isCollapsed: boolean;
	sections: Record<string, DevPanelSection>;
	position: Position;
}

export type DevPanelUIState = Omit<DevPanelState, "sections">;

export interface DevPanelActions {
	setVisible: (visible: boolean) => void;
	setCollapsed: (collapsed: boolean) => void;
	setPosition: (position: Position) => void;
	registerSection: (name: string, controls: ControlsGroup) => void;
	unregisterSection: (name: string) => void;
	toggleSectionCollapse: (name: string) => void;
	reset: () => void;
}

export type DevPanelStore = DevPanelState & DevPanelActions;

export interface Position {
	x: number;
	y: number;
}
