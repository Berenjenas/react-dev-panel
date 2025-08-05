import { useCallback, useEffect, useRef } from "react";

/**
 * Creates a debounced version of a callback.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in ms before calling the callback
 * @returns A debounced version of the callback
 */
export function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);
}
