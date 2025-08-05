import { Suspense } from "react";

import { className } from "@/utils/className";

import type { Control, ControlsNames } from "./controls/types";
import { controls } from "./controls";
import type { ControlRendererProps } from "./types";

import styles from "./ControlRenderer.module.scss";

const oneLineControls = ["button", "buttonGroup", "separator"];
const notHoverableControls = ["separator"];
const withoutLabelControls = ["button", "separator"];

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
				<Suspense fallback={<div className={styles.loading}>Loading control...</div>}>
					<ControlComponent control={control} />
				</Suspense>
			);
		} else {
			return <div>Unknown control type</div>;
		}
	}

	return (
		<div className={styles.controlRendererContainer}>
			<div
				{...className(styles.controlContainer, {
					[styles.fullWidth]: oneLineControls.includes(control.type),
					[styles.hoverable]: !notHoverableControls.includes(control.type),
				})}
			>
				{!withoutLabelControls.includes(control.type) && <label className={styles.label}>{label}</label>}

				<div
					{...className(styles.controlWrapper, {
						[styles.justifyStart]: control.type === "separator",
					})}
				>
					{renderControl()}
				</div>
			</div>

			{control?.description && <span className={styles.description}>{control.description}</span>}
		</div>
	);
}
