import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { FileInfo } from "@/components/ControlRenderer/controls/DragAndDropControl/types";
import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";
import { extractColorsFromFileInfo } from "@/stories/utils/ColorExtractor";

import type { ColorInfo } from "./utils/ColorExtractor/types";

function ColorExtractorDemo(): React.ReactNode {
	const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
	const [colors, setColors] = useState<ColorInfo[]>([]);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleFileDrop(value: FileInfo): void {
		setFileInfo(value);
		setIsAnalyzing(true);
		setError(null);
		setColors([]);

		extractColorsFromFileInfo(value, {
			maxColors: 5,
			tolerance: 25,
			minPercentage: 0.5,
			excludeDark: false,
			excludeLight: false,
			quality: 100,
		})
			.then((extractedColors) => {
				setColors(extractedColors);
			})
			.catch((err) => {
				setError(err instanceof Error ? err.message : "Unknown error occurred");
			})
			.finally(() => {
				setIsAnalyzing(false);
			});
	}

	useDevPanel(
		"Color Extractor",
		{
			imageUpload: {
				type: "dragAndDrop",
				description: "Drop an image here to extract its color palette. Only image files are allowed.",
				allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"],
				onDrop: handleFileDrop,
			},
		},
		{ panelTitle: "Color Extractor Demo" },
	);

	return (
		<>
			{isAnalyzing && <small style={{ fontWeight: 500 }}>Analyzing image colors...</small>}

			{error && (
				<p
					style={{
						color: "red",
					}}
				>
					Error: {error}
				</p>
			)}

			{colors.length > 0 && (
				<section
					style={{
						width: "100%",
						height: "100%",
						display: "grid",
						gridTemplateColumns: `repeat(${colors.length}, 1fr)`,
					}}
				>
					{colors.map((color) => (
						<div key={color.hex} style={{ backgroundColor: color.hex }}>
							<ul
								style={{
									backgroundColor: "white",
									marginLeft: "10px",
									marginRight: "10px",
									listStyle: "none",
									padding: "6px 12px",
									borderRadius: "6px",
									boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 15px 5px",
								}}
							>
								<li style={{ marginBottom: "8px" }}>
									<strong style={{ fontWeight: 600, fontSize: "12px" }}>Color</strong>

									<span
										style={{
											display: "block",
											fontSize: "12px",
										}}
									>
										{color.hex}
									</span>
								</li>

								<li>
									<strong style={{ fontWeight: 600, fontSize: "12px" }}>Percentage</strong>

									<span
										style={{
											display: "block",
											fontSize: "12px",
										}}
									>
										{color.percentage.toFixed(2) + "%"}
									</span>
								</li>
							</ul>
						</div>
					))}
				</section>
			)}

			{!fileInfo && <p>Drop an image file to extract its color palette. Supported formats: JPG, PNG, GIF, WEBP, BMP.</p>}

			{/* Logger component to display file info and extracted colors */}

			<Logger
				defaultCollapsed
				items={{
					fileInfo: fileInfo
						? {
								name: fileInfo.name,
								size: `${(fileInfo.size / 1024).toFixed(2)} KB`,
								type: fileInfo.type,
								lastModified: new Date(fileInfo.lastModified).toLocaleString(),
								base64Preview: fileInfo.base64 ? `${fileInfo.base64.slice(0, 50)}...` : undefined,
						  }
						: null,
					extractedColors:
						colors.length > 0
							? colors.map((color) => ({
									hex: color.hex,
									rgb: `(${color.r}, ${color.g}, ${color.b})`,
									percentage: `${color.percentage.toFixed(2)}%`,
									pixelCount: color.count.toLocaleString(),
							  }))
							: null,
					analysisStats:
						colors.length > 0
							? {
									totalColorsFound: colors.length,
									dominantColor: colors[0]?.hex,
									totalPixelsAnalyzed: colors.reduce((sum, color) => sum + color.count, 0).toLocaleString(),
							  }
							: null,
				}}
			/>
		</>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof ColorExtractorDemo> = {
	title: "Integration Tests",
	component: ColorExtractorDemo,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story): React.JSX.Element => {
			return (
				<div
					style={{
						width: "100%",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Story />
				</div>
			);
		},
	],
};

export default meta;

type Story = StoryObj<typeof ColorExtractorDemo>;

export const ColorExtractor: Story = {};
