/**
 * Represents a color with its RGB values and percentage in the image
 */
export interface ColorInfo {
	r: number;
	g: number;
	b: number;
	hex: string;
	percentage: number;
	count: number;
}

/**
 * Configuration options for color extraction
 */
export interface ColorExtractionOptions {
	maxColors?: number;
	tolerance?: number;
	quality?: number;
	minPercentage?: number;
	excludeDark?: boolean;
	excludeLight?: boolean;
}
