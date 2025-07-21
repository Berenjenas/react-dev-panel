import type { ButtonControl as ButtonControlType } from "../../../types";

import styles from "./ButtonControl.module.scss";

interface ButtonControlProps {
    control: ButtonControlType;
}

/**
 * Component that renders a button control
 * @param control - The control to render
 * @returns The button control component
 *
 * @example
 * ```typescript
 * <ButtonControl control={{
 *   type: 'button',
 *   label: 'Click me',
 *   onClick: () => console.log('Button clicked')
 * }} />
 * ```
 */
export function ButtonControl({ control }: ButtonControlProps) {
    return (
        <button
            onClick={control.onClick}
            disabled={control.disabled}
            className={styles.button}
        >
            {control.label}
        </button>
    );
}
