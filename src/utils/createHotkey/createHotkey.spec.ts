import { vi } from "vitest";

import type { HotkeyConfig } from "@/types";

import { createHotkey } from "./createHotkey";

describe("createHotkey", () => {
    it("should create a basic hotkey configuration with key and action", () => {
        // Given
        const mockAction = vi.fn();
        const key = "s";

        // When
        const result = createHotkey(key, mockAction);

        // Then
        expect(result).toEqual({
            key: "s",
            action: mockAction,
            ctrlKey: undefined,
            shiftKey: undefined,
            altKey: undefined,
            metaKey: undefined,
        });
    });

    it("should create a hotkey configuration with ctrl modifier", () => {
        // Given
        const mockAction = vi.fn();
        const key = "s";
        const modifiers = { ctrl: true };

        // When
        const result = createHotkey(key, mockAction, modifiers);

        // Then
        expect(result).toEqual({
            key: "s",
            action: mockAction,
            ctrlKey: true,
            shiftKey: undefined,
            altKey: undefined,
            metaKey: undefined,
        });
    });

    it("should create a hotkey configuration with multiple modifiers", () => {
        // Given
        const mockAction = vi.fn();
        const key = "k";
        const modifiers = {
            ctrl: true,
            shift: true,
            alt: true,
            meta: true,
        };

        // When
        const result = createHotkey(key, mockAction, modifiers);

        // Then
        expect(result).toEqual({
            key: "k",
            action: mockAction,
            ctrlKey: true,
            shiftKey: true,
            altKey: true,
            metaKey: true,
        });
    });

    it("should create a hotkey configuration with meta modifier for macOS shortcuts", () => {
        // Given
        const mockAction = vi.fn();
        const key = "k";
        const modifiers = { meta: true };

        // When
        const result = createHotkey(key, mockAction, modifiers);

        // Then
        expect(result).toEqual({
            key: "k",
            action: mockAction,
            ctrlKey: undefined,
            shiftKey: undefined,
            altKey: undefined,
            metaKey: true,
        });
    });

    it("should create a hotkey configuration with additional options", () => {
        // Given
        const mockAction = vi.fn();
        const key = "Escape";
        const modifiers = {};
        const options = {
            description: "Close modal",
            preventDefault: true,
            stopPropagation: true,
            enabled: false,
        };

        // When
        const result = createHotkey(key, mockAction, modifiers, options);

        // Then
        expect(result).toEqual({
            key: "Escape",
            action: mockAction,
            ctrlKey: undefined,
            shiftKey: undefined,
            altKey: undefined,
            metaKey: undefined,
            description: "Close modal",
            preventDefault: true,
            stopPropagation: true,
            enabled: false,
        });
    });

    it("should create a hotkey configuration with modifiers and options combined", () => {
        // Given
        const mockAction = vi.fn();
        const key = "Enter";
        const modifiers = { ctrl: true, shift: true };
        const options = {
            description: "Submit form",
            preventDefault: true,
            enabled: true,
        };

        // When
        const result = createHotkey(key, mockAction, modifiers, options);

        // Then
        expect(result).toEqual({
            key: "Enter",
            action: mockAction,
            ctrlKey: true,
            shiftKey: true,
            altKey: undefined,
            metaKey: undefined,
            description: "Submit form",
            preventDefault: true,
            enabled: true,
        });
    });

    it("should handle empty modifiers object", () => {
        // Given
        const mockAction = vi.fn();
        const key = "Tab";
        const modifiers = {};

        // When
        const result = createHotkey(key, mockAction, modifiers);

        // Then
        expect(result).toEqual({
            key: "Tab",
            action: mockAction,
            ctrlKey: undefined,
            shiftKey: undefined,
            altKey: undefined,
            metaKey: undefined,
        });
    });

    it("should handle partial modifier configuration", () => {
        // Given
        const mockAction = vi.fn();
        const key = "F1";
        const modifiers = { shift: true, meta: true };

        // When
        const result = createHotkey(key, mockAction, modifiers);

        // Then
        expect(result).toEqual({
            key: "F1",
            action: mockAction,
            ctrlKey: undefined,
            shiftKey: true,
            altKey: undefined,
            metaKey: true,
        });
    });

    it("should preserve the action function reference", () => {
        // Given
        const mockAction = vi.fn();
        const key = "Space";

        // When
        const result = createHotkey(key, mockAction);

        // Then
        expect(result.action).toBe(mockAction);
    });

    it("should return a valid HotkeyConfig type", () => {
        // Given
        const mockAction = vi.fn();
        const key = "a";
        const modifiers = { ctrl: true };
        const options = { description: "Select all" };

        // When
        const result: HotkeyConfig = createHotkey(
            key,
            mockAction,
            modifiers,
            options
        );

        // Then
        expect(result).toBeDefined();
        expect(typeof result.key).toBe("string");
        expect(typeof result.action).toBe("function");
        expect(typeof result.description).toBe("string");
        expect(typeof result.ctrlKey).toBe("boolean");
    });

    it("should handle complex key combinations for real-world scenarios", () => {
        // Given
        const saveAction = vi.fn();
        const searchAction = vi.fn();
        const undoAction = vi.fn();

        // When
        const saveHotkey = createHotkey(
            "s",
            saveAction,
            { ctrl: true },
            {
                description: "Save file",
                preventDefault: true,
            }
        );
        const searchHotkey = createHotkey(
            "k",
            searchAction,
            { meta: true },
            {
                description: "Open search",
                preventDefault: true,
            }
        );
        const undoHotkey = createHotkey(
            "z",
            undoAction,
            { ctrl: true },
            {
                description: "Undo action",
                preventDefault: true,
            }
        );

        // Then
        expect(saveHotkey.key).toBe("s");
        expect(saveHotkey.ctrlKey).toBe(true);
        expect(saveHotkey.description).toBe("Save file");

        expect(searchHotkey.key).toBe("k");
        expect(searchHotkey.metaKey).toBe(true);
        expect(searchHotkey.description).toBe("Open search");

        expect(undoHotkey.key).toBe("z");
        expect(undoHotkey.ctrlKey).toBe(true);
        expect(undoHotkey.description).toBe("Undo action");
    });
});
