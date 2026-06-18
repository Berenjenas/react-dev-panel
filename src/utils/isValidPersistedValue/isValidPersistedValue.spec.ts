import type { Control, ControlsNames } from "@/components/ControlRenderer/controls/types";

import { isValidPersistedValue } from "./isValidPersistedValue";

/** Minimal control factory — only `type` is read by the validator. */
function control(type: string): Control<ControlsNames> {
	return { type } as unknown as Control<ControlsNames>;
}

describe("isValidPersistedValue", () => {
	it("accepts matching primitive types", () => {
		expect(isValidPersistedValue(control("boolean"), true)).toBe(true);
		expect(isValidPersistedValue(control("number"), 42)).toBe(true);
		expect(isValidPersistedValue(control("range"), 0)).toBe(true);
		expect(isValidPersistedValue(control("text"), "hi")).toBe(true);
		expect(isValidPersistedValue(control("select"), "a")).toBe(true);
		expect(isValidPersistedValue(control("color"), "#fff")).toBe(true);
		expect(isValidPersistedValue(control("date"), "2026-01-01")).toBe(true);
	});

	it("accepts a string array for multiselect", () => {
		expect(isValidPersistedValue(control("multiselect"), ["a", "b"])).toBe(true);
		expect(isValidPersistedValue(control("multiselect"), [])).toBe(true);
	});

	it("rejects mismatched types", () => {
		expect(isValidPersistedValue(control("number"), "42")).toBe(false);
		expect(isValidPersistedValue(control("boolean"), 1)).toBe(false);
		expect(isValidPersistedValue(control("text"), 5)).toBe(false);
		expect(isValidPersistedValue(control("multiselect"), [1, 2])).toBe(false);
		expect(isValidPersistedValue(control("multiselect"), "a")).toBe(false);
	});

	it("rejects non-finite numbers", () => {
		expect(isValidPersistedValue(control("number"), NaN)).toBe(false);
		expect(isValidPersistedValue(control("number"), Infinity)).toBe(false);
	});

	it("rejects controls without a persistable value", () => {
		expect(isValidPersistedValue(control("button"), "x")).toBe(false);
		expect(isValidPersistedValue(control("separator"), "x")).toBe(false);
	});
});
