import { useCallback, useEffect, useRef, useState } from "react";

import type { Position } from "@/components/DevPanel/types";
import { debounce } from "@/utils/debounce/debounce";
import { getConstrainedPosition } from "@/utils/getConstrainedPosition/getConstrainedPosition";
import { getPositionAdjustment } from "@/utils/getPositionAdjustment/getPositionAdjustment";

export interface UseDragAndDropProps {
	/**
	 * Callback function to handle position changes during dragging
	 * @param position - The new position of the draggable element
	 */
	onPositionChange: (position: Position) => void;
}

/**
 * Custom hook to handle drag and drop functionality
 * Separates the drag logic from the main component
 * Includes boundary constraints and window resize handling
 */
export function useDragAndDrop({ onPositionChange }: UseDragAndDropProps): {
	elementRef: React.RefObject<HTMLDivElement | null>;
	isDragging: boolean;
	handlePointerDown: (e: React.PointerEvent) => void;
	stopDragging: () => void;
	adjustPositionForResize: () => void;
} {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

	/**
	 * Adjusts position when window is resized to keep element visible
	 */
	const adjustPositionForResize = useCallback(() => {
		const element = elementRef.current;

		if (!element) return;

		const { constrainedPosition, needsAdjustment } = getPositionAdjustment(element);

		if (needsAdjustment) {
			onPositionChange(constrainedPosition);
		}
	}, [onPositionChange]);

	/**
	 * Handles pointer move events during dragging
	 * Calculates new position based on pointer coordinates and drag offset
	 * Applies boundary constraints to keep element within viewport
	 * @param e - The pointer event containing coordinate information
	 */
	const handlePointerMove = useCallback(
		(e: PointerEvent) => {
			if (!isDragging || !elementRef.current) return;

			const newPosition = {
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y,
			};

			const constrainedPosition = getConstrainedPosition(newPosition, elementRef.current);

			onPositionChange(constrainedPosition);
		},
		[isDragging, dragOffset.x, dragOffset.y, onPositionChange],
	);

	/**
	 * Handles pointer up events to end dragging
	 * Sets dragging state to false, which triggers cleanup of event listeners
	 */
	const handlePointerUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	/**
	 * Handles pointer down events to start dragging
	 * Only initiates drag if the event target is the draggable element itself
	 * Calculates and stores the offset between pointer position and element position
	 * @param e - The React pointer event from the draggable element
	 */
	const handlePointerDown = useCallback((e: React.PointerEvent) => {
		// Only allow drag from the specific element
		if (e.target !== e.currentTarget) return;

		e.preventDefault(); // Prevent text selection
		setIsDragging(true);

		const rect = elementRef.current?.getBoundingClientRect();

		if (rect) {
			setDragOffset({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});
		}
	}, []);

	// Effect to handle drag event listeners
	useEffect(() => {
		if (!isDragging) return;

		// Options to improve performance
		const options = { passive: true };

		document.addEventListener("pointermove", handlePointerMove, options);
		document.addEventListener("pointerup", handlePointerUp, options);

		// Cleanup function to remove event listeners
		return (): void => {
			document.removeEventListener("pointermove", handlePointerMove);
			document.removeEventListener("pointerup", handlePointerUp);
		};
	}, [isDragging, handlePointerMove, handlePointerUp]);

	// Effect to handle window resize
	useEffect(() => {
		// Create debounced resize handler to improve performance
		const debouncedResizeHandler = debounce(adjustPositionForResize, 100);

		window.addEventListener("resize", debouncedResizeHandler);

		return (): void => {
			window.removeEventListener("resize", debouncedResizeHandler);
		};
	}, [adjustPositionForResize]);

	// Additional cleanup on unmount
	useEffect(() => {
		return (): void => {
			if (isDragging) {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp);
			}
		};
	}, [isDragging, handlePointerMove, handlePointerUp]);

	return {
		isDragging,
		elementRef,
		handlePointerDown,
		stopDragging: handlePointerUp,
		adjustPositionForResize,
	};
}
