import type { SeparatorControlProps } from "./types";

import styles from "./SeparatorControl.module.scss";

/**
 * Component that renders a visual separator to organize control groups
 * @param control - The control to render
 * @param control.style - The style of separator: "line" (default), "space", or "label"
 * @param control.label - Optional label text (only shown when style is "label")
 * @returns The separator control component
 *
 * @example
 * ```typescript
 * // Simple line separator
 * <SeparatorControl control={{
 *   type: 'separator'
 * }} />
 *
 * // Separator with label
 * <SeparatorControl control={{
 *   type: 'separator',
 *   style: 'label',
 *   label: 'Advanced Settings'
 * }} />
 *
 * // Space separator
 * <SeparatorControl control={{
 *   type: 'separator',
 *   style: 'space'
 * }} />
 * ```
 */
export function SeparatorControl({ control }: SeparatorControlProps) {
	const style = control.style || "line";

	if (style === "space") {
		return <div className={styles.space} />;
	}

	if (style === "label" && control.label) {
		return (
			<div className={styles.labelContainer}>
				<span className={styles.label}>{control.label}</span>
			</div>
		);
	}

	// Default line separator
	return <div className={styles.line} />;
}
