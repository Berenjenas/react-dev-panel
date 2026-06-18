import { vi } from "vitest";

import { hideDevPanel, showDevPanel, toggleDevPanel } from "@/store/UIStore";

import { registerDevPanelConsoleApi, unregisterDevPanelConsoleApi } from "./consoleApi";

const STORAGE_KEY = "dev-panel-ui-storage";

/** Reads the persisted `isVisible` flag written by UIStore. */
function readVisible(): boolean {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").isVisible;
}

describe("devPanel console API", () => {
	afterEach(() => {
		unregisterDevPanelConsoleApi();
		vi.restoreAllMocks();
	});

	it("registers window.devPanel wired to the store visibility actions", () => {
		vi.spyOn(console, "info").mockImplementation(() => {});

		registerDevPanelConsoleApi();

		expect(window.devPanel).toBeDefined();
		expect(window.devPanel?.open).toBe(showDevPanel);
		expect(window.devPanel?.close).toBe(hideDevPanel);
		expect(window.devPanel?.toggle).toBe(toggleDevPanel);
	});

	it("logs the discovery hint once on register", () => {
		const info = vi.spyOn(console, "info").mockImplementation(() => {});

		registerDevPanelConsoleApi();

		expect(info).toHaveBeenCalledTimes(1);
		expect(info.mock.calls[0][0]).toContain("devPanel.toggle()");
	});

	it("removes window.devPanel on unregister", () => {
		vi.spyOn(console, "info").mockImplementation(() => {});

		registerDevPanelConsoleApi();
		unregisterDevPanelConsoleApi();

		expect(window.devPanel).toBeUndefined();
	});

	it("open/close/toggle flip the panel visibility", () => {
		showDevPanel();
		expect(readVisible()).toBe(true);

		hideDevPanel();
		expect(readVisible()).toBe(false);

		toggleDevPanel();
		expect(readVisible()).toBe(true);

		toggleDevPanel();
		expect(readVisible()).toBe(false);
	});
});
