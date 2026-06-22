import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";
import { deepEqual } from "@/utils/deepEqual/deepEqual";

/**
 * Compares if the controls have changed (shallow comparison)
 */
export function hasControlsChanged(current: ControlsGroup, previous?: ControlsGroup): boolean {
	if (!previous) return true;

	const currentKeys = Object.keys(current);
	const previousKeys = Object.keys(previous);

	if (currentKeys.length !== previousKeys.length) return true;

	for (const key of currentKeys) {
		const currentControl = current[key];
		const previousControl = previous[key];

		if (!previousControl) return true;

		// Compare main properties (without onChange/onClick)
		if (
			currentControl.type !== previousControl.type ||
			currentControl.label !== previousControl.label ||
			currentControl.disabled !== previousControl.disabled
		) {
			return true;
		}

		// Compare value only if both controls have it. Use a structural compare so
		// controls with array/object values (e.g. multiselect) are not reported as
		// changed on every render just because the consumer rebuilds the reference.
		if ("value" in currentControl && "value" in previousControl) {
			if (!deepEqual(currentControl.value, previousControl.value)) {
				return true;
			}
		}

		// Compare specific properties by type
		if (currentControl.type === "number" && previousControl.type === "number") {
			if (
				currentControl.min !== previousControl.min ||
				currentControl.max !== previousControl.max ||
				currentControl.step !== previousControl.step
			) {
				return true;
			}
		}

		if (currentControl.type === "range" && previousControl.type === "range") {
			if (
				currentControl.min !== previousControl.min ||
				currentControl.max !== previousControl.max ||
				currentControl.step !== previousControl.step
			) {
				return true;
			}
		}

		if (currentControl.type === "date" && previousControl.type === "date") {
			if (currentControl.min !== previousControl.min || currentControl.max !== previousControl.max) {
				return true;
			}
		}

		if (currentControl.type === "select" && previousControl.type === "select") {
			if (!deepEqual(currentControl.options, previousControl.options)) {
				return true;
			}
		}

		if (currentControl.type === "multiselect" && previousControl.type === "multiselect") {
			if (!deepEqual(currentControl.options, previousControl.options)) {
				return true;
			}
		}

		if (currentControl.type === "text" && previousControl.type === "text") {
			if (currentControl.placeholder !== previousControl.placeholder) {
				return true;
			}
		}
	}

	return false;
}
