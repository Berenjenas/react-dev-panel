import { useEffect, useState } from "react";

import { Input } from "@/components/Input";

import type { DateControlProps } from "./types";

/**
 * Component that renders a date control with configurable event handling
 *
 * @param props - The component props
 * @param props.control - The date control configuration object
 * @param props.control.type - The control type, must be 'date'
 * @param props.control.value - The current date value in ISO format (YYYY-MM-DD)
 * @param props.control.min - Optional minimum allowed date in ISO format
 * @param props.control.max - Optional maximum allowed date in ISO format
 * @param props.control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onBlur"
 * @param props.control.onChange - Callback function triggered when date value changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the date input control
 *
 * @example
 * ```typescript
 * // Real-time updates
 * <DateControl control={{
 *   type: 'date',
 *   value: '2025-07-26',
 *   min: '2025-01-01',
 *   max: '2025-12-31',
 *   event: 'onChange',
 *   onChange: (value) => setSelectedDate(value),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * // Updates only when losing focus (default)
 * <DateControl control={{
 *   type: 'date',
 *   value: '2025-07-26',
 *   event: 'onBlur',
 *   onChange: (value) => console.log('Date changed:', value)
 * }} />
 * ```
 */
export function DateControl({ control }: DateControlProps): React.ReactNode {
	const eventType = control.event || "onBlur";
	const [localValue, setLocalValue] = useState(control.value);

	/**
	 * Handles input change events for the date control
	 * Updates local state immediately and triggers onChange callback if event type is "onChange"
	 *
	 * @param e - The change event from the date input element
	 */
	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const newValue = e.target.value;

		setLocalValue(newValue);

		if (eventType === "onChange") {
			control.onChange(newValue);
		}
	}

	/**
	 * Handles blur events for the date control
	 * Triggers onChange callback when the input loses focus if event type is "onBlur"
	 *
	 * @param e - The focus event from the date input element
	 */
	function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
		const newValue = e.target.value;

		if (eventType === "onBlur") {
			control.onChange(newValue);
		}
	}

	useEffect(() => {
		setLocalValue(control.value);
	}, [control.value]);

	return (
		<Input
			type="date"
			value={localValue}
			min={control.min}
			max={control.max}
			disabled={control.disabled}
			onChange={handleChange}
			{...(eventType === "onBlur" && { onBlur: handleBlur })}
		/>
	);
}
