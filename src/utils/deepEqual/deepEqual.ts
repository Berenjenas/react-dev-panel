/**
 * Structural deep-equality check used to skip redundant store updates and
 * re-registrations.
 *
 * Preferable to comparing two `JSON.stringify` outputs because it:
 * - does not allocate two full string copies on every call;
 * - is insensitive to object key order;
 * - compares functions by reference (`Object.is`) instead of silently dropping
 *   them, so a control whose only change is a new `onChange` handler is still
 *   detected as changed.
 *
 * Note: like `JSON.stringify`, it does not guard against circular references;
 * the states compared here (UI state, control descriptors) are never circular.
 *
 * @param a - First value
 * @param b - Second value
 * @returns `true` when the two values are structurally equal
 */
export function deepEqual(a: unknown, b: unknown): boolean {
	if (Object.is(a, b)) return true;

	if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
		return false;
	}

	const aIsArray = Array.isArray(a);
	const bIsArray = Array.isArray(b);

	if (aIsArray !== bIsArray) return false;

	if (aIsArray && bIsArray) {
		if (a.length !== b.length) return false;

		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) return false;
		}

		return true;
	}

	const aObj = a as Record<string, unknown>;
	const bObj = b as Record<string, unknown>;
	const aKeys = Object.keys(aObj);
	const bKeys = Object.keys(bObj);

	if (aKeys.length !== bKeys.length) return false;

	for (const key of aKeys) {
		if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;

		if (!deepEqual(aObj[key], bObj[key])) return false;
	}

	return true;
}
