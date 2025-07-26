import type { HotkeyConfig } from "@/hooks/useHotkeys/types";

import { isMacOS } from "../isMacOS/isMacOS";

/**
 * Utility function to format hotkey combination as a human-readable string
 *
 * @param config - Hotkey configuration
 * @returns Human-readable string representation
 *
 * @example
 * formatHotkey({ key: 's', ctrlKey: true }) // "Ctrl+S"
 * formatHotkey({ key: 'k', metaKey: true }) // "⌘+K" (on Mac) or "Meta+K"
 */
export function formatHotkey(config: HotkeyConfig): string {
	const parts: string[] = [];

	// Check if we're on Mac for proper symbol display
	const isMac = isMacOS();

	if (config.ctrlKey) {
		parts.push(isMac ? "⌃" : "Ctrl");
	}

	if (config.altKey) {
		parts.push(isMac ? "⌥" : "Alt");
	}

	if (config.shiftKey) {
		parts.push(isMac ? "⇧" : "Shift");
	}

	if (config.metaKey) {
		parts.push(isMac ? "⌘" : "Meta");
	}

	parts.push(config.key.toUpperCase());

	return parts.join("+");
}
