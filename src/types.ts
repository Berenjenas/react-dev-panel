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
    hotKeyConfig?: Pick<
        HotkeyConfig,
        "key" | "shiftKey" | "altKey" | "ctrlKey" | "metaKey"
    >;
}

export interface BaseControl {
    label?: string;
    description?: string;
    disabled?: boolean;
}

export interface NumberControl extends BaseControl {
    type: "number";
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
}

export interface BooleanControl extends BaseControl {
    type: "boolean";
    value: boolean;
    onChange: (value: boolean) => void;
}

export interface SelectControl extends BaseControl {
    type: "select";
    value: string;
    options: string[] | { label: string; value: string }[];
    onChange: (value: string) => void;
}

export interface ColorControl extends BaseControl {
    type: "color";
    value: string;
    onChange: (value: string) => void;
}

export interface TextControl extends BaseControl {
    type: "text";
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export interface ButtonControl extends BaseControl {
    type: "button";
    label: string;
    onClick: () => void;
}

export type Control =
    | NumberControl
    | BooleanControl
    | SelectControl
    | ColorControl
    | TextControl
    | ButtonControl;

export interface ControlGroup {
    [key: string]: Control;
}

export interface ControlRendererProps {
    name: string;
    control: Control;
}

export interface DevPanelSection {
    name: string;
    controls: ControlGroup;
    isCollapsed?: boolean;
}

export interface DevPanelState {
    isVisible: boolean;
    isCollapsed: boolean;
    sections: Record<string, DevPanelSection>;
    position: { x: number; y: number };
}

export interface DevPanelActions {
    setVisible: (visible: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
    setPosition: (position: { x: number; y: number }) => void;
    registerSection: (name: string, controls: ControlGroup) => void;
    unregisterSection: (name: string) => void;
    toggleSectionCollapse: (name: string) => void;
    reset: () => void;
}

export type DevPanelStore = DevPanelState & DevPanelActions;

export interface Position {
    x: number;
    y: number;
}

export interface UseDragAndDropProps {
    onPositionChange: (position: Position) => void;
}

export interface HotkeyConfig {
    key: string;
    action: (event: KeyboardEvent) => void;
    description?: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    enabled?: boolean;
    target?: HTMLElement | Window | Document;
}

export interface UseHotkeysOptions {
    enabled?: boolean;
    target?: HTMLElement | Window | Document;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}
export type DevPanelHoyKeyConfig = Pick<
    HotkeyConfig,
    "key" | "shiftKey" | "altKey" | "ctrlKey" | "metaKey"
>;
