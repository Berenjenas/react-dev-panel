import type { NumberControlProps } from "./types";

import styles from "./NumberControl.module.scss";

/**
 * Component that renders a number control
 * @param control - The control to render
 * @returns The number control component
 *
 * @example
 * ```typescript
 * <NumberControl control={{
 *   type: 'number',
 *   value: 10,
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function NumberControl({ control }: NumberControlProps) {
	return (
		<input
			type="number"
			value={control.value}
			min={control.min}
			max={control.max}
			step={control.step}
			disabled={control.disabled}
			onChange={(e) => control.onChange(Number(e.target.value))}
			className={styles.numberInput}
		/>
	);
}
