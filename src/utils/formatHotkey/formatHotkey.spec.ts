import { vi } from "vitest";

import { formatHotkey } from "./formatHotkey";

// Mock the isMacOS utility
vi.mock("../isMacOS/isMacOS", () => ({
	isMacOS: vi.fn(),
}));

// Import the mocked function for type safety
import type { HotkeyConfig } from "@/hooks/useHotkeys/types";

import { isMacOS } from "../isMacOS/isMacOS";
const mockIsMacOS = vi.mocked(isMacOS);

describe("formatHotkey", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("on non-Mac systems", () => {
		beforeEach(() => {
			mockIsMacOS.mockReturnValue(false);
		});

		it("should format a simple key without modifiers", () => {
			// Given
			const config: HotkeyConfig = {
				key: "s",
				action: vi.fn(),
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("S");
		});

		it("should format a key with ctrl modifier", () => {
			// Given
			const config: HotkeyConfig = {
				key: "s",
				action: vi.fn(),
				ctrlKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Ctrl+S");
		});

		it("should format a key with alt modifier", () => {
			// Given
			const config: HotkeyConfig = {
				key: "f4",
				action: vi.fn(),
				altKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Alt+F4");
		});

		it("should format a key with shift modifier", () => {
			// Given
			const config: HotkeyConfig = {
				key: "tab",
				action: vi.fn(),
				shiftKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Shift+TAB");
		});

		it("should format a key with meta modifier", () => {
			// Given
			const config: HotkeyConfig = {
				key: "r",
				action: vi.fn(),
				metaKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Meta+R");
		});

		it("should format a key with multiple modifiers", () => {
			// Given
			const config: HotkeyConfig = {
				key: "z",
				action: vi.fn(),
				ctrlKey: true,
				shiftKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Ctrl+Shift+Z");
		});

		it("should format a key with all modifiers", () => {
			// Given
			const config: HotkeyConfig = {
				key: "a",
				action: vi.fn(),
				ctrlKey: true,
				altKey: true,
				shiftKey: true,
				metaKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Ctrl+Alt+Shift+Meta+A");
		});
	});

	describe("on Mac systems", () => {
		beforeEach(() => {
			mockIsMacOS.mockReturnValue(true);
		});

		it("should format a simple key without modifiers", () => {
			// Given
			const config: HotkeyConfig = {
				key: "k",
				action: vi.fn(),
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("K");
		});

		it("should format a key with ctrl modifier using Mac symbol", () => {
			// Given
			const config: HotkeyConfig = {
				key: "c",
				action: vi.fn(),
				ctrlKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⌃+C");
		});

		it("should format a key with alt modifier using Mac symbol", () => {
			// Given
			const config: HotkeyConfig = {
				key: "delete",
				action: vi.fn(),
				altKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⌥+DELETE");
		});

		it("should format a key with shift modifier using Mac symbol", () => {
			// Given
			const config: HotkeyConfig = {
				key: "f3",
				action: vi.fn(),
				shiftKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⇧+F3");
		});

		it("should format a key with meta modifier using Mac symbol", () => {
			// Given
			const config: HotkeyConfig = {
				key: "k",
				action: vi.fn(),
				metaKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⌘+K");
		});

		it("should format a key with multiple modifiers using Mac symbols", () => {
			// Given
			const config: HotkeyConfig = {
				key: "v",
				action: vi.fn(),
				metaKey: true,
				shiftKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⇧+⌘+V");
		});

		it("should format a key with all modifiers using Mac symbols", () => {
			// Given
			const config: HotkeyConfig = {
				key: "i",
				action: vi.fn(),
				ctrlKey: true,
				altKey: true,
				shiftKey: true,
				metaKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⌃+⌥+⇧+⌘+I");
		});
	});

	describe("key formatting", () => {
		beforeEach(() => {
			mockIsMacOS.mockReturnValue(false);
		});

		it("should convert keys to uppercase", () => {
			// Given
			const config: HotkeyConfig = {
				key: "escape",
				action: vi.fn(),
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("ESCAPE");
		});

		it("should handle special keys", () => {
			// Given
			const specialKeys = [
				{ key: "Enter", expected: "ENTER" },
				{ key: "Space", expected: "SPACE" },
				{ key: "ArrowUp", expected: "ARROWUP" },
				{ key: "F1", expected: "F1" },
				{ key: "Backspace", expected: "BACKSPACE" },
			];

			specialKeys.forEach(({ key, expected }) => {
				// When
				const result = formatHotkey({
					key,
					action: vi.fn(),
				});

				// Then
				expect(result).toBe(expected);
			});
		});

		it("should handle single character keys", () => {
			// Given
			const singleChars = ["a", "z", "1", "9", "/", ".", ","];

			singleChars.forEach((key) => {
				// When
				const result = formatHotkey({
					key,
					action: vi.fn(),
				});

				// Then
				expect(result).toBe(key.toUpperCase());
			});
		});
	});

	describe("real-world hotkey combinations", () => {
		it("should format common shortcuts correctly on non-Mac", () => {
			mockIsMacOS.mockReturnValue(false);

			const shortcuts = [
				{ config: { key: "s", ctrlKey: true }, expected: "Ctrl+S" },
				{ config: { key: "c", ctrlKey: true }, expected: "Ctrl+C" },
				{ config: { key: "v", ctrlKey: true }, expected: "Ctrl+V" },
				{ config: { key: "z", ctrlKey: true }, expected: "Ctrl+Z" },
				{ config: { key: "y", ctrlKey: true }, expected: "Ctrl+Y" },
				{ config: { key: "f", ctrlKey: true }, expected: "Ctrl+F" },
				{ config: { key: "a", ctrlKey: true }, expected: "Ctrl+A" },
				{ config: { key: "F4", altKey: true }, expected: "Alt+F4" },
				{
					config: { key: "Tab", shiftKey: true },
					expected: "Shift+TAB",
				},
			];

			shortcuts.forEach(({ config, expected }) => {
				const result = formatHotkey({
					...config,
					action: vi.fn(),
				} as HotkeyConfig);
				expect(result).toBe(expected);
			});
		});

		it("should format common shortcuts correctly on Mac", () => {
			mockIsMacOS.mockReturnValue(true);

			const shortcuts = [
				{ config: { key: "s", metaKey: true }, expected: "⌘+S" },
				{ config: { key: "c", metaKey: true }, expected: "⌘+C" },
				{ config: { key: "v", metaKey: true }, expected: "⌘+V" },
				{ config: { key: "z", metaKey: true }, expected: "⌘+Z" },
				{ config: { key: "k", metaKey: true }, expected: "⌘+K" },
				{ config: { key: "t", metaKey: true }, expected: "⌘+T" },
				{ config: { key: "w", metaKey: true }, expected: "⌘+W" },
				{ config: { key: "q", metaKey: true }, expected: "⌘+Q" },
				{
					config: { key: "z", metaKey: true, shiftKey: true },
					expected: "⇧+⌘+Z",
				},
			];

			shortcuts.forEach(({ config, expected }) => {
				const result = formatHotkey({
					...config,
					action: vi.fn(),
				} as HotkeyConfig);
				expect(result).toBe(expected);
			});
		});
	});

	describe("modifier order", () => {
		it("should maintain consistent modifier order on non-Mac", () => {
			mockIsMacOS.mockReturnValue(false);

			// Given
			const config: HotkeyConfig = {
				key: "x",
				action: vi.fn(),
				metaKey: true,
				altKey: true,
				ctrlKey: true,
				shiftKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("Ctrl+Alt+Shift+Meta+X");
		});

		it("should maintain consistent modifier order on Mac", () => {
			mockIsMacOS.mockReturnValue(true);

			// Given
			const config: HotkeyConfig = {
				key: "x",
				action: vi.fn(),
				metaKey: true,
				altKey: true,
				ctrlKey: true,
				shiftKey: true,
			};

			// When
			const result = formatHotkey(config);

			// Then
			expect(result).toBe("⌃+⌥+⇧+⌘+X");
		});
	});
});
