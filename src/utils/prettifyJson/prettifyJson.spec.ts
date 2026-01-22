import { describe, expect, it } from "vitest";

import { prettifyJson } from "./prettifyJson";

describe("prettifyJson", () => {
	it("should prettify valid JSON", () => {
		const input = '{"name":"John","age":30}';
		const result = prettifyJson(input);
		const expected = '{\n  "name": "John",\n  "age": 30\n}';

		expect(result).toBe(expected);
	});

	it("should handle nested objects", () => {
		const input = '{"user":{"name":"John","address":{"city":"NYC"}}}';
		const result = prettifyJson(input);

		expect(result).toContain('"user"');
		expect(result).toContain('"name"');
		expect(result).toContain('"address"');
		expect(result).toContain('"city"');
		expect(result).toContain("NYC");
	});

	it("should handle arrays", () => {
		const input = '["apple","banana","cherry"]';
		const result = prettifyJson(input);

		expect(result).toContain("apple");
		expect(result).toContain("banana");
		expect(result).toContain("cherry");
	});

	it("should return original value if JSON parsing fails", () => {
		const input = "not a valid json";
		const result = prettifyJson(input);

		expect(result).toBe(input);
	});

	it("should handle empty objects", () => {
		const input = "{}";
		const result = prettifyJson(input);

		expect(result).toBe("{}");
	});

	it("should handle empty arrays", () => {
		const input = "[]";
		const result = prettifyJson(input);

		expect(result).toBe("[]");
	});

	it("should handle strings with special characters", () => {
		const input = '{"message":"Hello\\nWorld"}';
		const result = prettifyJson(input);

		expect(result).toContain("message");
		expect(result).toContain("Hello");
	});

	it("should handle numbers and booleans", () => {
		const input = '{"count":42,"active":true,"score":3.14}';
		const result = prettifyJson(input);

		expect(result).toContain("42");
		expect(result).toContain("true");
		expect(result).toContain("3.14");
	});
});
