import { useSyncExternalStore } from "react";

import type { DevPanelUIState, Position } from "@/components/DevPanel/types";

import { BaseStoreService } from "./BaseStoreService";

const storageKey = "dev-panel-ui-storage";
const defaultPosition = { x: 20, y: 20 };

type PersistedUIState = DevPanelUIState;

const defaultUIState: DevPanelUIState = {
	isVisible: false,
	isCollapsed: false,
	position: defaultPosition,
	currentTheme: "auto",
};

/**
 * Service class that manages the UI state of the dev panel.
 * This includes visibility, collapse, position, and theme settings.
 * Separated from sections state to avoid unnecessary re-renders when UI state changes.
 *
 * Features:
 * - Persistent UI state storage in localStorage
 * - Independent from sections state changes
 * - Optimized re-renders for UI-specific updates
 * - Automatic theme application on initialization
 * - Integration with CSS custom properties system
 *
 * @example
 * ```typescript
 * // Use the service through the provided hooks
 * const { isVisible, currentTheme, setVisible, setTheme } = useDevPanelUI();
 * const actions = useDevPanelUIActions();
 * ```
 */
class DevPanelUIService extends BaseStoreService<DevPanelUIState, PersistedUIState> {
	/**
	 * Creates a new DevPanelUIService instance and loads persisted state from localStorage.
	 */
	constructor() {
		// UI state should be persisted - shouldLoadOnInit: true, shouldPersist: true
		super(storageKey, defaultUIState, true, true);

		// Apply the initial theme immediately after construction
		this.applyTheme(this.getSnapshot().currentTheme);
	}

	/**
	 * Transforms current state to persistable format.
	 *
	 * @param state - The current UI state
	 * @returns The state in persistable format
	 * @protected
	 */
	protected toPersistableState(state: DevPanelUIState): PersistedUIState {
		return {
			isVisible: state.isVisible,
			isCollapsed: state.isCollapsed,
			position: state.position,
			currentTheme: state.currentTheme,
		};
	}

	/**
	 * Transforms persisted state back to current state format.
	 *
	 * @param persistedState - The persisted UI state
	 * @param defaultState - The default state to fall back to
	 * @returns The state in current format
	 * @protected
	 */
	protected fromPersistedState(persistedState: PersistedUIState, defaultState: DevPanelUIState): DevPanelUIState {
		return {
			...defaultState,
			...persistedState,
		};
	}

	/**
	 * Gets the service name for error messages.
	 *
	 * @returns The service name
	 * @protected
	 */
	protected getServiceName(): string {
		return "UI";
	}

	/**
	 * Applies the theme to the document root element using data attributes.
	 *
	 * @param theme - Theme name to apply
	 * @private
	 */
	private applyTheme(theme: string): void {
		const root = document.documentElement;

		if (theme === "auto" || theme === "") {
			// Remove attribute for auto theme (follows system preference)
			root.removeAttribute("data-dev-panel-theme");
		} else {
			// Set the theme data attribute
			root.setAttribute("data-dev-panel-theme", theme);
		}
	}

	/**
	 * Sets the visibility state of the dev panel.
	 *
	 * @param visible - Whether the panel should be visible
	 */
	setVisible = (visible: boolean): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, isVisible: visible }));
	};

	/**
	 * Sets the collapsed state of the dev panel.
	 *
	 * @param collapsed - Whether the panel should be collapsed
	 */
	setCollapsed = (collapsed: boolean): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, isCollapsed: collapsed }));
	};

	/**
	 * Updates the position of the dev panel.
	 *
	 * @param position - New position coordinates {x, y}
	 */
	setPosition = (position: Position): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, position }));
	};

	/**
	 * Sets the current theme and applies it to the document.
	 *
	 * @param theme - Theme name to set
	 */
	setTheme = (theme: string): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, currentTheme: theme }));
		this.applyTheme(theme);
	};

	/**
	 * Resets the theme to the default "auto" theme.
	 */
	resetTheme = (): void => {
		this.setTheme("auto");
	};

	/**
	 * Gets the current theme name.
	 *
	 * @returns The current theme name
	 */
	getCurrentTheme = (): string => {
		return this.getSnapshot().currentTheme;
	};

	/**
	 * Resets the dev panel UI to its default state.
	 * Resets position, theme, and sets visibility and collapse to false.
	 */
	reset = (): void => {
		this.setState(() => ({ ...defaultUIState }));
		this.applyTheme(defaultUIState.currentTheme);
	};
}

const devPanelUIService = new DevPanelUIService();

/**
 * React hook that provides access to the complete dev panel UI state and actions.
 * Uses useSyncExternalStore for optimal performance and React 18 compatibility.
 * This hook will not re-render when sections state changes.
 *
 * @returns Object containing the current UI state and all available UI actions
 *
 * @example
 * ```typescript
 * const {
 *   isVisible,
 *   position,
 *   currentTheme,
 *   setVisible,
 *   setPosition,
 *   setTheme
 * } = useDevPanelUI();
 * ```
 */
export function useDevPanelUI(): DevPanelUIState & {
	setVisible: (visible: boolean) => void;
	setCollapsed: (collapsed: boolean) => void;
	setPosition: (position: Position) => void;
	setTheme: (theme: string) => void;
	resetTheme: () => void;
	getCurrentTheme: () => string;
	reset: () => void;
} {
	const state = useSyncExternalStore(devPanelUIService.subscribe, devPanelUIService.getSnapshot);

	return {
		...state,
		setVisible: devPanelUIService.setVisible,
		setCollapsed: devPanelUIService.setCollapsed,
		setPosition: devPanelUIService.setPosition,
		setTheme: devPanelUIService.setTheme,
		resetTheme: devPanelUIService.resetTheme,
		getCurrentTheme: devPanelUIService.getCurrentTheme,
		reset: devPanelUIService.reset,
	};
}

/**
 * React hook that subscribes only to the visibility state of the dev panel.
 * Optimized for components that only need to know if the panel is visible.
 *
 * @returns Boolean indicating whether the dev panel is visible
 *
 * @example
 * ```typescript
 * const isVisible = useDevPanelVisible();
 * ```
 */
export function useDevPanelVisible(): boolean {
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().isVisible);
}

/**
 * React hook that subscribes only to the collapsed state of the dev panel.
 * Optimized for components that only need to know if the panel is collapsed.
 *
 * @returns Boolean indicating whether the dev panel is collapsed
 *
 * @example
 * ```typescript
 * const isCollapsed = useDevPanelCollapsed();
 * ```
 */
export function useDevPanelCollapsed(): boolean {
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().isCollapsed);
}

/**
 * React hook that subscribes only to the position state of the dev panel.
 * Optimized for components that only need to track panel position.
 *
 * @returns Position object with x and y coordinates
 *
 * @example
 * ```typescript
 * const position = useDevPanelPosition();
 * console.log(`Panel is at ${position.x}, ${position.y}`);
 * ```
 */
export function useDevPanelPosition(): Position {
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().position);
}

/**
 * React hook that subscribes only to the current theme state.
 * Optimized for components that only need to know the current theme.
 *
 * @returns String indicating the current theme name
 *
 * @example
 * ```typescript
 * const currentTheme = useCurrentTheme();
 * console.log(`Current theme is: ${currentTheme}`);
 * ```
 */
export function useCurrentTheme(): string {
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().currentTheme);
}

/**
 * React hook that provides access to the complete dev panel theme state and actions.
 * Uses useSyncExternalStore for optimal performance and React 18 compatibility.
 *
 * @returns Object containing the current theme state and all available theme actions
 *
 * @example
 * ```typescript
 * const {
 *   currentTheme,
 *   setTheme,
 *   resetTheme
 * } = useDevPanelTheme();
 *
 * // Set a specific theme
 * setTheme("dark");
 *
 * // Reset to auto theme
 * resetTheme();
 * ```
 */
export function useDevPanelTheme(): {
	currentTheme: string;
	setTheme: (theme: string) => void;
	resetTheme: () => void;
	getCurrentTheme: () => string;
} {
	const currentTheme = useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().currentTheme);

	return {
		currentTheme,
		setTheme: devPanelUIService.setTheme,
		resetTheme: devPanelUIService.resetTheme,
		getCurrentTheme: devPanelUIService.getCurrentTheme,
	};
}

/**
 * React hook that provides access to all dev panel UI actions without subscribing to state.
 * Ideal for components that only need to trigger UI actions without rendering on state changes.
 *
 * @returns Object containing all available UI actions
 *
 * @example
 * ```typescript
 * const { setVisible, setPosition, setTheme, reset } = useDevPanelUIActions();
 *
 * // Toggle panel visibility
 * setVisible(true);
 *
 * // Update position
 * setPosition({ x: 100, y: 100 });
 *
 * // Set theme
 * setTheme("dark");
 *
 * // Reset UI state
 * reset();
 * ```
 */
export function useDevPanelUIActions(): {
	setVisible: (visible: boolean) => void;
	setCollapsed: (collapsed: boolean) => void;
	setPosition: (position: Position) => void;
	setTheme: (theme: string) => void;
	resetTheme: () => void;
	getCurrentTheme: () => string;
	reset: () => void;
} {
	return {
		setVisible: devPanelUIService.setVisible,
		setCollapsed: devPanelUIService.setCollapsed,
		setPosition: devPanelUIService.setPosition,
		setTheme: devPanelUIService.setTheme,
		resetTheme: devPanelUIService.resetTheme,
		getCurrentTheme: devPanelUIService.getCurrentTheme,
		reset: devPanelUIService.reset,
	};
}

/**
 * React hook that provides access to all dev panel theme actions without subscribing to state.
 * Ideal for components that only need to trigger theme actions without rendering on state changes.
 *
 * @returns Object containing all available theme actions
 *
 * @example
 * ```typescript
 * const { setTheme, resetTheme } = useDevPanelThemeActions();
 *
 * // Switch to dark theme
 * setTheme("dark");
 *
 * // Switch to neon theme
 * setTheme("neon");
 *
 * // Reset to auto theme
 * resetTheme();
 * ```
 */
export function useDevPanelThemeActions(): {
	setTheme: (theme: string) => void;
	resetTheme: () => void;
	getCurrentTheme: () => string;
} {
	return {
		setTheme: devPanelUIService.setTheme,
		resetTheme: devPanelUIService.resetTheme,
		getCurrentTheme: devPanelUIService.getCurrentTheme,
	};
}

// Legacy exports for backward compatibility - these will be deprecated
export const useDevPanelStore = useDevPanelUI;
