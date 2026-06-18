import { hideDevPanel, showDevPanel, toggleDevPanel } from "@/store/UIStore";

/**
 * Imperative API exposed on `window.devPanel` so developers can drive the panel
 * from the browser console, in addition to the keyboard hotkey.
 *
 * @example
 * ```js
 * devPanel.open();    // show the panel
 * devPanel.close();   // hide it
 * devPanel.toggle();  // flip visibility (same as the hotkey)
 * ```
 */
export interface DevPanelConsoleApi {
	/** Shows the panel (no-op visually if no sections are registered yet). */
	open: () => void;
	/** Hides the panel. */
	close: () => void;
	/** Toggles visibility — mirrors the keyboard hotkey. */
	toggle: () => void;
}

declare global {
	interface Window {
		devPanel?: DevPanelConsoleApi;
	}
}

/**
 * Registers `window.devPanel` and prints a one-line discovery hint.
 *
 * SSR-safe (no-op when `window` is undefined) and idempotent in practice: it is
 * called from `mountDevPanelPortal`, which only runs once, so the hint logs a
 * single time.
 */
export function registerDevPanelConsoleApi(): void {
	if (typeof window === "undefined") return;

	window.devPanel = {
		open: showDevPanel,
		close: hideDevPanel,
		toggle: toggleDevPanel,
	};

	// Discovery hint. Intentionally does not name the hotkey, which is
	// configurable per consumer via `hotKeyConfig`.
	console.info("[DevPanel] ready — type `devPanel.toggle()` in the console to open it.");
}

/**
 * Removes `window.devPanel`. Mirrors `unmountDevPanelPortal` for clean teardown
 * (HMR, tests).
 */
export function unregisterDevPanelConsoleApi(): void {
	if (typeof window === "undefined") return;

	delete window.devPanel;
}
