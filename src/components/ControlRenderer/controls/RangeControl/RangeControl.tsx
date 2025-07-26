import { useEffect, useState } from "react";

import type { RangeControlProps } from "./types";

import styles from "./RangeControl.module.scss";

/**
 * Component that renders a range/slider control with configurable event handling
 * @param control - The control to render
 * @param control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onChange"
 * @returns The range control component
 *
 * @example
 * ```typescript
 * // Real-time updates (default)
 * <RangeControl control={{
 *   type: 'range',
 *   value: 50,
 *   min: 0,
 *   max: 100,
 *   step: 1,
 *   event: 'onChange',
 *   onChange: (value) => setValue(value)
 * }} />
 *
 * // Updates only when losing focus
 * <RangeControl control={{
 *   type: 'range',
 *   value: 50,
 *   event: 'onBlur',
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function RangeControl({ control }: RangeControlProps) {
	const eventType = control.event || "onChange"; // Default to "onChange" for ranges
	const [localValue, setLocalValue] = useState(control.value);

	useEffect(() => {
		setLocalValue(control.value);
	}, [control.value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		setLocalValue(newValue);

		if (eventType === "onChange") {
			control.onChange(newValue);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const newValue = Number(e.target.value);
		if (eventType === "onBlur") {
			control.onChange(newValue);
		}
	};

	return (
		<div className={styles.container}>
			<input
				type="range"
				value={localValue}
				min={control.min}
				max={control.max}
				step={control.step}
				disabled={control.disabled}
				onChange={handleChange}
				{...(eventType === "onBlur" && { onBlur: handleBlur })}
				className={styles.range}
			/>
			<span className={styles.value}>{localValue}</span>
		</div>
	);
}
