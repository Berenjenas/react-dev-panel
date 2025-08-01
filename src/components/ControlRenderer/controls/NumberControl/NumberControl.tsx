import { useEffect, useState } from "react";

import { Input } from "@/components/Input";

import type { NumberControlProps } from "./types";

/**
 * Component that renders a number control with configurable event handling
 *
 * @param props - The component props
 * @param props.control - The number control configuration object
 * @param props.control.type - The control type, must be 'number'
 * @param props.control.value - The current numeric value
 * @param props.control.min - Optional minimum allowed value
 * @param props.control.max - Optional maximum allowed value
 * @param props.control.step - Optional step increment for the number input (defaults to 1)
 * @param props.control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onChange"
 * @param props.control.onChange - Callback function triggered when numeric value changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the number input control
 *
 * @example
 * ```typescript
 * // Real-time updates with constraints
 * <NumberControl control={{
 *   type: 'number',
 *   value: 50,
 *   min: 0,
 *   max: 100,
 *   step: 5,
 *   event: 'onChange',
 *   onChange: (value) => setProgress(value),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * // Updates only when losing focus
 * <NumberControl control={{
 *   type: 'number',
 *   value: 42,
 *   min: 1,
 *   step: 0.1,
 *   event: 'onBlur',
 *   onChange: (value) => console.log('Value changed:', value)
 * }} />
 * ```
 */
export function NumberControl({ control }: NumberControlProps) {
	const eventType = control.event || "onChange"; // Default to "onChange" if not specified
	const [localValue, setLocalValue] = useState(control.value);

	/**
	 * Handles input change events for the number control
	 * Converts string input to number, updates local state, and triggers onChange if event type is "onChange"
	 *
	 * @param e - The change event from the number input element
	 */
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const newValue = Number(e.target.value);
		setLocalValue(newValue);

		if (eventType === "onChange") {
			control.onChange(newValue);
		}
	}

	/**
	 * Handles blur events for the number control
	 * Converts string input to number and triggers onChange callback when input loses focus if event type is "onBlur"
	 *
	 * @param e - The focus event from the number input element
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
		<Input
			type="number"
			value={localValue}
			min={control.min}
			max={control.max}
			step={control.step}
			disabled={control.disabled}
			onChange={handleChange}
			{...(eventType === "onBlur" && { onBlur: handleBlur })}
		/>
	);
}
