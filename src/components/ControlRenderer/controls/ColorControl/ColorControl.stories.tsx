import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

import type { ColorControl as ColorControlType } from "./types";

function ColorControlDemo(): React.ReactNode {
	const [basicColor, setBasicColor] = useState("#ff6b35");
	const [hexColor, setHexColor] = useState("#4ecdc4");
	const [namedColor, setNamedColor] = useState("crimson");
	const [customPresetColor, setCustomPresetColor] = useState("#8b5cf6");
	const [rgbColor, setRgbColor] = useState("rgb(139, 69, 19)");

	// Custom theme-based color presets
	const themePresets = [
		"#6366f1", // Indigo
		"#8b5cf6", // Purple
		"#ec4899", // Pink
		"#10b981", // Emerald
		"#f59e0b", // Amber
		"#ef4444", // Red
		"#3b82f6", // Blue
		"#06b6d4", // Cyan
	];

	const materialPresets = [
		"#f44336", // Red
		"#e91e63", // Pink
		"#9c27b0", // Purple
		"#673ab7", // Deep Purple
		"#3f51b5", // Indigo
		"#2196f3", // Blue
		"#03a9f4", // Light Blue
		"#00bcd4", // Cyan
		"#009688", // Teal
		"#4caf50", // Green
		"#8bc34a", // Light Green
		"#cddc39", // Lime
		"#ffeb3b", // Yellow
		"#ffc107", // Amber
		"#ff9800", // Orange
		"#ff5722", // Deep Orange
	];

	useDevPanel(
		"Color Control",
		{
			basicColor: {
				type: "color",
				value: basicColor,
				label: "Basic Color",
				description: "Standard color picker with default settings",
				onChange: setBasicColor,
			} as ColorControlType,

			hexColor: {
				type: "color",
				value: hexColor,
				label: "Hex Format Only",
				description: "Color picker that formats output as hex",
				format: "hex",
				onChange: setHexColor,
			} as ColorControlType,

			namedColor: {
				type: "color",
				value: namedColor,
				label: "Named Colors",
				description: "Supports CSS named colors like 'crimson', 'steelblue'",
				onChange: setNamedColor,
			} as ColorControlType,

			customPresetColor: {
				type: "color",
				value: customPresetColor,
				label: "Custom Presets",
				description: "Color picker with custom preset palette",
				presets: themePresets,
				onChange: setCustomPresetColor,
			} as ColorControlType,

			rgbColor: {
				type: "color",
				value: rgbColor,
				label: "RGB Color",
				description: "Color picker supporting RGB format",
				onChange: setRgbColor,
			} as ColorControlType,

			separator: {
				type: "separator",
				style: "label",
				label: "Material Design Colors",
			},

			materialColor: {
				type: "color",
				value: materialPresets[0],
				label: "Material Palette",
				description: "Material Design color palette",
				presets: materialPresets,
				onChange: (value: string) => console.log("Material color:", value),
			} as ColorControlType,

			disabledColor: {
				type: "color",
				value: "#cccccc",
				label: "Disabled State",
				description: "Shows disabled color picker",
				disabled: true,
				onChange: () => {},
			} as ColorControlType,
		},
		{ panelTitle: "Color Control Panel" },
	);

	return (
		<Logger
			items={{
				basicColor,
				hexColor,
				namedColor,
				customPresetColor,
				rgbColor,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof ColorControlDemo> = {
	title: "Controls",
	component: ColorControlDemo,
};

export default meta;

type Story = StoryObj<typeof ColorControlDemo>;

export const ColorControl: Story = {};
