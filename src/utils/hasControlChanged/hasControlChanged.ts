import type { ControlsGroup } from "@/components/ControlRenderer/controls/types";

/**
 * Compares if the controls have changed (shallow comparison)
 */
export function hasControlsChanged(current: ControlsGroup, previous?: ControlsGroup) {
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

		// Compare value only if both controls have it
		if ("value" in currentControl && "value" in previousControl) {
			if (currentControl.value !== previousControl.value) {
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

		if (currentControl.type === "select" && previousControl.type === "select") {
			if (JSON.stringify(currentControl.options) !== JSON.stringify(previousControl.options)) {
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
