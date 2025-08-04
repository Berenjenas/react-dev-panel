/**
 * Utility function to detect if the user is on macOS
 * Uses modern alternatives to deprecated navigator.platform
 */
export function isMacOS(): boolean {
	// Modern approach using navigator.userAgentData (if available)
	if (typeof navigator !== "undefined" && "userAgentData" in navigator) {
		const userAgentData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;

		return userAgentData?.platform === "macOS";
	}

	// Fallback to userAgent string analysis
	if (typeof navigator !== "undefined" && navigator.userAgent) {
		return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
	}

	// Last resort: check for Mac-specific APIs
	if (typeof navigator !== "undefined") {
		// Check for Mac-specific keyboard behavior
		return navigator.platform?.toLowerCase().includes("mac") || false;
	}

	return false;
}
