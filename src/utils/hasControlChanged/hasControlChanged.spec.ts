import { vi } from "vitest";

import type { Control, ControlGroup } from "@/types";

import { hasControlsChanged } from "./hasControlChanged";

describe("hasControlsChanged", () => {
    describe("basic comparison logic", () => {
        it("should return true when previous is undefined", () => {
            // Given
            const current: ControlGroup = {
                test: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, undefined);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when number of keys differ", () => {
            // Given
            const current: ControlGroup = {
                control1: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                },
                control2: {
                    type: "boolean",
                    value: true,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control1: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when a control key is missing in previous", () => {
            // Given
            const current: ControlGroup = {
                control1: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                },
                control2: {
                    type: "boolean",
                    value: true,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control1: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                },
                control3: {
                    type: "number",
                    value: 42,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return false when controls are identical", () => {
            // Given
            const current: ControlGroup = {
                text: {
                    type: "text",
                    value: "hello",
                    label: "Text Input",
                    onChange: vi.fn(),
                },
                boolean: {
                    type: "boolean",
                    value: true,
                    label: "Toggle",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                text: {
                    type: "text",
                    value: "hello",
                    label: "Text Input",
                    onChange: vi.fn(),
                },
                boolean: {
                    type: "boolean",
                    value: true,
                    label: "Toggle",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });
    });

    describe("base property comparison", () => {
        it("should return true when control type changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "number",
                    value: 42,
                    onChange: vi.fn(),
                } as Control,
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when label changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    label: "New Label",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    label: "Old Label",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when disabled state changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    disabled: true,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    disabled: false,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return false when only onChange functions differ", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    label: "Same Label",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    label: "Same Label",
                    onChange: vi.fn(), // Different function reference
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });
    });

    describe("value comparison", () => {
        it("should return true when text value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "new value",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "old value",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when boolean value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "boolean",
                    value: true,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "boolean",
                    value: false,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when number value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "number",
                    value: 100,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when select value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "select",
                    value: "option2",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when color value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "color",
                    value: "#ff0000",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "color",
                    value: "#00ff00",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });
    });

    describe("number control specific properties", () => {
        it("should return true when min value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    min: 10,
                    max: 100,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    min: 0,
                    max: 100,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when max value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    min: 0,
                    max: 200,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    min: 0,
                    max: 100,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when step value changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    step: 5,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    step: 1,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return false when number properties are identical", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    min: 0,
                    max: 100,
                    step: 1,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "number",
                    value: 50,
                    min: 0,
                    max: 100,
                    step: 1,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });
    });

    describe("select control specific properties", () => {
        it("should return true when options array changes (string array)", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2", "option3"],
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when options order changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option2", "option1"],
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return true when options object structure changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "select",
                    value: "value1",
                    options: [
                        { label: "Option 1", value: "value1" },
                        { label: "Option 2", value: "value2" },
                    ],
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "select",
                    value: "value1",
                    options: [
                        { label: "Different Option 1", value: "value1" },
                        { label: "Option 2", value: "value2" },
                    ],
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return false when options are identical", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });
    });

    describe("text control specific properties", () => {
        it("should return true when placeholder changes", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    placeholder: "New placeholder",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    placeholder: "Old placeholder",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });

        it("should return false when placeholder is identical", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    placeholder: "Same placeholder",
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    placeholder: "Same placeholder",
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });
    });

    describe("button control handling", () => {
        it("should handle button controls without value property", () => {
            // Given
            const current: ControlGroup = {
                button: {
                    type: "button",
                    label: "Click me",
                    onClick: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                button: {
                    type: "button",
                    label: "Click me",
                    onClick: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });

        it("should return true when button label changes", () => {
            // Given
            const current: ControlGroup = {
                button: {
                    type: "button",
                    label: "New Button",
                    onClick: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                button: {
                    type: "button",
                    label: "Old Button",
                    onClick: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });
    });

    describe("mixed control types", () => {
        it("should handle multiple different control types correctly", () => {
            // Given
            const current: ControlGroup = {
                text: {
                    type: "text",
                    value: "hello",
                    placeholder: "Enter text",
                    onChange: vi.fn(),
                },
                number: {
                    type: "number",
                    value: 42,
                    min: 0,
                    max: 100,
                    onChange: vi.fn(),
                },
                boolean: {
                    type: "boolean",
                    value: true,
                    onChange: vi.fn(),
                },
                select: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
                button: {
                    type: "button",
                    label: "Action",
                    onClick: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                text: {
                    type: "text",
                    value: "hello",
                    placeholder: "Enter text",
                    onChange: vi.fn(),
                },
                number: {
                    type: "number",
                    value: 42,
                    min: 0,
                    max: 100,
                    onChange: vi.fn(),
                },
                boolean: {
                    type: "boolean",
                    value: true,
                    onChange: vi.fn(),
                },
                select: {
                    type: "select",
                    value: "option1",
                    options: ["option1", "option2"],
                    onChange: vi.fn(),
                },
                button: {
                    type: "button",
                    label: "Action",
                    onClick: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });

        it("should detect changes in mixed control group", () => {
            // Given
            const current: ControlGroup = {
                text: {
                    type: "text",
                    value: "changed text",
                    onChange: vi.fn(),
                },
                number: {
                    type: "number",
                    value: 42,
                    onChange: vi.fn(),
                },
            };

            const previous: ControlGroup = {
                text: {
                    type: "text",
                    value: "original text",
                    onChange: vi.fn(),
                },
                number: {
                    type: "number",
                    value: 42,
                    onChange: vi.fn(),
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(true);
        });
    });

    describe("edge cases", () => {
        it("should handle empty control groups", () => {
            // Given
            const current: ControlGroup = {};
            const previous: ControlGroup = {};

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });

        it("should handle undefined optional properties", () => {
            // Given
            const current: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                    // No label, disabled, or placeholder
                },
            };

            const previous: ControlGroup = {
                control: {
                    type: "text",
                    value: "hello",
                    onChange: vi.fn(),
                    // No label, disabled, or placeholder
                },
            };

            // When
            const result = hasControlsChanged(current, previous);

            // Then
            expect(result).toBe(false);
        });
    });
});
