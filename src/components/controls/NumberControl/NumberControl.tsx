import type { NumberControl as NumberControlType } from "../../../types";

import styles from "./NumberControl.module.scss";

interface NumberControlProps {
    control: NumberControlType;
}

/**
 * Component that renders a number control
 * @param control - The control to render
 * @returns The number control component
 *
 * @example
 * ```typescript
 * <NumberControl control={{
 *   type: 'number',
 *   value: 10,
 *   onChange: (value) => setValue(value)
 * }} />
 * ```
 */
export function NumberControl({ control }: NumberControlProps) {
    return (
        <input
            type="number"
            value={control.value}
            min={control.min}
            max={control.max}
            step={control.step}
            disabled={control.disabled}
            onChange={(e) => control.onChange(Number(e.target.value))}
            className={styles.numberInput}
        />
    );
}
