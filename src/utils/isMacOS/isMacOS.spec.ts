import { isMacOS } from "./isMacOS";

// Define extended Navigator interface to include userAgentData
interface ExtendedNavigator extends Navigator {
	userAgentData?: {
		platform?: string;
	};
}

// Mock the global navigator object
function mockNavigator(overrides: Partial<ExtendedNavigator> = {}): void {
	Object.defineProperty(global, "navigator", {
		value: {
			...overrides,
		},
		writable: true,
		configurable: true,
	});
}

describe("isMacOS", () => {
	const originalNavigator = global.navigator;

	afterEach(() => {
		// Restore original navigator after each test
		Object.defineProperty(global, "navigator", {
			value: originalNavigator,
			writable: true,
			configurable: true,
		});
	});

	describe("modern navigator.userAgentData approach", () => {
		it("should return true when userAgentData.platform is macOS", () => {
			// Given
			mockNavigator({
				userAgentData: {
					platform: "macOS",
				},
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(true);
		});

		it("should return false when userAgentData.platform is not macOS", () => {
			// Given
			mockNavigator({
				userAgentData: {
					platform: "Windows",
				},
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(false);
		});

		it("should return false when userAgentData exists but platform is undefined", () => {
			// Given
			mockNavigator({
				userAgentData: {},
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(false);
		});

		it("should fall back when userAgentData is not available", () => {
			// Given
			mockNavigator({
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
				platform: "MacIntel",
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(true);
		});
	});

	describe("userAgent string analysis fallback", () => {
		beforeEach(() => {
			// Remove userAgentData to force fallback
			mockNavigator({
				userAgent: "",
				platform: "",
			});
		});

		it("should return true for Mac userAgent", () => {
			// Given
			mockNavigator({
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(true);
		});

		it("should return false for non-Apple platforms", () => {
			// Given - test various non-Apple platforms
			const nonApplePlatforms = [
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
				"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
				"Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36",
			];

			nonApplePlatforms.forEach((userAgent) => {
				mockNavigator({ userAgent });
				const result = isMacOS();

				expect(result).toBe(false);
			});
		});

		it("should handle case-insensitive matching", () => {
			// Given - lowercase 'macintosh' should match
			mockNavigator({
				userAgent: "Mozilla/5.0 (macintosh; Intel mac OS X 10_15_7) AppleWebKit/537.36",
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(true);
		});

		it("should match mixed case variations", () => {
			// Given - various case combinations should all match
			const testCases = [
				"Mozilla/5.0 (MACINTOSH; Intel Mac OS X 10_15_7)",
				"Mozilla/5.0 (MacIntosh; Intel Mac OS X 10_15_7)",
				"Mozilla/5.0 (iphone; CPU iPhone OS 15_0)",
				"Mozilla/5.0 (IPHONE; CPU iPhone OS 15_0)",
				"Mozilla/5.0 (ipad; CPU OS 15_0)",
				"Mozilla/5.0 (IPAD; CPU OS 15_0)",
				"Mozilla/5.0 (ipod touch; CPU iPhone OS 15_0)",
				"Mozilla/5.0 (IPOD; CPU iPhone OS 15_0)",
			];

			testCases.forEach((userAgent) => {
				mockNavigator({ userAgent });
				const result = isMacOS();

				expect(result).toBe(true);
			});
		});
	});

	describe("navigator.platform fallback", () => {
		beforeEach(() => {
			// Remove userAgentData and userAgent to force platform fallback
			mockNavigator({
				platform: "",
			});
		});

		it("should return true for MacIntel platform", () => {
			// Given
			mockNavigator({
				platform: "MacIntel",
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(true);
		});

		it("should return false for non-Mac platforms", () => {
			// Given - test various non-Mac platforms
			const nonMacPlatforms = ["Win32", "Linux x86_64", "Linux armv7l"];

			nonMacPlatforms.forEach((platform) => {
				mockNavigator({ platform });
				const result = isMacOS();

				expect(result).toBe(false);
			});
		});

		it("should return false when platform is undefined", () => {
			// Given
			mockNavigator({
				platform: undefined,
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(false);
		});

		it("should handle partial Mac platform strings", () => {
			// Given
			mockNavigator({
				platform: "MacDifferentSuffix",
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(true);
		});

		it("should handle case-insensitive platform detection", () => {
			// Given - various case combinations should all match
			const testCases = ["macIntel", "MACINTEL", "macppc", "MAC68K", "macDifferentSuffix"];

			testCases.forEach((platform) => {
				mockNavigator({ platform });
				const result = isMacOS();

				expect(result).toBe(true);
			});
		});
	});

	describe("navigator undefined scenarios", () => {
		it("should return false when navigator is undefined", () => {
			// Given
			Object.defineProperty(global, "navigator", {
				value: undefined,
				writable: true,
				configurable: true,
			});

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(false);
		});

		it("should return false in non-browser environment", () => {
			// Given
			delete (global as { navigator?: Navigator }).navigator;

			// When
			const result = isMacOS();

			// Then
			expect(result).toBe(false);
		});
	});

	describe("priority order of detection methods", () => {
		it("should prioritize userAgentData over userAgent", () => {
			// Given - userAgentData says Windows, but userAgent says Mac
			mockNavigator({
				userAgentData: {
					platform: "Windows",
				},
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
				platform: "MacIntel",
			});

			// When
			const result = isMacOS();

			// Then - should use userAgentData result (false)
			expect(result).toBe(false);
		});

		it("should prioritize userAgent over platform", () => {
			// Given - userAgent says Windows, but platform says Mac
			mockNavigator({
				userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
				platform: "MacIntel",
			});

			// When
			const result = isMacOS();

			// Then - should use userAgent result (false)
			expect(result).toBe(false);
		});

		it("should use platform when userAgent is empty", () => {
			// Given
			mockNavigator({
				userAgent: "",
				platform: "MacIntel",
			});

			// When
			const result = isMacOS();

			// Then - should fall back to platform (true)
			expect(result).toBe(true);
		});
	});

	describe("real-world user agent strings", () => {
		const realWorldUserAgents = [
			{
				name: "Safari on macOS Big Sur",
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
				expected: true,
			},
			{
				name: "Chrome on macOS",
				userAgent:
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
				expected: true,
			},
			{
				name: "Firefox on macOS",
				userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
				expected: true,
			},
			{
				name: "Safari on iPhone",
				userAgent:
					"Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
				expected: true,
			},
			{
				name: "Chrome on Windows",
				userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
				expected: false,
			},
			{
				name: "Firefox on Ubuntu",
				userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
				expected: false,
			},
		];

		realWorldUserAgents.forEach(({ name, userAgent, expected }) => {
			it(`should correctly detect ${name}`, () => {
				// Given
				mockNavigator({ userAgent });

				// When
				const result = isMacOS();

				// Then
				expect(result).toBe(expected);
			});
		});
	});
});
