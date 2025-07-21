import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { HotkeyConfig, Position } from "@/types";

export type DevPanelHoyKeyConfig = Pick<HotkeyConfig, "key" | "shiftKey" | "altKey" | "ctrlKey" | "metaKey">;

export interface DevPanelProps {
	theme?: "light" | "dark";
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
	hotKeyConfig?: DevPanelHoyKeyConfig;
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
