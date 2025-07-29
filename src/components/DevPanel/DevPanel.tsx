import { useCallback } from "react";

import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useHotkey } from "@/hooks/useHotkeys";
import { useDevPanelSections, useDevPanelUI } from "@/store";
import { className } from "@/utils";

import { EmptyContent } from "../EmptyContent";
import { Section } from "../Section";

import type { DevPanelHotkeyConfig, DevPanelProps, Position } from "./types";

import styles from "./DevPanel.module.scss";

const defaultHotKeyConfig: DevPanelHotkeyConfig = {
	ctrlKey: true,
	shiftKey: true,
	key: "a",
	altKey: false,
	metaKey: false,
};

/**
 * Development panel component
 * @returns The development panel component, if the environment is not development, it will return null
 *
 * @example
 * ```typescript
 * <DevPanel />
 * ```
 */
export function DevPanel({ panelTitle = "Dev panel", ...props }: DevPanelProps) {
	const { isVisible, isCollapsed, position, setVisible, setCollapsed, setPosition } = useDevPanelUI();
	const sections = useDevPanelSections();

	const handlePositionChange = useCallback(
		(newPosition: Position) => {
			setPosition(newPosition);
		},
		[setPosition],
	);

	const { isDragging, elementRef, handleMouseDown } = useDragAndDrop({
		onPositionChange: handlePositionChange,
	});

	useHotkey({
		description: "Show Dev Panel",
		preventDefault: true,
		action: () => setVisible(!isVisible),
		...defaultHotKeyConfig,
		...props.hotKeyConfig,
		target: window,
	});

	if (!isVisible) {
		return null;
	}

	const sectionEntries = Object.entries(sections);
	//console.log("[DevPanel] Rendering with sections:", sectionEntries);

	return (
		<div
			ref={elementRef}
			{...className(styles.devPanelContainer, {
				[styles.dragging]: isDragging,
			})}
			style={{
				left: position.x,
				top: position.y,
				height: isCollapsed ? "auto" : undefined,
			}}
		>
			<div className={styles.header} onMouseDown={handleMouseDown}>
				<button className={styles.button} onClick={() => setCollapsed(!isCollapsed)} title={isCollapsed ? "Expand" : "Collapse"}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={isCollapsed ? styles.collapsed : undefined}>
						<path d="M16.843 10.211A.75.75 0 0 0 16.251 9H7.75a.75.75 0 0 0-.591 1.212l4.258 5.498a.746.746 0 0 0 1.183-.001l4.243-5.498z" />
					</svg>
				</button>

				<div className={styles.title}>{panelTitle}</div>

				<button className={styles.button} onClick={() => setVisible(false)} title="Close">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="m12 10.93 5.719-5.72a.749.749 0 1 1 1.062 1.062l-5.72 5.719 5.719 5.719a.75.75 0 1 1-1.061 1.062L12 13.053l-5.719 5.719A.75.75 0 0 1 5.22 17.71l5.719-5.719-5.72-5.719A.752.752 0 0 1 6.281 5.21z" />
					</svg>
				</button>
			</div>

			{!isCollapsed && (
				<div className={styles.content}>
					{sectionEntries.length ? (
						sectionEntries.map(([sectionName, section]) => (
							<Section key={`section-${sectionName}`} sectionName={sectionName} section={section} />
						))
					) : (
						<EmptyContent />
					)}
				</div>
			)}
		</div>
	);
}
