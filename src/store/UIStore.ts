import { useSyncExternalStore } from "react";

import type { DevPanelUIState, Position } from "@/components/DevPanel/types";

import { BaseStoreService } from "./BaseStoreService";

const storageKey = "dev-panel-ui-storage";
const defaultPosition = { x: 20, y: 20 };

const defaultUIState: DevPanelUIState = {
	isVisible: false,
	isCollapsed: false,
	position: defaultPosition,
};

/**
 * Service class that manages only the UI state of the dev panel (visibility, collapse, position).
 * This is separated from sections state to avoid unnecessary re-renders when UI state changes.
 *
 * Features:
 * - Persistent UI state storage in localStorage
 * - Independent from sections state changes
 * - Optimized re-renders for UI-specific updates
 *
 * @example
 * ```typescript
 * // Use the service through the provided hooks
 * const { isVisible, setVisible } = useDevPanelUI();
 * const actions = useDevPanelUIActions();
 * ```
 */
class DevPanelUIService extends BaseStoreService<DevPanelUIState, DevPanelUIState> {
	/**
	 * Creates a new DevPanelUIService instance and loads persisted state from localStorage.
	 */
	constructor() {
		// UI state should be persisted - shouldLoadOnInit: true, shouldPersist: true
		super(storageKey, defaultUIState, true, true);
	}

	/**
	 * Transforms current state to persistable format.
	 *
	 * @param state - The current UI state
	 * @returns The state in persistable format
	 * @protected
	 */
	protected toPersistableState(state: DevPanelUIState): DevPanelUIState {
		return {
			...state,
		};
	}

	/**
	 * Transforms persisted state back to current state format.
	 *
	 * @param persistedState - The persisted UI state
	 * @param defaultState - The default state to fall back to
	 * @returns The state in current format
	 * @protected
	 */
	protected fromPersistedState(persistedState: DevPanelUIState, defaultState: DevPanelUIState): DevPanelUIState {
		return {
			...defaultState,
			...persistedState,
		};
	}

	/**
	 * Gets the service name for error messages.
	 *
	 * @returns The service name
	 * @protected
	 */
	protected getServiceName(): string {
		return "UI";
	}

	/**
	 * Sets the visibility state of the dev panel.
	 *
	 * @param visible - Whether the panel should be visible
	 */
	setVisible = (visible: boolean): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, isVisible: visible }));
	};

	/**
	 * Sets the collapsed state of the dev panel.
	 *
	 * @param collapsed - Whether the panel should be collapsed
	 */
	setCollapsed = (collapsed: boolean): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, isCollapsed: collapsed }));
	};

	/**
	 * Updates the position of the dev panel.
	 *
	 * @param position - New position coordinates {x, y}
	 */
	setPosition = (position: Position): void => {
		this.setState((state: DevPanelUIState) => ({ ...state, position }));
	};

	/**
	 * Resets the dev panel UI to its default state.
	 * Resets position and sets visibility and collapse to false.
	 */
	reset = (): void => {
		this.setState(() => ({ ...defaultUIState }));
	};
}

const devPanelUIService = new DevPanelUIService();

/**
 * React hook that provides access to the complete dev panel UI state and actions.
 * Uses useSyncExternalStore for optimal performance and React 18 compatibility.
 * This hook will not re-render when sections state changes.
 *
 * @returns Object containing the current UI state and all available UI actions
 *
 * @example
 * ```typescript
 * const {
 *   isVisible,
 *   position,
 *   setVisible,
 *   setPosition
 * } = useDevPanelUI();
 * ```
 */
export function useDevPanelUI(): DevPanelUIState & {
	setVisible: (visible: boolean) => void;
	setCollapsed: (collapsed: boolean) => void;
	setPosition: (position: Position) => void;
	reset: () => void;
} {
	const state = useSyncExternalStore(devPanelUIService.subscribe, devPanelUIService.getSnapshot);

	return {
		...state,
		setVisible: devPanelUIService.setVisible,
		setCollapsed: devPanelUIService.setCollapsed,
		setPosition: devPanelUIService.setPosition,
		reset: devPanelUIService.reset,
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
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().isVisible);
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
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().isCollapsed);
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
	return useSyncExternalStore(devPanelUIService.subscribe, () => devPanelUIService.getSnapshot().position);
}

/**
 * React hook that provides access to all dev panel UI actions without subscribing to state.
 * Ideal for components that only need to trigger UI actions without rendering on state changes.
 *
 * @returns Object containing all available UI actions
 *
 * @example
 * ```typescript
 * const { setVisible, setPosition, reset } = useDevPanelUIActions();
 *
 * // Toggle panel visibility
 * setVisible(true);
 *
 * // Update position
 * setPosition({ x: 100, y: 100 });
 *
 * // Reset UI state
 * reset();
 * ```
 */
export function useDevPanelUIActions() {
	return {
		setVisible: devPanelUIService.setVisible,
		setCollapsed: devPanelUIService.setCollapsed,
		setPosition: devPanelUIService.setPosition,
		reset: devPanelUIService.reset,
	};
}

// Legacy exports for backward compatibility - these will be deprecated
export const useDevPanelStore = useDevPanelUI;
