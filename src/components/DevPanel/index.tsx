import { useCallback, useEffect } from "react";

import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useHotkey } from "@/hooks/useHotKey";
import { useDevPanelSections } from "@/store/SectionsStore";
import { useDevPanelThemeActions } from "@/store/UIStore";
import { useDevPanelUI } from "@/store/UIStore";
import { className } from "@/utils/className";

import { EmptyContent } from "../EmptyContent";
import { Icon } from "../Icon";
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
export function DevPanel({ panelTitle = "Dev panel", ...props }: DevPanelProps): React.ReactNode {
	const { isVisible, isCollapsed, position, setVisible, setCollapsed, setPosition } = useDevPanelUI();
	const { setTheme } = useDevPanelThemeActions();
	const sections = useDevPanelSections();

	const handlePositionChange = useCallback(
		(newPosition: Position) => {
			setPosition(newPosition);
		},
		[setPosition],
	);

	const { isDragging, elementRef, handlePointerDown } = useDragAndDrop({
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

	useEffect(() => {
		if (props.theme) setTheme(props.theme);
	}, [props.theme, setTheme]);

	if (!isVisible) {
		return null;
	}

	const sectionEntries = Object.entries(sections);

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
			<div className={styles.header} onPointerDown={handlePointerDown}>
				<button className={styles.button} onClick={() => setCollapsed(!isCollapsed)} title={isCollapsed ? "Expand" : "Collapse"}>
					<Icon name="ArrowDown" className={isCollapsed ? styles.collapsed : undefined} />
				</button>

				<div className={styles.title}>{panelTitle}</div>

				<button className={styles.button} onClick={() => setVisible(false)} title="Close">
					<Icon name="Close" />
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
