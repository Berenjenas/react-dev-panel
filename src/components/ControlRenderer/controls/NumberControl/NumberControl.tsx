import { useEffect, useState } from "react";

import { Input } from "@/components/Input";

import type { NumberControlProps } from "./types";

/**
 * Component that renders a number control with configurable event handling
 * @param control - The control to render
 * @param control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onBlur"
 * @returns The number control component
 *
 * @example
 * ```typescript
 * // Real-time updates
 * <NumberControl control={{
 *   type: 'number',
 *   value: 10,
 *   min: 0,
 *   max: 100,
 *   step: 1,
 *   event: 'onChange',
 *   onChange: (value) => setValue(value)
 * }} />
 *
 * // Updates only when losing focus (default behavior)
 * <NumberControl control={{
 *   type: 'number',
 *   value: 10,
 *   event: 'onBlur', // or omit for default
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function NumberControl({ control }: NumberControlProps) {
	const eventType = control.event || "onBlur";
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
