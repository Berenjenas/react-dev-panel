import type { HotkeyConfig, UseHotkeysOptions } from "./types";
import { useHotkeys } from "./useHotkeys";

/**
 * Hook for handling a single hotkey combination
 *
 * @param config - Single hotkey configuration
 * @param options - Options for the hotkey
 *
 * @example
 * useHotkey({
 *   key: 's',
 *   ctrlKey: true,
 *   action: handleSave,
 *   description: 'Save document'
 * });
 */
export function useHotkey(config: HotkeyConfig, options: UseHotkeysOptions = {}): void {
	useHotkeys([config], options);
}
