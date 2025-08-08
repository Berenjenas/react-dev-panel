import type { ColorExtractionOptions, ColorInfo } from "./types";

async function fileToImageData(file: File): Promise<ImageData> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			reject(new Error("Could not get canvas context"));

			return;
		}

		img.onload = (): void => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			try {
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

				resolve(imageData);
			} catch (error) {
				reject(new Error(`Failed to extract image data: ${error}`));
			}
		};

		img.onerror = (): void => {
			reject(new Error("Failed to load image"));
		};

		const objectUrl = URL.createObjectURL(file);

		img.src = objectUrl;

		img.onload = (): void => {
			URL.revokeObjectURL(objectUrl);

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			try {
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

				resolve(imageData);
			} catch (error) {
				reject(new Error(`Failed to extract image data: ${error}`));
			}
		};
	});
}

function rgbToHex(r: number, g: number, b: number): string {
	return `#${[r, g, b]
		.map((x) => {
			const hex = x.toString(16);

			return hex.length === 1 ? "0" + hex : hex;
		})
		.join("")}`;
}

function colorDistance(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }): number {
	const rDiff = color1.r - color2.r;
	const gDiff = color1.g - color2.g;
	const bDiff = color1.b - color2.b;

	return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

function shouldExcludeColor(r: number, g: number, b: number, options: ColorExtractionOptions): boolean {
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	if (options.excludeDark && brightness < 50) {
		return true;
	}

	if (options.excludeLight && brightness > 200) {
		return true;
	}

	return false;
}

function groupSimilarColors(colors: Map<string, ColorInfo>, tolerance: number): ColorInfo[] {
	const groupedColors: ColorInfo[] = [];
	const processed = new Set<string>();

	for (const [key, color] of colors) {
		if (processed.has(key)) continue;

		const groupColor = { ...color };
		let totalCount = color.count;
		let totalR = color.r * color.count;
		let totalG = color.g * color.count;
		let totalB = color.b * color.count;

		processed.add(key);

		for (const [otherKey, otherColor] of colors) {
			if (processed.has(otherKey)) continue;

			const distance = colorDistance(color, otherColor);

			if (distance <= tolerance) {
				totalCount += otherColor.count;
				totalR += otherColor.r * otherColor.count;
				totalG += otherColor.g * otherColor.count;
				totalB += otherColor.b * otherColor.count;
				processed.add(otherKey);
			}
		}

		if (totalCount > 0) {
			groupColor.r = Math.round(totalR / totalCount);
			groupColor.g = Math.round(totalG / totalCount);
			groupColor.b = Math.round(totalB / totalCount);
			groupColor.hex = rgbToHex(groupColor.r, groupColor.g, groupColor.b);
			groupColor.count = totalCount;
		}

		groupedColors.push(groupColor);
	}

	return groupedColors;
}

function analyzeImageData(imageData: ImageData, options: ColorExtractionOptions = {}): ColorInfo[] {
	const { maxColors = 10, tolerance = 30, quality = 10, minPercentage = 0.1, excludeDark = false, excludeLight = false } = options;

	const data = imageData.data;
	const colorCounts = new Map<string, ColorInfo>();
	let totalPixels = 0;

	for (let i = 0; i < data.length; i += 4 * quality) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const a = data[i + 3];

		if (a < 128) continue;

		if (shouldExcludeColor(r, g, b, { excludeDark, excludeLight })) continue;

		const hex = rgbToHex(r, g, b);

		if (colorCounts.has(hex)) {
			const existingColor = colorCounts.get(hex)!;

			existingColor.count++;
		} else {
			colorCounts.set(hex, {
				r,
				g,
				b,
				hex,
				count: 1,
				percentage: 0,
			});
		}

		totalPixels++;
	}

	let processedColors: ColorInfo[];

	if (tolerance > 0) {
		processedColors = groupSimilarColors(colorCounts, tolerance);
	} else {
		processedColors = Array.from(colorCounts.values());
	}

	processedColors.forEach((color) => {
		color.percentage = (color.count / totalPixels) * 100;
	});

	const filteredColors = processedColors.filter((color) => color.percentage >= minPercentage).sort((a, b) => b.percentage - a.percentage);

	return filteredColors.slice(0, maxColors);
}

/**
 * Main function to extract colors from a File object
 *
 * @param file - The image file to analyze
 * @param options - Configuration options for color extraction
 * @returns Promise that resolves to an array of ColorInfo objects
 *
 * @example
 * ```typescript
 * const colors = await extractColorsFromFile(imageFile, {
 *   maxColors: 5,
 *   tolerance: 25,
 *   minPercentage: 1
 * });
 *
 * colors.forEach(color => {
 *   console.log(`Color ${color.hex}: ${color.percentage.toFixed(2)}%`);
 * });
 * ```
 */
export async function extractColorsFromFile(file: File, options: ColorExtractionOptions = {}): Promise<ColorInfo[]> {
	if (!file) {
		throw new Error("File is required");
	}

	if (!file.type.startsWith("image/")) {
		throw new Error("File must be an image");
	}

	try {
		const imageData = await fileToImageData(file);
		const colors = analyzeImageData(imageData, options);

		return colors;
	} catch (error) {
		throw new Error(`Failed to extract colors: ${error instanceof Error ? error.message : "Unknown error"}`);
	}
}

/**
 * Convenience function to extract colors from FileInfo object (from DragAndDropControl)
 *
 * @param fileInfo - The FileInfo object from DragAndDropControl
 * @param options - Configuration options for color extraction
 * @returns Promise that resolves to an array of ColorInfo objects
 */
export async function extractColorsFromFileInfo(fileInfo: { file: File }, options: ColorExtractionOptions = {}): Promise<ColorInfo[]> {
	return extractColorsFromFile(fileInfo.file, options);
}

/**
 * Utility function to get the dominant color (most frequent) from an image
 *
 * @param file - The image file to analyze
 * @param options - Configuration options for color extraction
 * @returns Promise that resolves to the dominant ColorInfo object, or null if no colors found
 */
export async function getDominantColor(file: File, options: ColorExtractionOptions = {}): Promise<ColorInfo | null> {
	const colors = await extractColorsFromFile(file, { ...options, maxColors: 1 });

	return colors.length > 0 ? colors[0] : null;
}

/**
 * Utility function to create a color palette from an image
 *
 * @param file - The image file to analyze
 * @param paletteSize - Number of colors in the palette (default: 5)
 * @param options - Additional configuration options
 * @returns Promise that resolves to an array of hex color strings
 */
export async function createColorPalette(
	file: File,
	paletteSize: number = 5,
	options: Omit<ColorExtractionOptions, "maxColors"> = {},
): Promise<string[]> {
	const colors = await extractColorsFromFile(file, { ...options, maxColors: paletteSize });

	return colors.map((color) => color.hex);
}
