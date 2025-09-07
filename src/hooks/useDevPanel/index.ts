import { createElement, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { DevPanelProps } from "@/components/DevPanel/types";
import { DevPanelPortal } from "@/components/DevPanelPortal";
import { DevPanelManager } from "@/managers/DevPanelManager";
import { controlPersistenceService } from "@/store/ControlPersistenceService";
import { useDevPanelSectionActions, useDevPanelSections } from "@/store/SectionsStore";
import { hasControlsChanged } from "@/utils/hasControlChanged/hasControlChanged";

type WindowWithDevPanel = Window & { __devPanelAutoMounted?: boolean };

/**
 * Hook to register controls in the dev panel with auto-mounting
 * @param sectionName - Section name (e.g: 'Global', 'HomePage')
 * @param controls - Controls configuration object
 * @param devPanelProps - Optional DevPanel configuration (title, hotkey, theme)
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

	if (!managerRef.current) {
		managerRef.current = DevPanelManager.getInstance();
	}

	useEffect(() => {
		Object.entries(controls).forEach(([controlKey, control]) => {
			const persistKey = `${sectionName}-${controlKey}`;

			if (control.persist && !persistentControlsProcessedRef.current.has(persistKey)) {
				const persistedValue = controlPersistenceService.getPersistedValue(sectionName, controlKey);

				if (persistedValue !== undefined && "onChange" in control && typeof control.onChange === "function") {
					(control.onChange as (value: unknown) => void)(persistedValue);
				}

				persistentControlsProcessedRef.current.add(persistKey);
			}
		});
	}, [sectionName, controls]);

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

						(originalOnChange as (value: unknown) => void)(value);
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

		if (hasControlsChanged(enhancedControls.current, previousControlsRef.current) || !sectionExists) {
			registerSection(sectionName, enhancedControls.current);
			previousControlsRef.current = enhancedControls.current;
			manager.addSection(sectionName, devPanelProps);
		} else if (devPanelProps) {
			manager.updateProps(devPanelProps);
		}
	}, [sectionName, controls, devPanelProps, sections, registerSection]);

	useEffect(() => {
		const processedControls = persistentControlsProcessedRef.current;

		return (): void => {
			const manager = managerRef.current!;

			unregisterSection(sectionName);
			manager.removeSection(sectionName);

			processedControls.clear();
		};
	}, [sectionName, unregisterSection]);

	// Auto-mount DevPanelPortal on first hook call
	useEffect(() => {
		if ((window as WindowWithDevPanel).__devPanelAutoMounted) return;

		(window as WindowWithDevPanel).__devPanelAutoMounted = true;

		const container = document.createElement("div");

		container.id = "dev-panel-portal-container";
		container.style.display = "none";
		document.body.appendChild(container);

		const root = createRoot(container);

		root.render(createElement(DevPanelPortal));
	}, []);
}
