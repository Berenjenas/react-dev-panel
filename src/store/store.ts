import { useSyncExternalStore } from "react";

import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import type { DevPanelState, Position } from "@/components/DevPanel/types";

const defaultPosition = { x: 20, y: 20 };
const storageKey = "dev-panel-storage";

interface PersistedState {
	isVisible: boolean;
	isCollapsed: boolean;
	position: Position;
	sectionCollapseState: Record<string, boolean>;
}

class DevPanelService {
	private state: DevPanelState = {
		isVisible: false,
		isCollapsed: false,
		sections: {},
		position: defaultPosition,
	};

	private readonly listeners = new Set<() => void>();

	constructor() {
		this.loadState();
	}

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

	private notifySubscribers(): void {
		this.listeners.forEach((listener) => listener());
	}

	private setState(updater: (state: DevPanelState) => DevPanelState): void {
		this.state = updater(this.state);
		this.saveState();
		this.notifySubscribers();
	}

	getSnapshot = (): DevPanelState => this.state;

	subscribe = (listener: () => void): (() => void) => {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	};

	setVisible = (visible: boolean): void => {
		this.setState((state) => ({ ...state, isVisible: visible }));
	};

	setCollapsed = (collapsed: boolean): void => {
		this.setState((state) => ({ ...state, isCollapsed: collapsed }));
	};

	setPosition = (position: Position): void => {
		this.setState((state) => ({ ...state, position }));
	};

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

	unregisterSection = (name: string): void => {
		this.setState((state) => {
			const { [name]: _removed, ...rest } = state.sections;

			return { ...state, sections: rest };
		});
	};

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

export function useDevPanelVisible() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().isVisible);
}

export function useDevPanelCollapsed() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().isCollapsed);
}

export function useDevPanelPosition() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().position);
}

export function useDevPanelSections() {
	return useSyncExternalStore(devPanelService.subscribe, () => devPanelService.getSnapshot().sections);
}

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
