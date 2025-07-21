type ClassValue = string | null | undefined | { [key: string]: boolean };

/**
 * A helper function to handle class name conditions easily.
 * Receives an object containing strings or an object with the CSS class as key
 * and a condition to add or remove it as value.
 * @param classNames - The classnames object
 * @returns The classes separated by a space
 */
export function className(...classNames: ClassValue[]): { className: string } {
	const classes: string[] = [];

	for (const entry of classNames) {
		if (!entry) continue;

		if (typeof entry === "string") {
			classes.push(entry);
		} else if (typeof entry === "object") {
			for (const [key, value] of Object.entries(entry)) {
				if (value) classes.push(key);
			}
		}
	}

	return { className: classes.join(" ") };
}
