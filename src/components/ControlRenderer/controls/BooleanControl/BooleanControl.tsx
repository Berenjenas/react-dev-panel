import type { BooleanControlProps } from "./types";

import styles from "./BooleanControl.module.scss";

/**
 * Component that renders a boolean control
 * @param control - The control to render
 * @returns The boolean control component
 *
 * @example
 * ```typescript
 * <BooleanControl control={{
 *   type: 'boolean',
 *   value: true,
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function BooleanControl({ control }: BooleanControlProps) {
	return (
		<label className={styles.checkboxLabel}>
			<input
				type="checkbox"
				checked={control.value}
				disabled={control.disabled}
				onChange={(e) => control.onChange(e.target.checked)}
				className={styles.checkbox}
			/>
			<span className={styles.checkboxCustom} />
		</label>
	);
}
