import { useEffect, useState } from "react";

import { Input } from "@/components/Input";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";

import type { ColorControlProps } from "./types";

import styles from "./ColorControl.module.scss";

/**
 * Component that renders a color control with both visual color picker and text input
 *
 * @param props - The component props
 * @param props.control - The color control configuration object
 * @param props.control.type - The control type, must be 'color'
 * @param props.control.value - The current color value (hex, rgb, hsl, or named color)
 * @param props.control.onChange - Callback function triggered when color value changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the color control with picker and text input
 *
 * @example
 * ```typescript
 * <ColorControl control={{
 *   type: 'color',
 *   value: '#ff0000',
 *   onChange: (value) => setColor(value),
 *   disabled: false
 * }}/>
 * ```
 */
export function ColorControl({ control }: ColorControlProps) {
	const [localValue, setLocalValue] = useState(control.value);
	const [isValidColor, setIsValidColor] = useState(true);
	const debouncedChange = useDebouncedCallback(control.onChange, 300);

	/**
	 * Validates if a color value is valid CSS color
	 * @param color - The color string to validate
	 * @returns boolean indicating if the color is valid
	 */
	function isValidColorValue(color: string): boolean {
		if (!color) return false;

		// Create a temporary element to test color validity
		const tempElement = document.createElement("div");
		tempElement.style.color = color;
		return tempElement.style.color !== "";
	}

	/**
	 * Converts any valid CSS color to hex format for the color picker
	 * @param color - The color string to convert
	 * @returns hex color string or the original if conversion fails
	 */
	function toHexColor(color: string): string {
		if (!color) return "#000000";

		// If already hex, return as is
		if (color.startsWith("#") && (color.length === 4 || color.length === 7)) {
			return color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` : color;
		}

		// Convert other formats to hex using a canvas
		try {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			if (!ctx) return "#000000";

			ctx.fillStyle = color;

			return ctx.fillStyle as string;
		} catch {
			return "#000000";
		}
	}

	/**
	 * Handles color picker input changes
	 * @param e - The change event from the color input element
	 */
	function handleColorPickerChange(e: React.ChangeEvent<HTMLInputElement>) {
		const newValue = e.target.value;
		setLocalValue(newValue);
		setIsValidColor(true);
		debouncedChange(newValue);
	}

	/**
	 * Handles text input changes with validation
	 * @param e - The change event from the text input element
	 */
	function handleTextInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const newValue = e.target.value;
		setLocalValue(newValue);

		const isValid = isValidColorValue(newValue);
		setIsValidColor(isValid);

		if (isValid || newValue === "") {
			debouncedChange(newValue);
		}
	}

	// Sync local value with control value when it changes externally
	useEffect(() => {
		setLocalValue(control.value);
		setIsValidColor(isValidColorValue(control.value));
	}, [control.value]);

	return (
		<div className={styles.container}>
			<div className={styles.colorPreview} style={{ backgroundColor: isValidColor ? localValue : "transparent" }}>
				<input
					type="color"
					value={toHexColor(localValue)}
					disabled={control.disabled}
					onChange={handleColorPickerChange}
					title="Open color picker"
				/>
			</div>

			<Input
				type="text"
				value={localValue || ""}
				disabled={control.disabled}
				onChange={handleTextInputChange}
				placeholder="Enter color value (hex, rgb, hsl, named)"
				style={{
					borderColor: !isValidColor && localValue ? "var(--dev-panel-danger-color)" : undefined,
				}}
			/>

			{!isValidColor && localValue && <div className={styles.errorMessage}>Invalid color format</div>}
		</div>
	);
}
