import { Select } from "@/components/Select";

import type { MultiSelectControlProps } from "./types";

/**
 * Component that renders a multi-select control with checkbox options
 *
 * @param props - The component props
 * @param props.control - The multi-select control configuration object
 * @param props.control.type - The control type, must be 'multiselect'
 * @param props.control.value - Array of currently selected option values
 * @param props.control.options - Array of available options (strings or objects with label/value)
 * @param props.control.onChange - Callback function triggered when selection changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the multi-select control
 *
 * @example
 * ```typescript
 * <MultiSelectControl control={{
 *   type: 'multiselect',
 *   value: ['red', 'blue'],
 *   options: [
 *     { label: 'Red Color', value: 'red' },
 *     { label: 'Blue Color', value: 'blue' },
 *     { label: 'Green Color', value: 'green' }
 *   ],
 *   onChange: (values) => setSelectedColors(values)
 * }} />
 * ```
 */
export function MultiSelectControl({ control }: MultiSelectControlProps): React.ReactNode {
	return (
		<Select
			multiple
			value={control.value}
			options={control.options}
			disabled={control.disabled}
			placeholder="Select options..."
			onChange={(value) => control.onChange(value as string[])}
		/>
	);
}
