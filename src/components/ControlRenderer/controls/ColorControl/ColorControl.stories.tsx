import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DevPanel } from "@/components";
import { useDevPanel } from "@/hooks/useDevPanel";

import type { ColorControl as ColorControlType } from "./types";

type ColorControlShowcaseProps = {
	devPanelTitle?: string;
};

/**
 * Comprehensive showcase of the ColorControl component with various configurations
 */
function ColorControlShowcase(props: ColorControlShowcaseProps) {
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

	useDevPanel("🎨 Color Controls", {
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
	});

	return (
		<>
			<div
				style={{
					padding: "2rem",
					background: `linear-gradient(135deg, ${basicColor}20 0%, ${hexColor}20 50%, ${customPresetColor}20 100%)`,
					minHeight: "100vh",
					fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
				}}
			>
				<h1
					style={{
						color: "var(--dev-panel-text-color)",
						fontSize: "2.5rem",
						fontWeight: "bold",
						marginBottom: "2rem",
						textAlign: "center",
					}}
				>
					🎨 Color Control Showcase
				</h1>

				<div
					style={{
						maxWidth: "800px",
						margin: "0 auto",
						padding: "2rem",
						background: "var(--dev-panel-surface-color)",
						borderRadius: "12px",
						boxShadow: "var(--dev-panel-shadow-lg)",
						marginBottom: "2rem",
					}}
				>
					<h2 style={{ color: "var(--dev-panel-text-color)", marginBottom: "1.5rem" }}>Color Control Features</h2>

					<div style={{ display: "grid", gap: "1.5rem" }}>
						<div>
							<h3 style={{ color: "var(--dev-panel-text-color)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Current Colors</h3>
							<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
								{[
									{ label: "Basic", color: basicColor },
									{ label: "Hex", color: hexColor },
									{ label: "Named", color: namedColor },
									{ label: "Custom Preset", color: customPresetColor },
									{ label: "RGB", color: rgbColor },
								].map(({ label, color }) => (
									<div key={label} style={{ textAlign: "center" }}>
										<div
											style={{
												width: "100%",
												height: "60px",
												backgroundColor: color,
												borderRadius: "8px",
												marginBottom: "0.5rem",
												border: "1px solid var(--dev-panel-input-border-color)",
												boxShadow: "var(--dev-panel-shadow-sm)",
											}}
										/>
										<div style={{ fontSize: "0.875rem", color: "var(--dev-panel-text-color-muted)", fontWeight: "600" }}>
											{label}
										</div>
										<div style={{ fontSize: "0.75rem", color: "var(--dev-panel-text-color-muted)", fontFamily: "monospace" }}>
											{color}
										</div>
									</div>
								))}
							</div>
						</div>

						<div>
							<h3 style={{ color: "var(--dev-panel-text-color)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Features</h3>
							<ul style={{ color: "var(--dev-panel-text-color-muted)", lineHeight: "1.6" }}>
								<li>
									<strong>🎯 Visual Color Picker:</strong> Native browser color picker with custom styling
								</li>
								<li>
									<strong>✏️ Text Input:</strong> Manual entry with real-time validation
								</li>
								<li>
									<strong>🎨 Color Presets:</strong> Quick selection from predefined palettes
								</li>
								<li>
									<strong>🔧 Format Support:</strong> Hex, RGB, HSL, and named CSS colors
								</li>
								<li>
									<strong>⚡ Debounced Updates:</strong> Smooth performance during value changes
								</li>
								<li>
									<strong>🚫 Validation:</strong> Real-time color format validation with error feedback
								</li>
								<li>
									<strong>♿ Accessibility:</strong> Full keyboard navigation and screen reader support
								</li>
								<li>
									<strong>🎭 Transparency:</strong> Checkerboard pattern for transparent colors
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div
					style={{
						maxWidth: "600px",
						margin: "0 auto",
						padding: "1.5rem",
						background: "var(--dev-panel-surface-color)",
						borderRadius: "8px",
						textAlign: "center",
					}}
				>
					<h3 style={{ color: "var(--dev-panel-text-color)", marginBottom: "1rem" }}>Usage Examples</h3>
					<div style={{ textAlign: "left", fontSize: "0.875rem", color: "var(--dev-panel-text-color-muted)" }}>
						<p>
							<strong>Basic:</strong> <code>{`{ type: "color", value: "${basicColor}", onChange: setColor }`}</code>
						</p>
						<p>
							<strong>With Presets:</strong> <code>{`{ type: "color", presets: ["#ff0000", "#00ff00"] }`}</code>
						</p>
						<p>
							<strong>Format Specific:</strong> <code>{`{ type: "color", format: "hex" }`}</code>
						</p>
					</div>
				</div>
			</div>

			<DevPanel panelTitle={props.devPanelTitle} />
		</>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<ColorControlShowcaseProps> = {
	title: "Controls/ColorControl",
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
# ColorControl Component

A comprehensive color picker control that combines visual color selection with text input validation.

## Features

- **Visual Color Picker**: Native browser color picker with enhanced styling
- **Text Input Validation**: Real-time validation for hex, RGB, HSL, and named colors
- **Color Presets**: Customizable preset color palettes for quick selection
- **Format Control**: Optional format enforcement (hex, rgb, hsl, or any)
- **Debounced Updates**: Smooth performance with configurable debounce timing
- **Transparency Support**: Visual checkerboard pattern for transparent colors
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Error Feedback**: Clear validation messages for invalid color values

## Props

- \`value\`: Current color value (any valid CSS color)
- \`onChange\`: Callback function when color changes
- \`format\`: Optional format enforcement ("hex" | "rgb" | "hsl" | "any")
- \`presets\`: Array of preset colors for quick selection
- \`disabled\`: Boolean to disable the control
- \`allowAlpha\`: Boolean to enable alpha/transparency support (future feature)

## Color Format Support

The control supports all valid CSS color formats:
- **Hex**: \`#ff0000\`, \`#f00\`
- **RGB**: \`rgb(255, 0, 0)\`, \`rgba(255, 0, 0, 0.5)\`
- **HSL**: \`hsl(0, 100%, 50%)\`, \`hsla(0, 100%, 50%, 0.5)\`
- **Named**: \`red\`, \`crimson\`, \`steelblue\`, etc.

## Usage Examples

\`\`\`typescript
// Basic color picker
{
  type: "color",
  value: "#ff0000",
  onChange: (color) => setThemeColor(color)
}

// With custom presets
{
  type: "color",
  value: "#6366f1",
  presets: ["#6366f1", "#8b5cf6", "#ec4899"],
  onChange: (color) => setAccentColor(color)
}

// Hex format only
{
  type: "color",
  value: "#ff0000",
  format: "hex",
  onChange: (color) => setHexColor(color)
}
\`\`\`
				`,
			},
		},
	},
	argTypes: {
		devPanelTitle: {
			control: "text",
			description: "Custom title for the dev panel",
		},
	},
};

export default meta;

type Story = StoryObj<ColorControlShowcaseProps>;

export const ColorControlDemo: Story = {
	render: (args) => <ColorControlShowcase {...args} />,
	args: {
		devPanelTitle: "🎨 Color Controls",
	},
	parameters: {
		docs: {
			description: {
				story: `
Interactive demonstration of the ColorControl component with various configurations.

**Features Demonstrated:**
- Basic color picker with default settings
- Format-specific color picker (hex only)
- Named color support (CSS color names)
- Custom preset palettes (theme colors, material design)
- RGB/HSL format support
- Disabled state handling
- Real-time validation and error feedback

Use the dev panel controls to experiment with different color values and see how the component handles various input formats.
				`,
			},
		},
	},
};
