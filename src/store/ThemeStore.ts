import { useSyncExternalStore } from "react";

import { BaseStoreService } from "./";

const themeStorageKey = "dev-panel-theme-storage";

interface ThemeState {
	currentTheme: string;
}

interface PersistedThemeState {
	currentTheme: string;
}

const defaultThemeState: ThemeState = {
	currentTheme: "auto",
};

/**
 * Service class that manages the theme state of the dev panel.
 * Handles theme persistence and automatic restoration on initialization.
 *
 * Features:
 * - Persistent theme storage in localStorage
 * - Automatic theme application on initialization
 * - Integration with CSS custom properties system
 * - Support for all pre-built themes
 *
 * @example
 * ```typescript
 * // Use the service through the provided hooks
 * const { currentTheme, setTheme } = useDevPanelTheme();
 * const actions = useDevPanelThemeActions();
 * ```
 */
class DevPanelThemeService extends BaseStoreService<ThemeState, PersistedThemeState> {
	/**
	 * Creates a new DevPanelThemeService instance and loads persisted theme from localStorage.
	 */
	constructor() {
		// Theme state should be persisted - shouldLoadOnInit: true, shouldPersist: true
		super(themeStorageKey, defaultThemeState, true, true);

		// Apply the initial theme immediately after construction
		this.applyTheme(this.getSnapshot().currentTheme);
	}

	/**
	 * Transforms current state to persistable format.
	 *
	 * @param state - The current theme state
	 * @returns The state in persistable format
	 * @protected
	 */
	protected toPersistableState(state: ThemeState): PersistedThemeState {
		return {
			currentTheme: state.currentTheme,
		};
	}

	/**
	 * Transforms persisted state back to current state format.
	 *
	 * @param persistedState - The persisted theme state
	 * @param defaultState - The default state to fall back to
	 * @returns The state in current format
	 * @protected
	 */
	protected fromPersistedState(persistedState: PersistedThemeState, defaultState: ThemeState): ThemeState {
		return {
			...defaultState,
			currentTheme: persistedState.currentTheme || defaultState.currentTheme,
		};
	}

	/**
	 * Gets the service name for error messages.
	 *
	 * @returns The service name
	 * @protected
	 */
	protected getServiceName(): string {
		return "theme";
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
	 * Sets the current theme and applies it to the document.
	 *
	 * @param theme - Theme name to set
	 */
	setTheme = (theme: string): void => {
		this.setState((state: ThemeState) => ({ ...state, currentTheme: theme }));
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
}

const themeService = new DevPanelThemeService();

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
export function useDevPanelTheme(): ThemeState & {
	setTheme: (theme: string) => void;
	resetTheme: () => void;
	getCurrentTheme: () => string;
} {
	const state = useSyncExternalStore(themeService.subscribe, themeService.getSnapshot);

	return {
		...state,
		setTheme: themeService.setTheme,
		resetTheme: themeService.resetTheme,
		getCurrentTheme: themeService.getCurrentTheme,
	};
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
	return useSyncExternalStore(themeService.subscribe, () => themeService.getSnapshot().currentTheme);
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
export function useDevPanelThemeActions() {
	return {
		setTheme: themeService.setTheme,
		resetTheme: themeService.resetTheme,
		getCurrentTheme: themeService.getCurrentTheme,
	};
}
