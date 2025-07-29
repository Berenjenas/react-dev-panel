import { useSyncExternalStore } from "react";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { DevPanelSection } from "@/components/DevPanel/types";

import { BaseStoreService } from "./";

const sectionsStorageKey = "dev-panel-sections-storage";

interface PersistedSectionsState {
	sectionCollapseState: Record<string, boolean>;
}

type SectionsState = Record<string, DevPanelSection>;

/**
 * Service class that manages only the sections state of the dev panel.
 * This is separated from the main DevPanelService to avoid unnecessary re-renders
 * when UI state (like position) changes.
 *
 * Features:
 * - Persistent section collapse states in localStorage
 * - Independent from UI state changes
 * - Optimized re-renders for section-specific updates
 */
class DevPanelSectionsService extends BaseStoreService<SectionsState, PersistedSectionsState> {
	/**
	 * Creates a new DevPanelSectionsService instance.
	 */
	constructor() {
		// Sections are not persisted - they're dynamic and should be in-memory only
		// shouldLoadOnInit: false, shouldPersist: false
		super(sectionsStorageKey, {}, false, false);
	}

	/**
	 * Transforms current sections state to persistable format.
	 * Since this store doesn't persist, this method returns a dummy value.
	 *
	 * @param _state - The current sections state (unused)
	 * @returns Empty persistable state
	 * @protected
	 */
	protected toPersistableState(_state: SectionsState): PersistedSectionsState {
		// This store doesn't persist, so return empty state
		return { sectionCollapseState: {} };
	}

	/**
	 * Transforms persisted state back to current state format.
	 * Since this store doesn't persist, this method returns the default state.
	 *
	 * @param _persistedState - The persisted sections state (unused)
	 * @param defaultState - The default state to fall back to
	 * @returns The default state
	 * @protected
	 */
	protected fromPersistedState(_persistedState: PersistedSectionsState, defaultState: SectionsState): SectionsState {
		// This store doesn't persist, so always return the default state
		return defaultState;
	}

	/**
	 * Gets the service name for error messages.
	 *
	 * @returns The service name
	 * @protected
	 */
	protected getServiceName(): string {
		return "sections";
	}

	/**
	 * Registers a new section with the dev panel.
	 * If a section with the same name already exists, it preserves the existing collapse state.
	 * New sections start in expanded state (isCollapsed: false).
	 *
	 * @param name - Unique name for the section
	 * @param controls - Array of control configurations for the section
	 */
	registerSection = (name: string, controls: ControlsGroup): void => {
		this.setState((sections: SectionsState) => {
			const existingSection = sections[name];
			// Preserve existing collapse state or default to expanded (false)
			const isCollapsed = existingSection?.isCollapsed ?? false;

			return {
				...sections,
				[name]: {
					name,
					controls,
					isCollapsed,
				},
			};
		});
	};

	/**
	 * Removes a section from the dev panel.
	 *
	 * @param name - Name of the section to remove
	 */
	unregisterSection = (name: string): void => {
		this.setState((sections: SectionsState) => {
			const { [name]: _removed, ...rest } = sections;
			return rest;
		});
	};

	/**
	 * Toggles the collapsed state of a specific section.
	 *
	 * @param name - Name of the section to toggle
	 */
	toggleSectionCollapse = (name: string): void => {
		this.setState((sections: SectionsState) => {
			const section = sections[name];

			if (!section) return sections;

			return {
				...sections,
				[name]: {
					...section,
					isCollapsed: !section.isCollapsed,
				},
			};
		});
	};

	/**
	 * Clears all sections.
	 */
	reset = (): void => {
		this.setState(() => ({}));
	};
}

const sectionsService = new DevPanelSectionsService();

/**
 * React hook that subscribes only to the sections state of the dev panel.
 * This hook will not re-render when UI state (position, visibility) changes.
 *
 * @returns Record of section names to section objects
 *
 * @example
 * ```typescript
 * const sections = useDevPanelSections();
 * const sectionNames = Object.keys(sections);
 * ```
 */
export function useDevPanelSections(): SectionsState {
	return useSyncExternalStore(sectionsService.subscribe, sectionsService.getSnapshot);
}

/**
 * React hook that provides access to section actions without subscribing to state.
 * Ideal for components that only need to trigger section actions without rendering on changes.
 *
 * @returns Object containing all available section actions
 *
 * @example
 * ```typescript
 * const { registerSection, toggleSectionCollapse } = useDevPanelSectionActions();
 *
 * // Add a new section
 * registerSection('mySection', myControls);
 *
 * // Toggle section collapse
 * toggleSectionCollapse('mySection');
 * ```
 */
export function useDevPanelSectionActions() {
	return {
		registerSection: sectionsService.registerSection,
		unregisterSection: sectionsService.unregisterSection,
		toggleSectionCollapse: sectionsService.toggleSectionCollapse,
		reset: sectionsService.reset,
	};
}
