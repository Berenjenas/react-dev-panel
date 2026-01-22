/**
 * Copies text to clipboard with optional feedback timing
 *
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves when text is copied, rejects if copy fails
 *
 * @example
 * ```typescript
 * try {
 *   await copyToClipboard("Hello World", 2000);
 *   console.log("Copied!");
 * } catch {
 *   console.error("Failed to copy");
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
	} catch (error) {
		throw new Error(`Failed to copy to clipboard: ${error instanceof Error ? error.message : String(error)}`);
	}
}
