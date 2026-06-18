import { deepEqual } from "./deepEqual";

describe("deepEqual", () => {
	it("treats identical primitives as equal", () => {
		expect(deepEqual(1, 1)).toBe(true);
		expect(deepEqual("a", "a")).toBe(true);
		expect(deepEqual(true, true)).toBe(true);
		expect(deepEqual(null, null)).toBe(true);
		expect(deepEqual(undefined, undefined)).toBe(true);
	});

	it("treats different primitives as not equal", () => {
		expect(deepEqual(1, 2)).toBe(false);
		expect(deepEqual("a", "b")).toBe(false);
		expect(deepEqual(null, undefined)).toBe(false);
		expect(deepEqual(0, false)).toBe(false);
	});

	it("compares nested objects structurally and ignores key order", () => {
		expect(deepEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 })).toBe(true);
		expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
		expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
	});

	it("compares arrays by element and length", () => {
		expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
		expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
		expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
	});

	it("does not treat arrays and objects as equal", () => {
		expect(deepEqual([], {})).toBe(false);
	});

	it("compares functions by reference (a new handler is a change)", () => {
		function fn(): void {}

		function otherA(): void {}

		function otherB(): void {}

		expect(deepEqual({ onChange: fn }, { onChange: fn })).toBe(true);
		expect(deepEqual({ onChange: otherA }, { onChange: otherB })).toBe(false);
	});
});
