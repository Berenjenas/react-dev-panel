import type { TextControlProps } from "./types";

import styles from "./TextControl.module.scss";

/**
 * Component that renders a text control
 * @param control - The control to render
 * @returns The text control component
 *
 * @example
 * ```typescript
 * <TextControl control={{
 *   type: 'text',
 *   value: 'Hello',
 *   placeholder: 'Enter your name',
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function TextControl({ control }: TextControlProps) {
	return (
		<input
			type="text"
			value={control.value}
			placeholder={control.placeholder}
			disabled={control.disabled}
			onChange={(e) => control.onChange(e.target.value)}
			className={styles.textInput}
		/>
	);
}
