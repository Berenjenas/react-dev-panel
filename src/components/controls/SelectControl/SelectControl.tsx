import type { SelectControl as SelectControlType } from "../../../types";

import styles from "./SelectControl.module.scss";

interface SelectControlProps {
    control: SelectControlType;
}

/**
 * Component that renders a select control
 * @param control - The control to render
 * @returns The select control component
 *
 * @example
 * ```typescript
 * <SelectControl control={{
 *   type: 'select',
 *   value: 'option1',
 *   options: ['option1', 'option2', 'option3'],
 * }} />
 */
export function SelectControl({ control }: SelectControlProps) {
    return (
        <select
            value={control.value}
            disabled={control.disabled}
            onChange={(e) => control.onChange(e.target.value)}
            className={styles.select}
        >
            {control.options.map((option) => {
                const optionValue =
                    typeof option === "string" ? option : option.value;
                const optionLabel =
                    typeof option === "string" ? option : option.label;

                return (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                );
            })}
        </select>
    );
}
