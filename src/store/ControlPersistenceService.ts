/**
 * Service for persisting individual control values
 */
class ControlPersistenceService {
	private readonly storageKey = "dev-panel-controls-persistence";

	/**
	 * Gets persisted value for a control
	 * @param sectionName - Name of the section
	 * @param controlKey - Key of the control within the section
	 * @returns Persisted value or undefined if not found
	 */
	getPersistedValue(sectionName: string, controlKey: string): unknown {
		try {
			const stored = localStorage.getItem(this.storageKey);

			if (!stored) return undefined;

			const parsed = JSON.parse(stored);

			return parsed[sectionName]?.[controlKey];
		} catch {
			return undefined;
		}
	}

	/**
	 * Sets persisted value for a control
	 * @param sectionName - Name of the section
	 * @param controlKey - Key of the control within the section
	 * @param value - Value to persist
	 */
	setPersistedValue(sectionName: string, controlKey: string, value: unknown): void {
		try {
			const stored = localStorage.getItem(this.storageKey);
			const parsed = stored ? JSON.parse(stored) : {};

			if (!parsed[sectionName]) {
				parsed[sectionName] = {};
			}

			parsed[sectionName][controlKey] = value;

			localStorage.setItem(this.storageKey, JSON.stringify(parsed));
		} catch {
			// Ignore localStorage errors
		}
	}

	/**
	 * Removes persisted value for a control
	 * @param sectionName - Name of the section
	 * @param controlKey - Key of the control within the section
	 */
	removePersistedValue(sectionName: string, controlKey: string): void {
		try {
			const stored = localStorage.getItem(this.storageKey);

			if (!stored) return;

			const parsed = JSON.parse(stored);

			if (parsed[sectionName]) {
				delete parsed[sectionName][controlKey];

				// Remove section if empty
				if (Object.keys(parsed[sectionName]).length === 0) {
					delete parsed[sectionName];
				}

				localStorage.setItem(this.storageKey, JSON.stringify(parsed));
			}
		} catch {
			// Ignore localStorage errors
		}
	}

	/**
	 * Removes all persisted values for a section
	 * @param sectionName - Name of the section
	 */
	removeSection(sectionName: string): void {
		try {
			const stored = localStorage.getItem(this.storageKey);

			if (!stored) return;

			const parsed = JSON.parse(stored);

			delete parsed[sectionName];

			localStorage.setItem(this.storageKey, JSON.stringify(parsed));
		} catch {
			// Ignore localStorage errors
		}
	}
}

export const controlPersistenceService = new ControlPersistenceService();
