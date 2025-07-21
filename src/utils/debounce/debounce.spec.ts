import { vi } from "vitest";

import { debounce } from "./debounce";

describe("debounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should delay function execution", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should only execute the function once for multiple rapid calls", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        vi.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should reset the timer for subsequent calls", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        vi.advanceTimersByTime(50);

        debouncedFn(); // This should reset the timer
        vi.advanceTimersByTime(50);
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should pass arguments to the debounced function", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn("arg1", "arg2", 123);
        vi.advanceTimersByTime(100);

        expect(mockFn).toHaveBeenCalledWith("arg1", "arg2", 123);
    });

    it("should use the arguments from the last call", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn("first");
        debouncedFn("second");
        debouncedFn("third");

        vi.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith("third");
    });

    it("should work with different wait times", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 200);

        debouncedFn();
        vi.advanceTimersByTime(100);
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should handle zero wait time", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 0);

        debouncedFn();
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(0);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
