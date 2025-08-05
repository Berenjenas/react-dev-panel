import { Select } from "@/components/Select";

import type { SelectControlProps } from "./types";

/**
 * Component that renders a dropdown select control with single selection
 *
 * @param props - The component props
 * @param props.control - The select control configuration object
 * @param props.control.type - The control type, must be 'select'
 * @param props.control.value - The currently selected option value
 * @param props.control.options - Array of available options (strings or objects with label/value)
 * @param props.control.onChange - Callback function triggered when selection changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing a dropdown select control
 *
 * @example
 * ```typescript
 * <SelectControl control={{
 *   type: 'select',
 *   value: 'medium',
 *   options: ['small', 'medium', 'large'],
 *   onChange: (value) => setSize(value),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * <SelectControl control={{
 *   type: 'select',
 *   value: 'red',
 *   options: [
 *     { label: 'Red Color', value: 'red' },
 *     { label: 'Blue Color', value: 'blue' },
 *     { label: 'Green Color', value: 'green' }
 *   ],
 *   onChange: (value) => console.log('Selected:', value)
 * }} />
 * ```
 */
export function SelectControl({ control }: SelectControlProps): React.ReactNode {
	return (
		<Select value={control.value} disabled={control.disabled} onChange={(e) => control.onChange(e.target.value)}>
			{control.options.map((option) => {
				const optionValue = typeof option === "string" ? option : option.value;
				const optionLabel = typeof option === "string" ? option : option.label;

				return (
					<option key={optionValue} value={optionValue}>
						{optionLabel}
					</option>
				);
			})}
		</Select>
	);
}
