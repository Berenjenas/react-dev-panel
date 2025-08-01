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
	const debouncedChange = useDebouncedCallback(control.onChange, 100);

	/**
	 * Handles color picker input changes with debouncing
	 * @param e - The change event from the color input element
	 */
	function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
		debouncedChange(e.target.value);
	}

	return (
		<div className={styles.container}>
			<label>
				<Input type="color" value={control.value} disabled={control.disabled} onChange={handleColorChange} />
			</label>

			<Input
				type="text"
				value={control.value}
				disabled={control.disabled}
				onChange={(e) => control.onChange(e.target.value)}
				placeholder="Enter color value"
			/>
		</div>
	);
}
