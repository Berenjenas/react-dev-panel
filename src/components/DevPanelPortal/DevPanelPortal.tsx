import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DevPanelManager } from "@/managers/DevPanelManager";

import { DevPanel } from "../DevPanel";
import type { DevPanelProps } from "../DevPanel/types";

/**
 * Portal component that renders DevPanel using React's createPortal.
 * Automatically subscribes to DevPanelManager prop changes and renders
 * the DevPanel with merged props into document.body.
 *
 * @returns DevPanel rendered as a portal in document.body
 */
export function DevPanelPortal(): React.ReactNode {
	const [mergedProps, setMergedProps] = useState<DevPanelProps>({});

	useEffect(() => {
		const initialProps = DevPanelManager.getInstance().getAllProps();

		setMergedProps(initialProps);

		// Subscribe to prop updates
		const unsubscribe = DevPanelManager.getInstance().onPropsChange((newProps: DevPanelProps) => {
			setMergedProps(newProps);
		});

		return unsubscribe;
	}, []);

	return createPortal(<DevPanel {...mergedProps} />, document.body);
}
