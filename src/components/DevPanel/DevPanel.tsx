import React from "react";

import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useHotkey } from "@/hooks/useHotkeys";
import type { DevPanelHoyKeyConfig, DevPanelProps } from "@/types";
import { className } from "@/utils";
import {
    useDevPanelActions,
    useDevPanelCollapsed,
    useDevPanelPosition,
    useDevPanelSections,
    useDevPanelVisible,
} from "@/utils/store/store";

import { EmptyContent } from "../EmptyContent";
import { Section } from "../Section";

import styles from "./DevPanel.module.scss";

const defaultHotKeyConfig: DevPanelHoyKeyConfig = {
    key: "f",
    shiftKey: true,
    altKey: true,
    ctrlKey: false,
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
export function DevPanel({
    panelTitle = "Dev panel",
    ...props
}: DevPanelProps) {
    const isVisible = useDevPanelVisible();
    const isCollapsed = useDevPanelCollapsed();
    const position = useDevPanelPosition();
    const sections = useDevPanelSections();

    const actions = useDevPanelActions();

    const handlePositionChange = React.useCallback(
        (newPosition: { x: number; y: number }) => {
            actions.setPosition(newPosition);
        },
        [actions.setPosition]
    );

    const { isDragging, elementRef, handleMouseDown } = useDragAndDrop({
        onPositionChange: handlePositionChange,
    });

    useHotkey({
        description: "Show Dev Panel",
        preventDefault: true,
        action: () => actions.setVisible(!isVisible),
        ...defaultHotKeyConfig,
        ...props.hotKeyConfig,
    });

    // Only show in development mode
    if (process.env.NODE_ENV !== "development" || !isVisible) {
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
            <div className={styles.header} onMouseDown={handleMouseDown}>
                <button
                    className={styles.headerButton}
                    onClick={() => actions.setCollapsed(!isCollapsed)}
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? "▼" : "▲"}
                </button>
                <div className={styles.title}>{panelTitle}</div>
                <button
                    className={styles.headerButton}
                    onClick={() => actions.setVisible(false)}
                    title="Close"
                >
                    ✕
                </button>
            </div>

            {!isCollapsed && (
                <div className={styles.content}>
                    {sectionEntries.length === 0 ? (
                        <EmptyContent />
                    ) : (
                        sectionEntries.map(([sectionName, section]) => (
                            <Section
                                key={`section-${sectionName}`}
                                sectionName={sectionName}
                                section={section}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
