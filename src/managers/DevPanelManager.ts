import type { DevPanelProps } from "@/components/DevPanel/types";

/**
 * Simplified singleton that manages DevPanel state and props merging
 * Works with createPortal for rendering instead of manual DOM management
 */
export class DevPanelManager {
	private static instance: DevPanelManager | null = null;
	private currentProps: DevPanelProps = {};
	private mountedSections: Set<string> = new Set();
	private updateCallback: (() => void) | null = null;
	private propsChangeCallback: ((props: DevPanelProps) => void) | null = null;
	private cleanupTimeoutId: NodeJS.Timeout | null = null;

	private constructor() {}

	static getInstance(): DevPanelManager {
		if (!DevPanelManager.instance) {
			DevPanelManager.instance = new DevPanelManager();
		}
		return DevPanelManager.instance;
	}

	/**
	 * Sets callback to trigger re-render when state changes
	 *
	 * @param callback - Function to call when state changes
	 */
	setUpdateCallback(callback: () => void): void {
		this.updateCallback = callback;
	}

	/**
	 * Updates DevPanel props using merge strategy
	 *
	 * @param newProps - New props to merge with existing props
	 */
	updateProps(newProps: DevPanelProps): void {
		this.currentProps = {
			...this.currentProps,
			...newProps,
		};
		this.notifyUpdate();
	}

	/**
	 * Registers section and updates props
	 *
	 * @param sectionName - Unique identifier for the section
	 * @param props - Optional DevPanel props to merge
	 */
	addSection(sectionName: string, props: DevPanelProps = {}): void {
		if (this.cleanupTimeoutId) {
			clearTimeout(this.cleanupTimeoutId);
			this.cleanupTimeoutId = null;
		}

		this.mountedSections.add(sectionName);
		if (Object.keys(props).length > 0) {
			this.updateProps(props);
		} else {
			this.notifyUpdate();
		}
	}

	/**
	 * Removes section and schedules cleanup if no sections remain
	 *
	 * @param sectionName - Unique identifier for the section to remove
	 */
	removeSection(sectionName: string): void {
		this.mountedSections.delete(sectionName);

		if (this.mountedSections.size === 0) {
			this.scheduleCleanup();
		} else {
			this.notifyUpdate();
		}
	}

	/**
	 * Checks if DevPanel should be rendered
	 *
	 * @returns True if there are mounted sections, false otherwise
	 */
	shouldRender(): boolean {
		return this.mountedSections.size > 0;
	}

	/**
	 * Gets current merged props
	 *
	 * @returns Copy of the current merged DevPanel props
	 */
	getAllProps(): DevPanelProps {
		return { ...this.currentProps };
	}

	/**
	 * Subscribe to props changes
	 *
	 * @param callback - Function to call when props change
	 * @returns Unsubscribe function to remove the callback
	 */
	onPropsChange(callback: (props: DevPanelProps) => void): () => void {
		this.propsChangeCallback = callback;

		// Return unsubscribe function
		return () => {
			this.propsChangeCallback = null;
		};
	}

	/**
	 * Gets active sections for debugging
	 *
	 * @returns Array of active section names
	 */
	getActiveSections(): string[] {
		return Array.from(this.mountedSections);
	}

	/**
	 * Schedules cleanup with 1s grace period for quick re-mounting
	 */
	private scheduleCleanup(): void {
		this.cleanupTimeoutId = setTimeout(() => {
			if (this.mountedSections.size === 0) {
				this.cleanup();
			}
		}, 1000);
	}

	/**
	 * Notifies subscribers about state changes
	 */
	private notifyUpdate(): void {
		this.updateCallback?.();
		this.propsChangeCallback?.(this.getAllProps());
	}

	/**
	 * Cleans up state and notifies update
	 */
	private cleanup(): void {
		this.currentProps = {};
		this.mountedSections.clear();
		this.notifyUpdate();

		if (this.cleanupTimeoutId) {
			clearTimeout(this.cleanupTimeoutId);
			this.cleanupTimeoutId = null;
		}
	}

	/**
	 * Force cleanup - useful for testing
	 */
	forceCleanup(): void {
		if (this.cleanupTimeoutId) {
			clearTimeout(this.cleanupTimeoutId);
			this.cleanupTimeoutId = null;
		}
		this.cleanup();
	}

	/**
	 * Reset singleton instance - useful for HMR
	 */
	static resetInstance(): void {
		if (DevPanelManager.instance) {
			DevPanelManager.instance.forceCleanup();
			DevPanelManager.instance = null;
		}
	}
}
