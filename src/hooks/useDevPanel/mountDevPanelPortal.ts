import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";

import { DevPanelPortal } from "@/components/DevPanelPortal";

import { registerDevPanelConsoleApi, unregisterDevPanelConsoleApi } from "./consoleApi";

const CONTAINER_ID = "dev-panel-portal-container";

let root: Root | null = null;
let container: HTMLElement | null = null;

/**
 * Mounts the DevPanelPortal into a dedicated, hidden container appended to
 * `document.body`, creating a single React root for the whole app.
 *
 * Idempotent and safe to call from every `useDevPanel` call site:
 * - No-op in non-browser environments (SSR) — guarded by `typeof document`.
 * - No-op if already mounted in this runtime (the stored `root` acts as guard).
 * - Self-heals across HMR/module reloads: a stale container left over from a
 *   previous module instance is removed before creating a fresh root, so the
 *   portal never duplicates and never leaks an orphaned container.
 */
export function mountDevPanelPortal(): void {
	if (typeof document === "undefined") {
		return;
	}

	// Already mounted in this runtime.
	if (root) {
		return;
	}

	// A container may survive a module reload (HMR) while our `root` reference
	// was reset to null — drop the stale node so we don't duplicate the portal.
	const staleContainer = document.getElementById(CONTAINER_ID);

	if (staleContainer) {
		staleContainer.remove();
	}

	container = document.createElement("div");
	container.id = CONTAINER_ID;
	container.style.display = "none";
	document.body.appendChild(container);

	root = createRoot(container);
	root.render(createElement(DevPanelPortal));

	// Expose the console API (window.devPanel) alongside the panel lifecycle.
	registerDevPanelConsoleApi();
}

/**
 * Tears down the DevPanelPortal root and removes its container from the DOM.
 * Intended for HMR resets and tests; the portal re-mounts on the next
 * `mountDevPanelPortal` call.
 */
export function unmountDevPanelPortal(): void {
	root?.unmount();
	root = null;

	container?.remove();
	container = null;

	unregisterDevPanelConsoleApi();
}
