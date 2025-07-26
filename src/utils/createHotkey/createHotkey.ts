import type { HotkeyConfig } from "@/hooks/useHotkeys/types";

/**
 * Utility function to create a hotkey configuration object
 *
 * @param key - The key to listen for
 * @param action - The action to execute
 * @param modifiers - Optional modifier keys
 * @param options - Additional options
 *
 * @example
 * const saveHotkey = createHotkey('s', handleSave, { ctrl: true });
 * const searchHotkey = createHotkey('k', handleSearch, { meta: true });
 */
export function createHotkey(
	key: string,
	action: (event: KeyboardEvent) => void,
	modifiers: {
		ctrl?: boolean;
		shift?: boolean;
		alt?: boolean;
		meta?: boolean;
	} = {},
	options: Partial<Omit<HotkeyConfig, "key" | "action">> = {},
): HotkeyConfig {
	return {
		key,
		action,
		ctrlKey: modifiers.ctrl,
		shiftKey: modifiers.shift,
		altKey: modifiers.alt,
		metaKey: modifiers.meta,
		...options,
	};
}
