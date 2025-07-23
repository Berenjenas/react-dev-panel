import { useEffect, useState } from "react";

import { Input } from "@/components/Input";

import type { TextControlProps } from "./types";

/**
 * Component that renders a text control with configurable event handling
 * @param control - The control to render
 * @param control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onBlur"
 * @returns The text control component
 *
 * @example
 * ```typescript
 * // Real-time updates
 * <TextControl control={{
 *   type: 'text',
 *   value: 'Hello',
 *   placeholder: 'Enter your name',
 *   event: 'onChange',
 *   onChange: (value) => setValue(value)
 * }} />
 *
 * // Updates only when losing focus (default behavior)
 * <TextControl control={{
 *   type: 'text',
 *   value: 'Hello',
 *   placeholder: 'Enter your name',
 *   event: 'onBlur', // or omit for default
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function TextControl({ control }: TextControlProps) {
	const eventType = control.event || "onBlur";
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
			type="text"
			value={localValue}
			placeholder={control.placeholder}
			disabled={control.disabled}
			onChange={handleChange}
			{...(eventType === "onBlur" && { onBlur: handleBlur })}
		/>
	);
}
