import { useEffect, useState } from "react";

import { Input } from "@/components/Input";

import type { TextControlProps } from "./types";

/**
 * Component that renders a text input control with configurable event handling
 *
 * @param props - The component props
 * @param props.control - The text control configuration object
 * @param props.control.type - The control type, must be 'text'
 * @param props.control.value - The current string value of the text input
 * @param props.control.placeholder - Optional placeholder text displayed when input is empty
 * @param props.control.event - When to trigger onChange: "onChange" (real-time) or "onBlur" (on focus loss). Defaults to "onChange"
 * @param props.control.onChange - Callback function triggered when text value changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the text input control
 *
 * @example
 * ```typescript
 * // Real-time updates (default behavior)
 * <TextControl control={{
 *   type: 'text',
 *   value: 'John Doe',
 *   placeholder: 'Enter your full name',
 *   event: 'onChange',
 *   onChange: (value) => setUserName(value),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * // Updates only when losing focus
 * <TextControl control={{
 *   type: 'text',
 *   value: 'search query',
 *   placeholder: 'Type to search...',
 *   event: 'onBlur',
 *   onChange: (value) => console.log('Search term:', value)
 * }} />
 * ```
 */
export function TextControl({ control }: TextControlProps) {
	const eventType = control.event || "onChange"; // Default to "onChange" if not specified
	const [localValue, setLocalValue] = useState(control.value);

	/**
	 * Handles input change events for the text control
	 * Updates local state immediately and triggers onChange callback if event type is "onChange"
	 *
	 * @param e - The change event from the text input element
	 */
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const newValue = e.target.value;
		setLocalValue(newValue);

		if (eventType === "onChange") {
			control.onChange(newValue);
		}
	}

	/**
	 * Handles blur events for the text control
	 * Triggers onChange callback when the input loses focus if event type is "onBlur"
	 *
	 * @param e - The focus event from the text input element
	 */
	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
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
			type="text"
			value={localValue}
			placeholder={control.placeholder}
			disabled={control.disabled}
			onChange={handleChange}
			{...(eventType === "onBlur" && { onBlur: handleBlur })}
		/>
	);
}
