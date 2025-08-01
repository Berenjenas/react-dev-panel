import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/Icon";
import { className } from "@/utils/className";

import type { MultiSelectControlProps } from "./types";

import styles from "./MultiSelectControl.module.scss";

/**
 * Component that renders a multi-select control with checkbox options
 *
 * @param props - The component props
 * @param props.control - The multi-select control configuration object
 * @param props.control.type - The control type, must be 'multiselect'
 * @param props.control.value - Array of currently selected option values
 * @param props.control.options - Array of available options (strings or objects with label/value)
 * @param props.control.onChange - Callback function triggered when selection changes
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing the multi-select control
 *
 * @example
 * ```typescript
 * <MultiSelectControl control={{
 *   type: 'multiselect',
 *   value: ['red', 'blue'],
 *   options: [
 *     { label: 'Red Color', value: 'red' },
 *     { label: 'Blue Color', value: 'blue' },
 *     { label: 'Green Color', value: 'green' }
 *   ],
 *   onChange: (values) => setSelectedColors(values)
 * }} />
 * ```
 */
export function MultiSelectControl({ control }: MultiSelectControlProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	/**
	 * Toggles the selection state of an option
	 * @param optionValue - The value of the option to toggle
	 */
	function toggleOption(optionValue: string): void {
		const newValue = control.value.includes(optionValue)
			? control.value.filter((value) => value !== optionValue)
			: [...control.value, optionValue];

		control.onChange(newValue);
	}

	/**
	 * Gets the display text for the trigger button based on current selection
	 * @returns Display text showing selection state
	 */
	function getDisplayText(): string {
		if (control.value.length === 0) {
			return "Select options...";
		}

		if (control.value.length === 1) {
			const selectedOption = control.options.find((option) => {
				const optionValue = typeof option === "string" ? option : option.value;
				return optionValue === control.value[0];
			});
			const optionLabel = typeof selectedOption === "string" ? selectedOption : selectedOption?.label;
			return optionLabel || control.value[0];
		}

		return `${control.value.length} selected`;
	}

	useEffect(() => {
		/**
		 * Handles clicks outside the component to close the dropdown
		 * @param e - The mouse event
		 */
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			{...className(styles.multiselect, {
				[styles.disabled]: Boolean(control.disabled),
				[styles.open]: isOpen,
			})}
		>
			<button type="button" className={styles.trigger} onClick={() => !control.disabled && setIsOpen(!isOpen)} disabled={control.disabled}>
				<span className={styles.value}>{getDisplayText()}</span>
				<Icon name="ArrowDown" className={styles.arrow} />
			</button>

			{isOpen && !control.disabled && (
				<div className={styles.dropdown}>
					{control.options.map((option) => {
						const optionValue = typeof option === "string" ? option : option.value;
						const optionLabel = typeof option === "string" ? option : option.label;
						const isSelected = control.value.includes(optionValue);

						return (
							<label key={optionValue} className={styles.option}>
								<input type="checkbox" checked={isSelected} onChange={() => toggleOption(optionValue)} className={styles.checkbox} />
								<span className={styles.checkmark}>✓</span>
								<span className={styles.label}>{optionLabel}</span>
							</label>
						);
					})}
				</div>
			)}
		</div>
	);
}
