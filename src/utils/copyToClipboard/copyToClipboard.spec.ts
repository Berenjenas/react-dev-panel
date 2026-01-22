import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { copyToClipboard } from "./copyToClipboard";

describe("copyToClipboard", () => {
	beforeEach(() => {
		// Mock navigator.clipboard using defineProperty
		const mockClipboard = {
			writeText: vi.fn(),
		};

		Object.defineProperty(navigator, "clipboard", {
			value: mockClipboard,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should copy text to clipboard", async () => {
		const text = "Hello World";
		const mockWriteText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValueOnce(undefined);

		await copyToClipboard(text);

		expect(mockWriteText).toHaveBeenCalledWith(text);
	});

	it("should handle empty string", async () => {
		const mockWriteText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValueOnce(undefined);

		await copyToClipboard("");

		expect(mockWriteText).toHaveBeenCalledWith("");
	});

	it("should handle long text", async () => {
		const text = "x".repeat(10000);
		const mockWriteText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValueOnce(undefined);

		await copyToClipboard(text);

		expect(mockWriteText).toHaveBeenCalledWith(text);
	});

	it("should handle special characters", async () => {
		const text = "Hello\nWorld\t🌍";
		const mockWriteText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValueOnce(undefined);

		await copyToClipboard(text);

		expect(mockWriteText).toHaveBeenCalledWith(text);
	});

	it("should reject when clipboard write fails", async () => {
		const error = new Error("Clipboard denied");

		vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(error);

		await expect(copyToClipboard("text")).rejects.toThrow("Failed to copy to clipboard");
	});

	it("should reject with original error message", async () => {
		const originalError = new Error("Permission denied");

		vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(originalError);

		await expect(copyToClipboard("text")).rejects.toThrow("Permission denied");
	});

	it("should handle non-Error exceptions", async () => {
		vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce("String error");

		await expect(copyToClipboard("text")).rejects.toThrow("Failed to copy to clipboard");
	});

	it("should handle JSON strings", async () => {
		const text = '{"name":"John","age":30}';
		const mockWriteText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValueOnce(undefined);

		await copyToClipboard(text);

		expect(mockWriteText).toHaveBeenCalledWith(text);
	});
});
