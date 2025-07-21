import { getCurrentElementPosition } from "./getCurrentElementPosition";

// Mock element with getBoundingClientRect
const createMockElement = (rect: Partial<DOMRect>): HTMLElement => {
    const element = document.createElement("div");

    element.getBoundingClientRect = () => ({
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
};

describe("getCurrentElementPosition", () => {
    it("should return the current position of an element", () => {
        const element = createMockElement({ left: 150, top: 75 });

        const result = getCurrentElementPosition(element);

        expect(result).toEqual({ x: 150, y: 75 });
    });

    it("should return position (0, 0) when element is at origin", () => {
        const element = createMockElement({ left: 0, top: 0 });

        const result = getCurrentElementPosition(element);

        expect(result).toEqual({ x: 0, y: 0 });
    });

    it("should handle negative positions", () => {
        const element = createMockElement({ left: -25, top: -50 });

        const result = getCurrentElementPosition(element);

        expect(result).toEqual({ x: -25, y: -50 });
    });

    it("should handle decimal positions", () => {
        const element = createMockElement({ left: 150.5, top: 75.25 });

        const result = getCurrentElementPosition(element);

        expect(result).toEqual({ x: 150.5, y: 75.25 });
    });
});
