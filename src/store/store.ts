import { useSyncExternalStore } from "react";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { DevPanelState, Position } from "@/components/DevPanel/types";

const storageKey = "dev-panel-storage";
const defaultPosition = { x: 20, y: 20 };

interface PersistedState {
	isVisible: boolean;
	isCollapsed: boolean;
	position: Position;
	sectionCollapseState: Record<string, boolean>;
}

/**
 * Service class that manages the dev panel state using the useSyncExternalStore pattern.
 * Provides a zero-dependency alternative to Zustand for state management.
 *
 * Features:
 * - Persistent state storage in localStorage
 * - Section management with collapse states
 * - Position tracking for draggable panel
 * - Optimized re-renders through selective subscriptions
 *
 * @example
 * ```typescript
 * // Use the service through the provided hooks
 * const { isVisible, setVisible } = useDevPanelStore();
 * const actions = useDevPanelActions();
 * ```
 */
class DevPanelService {
	/** The current state of the dev panel */
	private state: DevPanelState = {
		isVisible: false,
		isCollapsed: false,
		sections: {},
		position: defaultPosition,
	};

	/** Set of listeners subscribed to state changes */
	private readonly listeners = new Set<() => void>();

	/**
	 * Creates a new DevPanelService instance and loads persisted state from localStorage.
	 */
	constructor() {
		this.loadState();
	}

	/**
	 * Saves the current state to localStorage.
	 * Only persists visibility, collapse state, position, and section collapse states.
	 * Sections themselves are not persisted as they are dynamic and recreated on mount.
	 *
	 * @private
	 */
	private saveState(): void {
		try {
			const persistedState: PersistedState = {
				isVisible: this.state.isVisible,
				isCollapsed: this.state.isCollapsed,
				position: this.state.position,
				sectionCollapseState: Object.fromEntries(
					Object.entries(this.state.sections).map(([key, section]) => [key, section.isCollapsed ?? false]),
				),
			};

			localStorage.setItem(storageKey, JSON.stringify(persistedState));
		} catch {
			console.warn("Failed to save state to localStorage");
		}
	}

	/**
	 * Loads previously persisted state from localStorage.
	 * If no state exists or loading fails, uses default values.
	 *
	 * @private
	 */
	private loadState(): void {
		try {
			const stored = localStorage.getItem(storageKey);

			if (stored) {
				const parsed: PersistedState = JSON.parse(stored);

				this.state = {
					...this.state,
					isVisible: parsed.isVisible ?? false,
					isCollapsed: parsed.isCollapsed ?? false,
					position: parsed.position ?? defaultPosition,
				};
			}
		} catch {
			console.warn("Failed to load persisted state from localStorage");
		}
	}

	/**
	 * Notifies all subscribed listeners about state changes.
	 *
	 * @private
	 */
	private notifySubscribers(): void {
		this.listeners.forEach((listener) => listener());
	}

	/**
	 * Updates the state using an updater function, persists the new state,
	 * and notifies all subscribers.
	 *
	 * @param updater - Function that receives current state and returns new state
	 * @private
	 */
	private setState(updater: (state: DevPanelState) => DevPanelState): void {
		const updatedState = updater(this.state);

		if (JSON.stringify(updatedState) === JSON.stringify(this.state)) {
			return;
		}

		this.state = updatedState;
		this.saveState();
		this.notifySubscribers();
	}

	/**
	 * Returns the current state snapshot for useSyncExternalStore.
	 *
	 * @returns The current dev panel state
	 */
	getSnapshot = (): DevPanelState => this.state;

	/**
	 * Subscribes a listener to state changes for useSyncExternalStore.
	 *
	 * @param listener - Function to call when state changes
	 * @returns Unsubscribe function
	 */
	subscribe = (listener: () => void): (() => void) => {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	};

	/**
	 * Sets the visibility state of the dev panel.
	 *
	 * @param visible - Whether the panel should be visible
	 */
	setVisible = (visible: boolean): void => {
		this.setState((state) => ({ ...state, isVisible: visible }));
	};

	/**
	 * Sets the collapsed state of the dev panel.
	 *
	 * @param collapsed - Whether the panel should be collapsed
	 */
	setCollapsed = (collapsed: boolean): void => {
		this.setState((state) => ({ ...state, isCollapsed: collapsed }));
	};

	/**
	 * Updates the position of the dev panel.
	 *
	 * @param position - New position coordinates {x, y}
	 */
	setPosition = (position: Position): void => {
		this.setState((state) => ({ ...state, position }));
	};

	/**
	 * Registers a new section with the dev panel.
	 * If a section with the same name already exists, it preserves the existing collapse state.
	 * Otherwise, it attempts to restore the collapse state from localStorage.
	 *
	 * @param name - Unique name for the section
	 * @param controls - Array of control configurations for the section
	 */
	registerSection = (name: string, controls: ControlsGroup): void => {
		this.setState((state) => {
			const existingSection = state.sections[name];
			let persistedCollapseState = false;

			try {
				const stored = localStorage.getItem(storageKey);

				if (stored) {
					const parsed: PersistedState = JSON.parse(stored);

					persistedCollapseState = parsed.sectionCollapseState?.[name] ?? false;
				}
			} catch {
				console.warn("Failed to read section collapse state from localStorage");
			}

			const isCollapsed = existingSection?.isCollapsed ?? persistedCollapseState;

			return {
				...state,
				sections: {
					...state.sections,
					[name]: {
						name,
						controls,
						isCollapsed,
					},
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
		this.setState((state) => {
			const { [name]: _removed, ...rest } = state.sections;

			return { ...state, sections: rest };
		});
	};

	/**
	 * Toggles the collapsed state of a specific section.
	 *
	 * @param name - Name of the section to toggle
	 */
	toggleSectionCollapse = (name: string): void => {
		this.setState((state) => {
			const section = state.sections[name];

			if (!section) return state;

			return {
				...state,
				sections: {
					...state.sections,
					[name]: {
						...section,
						isCollapsed: !section.isCollapsed,
					},
				},
			};
		});
	};

	/**
	 * Resets the dev panel to its default state.
	 * Clears all sections, resets position, and sets visibility and collapse to false.
	 */
	reset = (): void => {
		this.setState(() => ({
			isVisible: false,
			isCollapsed: false,
			sections: {},
			position: defaultPosition,
		}));
	};
}

const devPanelService = new DevPanelService();

/**
 * React hook that provides access to the complete dev panel state and actions.
 * Uses useSyncExternalStore for optimal performance and React 18 compatibility.
 *
 * @returns Object containing the current state and all available actions
 *
 * @example
 * ```typescript
 * const {
 *   isVisible,
 *   sections,
 *   setVisible,
 *   registerSection
 * } = useDevPanelStore();
 * ```
 */
export function useDevPanelStore(): DevPanelState & {
	setVisible: (visible: boolean) => void;
	setCollapsed: (collapsed: boolean) => void;
	setPosition: (position: Position) => void;
	registerSection: (name: string, controls: ControlsGroup) => void;
	unregisterSection: (name: string) => void;
	toggleSectionCollapse: (name: string) => void;
	reset: () => void;
} {
	const state = useSyncExternalStore(devPanelService.subscribe, devPanelService.getSnapshot);

	return {
		...state,
		setVisible: devPanelService.setVisible,
		setCollapsed: devPanelService.setCollapsed,
		setPosition: devPanelService.setPosition,
		registerSection: devPanelService.registerSection,
		unregisterSection: devPanelService.unregisterSection,
		toggleSectionCollapse: devPanelService.toggleSectionCollapse,
		reset: devPanelService.reset,
	};
}

/**
 * React hook that subscribes only to the visibility state of the dev panel.
 * Optimized for components that only need to know if the panel is visible.
 *
 * @returns Boolean indicating whether the dev panel is visible
 *
 * @example
 * ```typescript
 * const isVisible = useDevPanelVisible();
 * ```
 */
export function useDevPanelVisible() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().isVisible);
}

/**
 * React hook that subscribes only to the collapsed state of the dev panel.
 * Optimized for components that only need to know if the panel is collapsed.
 *
 * @returns Boolean indicating whether the dev panel is collapsed
 *
 * @example
 * ```typescript
 * const isCollapsed = useDevPanelCollapsed();
 * ```
 */
export function useDevPanelCollapsed() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().isCollapsed);
}

/**
 * React hook that subscribes only to the position state of the dev panel.
 * Optimized for components that only need to track panel position.
 *
 * @returns Position object with x and y coordinates
 *
 * @example
 * ```typescript
 * const position = useDevPanelPosition();
 * console.log(`Panel is at ${position.x}, ${position.y}`);
 * ```
 */
export function useDevPanelPosition() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().position);
}

/**
 * React hook that subscribes only to the sections state of the dev panel.
 * Optimized for components that only need to access panel sections.
 *
 * @returns Record of section names to section objects
 *
 * @example
 * ```typescript
 * const sections = useDevPanelSections();
 * const sectionNames = Object.keys(sections);
 * ```
 */
export function useDevPanelSections() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().sections);
}

/**
 * React hook that provides access to all dev panel actions without subscribing to state.
 * Ideal for components that only need to trigger actions without rendering on state changes.
 *
 * @returns Object containing all available actions
 *
 * @example
 * ```typescript
 * const { setVisible, registerSection, reset } = useDevPanelActions();
 *
 * // Toggle panel visibility
 * setVisible(true);
 *
 * // Add a new section
 * registerSection('mySection', myControls);
 *
 * // Reset everything
 * reset();
 * ```
 */
export function useDevPanelActions() {
	return {
		setVisible: devPanelService.setVisible,
		setCollapsed: devPanelService.setCollapsed,
		setPosition: devPanelService.setPosition,
		registerSection: devPanelService.registerSection,
		unregisterSection: devPanelService.unregisterSection,
		toggleSectionCollapse: devPanelService.toggleSectionCollapse,
		reset: devPanelService.reset,
	};
}
