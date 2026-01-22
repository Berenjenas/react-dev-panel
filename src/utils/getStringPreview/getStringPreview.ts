/**
 * Returns a truncated preview of a string with ellipsis suffix if it exceeds max length
 *
 * @param text - The text to get preview from
 * @param maxLength - Maximum length before truncating (default: 100)
 * @returns Truncated text with "..." suffix if longer than maxLength, original text otherwise
 *
 * @example
 * ```typescript
 * getStringPreview("Hello World", 5) // Returns "Hello..."
 * getStringPreview("Hi", 5) // Returns "Hi"
 * ```
 */
export function getStringPreview(text: string, maxLength: number = 100): string {
	if (text.length <= maxLength) {
		return text;
	}

	return text.slice(0, maxLength) + "...";
}
