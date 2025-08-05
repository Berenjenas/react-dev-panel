import type { ButtonControlProps } from "./types";

import styles from "./ButtonControl.module.scss";

/**
 * Component that renders a clickable button control
 *
 * @param props - The component props
 * @param props.control - The button control configuration object
 * @param props.control.type - The control type, must be 'button'
 * @param props.control.label - The text displayed on the button
 * @param props.control.onClick - Callback function triggered when button is clicked
 * @param props.control.disabled - Optional flag to disable the button
 * @returns JSX element representing a clickable button
 *
 * @example
 * ```typescript
 * <ButtonControl control={{
 *   type: 'button',
 *   label: 'Save Changes',
 *   onClick: () => handleSave(),
 *   disabled: false
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * <ButtonControl control={{
 *   type: 'button',
 *   label: 'Reset',
 *   onClick: () => console.log('Reset clicked'),
 *   disabled: true
 * }} />
 * ```
 */
export function ButtonControl({ control }: ButtonControlProps): React.ReactNode {
	return (
		<button onClick={control.onClick} disabled={control.disabled} className={styles.button}>
			{control.label}
		</button>
	);
}
