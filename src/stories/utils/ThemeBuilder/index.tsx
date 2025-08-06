import { useEffect, useState } from "react";

import { useDevPanel } from "@/hooks/useDevPanel";
import { useDevPanelTheme } from "@/store/UIStore";

import { applyThemeVariables, generateThemeConfig, generateThemeCSS } from "./helpers";
import { themePresets } from "./presets";
import type { ThemeVariables } from "./types";

// Theme Presets

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);

		return true;
	} catch {
		return false;
	}
}

/**
 * Theme Builder Component - Interactive theme creation tool
 */
export function ThemeBuilderComponent(): React.JSX.Element {
	const { setTheme } = useDevPanelTheme();
	const [variables, setVariables] = useState<ThemeVariables>(themePresets.dark);
	const [themeName, setThemeName] = useState<string>("custom");
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

	/**
	 * Show toast notification
	 * @param message - The message to display
	 * @param type - The type of toast (success or error)
	 */
	function showToast(message: string, type: "success" | "error" = "success"): void {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3000);
	}

	// Theme Builder Controls
	useDevPanel("🎨 Theme Builder", {
		// Preset Section
		presetSeparator: {
			type: "separator",
			style: "label",
			label: "🎯 Theme Presets",
		},

		themePreset: {
			type: "select",
			value: "custom",
			label: "Load Preset",
			description: "Load a predefined theme configuration",
			options: [
				{ label: "Custom", value: "custom" },
				{ label: "🌙 Dark", value: "dark" },
				{ label: "☀️ Light", value: "light" },
				{ label: "🔥 Orange", value: "orange" },
				{ label: "💜 Purple", value: "purple" },
				{ label: "� Green", value: "green" },
				{ label: "🖥️ Neon", value: "neon" },
				{ label: "🏢 Corporate", value: "corporate" },
				{ label: "⚫ High Contrast", value: "highContrast" },
				{ label: "🌅 Sunset", value: "sunset" },
				{ label: "🌊 Ocean", value: "ocean" },
				{ label: "🌲 Forest", value: "forest" },
				{ label: "🌃 Midnight", value: "midnight" },
				{ label: "🍂 Autumn", value: "autumn" },
				{ label: "🌸 Blush", value: "blush" },
				{ label: "🌟 Gold", value: "gold" },
				{ label: "🤍 Pearl", value: "pearl" },
				{ label: "🍒 Cherry", value: "cherry" },
				{ label: "🎨 Pastel", value: "pastel" },
				{ label: "🌌 Cyberpunk", value: "cyberpunk" },
				{ label: "❄️ Arctic", value: "arctic" },
				{ label: "🌋 Volcano", value: "volcano" },
			],
			onChange: (value: string) => {
				if (value !== "custom" && themePresets[value]) {
					setVariables(themePresets[value]);
					setThemeName(value);
					showToast(`Loaded ${value} theme preset!`, "success");
				}
			},
		},

		themeName: {
			type: "text",
			value: themeName,
			label: "Theme Name",
			description: "Name for your custom theme",
			onChange: (value: string) => setThemeName(value),
		},

		// Color Section
		colorSeparator: {
			type: "separator",
			style: "label",
			label: "🎨 Colors",
		},

		accentColor: {
			type: "color",
			value: variables.accentColor,
			label: "Accent Color",
			description: "Primary accent color for buttons and highlights",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, accentColor: value })),
		},

		accentColorHover: {
			type: "color",
			value: variables.accentColorHover,
			label: "Accent Hover",
			description: "Accent color on hover",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, accentColorHover: value })),
		},

		accentColorActive: {
			type: "color",
			value: variables.accentColorActive,
			label: "Accent Active",
			description: "Accent color when pressed",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, accentColorActive: value })),
		},

		backgroundColor: {
			type: "color",
			value: variables.backgroundColor,
			label: "Background",
			description: "Main background color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, backgroundColor: value })),
		},

		backgroundColorSecondary: {
			type: "color",
			value: variables.backgroundColorSecondary,
			label: "Secondary Background",
			description: "Secondary background color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, backgroundColorSecondary: value })),
		},

		foregroundColor: {
			type: "color",
			value: variables.foregroundColor,
			label: "Foreground",
			description: "Panel foreground color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, foregroundColor: value })),
		},

		surfaceColor: {
			type: "color",
			value: variables.surfaceColor,
			label: "Surface",
			description: "Surface color for cards and elements",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, surfaceColor: value })),
		},

		// Text Colors
		textSeparator: {
			type: "separator",
			style: "label",
			label: "📝 Text Colors",
		},

		textColor: {
			type: "color",
			value: variables.textColor,
			label: "Primary Text",
			description: "Main text color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, textColor: value })),
		},

		textColorSecondary: {
			type: "color",
			value: variables.textColorSecondary,
			label: "Secondary Text",
			description: "Secondary text color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, textColorSecondary: value })),
		},

		textColorMuted: {
			type: "color",
			value: variables.textColorMuted,
			label: "Muted Text",
			description: "Muted text color for descriptions",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, textColorMuted: value })),
		},

		textColorOnAccent: {
			type: "color",
			value: variables.textColorOnAccent,
			label: "Text on Accent",
			description: "Text color when on accent background",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, textColorOnAccent: value })),
		},

		// Border Colors
		borderSeparator: {
			type: "separator",
			style: "label",
			label: "🔲 Borders",
		},

		borderColor: {
			type: "color",
			value: variables.borderColor,
			label: "Border",
			description: "Default border color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, borderColor: value })),
		},

		borderColorLight: {
			type: "color",
			value: variables.borderColorLight,
			label: "Light Border",
			description: "Light border color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, borderColorLight: value })),
		},

		borderColorStrong: {
			type: "color",
			value: variables.borderColorStrong,
			label: "Strong Border",
			description: "Strong border color",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, borderColorStrong: value })),
		},

		// Input Colors
		inputSeparator: {
			type: "separator",
			style: "label",
			label: "📝 Input Styles",
		},

		inputBackgroundColor: {
			type: "color",
			value: variables.inputBackgroundColor,
			label: "Input Background",
			description: "Background color for inputs",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, inputBackgroundColor: value })),
		},

		inputBorderColor: {
			type: "color",
			value: variables.inputBorderColor,
			label: "Input Border",
			description: "Border color for inputs",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, inputBorderColor: value })),
		},

		inputTextColor: {
			type: "color",
			value: variables.inputTextColor,
			label: "Input Text",
			description: "Text color in inputs",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, inputTextColor: value })),
		},

		// Layout Section
		layoutSeparator: {
			type: "separator",
			style: "label",
			label: "📐 Layout & Typography",
		},

		borderRadius: {
			type: "text",
			value: variables.borderRadius,
			label: "Border Radius",
			description: "Border radius for rounded corners",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, borderRadius: value })),
		},

		spacingBase: {
			type: "range",
			value: parseInt(variables.spacingBase, 10),
			label: "Base Spacing",
			description: "Base spacing unit - all other spacing multiplies from this (xs=0.5x, sm=1x, md=2x, lg=3x, xl=4x, etc.)",
			min: 1,
			max: 12,
			step: 1,
			onChange: (value: number) => setVariables((prev) => ({ ...prev, spacingBase: `${value}px` })),
		},

		fontSize: {
			type: "range",
			value: parseInt(variables.fontSize, 10),
			label: "Font Size",
			description: "Base font size",
			min: 8,
			max: 32,
			step: 1,
			onChange: (value: number) => setVariables((prev) => ({ ...prev, fontSize: `${value}px` })),
		},

		fontFamily: {
			type: "text",
			value: variables.fontFamily,
			label: "Font Family",
			description: "Font family stack",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, fontFamily: value })),
		},

		shadow: {
			type: "text",
			value: variables.shadow,
			label: "Box Shadow",
			description: "Box shadow for the panel",
			onChange: (value: string) => setVariables((prev) => ({ ...prev, shadow: value })),
		},

		// Dimensions Section
		dimensionsSeparator: {
			type: "separator",
			style: "label",
			label: "📏 Panel Dimensions",
		},

		width: {
			type: "range",
			value: parseInt(variables.maxWidth, 10),
			label: "Panel Width",
			description: "Maximum width of the dev panel",
			min: 200,
			max: 800,
			step: 10,
			onChange: (value: number) => setVariables((prev) => ({ ...prev, maxWidth: `${value}px` })),
		},

		height: {
			type: "range",
			value: parseInt(variables.maxHeight, 10),
			label: "Panel Height",
			description: "Maximum height of the dev panel",
			min: 300,
			max: 1000,
			step: 10,
			onChange: (value: number) => setVariables((prev) => ({ ...prev, maxHeight: `${value}px` })),
		},

		// Export Section
		exportSeparator: {
			type: "separator",
			style: "label",
			label: "💾 Export Theme",
		},

		exportCSS: {
			type: "button",
			label: "📋 Copy CSS",
			description: "Copy CSS code to clipboard",
			onClick: async () => {
				const css = generateThemeCSS(variables, themeName);
				const success = await copyToClipboard(css);

				showToast(success ? "CSS copied to clipboard!" : "Failed to copy CSS", success ? "success" : "error");
			},
		},

		exportConfig: {
			type: "button",
			label: "📋 Copy Config",
			description: "Copy TypeScript configuration to clipboard",
			onClick: async () => {
				const config = generateThemeConfig(variables, themeName);
				const success = await copyToClipboard(config);

				showToast(success ? "Config copied to clipboard!" : "Failed to copy config", success ? "success" : "error");
			},
		},

		resetTheme: {
			type: "button",
			label: "🔄 Reset to Dark",
			description: "Reset to default dark theme",
			onClick: () => {
				setVariables(themePresets.dark);
				setThemeName("dark");
				showToast("Reset to dark theme!", "success");
			},
		},
	});

	// Apply theme variables to DOM in real-time
	useEffect(() => {
		applyThemeVariables(variables);
		setTheme("custom");
	}, [variables, setTheme]);

	return (
		<>
			<div
				style={{
					padding: "2rem",
					background: `linear-gradient(135deg, ${variables.backgroundColor} 0%, ${variables.backgroundColorSecondary} 100%)`,
					color: variables.textColor,
					minHeight: "100vh",
					fontFamily: variables.fontFamily,
					fontSize: variables.fontSize,
				}}
			>
				<h1
					style={{
						color: variables.accentColor,
						fontSize: "2.5rem",
						fontWeight: "bold",
						marginBottom: "2rem",
						textAlign: "center",
					}}
				>
					🎨 Theme Builder
				</h1>

				<div
					style={{
						maxWidth: "800px",
						margin: "0 auto",
						padding: "2rem",
						background: variables.surfaceColor,
						borderRadius: variables.borderRadius,
						boxShadow: variables.shadow,
						marginBottom: "2rem",
						border: `1px solid ${variables.borderColor}`,
					}}
				>
					<h2 style={{ color: variables.textColor, marginBottom: "1rem" }}>Live Theme Preview</h2>

					<p style={{ color: variables.textColorMuted, fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
						Use the dev panel on the right to customize every aspect of your theme. Changes are applied in real-time so you can see
						exactly how your theme will look.
					</p>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: `calc(${variables.spacingBase} * 3)` /* Uses lg spacing */,
							marginBottom: `calc(${variables.spacingBase} * 5)` /* Uses 2xl spacing */,
						}}
					>
						<div
							style={{
								padding: `calc(${variables.spacingBase} * 2)` /* Uses md spacing */,
								background: variables.backgroundColor,
								borderRadius: variables.borderRadius,
								border: `1px solid ${variables.borderColorLight}`,
							}}
						>
							<h4 style={{ color: variables.textColor, margin: "0 0 0.5rem 0" }}>Background</h4>

							<p style={{ color: variables.textColorMuted, margin: "0", fontSize: "0.875rem" }}>
								Primary background color for the theme
							</p>
						</div>

						<div
							style={{
								padding: `calc(${variables.spacingBase} * 2)` /* Uses md spacing */,
								background: variables.surfaceColor,
								borderRadius: variables.borderRadius,
								border: `1px solid ${variables.borderColorLight}`,
							}}
						>
							<h4 style={{ color: variables.textColor, margin: "0 0 0.5rem 0" }}>Surface</h4>

							<p style={{ color: variables.textColorMuted, margin: "0", fontSize: "0.875rem" }}>Surface color for cards and panels</p>
						</div>

						<div
							style={{
								padding: `calc(${variables.spacingBase} * 2)` /* Uses md spacing */,
								background: variables.accentColor,
								borderRadius: variables.borderRadius,
								border: `1px solid ${variables.borderColorAccent}`,
								cursor: "pointer",
								transition: "all 0.2s ease",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = variables.accentColorHover;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = variables.accentColor;
							}}
						>
							<h4 style={{ color: variables.textColorOnAccent, margin: "0 0 0.5rem 0" }}>Accent</h4>

							<p style={{ color: variables.textColorOnAccent, margin: "0", fontSize: "0.875rem", opacity: 0.9 }}>
								Primary accent color (hover me!)
							</p>
						</div>
					</div>

					<div
						style={{
							padding: `calc(${variables.spacingBase} * 4)` /* Uses xl spacing */,
							background: variables.foregroundColor,
							borderRadius: variables.borderRadius,
							border: `2px solid ${variables.borderColor}`,
							marginTop: `calc(${variables.spacingBase} * 2)` /* Uses md spacing */,
						}}
					>
						<h3 style={{ color: variables.textColor, margin: "0 0 1rem 0" }}>Theme Configuration Preview</h3>

						<div style={{ marginBottom: "1rem" }}>
							<strong style={{ color: variables.textColorSecondary }}>Theme Name: </strong>

							<span style={{ color: variables.accentColor, fontFamily: "monospace" }}>{themeName}</span>
						</div>

						<div style={{ marginBottom: "1rem" }}>
							<strong style={{ color: variables.textColorSecondary }}>Usage: </strong>

							<code
								style={{
									background: variables.backgroundColor,
									color: variables.textColor,
									padding: "0.25rem 0.5rem",
									borderRadius: "4px",
									fontSize: "0.875rem",
									fontFamily: "monospace",
								}}
							>
								data-dev-panel-theme="{themeName}"
							</code>
						</div>

						<p style={{ color: variables.textColorMuted, fontSize: "0.875rem", margin: "0" }}>
							Use the export buttons in the dev panel to copy the CSS or TypeScript configuration for this theme.
						</p>
					</div>
				</div>
			</div>

			{/* Toast Notification */}
			{toast && (
				<div
					style={{
						position: "fixed",
						top: "20px",
						right: "20px",
						background: toast.type === "success" ? variables.accentColor : "#ef4444",
						color: variables.textColorOnAccent,
						padding: "12px 20px",
						borderRadius: variables.borderRadius,
						boxShadow: variables.shadow,
						fontFamily: variables.fontFamily,
						fontSize: variables.fontSize,
						fontWeight: "500",
						transform: "translateX(0)",
						transition: "all 300ms ease-out",
					}}
				>
					{toast.message}
				</div>
			)}
		</>
	);
}
