import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DevPanelManager } from "@/managers/DevPanelManager";

import { DevPanel } from "../DevPanel";
import type { DevPanelProps } from "../DevPanel/types";

/**
 * Portal component that renders DevPanel using React's createPortal.
 * Automatically subscribes to DevPanelManager prop changes and renders
 * the DevPanel with merged props into document.body.
 * Dismounts the portal when no sections are active.
 *
 * @returns DevPanel rendered as a portal in document.body or null if no sections
 */
export function DevPanelPortal(): React.ReactNode {
	const [mergedProps, setMergedProps] = useState<DevPanelProps>({});
	const [shouldRender, setShouldRender] = useState<boolean>(false);

	useEffect(() => {
		const manager = DevPanelManager.getInstance();
		const initialProps = manager.getAllProps();
		const initialShouldRender = manager.shouldRender();

		setMergedProps(initialProps);
		setShouldRender(initialShouldRender);

		// Subscribe to prop updates
		const unsubscribe = manager.onPropsChange((newProps: DevPanelProps) => {
			setMergedProps(newProps);
			setShouldRender(manager.shouldRender());
		});

		return unsubscribe;
	}, []);

	// Don't render portal if no sections are active
	if (!shouldRender) {
		return null;
	}

	return createPortal(<DevPanel {...mergedProps} />, document.body);
}
