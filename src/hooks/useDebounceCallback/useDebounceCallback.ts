import { useCallback, useEffect, useRef } from "react";

/**
 * Creates a debounced version of a callback.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in ms before calling the callback
 * @returns A debounced version of the callback
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any) => void>(callback: T, delay: number): T {
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
	) as T;
}
