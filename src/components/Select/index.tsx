import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Position } from "@/components/DevPanel/types";
import { Icon } from "@/components/Icon";
import { useDevPanelPosition } from "@/store/UIStore";
import { className } from "@/utils/className";

import styles from "./Select.module.scss";

interface DropdownPosition {
	top: number;
	left: number;
	width: number;
	maxHeight: number;
}

export interface SelectProps {
	value?: string | string[];
	options: string[] | { label: string; value: string }[];
	disabled?: boolean;
	multiple?: boolean;
	placeholder?: string;
	onChange: (value: string | string[]) => void;
}

/**
 * Unified Select component that can handle both single and multiple selection
 */
export function Select({ value, options, onChange, disabled = false, multiple = false, placeholder = "Select..." }: SelectProps): React.ReactNode {
	const devPanelPosition = useDevPanelPosition();
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const devPanelPositionRef = useRef<Position | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
		top: 0,
		left: 0,
		width: 0,
		maxHeight: 200,
	});

	const currentValue = multiple ? (Array.isArray(value) ? value : []) : typeof value === "string" ? value : "";
	const displayText = getDisplayText();
	const isPlaceholder = multiple ? (currentValue as string[]).length === 0 : !currentValue;

	/**
	 * Updates dropdown position when it's open
	 */
	const updateDropdownPosition = useCallback(() => {
		if (isOpen) {
			setDropdownPosition(calculateDropdownPosition());
		}
	}, [isOpen]);

	/**
	 * Calculates the optimal position for the dropdown portal
	 */
	function calculateDropdownPosition(): DropdownPosition {
		if (!triggerRef.current) {
			return {
				top: 0,
				left: 0,
				width: 0,
				maxHeight: 200,
			};
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
	 * Handles option selection
	 */
	function handleOptionSelect(optionValue: string): void {
		if (multiple) {
			const currentArray = currentValue as string[];
			const newValue = currentArray.includes(optionValue) ? currentArray.filter((v) => v !== optionValue) : [...currentArray, optionValue];

			onChange(newValue);
		} else {
			onChange(optionValue);
			setIsOpen(false);
		}
	}

	/**
	 * Gets the display text for the trigger button
	 */
	function getDisplayText(): string {
		if (multiple) {
			const selectedValues = currentValue as string[];

			if (selectedValues.length === 0) {
				return placeholder;
			}

			if (selectedValues.length === 1) {
				const selectedOption = options.find((option) => {
					const optionValue = typeof option === "string" ? option : option.value;

					return optionValue === selectedValues[0];
				});
				const optionLabel = typeof selectedOption === "string" ? selectedOption : selectedOption?.label;

				return optionLabel || selectedValues[0];
			}

			return `${selectedValues.length} selected`;
		} else {
			const singleValue = currentValue as string;

			if (!singleValue) {
				return placeholder;
			}

			const selectedOption = options.find((option) => {
				const optionValue = typeof option === "string" ? option : option.value;

				return optionValue === singleValue;
			});
			const optionLabel = typeof selectedOption === "string" ? selectedOption : selectedOption?.label;

			return optionLabel || singleValue;
		}
	}

	/**
	 * Handles opening/closing the dropdown
	 */
	function handleToggleDropdown(): void {
		if (disabled) return;

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

		window.addEventListener("resize", updateDropdownPosition);
		window.addEventListener("scroll", updateDropdownPosition, true);

		// Also listen for scroll events on the dev panel container specifically
		// Find the dev panel container and add scroll listener
		const devPanelContainer = containerRef.current?.closest("[data-dev-panel]") || document.querySelector("[data-dev-panel]");

		if (devPanelContainer) {
			devPanelContainer.addEventListener("scroll", updateDropdownPosition, true);
		}

		let intersectionObserver: IntersectionObserver | null = null;

		if (triggerRef.current && "IntersectionObserver" in window) {
			const previousRect = {
				top: 0,
				left: 0,
				width: 0,
				height: 0,
			};

			intersectionObserver = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];

					if (entry && entry.target === triggerRef.current) {
						const currentRect = entry.boundingClientRect;

						if (
							currentRect.top !== previousRect.top ||
							currentRect.left !== previousRect.left ||
							currentRect.width !== previousRect.width ||
							currentRect.height !== previousRect.height
						) {
							previousRect.top = currentRect.top;
							previousRect.left = currentRect.left;
							previousRect.width = currentRect.width;
							previousRect.height = currentRect.height;

							updateDropdownPosition();
						}
					}
				},
				{
					threshold: [0, 0.1, 0.5, 1],
				},
			);

			intersectionObserver.observe(triggerRef.current);
		}

		return (): void => {
			window.removeEventListener("resize", updateDropdownPosition);
			window.removeEventListener("scroll", updateDropdownPosition, true);

			if (devPanelContainer) {
				devPanelContainer.removeEventListener("scroll", updateDropdownPosition, true);
			}

			if (intersectionObserver) {
				intersectionObserver.disconnect();
			}
		};
	}, [isOpen, updateDropdownPosition]);

	// Update position when the component mounts or position changes
	useEffect(() => {
		const currentPosition = devPanelPositionRef.current;

		if (!currentPosition || currentPosition.x !== devPanelPosition.x || currentPosition.y !== devPanelPosition.y) {
			devPanelPositionRef.current = devPanelPosition;

			if (isOpen) {
				requestAnimationFrame(updateDropdownPosition);
			}
		}
	}, [isOpen, devPanelPosition, updateDropdownPosition]);

	// Handle clicks outside to close dropdown
	useEffect(() => {
		function handleClickOutside(e: MouseEvent): void {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				const dropdownElement = document.querySelector(`.${styles.dropdownPortal}`);

				if (dropdownElement && dropdownElement.contains(e.target as Node)) {
					return;
				}

				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div
				ref={containerRef}
				{...className(styles.select, {
					[styles.disabled]: disabled,
					[styles.open]: isOpen,
				})}
			>
				<button ref={triggerRef} type="button" className={styles.trigger} onClick={handleToggleDropdown} disabled={disabled}>
					<span className={`${styles.value} ${isPlaceholder ? styles.placeholder : ""}`}>{displayText}</span>

					<Icon name="ArrowDown" className={styles.arrow} />
				</button>
			</div>

			{/* Dropdown portal */}
			{typeof window !== "undefined" &&
				createPortal(
					isOpen && !disabled && (
						<div
							className={styles.dropdownPortal}
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
								{options.map((option) => {
									const optionValue = typeof option === "string" ? option : option.value;
									const optionLabel = typeof option === "string" ? option : option.label;

									const isSelected = multiple ? (currentValue as string[]).includes(optionValue) : currentValue === optionValue;

									if (multiple) {
										return (
											<label key={optionValue} className={styles.option}>
												<input
													type="checkbox"
													checked={isSelected}
													onChange={() => handleOptionSelect(optionValue)}
													className={styles.checkbox}
												/>

												<Icon name="Check" className={styles.checkmark} />

												<span className={styles.label}>{optionLabel}</span>
											</label>
										);
									} else {
										return (
											<button
												key={optionValue}
												type="button"
												className={`${styles.option} ${isSelected ? styles.selected : ""}`}
												onClick={() => handleOptionSelect(optionValue)}
											>
												{optionLabel}
											</button>
										);
									}
								})}
							</div>
						</div>
					),
					document.body,
				)}
		</>
	);
}
