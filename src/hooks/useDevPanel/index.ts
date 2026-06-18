import { useEffect, useRef } from "react";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { DevPanelProps } from "@/components/DevPanel/types";
import { DevPanelManager } from "@/managers/DevPanelManager";
import { controlPersistenceService } from "@/store/ControlPersistenceService";
import { useDevPanelSectionActions, useDevPanelSections } from "@/store/SectionsStore";
import { hasControlsChanged } from "@/utils/hasControlChanged/hasControlChanged";
import { isValidPersistedValue } from "@/utils/isValidPersistedValue/isValidPersistedValue";

import { mountDevPanelPortal } from "./mountDevPanelPortal";

/**
 * Hook to register controls in the dev panel with auto-mounting
 * @param sectionName - Section name (e.g: 'Global', 'HomePage')
 * @param controls - Controls configuration object
 * @param devPanelProps - Optional DevPanel configuration (title, hotkey, theme, enabled)
 *
 * @remarks
 * Pass `devPanelProps.enabled = false` to make this call a no-op (e.g.
 * `enabled: import.meta.env.DEV` to disable the panel in production).
 *
 * @example
 * ```typescript
 * useDevPanel('Global', {
 *   theme: {
 *     type: 'select',
 *     value: 'light',
 *     options: ['light', 'dark'],
 *     onChange: setTheme
 *   },
 *   debugMode: {
 *     type: 'boolean',
 *     value: false,
 *     onChange: setDebugMode
 *   }
 * }, {
 *   panelTitle: 'My App Controls',
 *   theme: 'dark'
 * });
 * ```
 */
export function useDevPanel(sectionName: string, controls: ControlsGroup, devPanelProps?: DevPanelProps): void {
	const sections = useDevPanelSections();
	const { registerSection, unregisterSection } = useDevPanelSectionActions();
	const previousControlsRef = useRef<ControlsGroup | undefined>(undefined);
	const managerRef = useRef<DevPanelManager | null>(null);
	const persistentControlsProcessedRef = useRef<Set<string>>(new Set());

	const enabled = devPanelProps?.enabled ?? true;

	if (!managerRef.current) {
		managerRef.current = DevPanelManager.getInstance();
	}

	useEffect(() => {
		if (!enabled) return;

		Object.entries(controls).forEach(([controlKey, control]) => {
			const persistKey = `${sectionName}-${controlKey}`;

			if (control.persist && !persistentControlsProcessedRef.current.has(persistKey)) {
				const persistedValue = controlPersistenceService.getPersistedValue(sectionName, controlKey);

				if (persistedValue !== undefined && "onChange" in control && typeof control.onChange === "function") {
					if (isValidPersistedValue(control, persistedValue)) {
						(control.onChange as (value: unknown) => void)(persistedValue);
					} else {
						console.warn(
							`[DevPanel] Ignoring persisted value for "${sectionName}.${controlKey}": ` +
								`type does not match control "${control.type}". Dropping stored value.`,
						);

						controlPersistenceService.removePersistedValue(sectionName, controlKey);
					}
				}

				persistentControlsProcessedRef.current.add(persistKey);
			}
		});
	}, [enabled, sectionName, controls]);

	const enhancedControls = useRef<ControlsGroup>({});

	useEffect(() => {
		const newEnhancedControls: ControlsGroup = {};

		Object.entries(controls).forEach(([controlKey, control]) => {
			if (control.persist && "onChange" in control && typeof control.onChange === "function") {
				const originalOnChange = control.onChange;

				newEnhancedControls[controlKey] = {
					...control,
					onChange: (value: unknown): void => {
						controlPersistenceService.setPersistedValue(sectionName, controlKey, value);

						// Isolate consumer errors so a buggy handler can't tear down the panel.
						try {
							(originalOnChange as (value: unknown) => void)(value);
						} catch (error) {
							console.error(`[DevPanel] Error in onChange for "${sectionName}.${controlKey}":`, error);
						}
					},
				};
			} else {
				newEnhancedControls[controlKey] = control;
			}
		});

		enhancedControls.current = newEnhancedControls;
	}, [sectionName, controls]);

	useEffect(() => {
		const manager = managerRef.current!;
		const sectionExists = sections[sectionName] !== undefined;

		// Disabled call: ensure the section is not present (handles a runtime
		// flip from enabled -> disabled) and contribute nothing to the panel.
		if (!enabled) {
			if (sectionExists) {
				unregisterSection(sectionName);
				manager.removeSection(sectionName);
				previousControlsRef.current = undefined;
			}

			return;
		}

		if (hasControlsChanged(enhancedControls.current, previousControlsRef.current) || !sectionExists) {
			registerSection(sectionName, enhancedControls.current);
			previousControlsRef.current = enhancedControls.current;
			manager.addSection(sectionName, devPanelProps);
		} else if (devPanelProps) {
			manager.updateProps(devPanelProps);
		}
	}, [enabled, sectionName, controls, devPanelProps, sections, registerSection, unregisterSection]);

	useEffect(() => {
		const processedControls = persistentControlsProcessedRef.current;

		return (): void => {
			const manager = managerRef.current!;

			unregisterSection(sectionName);
			manager.removeSection(sectionName);

			processedControls.clear();
		};
	}, [sectionName, unregisterSection]);

	// Auto-mount DevPanelPortal on first enabled hook call (idempotent, SSR-safe).
	useEffect(() => {
		if (!enabled) return;

		mountDevPanelPortal();
	}, [enabled]);
}
