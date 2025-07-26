import type { Position } from "@/components/DevPanel/types";

/**
 * Calculates the constrained position within viewport boundaries
 * @param position - The desired position
 * @param element - The HTML element to constrain
 * @returns The constrained position that keeps the element within viewport bounds
 */
export function getConstrainedPosition(position: Position, element: HTMLElement): Position {
	const rect = element.getBoundingClientRect();
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	// Calculate boundaries
	const minX = 0;
	const minY = 0;
	const maxX = viewportWidth - rect.width;
	const maxY = viewportHeight - rect.height;

	return {
		x: Math.max(minX, Math.min(maxX, position.x)),
		y: Math.max(minY, Math.min(maxY, position.y)),
	};
}
