import { useEffect, useRef, useState } from "react";

import { className } from "@/utils";

import styles from "./Logger.module.scss";

type LoggerProps = {
	/** The data object to display in JSON format */
	items: object;
	/** Optional title for the logger panel */
	title?: string;
	/** Theme preference - 'auto' detects system preference */
	theme?: "light" | "dark" | "auto";
	/** Whether the logger should start collapsed */
	defaultCollapsed?: boolean;
	/** Whether the logger should be visible by default */
	defaultVisible?: boolean;
	/** Callback function called when the logger is closed */
	onClose?: () => void;
};

/**
 * A floating, collapsible logger component that displays object data in JSON format.
 * @returns JSX element or null if not visible
 */
export function Logger({ items, title = "Logger", theme = "auto", defaultCollapsed = true, defaultVisible = true, onClose }: LoggerProps) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
	const [isVisible, setIsVisible] = useState(defaultVisible);
	const [isDark, setIsDark] = useState(false);
	const [hasUpdate, setHasUpdate] = useState(false);
	const [itemCount, setItemCount] = useState(0);
	const prevItemsRef = useRef<string>("");

	/**
	 * Toggles the collapsed state of the logger panel
	 */
	function handleToggleCollapse(): void {
		setIsCollapsed(!isCollapsed);
	}

	/**
	 * Closes the logger panel and calls the onClose callback if provided
	 */
	function handleClose(): void {
		setIsVisible(false);
		onClose?.();
	}

	/**
	 * Formats an object as pretty-printed JSON string
	 * @param logData - The object to format
	 * @returns Formatted JSON string or error message
	 */
	function formatJSON(logData: object): string {
		try {
			return JSON.stringify(logData, null, 2);
		} catch (error) {
			return `Error formatting JSON: ${error}`;
		}
	}

	// Auto-detect theme based on system preference or use explicit theme
	useEffect(() => {
		if (theme === "auto") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			setIsDark(mediaQuery.matches);

			const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		} else {
			setIsDark(theme === "dark");
		}
	}, [theme]);

	// Track changes to items for update animations and count badge
	useEffect(() => {
		const currentItems = JSON.stringify(items);
		const newCount = Object.keys(items).length;

		if (prevItemsRef.current && prevItemsRef.current !== currentItems) {
			setHasUpdate(true);
			setTimeout(() => setHasUpdate(false), 600);
		}

		setItemCount(newCount);
		prevItemsRef.current = currentItems;
	}, [items]);

	if (!isVisible) return null;

	const isEmpty = !items || Object.keys(items).length === 0;

	return (
		<div className={`${styles.logger} ${isDark ? styles.dark : ""} ${isCollapsed ? styles.collapsed : ""}`}>
			<div className={styles.header} onClick={handleToggleCollapse}>
				<h3 className={styles.title}>
					{title}
					{itemCount > 0 && <span {...className(styles.badge, { [styles.updated]: hasUpdate })}>{itemCount}</span>}
				</h3>

				<div className={styles.controls}>
					<button
						className={styles.toggleButton}
						onClick={handleToggleCollapse}
						type="button"
						aria-label={isCollapsed ? "Expand logger" : "Collapse logger"}
						title={isCollapsed ? "Expand" : "Collapse"}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={isCollapsed ? styles.collapsed : undefined}>
							<path d="M16.843 10.211A.75.75 0 0 0 16.251 9H7.75a.75.75 0 0 0-.591 1.212l4.258 5.498a.746.746 0 0 0 1.183-.001l4.243-5.498z" />
						</svg>
					</button>

					{onClose && (
						<button
							className={styles.closeButton}
							type="button"
							aria-label="Close logger"
							title="Close"
							onClick={(e) => {
								e.stopPropagation();
								handleClose();
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="m12 10.93 5.719-5.72a.749.749 0 1 1 1.062 1.062l-5.72 5.719 5.719 5.719a.75.75 0 1 1-1.061 1.062L12 13.053l-5.719 5.719A.75.75 0 0 1 5.22 17.71l5.719-5.719-5.72-5.719A.752.752 0 0 1 6.281 5.21z" />
							</svg>
						</button>
					)}
				</div>
			</div>

			{!isCollapsed && (
				<div className={styles.content}>
					{isEmpty ? (
						<div className={styles.empty}>No data to display</div>
					) : (
						<pre className={styles.jsonDisplay}>
							<code>{formatJSON(items)}</code>
						</pre>
					)}
				</div>
			)}
		</div>
	);
}
