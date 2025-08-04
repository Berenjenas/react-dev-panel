import { className } from "./className";

describe("className helper", () => {
	test("should return a className object containing the classes string", () => {
		// Given
		const classNames = [
			"test-class-1",
			"test-class-2",
			{
				"conditional-class-1": true,
				"conditional-class-2": false,
			},
		];

		// When
		const result = className(...classNames);
		const expectedResult = {
			className: "test-class-1 test-class-2 conditional-class-1",
		};

		// Then
		expect(result).toEqual(expectedResult);
	});
});
