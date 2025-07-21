import { useCallback, useEffect, useRef } from "react";

import type { HotkeyConfig, UseHotkeysOptions } from "@/types";

/**
 * Hook for handling keyboard shortcuts (hotkeys) with support for modifier keys
 * and multiple key combinations.
 *
 * @param hotkeys - Array of hotkey configurations
 * @param options - Global options for all hotkeys
 *
 * @example
 * // Basic usage
 * useHotkeys([
 *   { key: 'Enter', action: handleSubmit },
 *   { key: 'Escape', action: handleCancel }
 * ]);
 *
 * @example
 * // With modifier keys
 * useHotkeys([
 *   { key: 's', ctrlKey: true, action: handleSave, description: 'Save' },
 *   { key: 'k', metaKey: true, action: handleSearch, description: 'Search' },
 *   { key: 'z', ctrlKey: true, action: handleUndo, description: 'Undo' },
 *   { key: 'z', ctrlKey: true, shiftKey: true, action: handleRedo, description: 'Redo' }
 * ]);
 *
 * @example
 * // With individual configuration
 * useHotkeys([
 *   {
 *     key: 'Delete',
 *     action: handleDelete,
 *     preventDefault: true,
 *     enabled: canDelete,
 *     description: 'Delete item'
 *   }
 * ]);
 */
export function useHotkeys(
    hotkeys: HotkeyConfig[],
    options: UseHotkeysOptions = {}
): void {
    const {
        enabled = true,
        target = window,
        preventDefault = false,
        stopPropagation = false,
    } = options;

    const hotkeysRef = useRef<HotkeyConfig[]>([]);

    hotkeysRef.current = hotkeys;

    /**
     * Checks if the pressed key combination matches a hotkey configuration
     */
    const isHotkeyMatch = useCallback(
        (event: KeyboardEvent, config: HotkeyConfig): boolean => {
            const keyMatch =
                event.key.toLowerCase() === config.key.toLowerCase();
            const ctrlMatch = !!config.ctrlKey === event.ctrlKey;
            const shiftMatch = !!config.shiftKey === event.shiftKey;
            const altMatch = !!config.altKey === event.altKey;
            const metaMatch = !!config.metaKey === event.metaKey;

            return keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch;
        },
        []
    );

    /**
     * Handles the keydown event and executes matching hotkey actions
     */
    const handleKeyDown = useCallback(
        (event: Event) => {
            if (!enabled) return;

            const keyboardEvent = event as KeyboardEvent;

            for (const config of hotkeysRef.current) {
                if (config.enabled === false) continue;

                if (isHotkeyMatch(keyboardEvent, config)) {
                    const shouldPreventDefault =
                        config.preventDefault ?? preventDefault;
                    const shouldStopPropagation =
                        config.stopPropagation ?? stopPropagation;

                    if (shouldPreventDefault) {
                        event.preventDefault();
                    }

                    if (shouldStopPropagation) {
                        event.stopPropagation();
                    }

                    config.action(keyboardEvent);

                    break;
                }
            }
        },
        [enabled, preventDefault, stopPropagation, isHotkeyMatch]
    );

    useEffect(() => {
        const currentTarget = target;

        if (!currentTarget || !enabled) return;

        currentTarget.addEventListener("keydown", handleKeyDown);

        return () => {
            currentTarget.removeEventListener("keydown", handleKeyDown);
        };
    }, [target, enabled, handleKeyDown]);
}
