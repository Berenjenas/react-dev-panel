import { useEffect, useRef } from "react";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import { hasControlsChanged } from "@/utils/hasControlChanged/hasControlChanged";
import { useDevPanelActions, useDevPanelSections } from "@/utils/store/store";

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
	// Only register controls in development mode
	// if (process.env.NODE_ENV !== "development") {
	//     return;
	// }

	const actions = useDevPanelActions();
	const sections = useDevPanelSections();
	const previousControlsRef = useRef<ControlsGroup | undefined>(undefined);

	useEffect(() => {
		// Check if the section exists in the store
		const sectionExists = sections[sectionName] !== undefined;

		// Register if the controls have changed or the section does not exist
		if (hasControlsChanged(controls, previousControlsRef.current) || !sectionExists) {
			actions.registerSection(sectionName, controls);
			previousControlsRef.current = controls;
		}
	}, [actions, sectionName, controls, sections]);

	useEffect(() => {
		// Cleanup when the component is unmounted
		return () => {
			actions.unregisterSection(sectionName);
		};
	}, [actions, sectionName]);
}
