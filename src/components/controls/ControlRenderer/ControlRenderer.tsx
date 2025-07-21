import type { ControlRendererProps } from "@/types";
import { className } from "@/utils";

import { BooleanControl } from "../BooleanControl";
import { ButtonControl } from "../ButtonControl";
import { ColorControl } from "../ColorControl";
import { NumberControl } from "../NumberControl";
import { SelectControl } from "../SelectControl";
import { TextControl } from "../TextControl";

import styles from "./ControlRenderer.module.scss";

/**
 * Component that renders different types of controls based on the control type
 */
export function ControlRenderer({ name, control }: ControlRendererProps) {
    const label = control.label || name;

    /**
     * Renders the appropriate control component based on the control type
     */
    function renderControl() {
        switch (control.type) {
            case "number":
                return <NumberControl control={control} />;

            case "boolean":
                return <BooleanControl control={control} />;

            case "select":
                return <SelectControl control={control} />;

            case "color":
                return <ColorControl control={control} />;

            case "text":
                return <TextControl control={control} />;

            case "button":
                return <ButtonControl control={control} />;

            default:
                return <div>Unknown control type</div>;
        }
    }

    return (
        <div {...className(styles.controlContainer)}>
            {control.type !== "button" && (
                <label className={styles.label}>
                    {label}
                    {control.description && (
                        <span className={styles.description}>
                            {control.description}
                        </span>
                    )}
                </label>
            )}
            {renderControl()}
        </div>
    );
}
