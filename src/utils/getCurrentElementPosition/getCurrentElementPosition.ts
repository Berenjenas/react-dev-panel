import type { Position } from "@/components/DevPanel/types";

/**
 * Gets the current position of an element relative to the viewport
 * @param element - The HTML element
 * @returns The current position of the element
 */
export function getCurrentElementPosition(element: HTMLElement): Position {
	const rect = element.getBoundingClientRect();

	return {
		x: rect.left,
		y: rect.top,
	};
}
