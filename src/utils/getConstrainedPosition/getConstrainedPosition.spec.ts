import { getConstrainedPosition } from "./getConstrainedPosition";

// Mock the window object for testing
const mockWindow = {
	innerWidth: 1200,
	innerHeight: 800,
};

Object.defineProperty(window, "innerWidth", {
	writable: true,
	configurable: true,
	value: mockWindow.innerWidth,
});

Object.defineProperty(window, "innerHeight", {
	writable: true,
	configurable: true,
	value: mockWindow.innerHeight,
});

// Mock element with getBoundingClientRect
function createMockElement(rect: Partial<DOMRect>): HTMLElement {
	const element = document.createElement("div");

	element.getBoundingClientRect = (): DOMRect => ({
		x: 0,
		y: 0,
		width: 300,
		height: 200,
		top: 0,
		left: 0,
		bottom: 200,
		right: 300,
		toJSON: () => ({}),
		...rect,
	});

	return element;
}

describe("getConstrainedPosition", () => {
	beforeEach(() => {
		window.innerWidth = mockWindow.innerWidth;
		window.innerHeight = mockWindow.innerHeight;
	});

	it("should return the same position when element is within bounds", () => {
		const element = createMockElement({ width: 300, height: 200 });
		const position = { x: 100, y: 100 };

		const result = getConstrainedPosition(position, element);

		expect(result).toEqual({ x: 100, y: 100 });
	});

	it("should constrain position to left boundary when x is negative", () => {
		const element = createMockElement({ width: 300, height: 200 });
		const position = { x: -50, y: 100 };

		const result = getConstrainedPosition(position, element);

		expect(result).toEqual({ x: 0, y: 100 });
	});

	it("should constrain position to top boundary when y is negative", () => {
		const element = createMockElement({ width: 300, height: 200 });
		const position = { x: 100, y: -30 };

		const result = getConstrainedPosition(position, element);

		expect(result).toEqual({ x: 100, y: 0 });
	});

	it("should constrain position to right boundary when x exceeds viewport", () => {
		const element = createMockElement({ width: 300, height: 200 });
		const position = { x: 1000, y: 100 }; // viewport is 1200, so max x should be 900

		const result = getConstrainedPosition(position, element);

		expect(result).toEqual({ x: 900, y: 100 });
	});

	it("should constrain position to bottom boundary when y exceeds viewport", () => {
		const element = createMockElement({ width: 300, height: 200 });
		const position = { x: 100, y: 700 }; // viewport is 800, so max y should be 600

		const result = getConstrainedPosition(position, element);

		expect(result).toEqual({ x: 100, y: 600 });
	});

	it("should constrain position to all boundaries when position is completely out of bounds", () => {
		const element = createMockElement({ width: 300, height: 200 });
		const position = { x: -100, y: -50 };

		const result = getConstrainedPosition(position, element);

		expect(result).toEqual({ x: 0, y: 0 });
	});
});
