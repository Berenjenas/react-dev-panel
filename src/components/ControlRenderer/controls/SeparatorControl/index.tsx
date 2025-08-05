import type { SeparatorControlProps } from "./types";

import styles from "./SeparatorControl.module.scss";

/**
 * Component that renders a visual separator to organize control groups
 *
 * @param props - The component props
 * @param props.control - The separator control configuration object
 * @param props.control.type - The control type, must be 'separator'
 * @param props.control.style - The style of separator: "line" (default), "space", or "label"
 * @param props.control.label - Optional label text (only displayed when style is "label")
 * @returns JSX element representing a visual separator
 *
 * @example
 * ```typescript
 * // Simple line separator (default)
 * <SeparatorControl control={{
 *   type: 'separator'
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * // Separator with label text
 * <SeparatorControl control={{
 *   type: 'separator',
 *   style: 'label',
 *   label: 'Advanced Settings'
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * // Space separator for extra spacing
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
