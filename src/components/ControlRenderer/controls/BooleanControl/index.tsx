import { useRef } from "react";

import type { BooleanControlProps } from "./types";

import styles from "./BooleanControl.module.scss";

/**
 * Component that renders a boolean toggle switch control
 *
 * @param props - The component props
 * @param props.control - The boolean control configuration object
 * @param props.control.type - The control type, must be 'boolean'
 * @param props.control.value - The current boolean state (true/false)
 * @param props.control.onChange - Callback function triggered when toggle state changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing a toggle switch control
 *
 * @example
 * ```typescript
 * <BooleanControl control={{
 *   type: 'boolean',
 *   value: true,
 *   onChange: (value) => setIsEnabled(value),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * <BooleanControl control={{
 *   type: 'boolean',
 *   value: false,
 *   onChange: (value) => console.log('Toggle changed:', value)
 * }} />
 * ```
 */
export function BooleanControl({ control }: BooleanControlProps) {
	const controlId = useRef(`boolean-control-${control.label || Math.ceil(Math.random() * 100000)}`);

	return (
		<label className={styles.switch}>
			<input
				type="checkbox"
				id={controlId.current}
				name={controlId.current}
				checked={control.value}
				disabled={control.disabled}
				onChange={(e) => control.onChange(e.target.checked)}
			/>
			<span className={styles.slider} />
		</label>
	);
}
