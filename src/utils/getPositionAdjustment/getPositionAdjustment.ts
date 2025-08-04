import type { Position } from "@/components/DevPanel/types";

import { getConstrainedPosition } from "../getConstrainedPosition/getConstrainedPosition";
import { getCurrentElementPosition } from "../getCurrentElementPosition";

/**
 * Checks if a position adjustment is needed after window resize
 * @param element - The HTML element to check
 * @returns Object containing the current position, constrained position, and whether adjustment is needed
 */
export function getPositionAdjustment(element: HTMLElement): {
	currentPosition: Position;
	constrainedPosition: Position;
	needsAdjustment: boolean;
} {
	const currentPosition = getCurrentElementPosition(element);
	const constrainedPosition = getConstrainedPosition(currentPosition, element);

	const needsAdjustment = constrainedPosition.x !== currentPosition.x || constrainedPosition.y !== currentPosition.y;

	return {
		currentPosition,
		constrainedPosition,
		needsAdjustment,
	};
}
