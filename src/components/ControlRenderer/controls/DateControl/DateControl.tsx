import { useEffect, useState } from "react";

import { Input } from "@/components/Input";

import type { DateControlProps } from "./types";

/**
 * Component that renders a date control with configurable event handling
 * @param control - The control to render
 * @param control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onBlur"
 * @returns The date control component
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
 *   onChange: (value) => setValue(value)
 * }} />
 *
 * // Updates only when losing focus (default)
 * <DateControl control={{
 *   type: 'date',
 *   value: '2025-07-26',
 *   event: 'onBlur',
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function DateControl({ control }: DateControlProps) {
	const eventType = control.event || "onBlur"; // TODO: Review if "onChange" is needed for dates (may not be applicable)
	const [localValue, setLocalValue] = useState(control.value);

	useEffect(() => {
		setLocalValue(control.value);
	}, [control.value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);

		if (eventType === "onChange") {
			control.onChange(newValue);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (eventType === "onBlur") {
			control.onChange(newValue);
		}
	};

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
