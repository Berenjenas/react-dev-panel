import { createElement, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { DevPanelProps } from "@/components/DevPanel/types";
import { DevPanelPortal } from "@/components/DevPanelPortal";
import { DevPanelManager } from "@/managers/DevPanelManager";
import { useDevPanelSectionActions, useDevPanelSections } from "@/store";
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
export function useDevPanel(sectionName: string, controls: ControlsGroup, devPanelProps?: DevPanelProps) {
	const sections = useDevPanelSections();
	const { registerSection, unregisterSection } = useDevPanelSectionActions();
	const previousControlsRef = useRef<ControlsGroup | undefined>(undefined);
	const managerRef = useRef<DevPanelManager | null>(null);

	if (!managerRef.current) {
		managerRef.current = DevPanelManager.getInstance();
	}

	useEffect(() => {
		const manager = managerRef.current!;
		const sectionExists = sections[sectionName] !== undefined;

		if (hasControlsChanged(controls, previousControlsRef.current) || !sectionExists) {
			registerSection(sectionName, controls);
			previousControlsRef.current = controls;
			manager.addSection(sectionName, devPanelProps);
		} else if (devPanelProps) {
			manager.updateProps(devPanelProps);
		}
	}, [sectionName, controls, devPanelProps, sections, registerSection]);

	useEffect(() => {
		return () => {
			const manager = managerRef.current!;
			unregisterSection(sectionName);
			manager.removeSection(sectionName);
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
