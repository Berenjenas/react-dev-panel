import { getPositionAdjustment } from "./getPositionAdjustment";

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

describe("getPositionAdjustment", () => {
	beforeEach(() => {
		window.innerWidth = mockWindow.innerWidth;
		window.innerHeight = mockWindow.innerHeight;
	});

	it("should return no adjustment needed when element is within bounds", () => {
		const element = createMockElement({
			width: 300,
			height: 200,
			left: 100,
			top: 100,
		});

		const result = getPositionAdjustment(element);

		expect(result).toEqual({
			currentPosition: { x: 100, y: 100 },
			constrainedPosition: { x: 100, y: 100 },
			needsAdjustment: false,
		});
	});

	it("should return adjustment needed when element is out of bounds horizontally", () => {
		const element = createMockElement({
			width: 300,
			height: 200,
			left: -50,
			top: 100,
		});

		const result = getPositionAdjustment(element);

		expect(result).toEqual({
			currentPosition: { x: -50, y: 100 },
			constrainedPosition: { x: 0, y: 100 },
			needsAdjustment: true,
		});
	});

	it("should return adjustment needed when element is out of bounds vertically", () => {
		const element = createMockElement({
			width: 300,
			height: 200,
			left: 100,
			top: -25,
		});

		const result = getPositionAdjustment(element);

		expect(result).toEqual({
			currentPosition: { x: 100, y: -25 },
			constrainedPosition: { x: 100, y: 0 },
			needsAdjustment: true,
		});
	});

	it("should return adjustment needed when element exceeds viewport bounds", () => {
		const element = createMockElement({
			width: 300,
			height: 200,
			left: 1000, // viewport is 1200, so max x should be 900
			top: 700, // viewport is 800, so max y should be 600
		});

		const result = getPositionAdjustment(element);

		expect(result).toEqual({
			currentPosition: { x: 1000, y: 700 },
			constrainedPosition: { x: 900, y: 600 },
			needsAdjustment: true,
		});
	});

	it("should return adjustment needed when element is completely out of bounds", () => {
		const element = createMockElement({
			width: 300,
			height: 200,
			left: -100,
			top: -50,
		});

		const result = getPositionAdjustment(element);

		expect(result).toEqual({
			currentPosition: { x: -100, y: -50 },
			constrainedPosition: { x: 0, y: 0 },
			needsAdjustment: true,
		});
	});
});
