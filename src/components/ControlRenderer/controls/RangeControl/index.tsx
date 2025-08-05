import { useEffect, useState } from "react";

import type { RangeControlProps } from "./types";

import styles from "./RangeControl.module.scss";

/**
 * Component that renders a range/slider control with configurable event handling and visual value display
 *
 * @param props - The component props
 * @param props.control - The range control configuration object
 * @param props.control.type - The control type, must be 'range'
 * @param props.control.value - The current numeric value of the slider
 * @param props.control.min - Optional minimum allowed value (defaults to 0)
 * @param props.control.max - Optional maximum allowed value (defaults to 100)
 * @param props.control.step - Optional step increment for the slider (defaults to 1)
 * @param props.control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onChange"
 * @param props.control.onChange - Callback function triggered when slider value changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the range slider control with value display
 *
 * @example
 * ```typescript
 * // Real-time updates with custom range (default behavior)
 * <RangeControl control={{
 *   type: 'range',
 *   value: 75,
 *   min: 0,
 *   max: 100,
 *   step: 5,
 *   event: 'onChange',
 *   onChange: (value) => setVolume(value),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * // Updates only when losing focus with decimal steps
 * <RangeControl control={{
 *   type: 'range',
 *   value: 2.5,
 *   min: 0,
 *   max: 5,
 *   step: 0.1,
 *   event: 'onBlur',
 *   onChange: (value) => console.log('Rating changed:', value)
 * }} />
 * ```
 */
export function RangeControl({ control }: RangeControlProps) {
	const eventType = control.event || "onChange"; // Default to "onChange" for ranges
	const [localValue, setLocalValue] = useState(control.value);

	/**
	 * Handles input change events for the range slider
	 * Converts string input to number, updates local state and visual display, and triggers onChange if event type is "onChange"
	 *
	 * @param e - The change event from the range input element
	 */
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const newValue = Number(e.target.value);

		setLocalValue(newValue);

		if (eventType === "onChange") {
			control.onChange(newValue);
		}
	}

	/**
	 * Handles blur events for the range slider
	 * Converts string input to number and triggers onChange callback when slider loses focus if event type is "onBlur"
	 *
	 * @param e - The focus event from the range input element
	 */
	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		const newValue = Number(e.target.value);

		if (eventType === "onBlur") {
			control.onChange(newValue);
		}
	}

	useEffect(() => {
		setLocalValue(control.value);
	}, [control.value]);

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
