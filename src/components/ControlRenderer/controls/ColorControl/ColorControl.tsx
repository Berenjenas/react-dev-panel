import { Input } from "@/components/Input";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";

import type { ColorControlProps } from "./types";

import styles from "./ColorControl.module.scss";

/**
 * Component that renders a color control
 * @param control - The control to render
 * @returns The color control component
 *
 * @example
 * ```typescript
 * <ColorControl control={{
 *   type: 'color',
 *   value: '#000000',
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function ColorControl({ control }: ColorControlProps) {
	const debouncedChange = useDebouncedCallback(control.onChange, 100);

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedChange(e.target.value);
	};

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
