import { useCallback, useEffect, useRef, useState } from "react";

import type { Position, UseDragAndDropProps } from "@/types";
import { debounce } from "@/utils/debounce/debounce";
import { getConstrainedPosition } from "@/utils/getConstrainedPosition/getConstrainedPosition";
import { getPositionAdjustment } from "@/utils/getPositionAdjustment/getPositionAdjustment";

/**
 * Custom hook to handle drag and drop functionality
 * Separates the drag logic from the main component
 * Includes boundary constraints and window resize handling
 */
export function useDragAndDrop({ onPositionChange }: UseDragAndDropProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

    /**
     * Adjusts position when window is resized to keep element visible
     */
    const adjustPositionForResize = useCallback(() => {
        const element = elementRef.current;
        if (!element) return;

        const { constrainedPosition, needsAdjustment } =
            getPositionAdjustment(element);

        if (needsAdjustment) {
            onPositionChange(constrainedPosition);
        }
    }, [onPositionChange]);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging || !elementRef.current) return;

            const newPosition = {
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
            };

            const constrainedPosition = getConstrainedPosition(
                newPosition,
                elementRef.current
            );

            onPositionChange(constrainedPosition);
        },
        [isDragging, dragOffset.x, dragOffset.y, onPositionChange]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
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

        document.addEventListener("mousemove", handleMouseMove, options);
        document.addEventListener("mouseup", handleMouseUp, options);

        // Cleanup function to remove event listeners
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Effect to handle window resize
    useEffect(() => {
        // Create debounced resize handler to improve performance
        const debouncedResizeHandler = debounce(adjustPositionForResize, 100);

        window.addEventListener("resize", debouncedResizeHandler);

        return () => {
            window.removeEventListener("resize", debouncedResizeHandler);
        };
    }, [adjustPositionForResize]);

    // Additional cleanup on unmount
    useEffect(() => {
        return () => {
            if (isDragging) {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return {
        isDragging,
        elementRef,
        handleMouseDown,
        stopDragging: handleMouseUp,
        adjustPositionForResize,
    };
}
