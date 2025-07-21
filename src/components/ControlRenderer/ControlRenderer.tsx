import { Suspense } from "react";

import { className } from "@/utils";

import type { Control, ControlsNames } from "./controls/types";
import { controls } from "./controls";
import type { ControlRendererProps } from "./types";

import styles from "./ControlRenderer.module.scss";

/**
 * Component that renders different types of controls based on the control type
 */
export function ControlRenderer<Name extends ControlsNames>({ name, control }: ControlRendererProps<Name>) {
	const label = control?.label || name;

	/**
	 * Renders the appropriate control component based on the control type
	 */
	function renderControl() {
		if (!control || !control.type) {
			return <div className={styles.error}>Control type is not defined</div>;
		}

		const ControlComponent = controls[control.type] as React.ComponentType<{ control: Control<Name> }>;

		if (ControlComponent) {
			return (
				<Suspense fallback={<div>Loading control...</div>}>
					<ControlComponent control={control} />
				</Suspense>
			);
		} else {
			return <div>Unknown control type</div>;
		}
	}

	return (
		<div {...className(styles.controlContainer)}>
			{control?.type !== "button" && (
				<label className={styles.label}>
					{label}

					{control?.description && <span className={styles.description}>{control.description}</span>}
				</label>
			)}

			{renderControl()}
		</div>
	);
}
