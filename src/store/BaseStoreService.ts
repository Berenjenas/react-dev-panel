/**
 * Abstract base class for state management services using the useSyncExternalStore pattern.
 * Provides common functionality for subscription management, state updates, and persistence.
 *
 * @template TState - The type of the state object
 * @template TPersistedState - The type of the persisted state object (usually a subset of TState)
 */
export abstract class BaseStoreService<TState, TPersistedState = TState> {
	/** Set of listeners subscribed to state changes */
	protected readonly listeners = new Set<() => void>();

	/** The localStorage key for persisting state */
	protected readonly storageKey: string;

	/** Whether this store should persist state to localStorage */
	protected readonly shouldPersist: boolean;

	/** The current state */
	protected state: TState;

	/**
	 * Creates a new BaseStoreService instance.
	 *
	 * @param storageKey - The localStorage key for persisting state (used only if shouldPersist is true)
	 * @param defaultState - The default state value
	 * @param shouldLoadOnInit - Whether to load persisted state on initialization (only works if shouldPersist is true)
	 * @param shouldPersist - Whether to persist state to localStorage (default: true)
	 */
	constructor(storageKey: string, defaultState: TState, shouldLoadOnInit: boolean = true, shouldPersist: boolean = true) {
		this.storageKey = storageKey;
		this.shouldPersist = shouldPersist;
		this.state = defaultState;

		if (shouldLoadOnInit && shouldPersist) {
			this.loadState();
		}
	}

	/**
	 * Abstract method to transform current state to persistable format.
	 * Must be implemented by subclasses.
	 *
	 * @param state - The current state
	 * @returns The state in persistable format
	 */
	protected abstract toPersistableState(state: TState): TPersistedState;

	/**
	 * Abstract method to transform persisted state back to current state format.
	 * Must be implemented by subclasses.
	 *
	 * @param persistedState - The persisted state
	 * @param defaultState - The default state to fall back to
	 * @returns The state in current format
	 */
	protected abstract fromPersistedState(persistedState: TPersistedState, defaultState: TState): TState;

	/**
	 * Abstract method to get the service name for error messages.
	 * Must be implemented by subclasses.
	 *
	 * @returns The service name
	 */
	protected abstract getServiceName(): string;

	/**
	 * Saves the current state to localStorage.
	 *
	 * @protected
	 */
	protected saveState(): void {
		if (!this.shouldPersist) {
			return;
		}

		try {
			const persistedState = this.toPersistableState(this.state);
			localStorage.setItem(this.storageKey, JSON.stringify(persistedState));
		} catch {
			console.warn(`Failed to save ${this.getServiceName()} state to localStorage`);
		}
	}

	/**
	 * Loads previously persisted state from localStorage.
	 * If no state exists or loading fails, keeps the current state.
	 *
	 * @protected
	 */
	protected loadState(): void {
		if (!this.shouldPersist) {
			return;
		}

		try {
			const stored = localStorage.getItem(this.storageKey);

			if (stored) {
				const parsed: TPersistedState = JSON.parse(stored);
				this.state = this.fromPersistedState(parsed, this.state);
			}
		} catch {
			console.warn(`Failed to load persisted ${this.getServiceName()} state from localStorage`);
		}
	}

	/**
	 * Notifies all subscribed listeners about state changes.
	 *
	 * @protected
	 */
	protected notifySubscribers(): void {
		this.listeners.forEach((listener) => listener());
	}

	/**
	 * Updates the state using an updater function, persists the new state,
	 * and notifies all subscribers if the state changed.
	 *
	 * @param updater - Function that receives current state and returns new state
	 * @protected
	 */
	protected setState(updater: (state: TState) => TState): void {
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
	 * @returns The current state
	 */
	getSnapshot = (): TState => this.state;

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
}
