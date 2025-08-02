import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Icon } from "@/components/Icon";
import { className } from "@/utils/className";

import type { MultiSelectControlProps } from "./types";

import styles from "./MultiSelectControl.module.scss";

interface DropdownPosition {
	top: number;
	left: number;
	width: number;
	maxHeight: number;
}

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
	const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
		top: 0,
		left: 0,
		width: 0,
		maxHeight: 200,
	});
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	/**
	 * Calculates the optimal position for the dropdown portal
	 */
	function calculateDropdownPosition(): DropdownPosition {
		if (!triggerRef.current) {
			return { top: 0, left: 0, width: 0, maxHeight: 200 };
		}

		const triggerRect = triggerRef.current.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;
		const dropdownHeight = 200; // Max height from CSS
		const spacing = 4; // Gap between trigger and dropdown

		// Calculate available space below and above
		const spaceBelow = viewportHeight - triggerRect.bottom - spacing;
		const spaceAbove = triggerRect.top - spacing;

		// Determine if dropdown should open upward or downward
		const shouldOpenUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

		// Calculate position
		const top = shouldOpenUpward ? triggerRect.top - Math.min(dropdownHeight, spaceAbove) : triggerRect.bottom + spacing;

		// Ensure dropdown doesn't go off screen horizontally
		const left = Math.max(8, Math.min(triggerRect.left, viewportWidth - triggerRect.width - 8));

		// Calculate max height based on available space
		const maxHeight = shouldOpenUpward ? Math.min(dropdownHeight, spaceAbove) : Math.min(dropdownHeight, spaceBelow);

		return {
			top,
			left,
			width: triggerRect.width,
			maxHeight,
		};
	}

	/**
	 * Updates dropdown position when it's open
	 */
	const updateDropdownPosition = useCallback(() => {
		if (isOpen) {
			setDropdownPosition(calculateDropdownPosition());
		}
	}, [isOpen]);

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

	/**
	 * Handles opening/closing the dropdown
	 */
	function handleToggleDropdown() {
		if (control.disabled) return;

		if (!isOpen) {
			setDropdownPosition(calculateDropdownPosition());
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}

	// Update position when dropdown opens or window resizes/scrolls
	useEffect(() => {
		if (!isOpen) return;

		updateDropdownPosition();

		function handleResize() {
			updateDropdownPosition();
		}

		function handleScroll() {
			updateDropdownPosition();
		}

		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleScroll, true);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScroll, true);
		};
	}, [isOpen, updateDropdownPosition]);

	// Handle clicks outside to close dropdown
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				// Check if click is inside the portal dropdown
				const dropdownElement = document.querySelector(`.${styles.dropdownPortal}`);

				if (dropdownElement && dropdownElement.contains(e.target as Node)) {
					return; // Don't close if clicking inside dropdown
				}

				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Dropdown portal content
	const dropdownContent = isOpen && !control.disabled && (
		<div
			className={`${styles.dropdownPortal}`}
			style={{
				position: "fixed",
				top: dropdownPosition.top,
				left: dropdownPosition.left,
				width: dropdownPosition.width,
				maxHeight: dropdownPosition.maxHeight,
				zIndex: 9999,
			}}
		>
			<div className={styles.dropdown}>
				{control.options.map((option) => {
					const optionValue = typeof option === "string" ? option : option.value;
					const optionLabel = typeof option === "string" ? option : option.label;
					const isSelected = control.value.includes(optionValue);

					return (
						<label key={optionValue} className={styles.option}>
							<input type="checkbox" checked={isSelected} onChange={() => toggleOption(optionValue)} className={styles.checkbox} />
							<Icon name="Check" className={styles.checkmark} />
							<span className={styles.label}>{optionLabel}</span>
						</label>
					);
				})}
			</div>
		</div>
	);

	return (
		<>
			<div
				ref={containerRef}
				{...className(styles.multiselect, {
					[styles.disabled]: Boolean(control.disabled),
					[styles.open]: isOpen,
				})}
			>
				<button ref={triggerRef} type="button" className={styles.trigger} onClick={handleToggleDropdown} disabled={control.disabled}>
					<span className={styles.value}>{getDisplayText()}</span>
					<Icon name="ArrowDown" className={styles.arrow} />
				</button>
			</div>

			{/* Render dropdown in portal */}
			{typeof window !== "undefined" && createPortal(dropdownContent, document.body)}
		</>
	);
}
