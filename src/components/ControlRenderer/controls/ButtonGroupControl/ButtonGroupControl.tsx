import { ButtonControl } from "../ButtonControl";

import type { ButtonGroupControlProps } from "./types";

import styles from "./ButtonGroupControl.module.scss";

export function ButtonGroupControl({ control }: ButtonGroupControlProps) {
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
