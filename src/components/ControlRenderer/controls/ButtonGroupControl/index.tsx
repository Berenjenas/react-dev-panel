import { ButtonControl } from "../ButtonControl";

import type { ButtonGroupControlProps } from "./types";

import styles from "./ButtonGroupControl.module.scss";

/**
 * Component that renders a group of related buttons in a horizontal layout
 *
 * @param props - The component props
 * @param props.control - The button group control configuration object
 * @param props.control.type - The control type, must be 'buttonGroup'
 * @param props.control.buttons - Array of button configurations to render
 * @param props.control.buttons[].label - The text label displayed on the button
 * @param props.control.buttons[].onClick - Callback function triggered when button is clicked
 * @param props.control.buttons[].disabled - Optional flag to disable individual buttons
 * @returns JSX element representing a group of buttons
 *
 * @example
 * ```typescript
 * <ButtonGroupControl control={{
 *   type: 'buttonGroup',
 *   buttons: [
 *     { label: 'Save', onClick: () => save() },
 *     { label: 'Cancel', onClick: () => cancel() },
 *     { label: 'Delete', onClick: () => delete(), disabled: true }
 *   ]
 * }} />
 * ```
 *
 * @example
 * ```typescript
 * <ButtonGroupControl control={{
 *   type: 'buttonGroup',
 *   buttons: [
 *     { label: 'Previous', onClick: () => goToPrevious() },
 *     { label: 'Next', onClick: () => goToNext() }
 *   ]
 * }} />
 * ```
 */
export function ButtonGroupControl({ control }: ButtonGroupControlProps): React.ReactNode {
	return (
		<div className={styles.buttonGroupContainer}>
			{control.buttons.map((button, index) => (
				<ButtonControl
					control={{
						type: "button",
						label: button.label,
						onClick: button.onClick,
						disabled: button.disabled,
					}}
					key={index}
				/>
			))}
		</div>
	);
}
