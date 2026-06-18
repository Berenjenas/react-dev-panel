import type { Control, ControlsNames } from "@/components/ControlRenderer/controls/types";

/**
 * Validates that a value restored from localStorage matches the runtime type
 * expected by a given control before it is fed back into the consumer's
 * `onChange`. Persisted data can be corrupt, stale (control type changed
 * between releases), or tampered with (same-origin/XSS, another tab), so an
 * unchecked value could inject the wrong type into the consumer's state.
 *
 * @param control - The control the value would be applied to
 * @param value - The raw value read from persistence (`unknown`)
 * @returns `true` if the value is safe to apply for this control type
 */
export function isValidPersistedValue(control: Control<ControlsNames>, value: unknown): boolean {
	switch (control.type) {
		case "boolean":
			return typeof value === "boolean";

		case "number":
		case "range":
			return typeof value === "number" && Number.isFinite(value);

		case "text":
		case "select":
		case "color":
		case "date":
			return typeof value === "string";

		case "multiselect":
			return Array.isArray(value) && value.every((item) => typeof item === "string");

		default:
			// Controls without a persistable value (button, separator, etc.).
			return false;
	}
}
