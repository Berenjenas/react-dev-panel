import { useEffect, useRef } from "react";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import { useDevPanelStore } from "@/store";
import { hasControlsChanged } from "@/utils/hasControlChanged/hasControlChanged";

/**
 * Hook to register controls in the dev panel
 * @param sectionName - Section name (e.g: 'Global', 'HomePage')
 * @param controls - Controls configuration
 *
 * @example
 * ```typescript
 * useDevPanel('Global', {
 *   theme: {
 *     type: 'select',
 *     value: 'light',
 *     options: ['light', 'dark'],
 *     onChange: (value) => setTheme(value)
 *   },
 *   debugMode: {
 *     type: 'boolean',
 *     value: false,
 *     onChange: (value) => setDebugMode(value)
 *   }
 * });
 * ```
 */
export function useDevPanel(sectionName: string, controls: ControlsGroup) {
	const { sections, registerSection, unregisterSection } = useDevPanelStore();
	const previousControlsRef = useRef<ControlsGroup | undefined>(undefined);

	useEffect(() => {
		// Check if the section exists in the store
		const sectionExists = sections[sectionName] !== undefined;

		// Register if the controls have changed or the section does not exist
		if (hasControlsChanged(controls, previousControlsRef.current) || !sectionExists) {
			registerSection(sectionName, controls);
			previousControlsRef.current = controls;
		}
	}, [sectionName, controls, sections, registerSection]);

	useEffect(() => {
		// Cleanup when the component is unmounted
		return () => {
			unregisterSection(sectionName);
		};
	}, [sectionName, unregisterSection]);
}
