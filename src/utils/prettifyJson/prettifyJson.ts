/**
 * Prettifies a JSON string by formatting it with indentation or returning it as-is if not valid JSON
 *
 * @param value - The JSON string to prettify
 * @returns Prettified JSON string or original value if parsing fails
 *
 * @example
 * ```typescript
 * prettifyJson('{"name":"John"}') // Returns '{\n  "name": "John"\n}'
 * prettifyJson('invalid') // Returns 'invalid'
 * ```
 */
export function prettifyJson(value: string): string {
	try {
		const parsed = JSON.parse(value);

		return JSON.stringify(parsed, null, 2);
	} catch {
		return value;
	}
}
