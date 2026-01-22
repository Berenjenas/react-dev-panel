import { describe, expect, it } from "vitest";

import { getStringPreview } from "./getStringPreview";

describe("getStringPreview", () => {
	it("should truncate string if longer than maxLength", () => {
		const input = "This is a very long string that should be truncated";
		const result = getStringPreview(input, 10);

		expect(result).toBe("This is a ...");
	});

	it("should not truncate string if shorter than maxLength", () => {
		const input = "Short";
		const result = getStringPreview(input, 20);

		expect(result).toBe("Short");
	});

	it("should not truncate string if equal to maxLength", () => {
		const input = "Exactly10c";
		const result = getStringPreview(input, 10);

		expect(result).toBe("Exactly10c");
	});

	it("should use default maxLength of 100", () => {
		const input = "a".repeat(101);
		const result = getStringPreview(input);

		expect(result).toBe("a".repeat(100) + "...");
	});

	it("should handle empty string", () => {
		const result = getStringPreview("", 10);

		expect(result).toBe("");
	});

	it("should handle maxLength of 0", () => {
		const input = "Hello";
		const result = getStringPreview(input, 0);

		expect(result).toBe("...");
	});

	it("should handle special characters", () => {
		const input = "Hello🌍World";
		const result = getStringPreview(input, 5);

		expect(result.startsWith("Hello")).toBe(true);
		expect(result.endsWith("...")).toBe(true);
	});

	it("should handle very long strings", () => {
		const input = "x".repeat(10000);
		const result = getStringPreview(input, 50);

		expect(result).toBe("x".repeat(50) + "...");
		expect(result.length).toBe(53);
	});

	it("should preserve whitespace", () => {
		const input = "Hello   World";
		const result = getStringPreview(input, 7);

		expect(result).toBe("Hello  ...");
	});

	it("should handle single character", () => {
		const result = getStringPreview("A", 1);

		expect(result).toBe("A");
	});

	it("should truncate single character if maxLength is 0", () => {
		const result = getStringPreview("A", 0);

		expect(result).toBe("...");
	});
});
