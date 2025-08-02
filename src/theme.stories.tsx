import type { Meta, StoryObj } from "@storybook/react-vite";

import { useDevPanel } from "./hooks/useDevPanel";
import { useDevPanelTheme } from "./store/ThemeStore";
import { DevPanel } from "./components";

type ThemeShowcaseProps = {
	devPanelTitle?: string;
};

// =============================================================================
// Theme Variables Showcase
// =============================================================================

// =============================================================================
// Pre-built Theme Demos
// =============================================================================

// Pre-built theme definitions mapped to data-dev-panel-theme values
const THEME_PRESETS = {
	auto: {
		name: "🔄 Auto (System)",
		description: "Automatically follows system light/dark preference",
		themeKey: "", // Empty string removes the attribute
		colors: {
			accent: "#6366f1",
			background: "#1e293b", // Will be overridden by system preference
			surface: "#334155",
			text: "#f1f5f9",
			textMuted: "#94a3b8",
		},
	},
	dark: {
		name: "🌙 Default Dark",
		description: "The default dark theme with indigo accents",
		themeKey: "dark",
		colors: {
			accent: "#6366f1",
			background: "#1e293b",
			surface: "#334155",
			text: "#f1f5f9",
			textMuted: "#94a3b8",
		},
	},
	light: {
		name: "☀️ Light",
		description: "Clean light theme with blue accents",
		themeKey: "light",
		colors: {
			accent: "#3b82f6",
			background: "#f8fafc",
			surface: "#ffffff",
			text: "#0f172a",
			textMuted: "#64748b",
		},
	},
	orange: {
		name: "🔥 Orange Flame",
		description: "Vibrant orange theme with warm tones",
		themeKey: "orange",
		colors: {
			accent: "#ff6200",
			background: "#1a1a1a",
			surface: "#2a2a2a",
			text: "#ffffff",
			textMuted: "#cccccc",
		},
	},
	purple: {
		name: "💜 Purple Magic",
		description: "Mystical purple theme with rich gradients",
		themeKey: "purple",
		colors: {
			accent: "#8b5cf6",
			background: "#1e1b4b",
			surface: "#312e81",
			text: "#f3f4f6",
			textMuted: "#d1d5db",
		},
	},
	green: {
		name: "🌿 Nature Green",
		description: "Fresh green theme inspired by nature",
		themeKey: "green",
		colors: {
			accent: "#10b981",
			background: "#064e3b",
			surface: "#065f46",
			text: "#ecfdf5",
			textMuted: "#a7f3d0",
		},
	},
	neon: {
		name: "⚡ Neon Cyber",
		description: "Futuristic neon theme with bright accents",
		themeKey: "neon",
		colors: {
			accent: "#00ff41",
			background: "#0a0a0a",
			surface: "#111111",
			text: "#00ff41",
			textMuted: "#00cc33",
		},
	},
	corporate: {
		name: "🏢 Corporate Blue",
		description: "Professional corporate theme",
		themeKey: "corporate",
		colors: {
			accent: "#0066cc",
			background: "#f8f9fa",
			surface: "#ffffff",
			text: "#212529",
			textMuted: "#6c757d",
		},
	},
	highContrast: {
		name: "♿ High Contrast",
		description: "Accessibility-focused high contrast theme",
		themeKey: "high-contrast",
		colors: {
			accent: "#ffff00",
			background: "#000000",
			surface: "#1a1a1a",
			text: "#ffffff",
			textMuted: "#cccccc",
		},
	},
	sunset: {
		name: "🌅 Sunset",
		description: "Warm sunset colors with orange and pink gradients",
		themeKey: "sunset",
		colors: {
			accent: "#ff8a65",
			background: "#1a0e0a",
			surface: "#2d1b14",
			text: "#ffeaa7",
			textMuted: "#fab1a0",
		},
	},
	ocean: {
		name: "🌊 Ocean Blue",
		description: "Deep ocean blues with aqua accents",
		themeKey: "ocean",
		colors: {
			accent: "#00acc1",
			background: "#0d1b2a",
			surface: "#1b263b",
			text: "#a8dadc",
			textMuted: "#457b9d",
		},
	},
	forest: {
		name: "🌲 Forest",
		description: "Natural forest greens with earthy tones",
		themeKey: "forest",
		colors: {
			accent: "#52b788",
			background: "#081c15",
			surface: "#1b4332",
			text: "#d8f3dc",
			textMuted: "#95d5b2",
		},
	},
	midnight: {
		name: "🌌 Midnight",
		description: "Deep midnight blue with silver accents",
		themeKey: "midnight",
		colors: {
			accent: "#7c3aed",
			background: "#0f0f23",
			surface: "#1e1e3f",
			text: "#e2e8f0",
			textMuted: "#94a3b8",
		},
	},
	cherry: {
		name: "🍒 Cherry Blossom",
		description: "Soft cherry blossom pink with warm undertones",
		themeKey: "cherry",
		colors: {
			accent: "#ec4899",
			background: "#fdf2f8",
			surface: "#f9a8d4",
			text: "#831843",
			textMuted: "#be185d",
		},
	},
	gold: {
		name: "✨ Gold Luxury",
		description: "Elegant gold and black luxury theme",
		themeKey: "gold",
		colors: {
			accent: "#fbbf24",
			background: "#111827",
			surface: "#1f2937",
			text: "#f9fafb",
			textMuted: "#d1d5db",
		},
	},
	retro: {
		name: "📺 Retro Terminal",
		description: "Classic green-on-black terminal aesthetic",
		themeKey: "retro",
		colors: {
			accent: "#00ff00",
			background: "#000000",
			surface: "#1a1a1a",
			text: "#00ff00",
			textMuted: "#00cc00",
		},
	},
	pastel: {
		name: "🎨 Pastel Dreams",
		description: "Soft pastel colors for a gentle interface",
		themeKey: "pastel",
		colors: {
			accent: "#a78bfa",
			background: "#fef7ff",
			surface: "#f3e8ff",
			text: "#581c87",
			textMuted: "#7c3aed",
		},
	},
	cyberpunk: {
		name: "🤖 Cyberpunk",
		description: "Futuristic cyberpunk with neon pink and cyan",
		themeKey: "cyberpunk",
		colors: {
			accent: "#ff0080",
			background: "#0a0014",
			surface: "#1a0033",
			text: "#00ffff",
			textMuted: "#ff0080",
		},
	},
	autumn: {
		name: "🍂 Autumn Leaves",
		description: "Warm autumn colors with rust and amber tones",
		themeKey: "autumn",
		colors: {
			accent: "#d97706",
			background: "#1c1917",
			surface: "#292524",
			text: "#fbbf24",
			textMuted: "#f59e0b",
		},
	},
	arctic: {
		name: "❄️ Arctic",
		description: "Cool arctic theme with ice blue tones",
		themeKey: "arctic",
		colors: {
			accent: "#38bdf8",
			background: "#f0f9ff",
			surface: "#e0f2fe",
			text: "#0c4a6e",
			textMuted: "#0369a1",
		},
	},
	volcano: {
		name: "🌋 Volcano",
		description: "Fiery volcano theme with red and orange lava",
		themeKey: "volcano",
		colors: {
			accent: "#dc2626",
			background: "#1f1410",
			surface: "#451a03",
			text: "#fed7aa",
			textMuted: "#fb923c",
		},
	},
} as const;

/**
 * Showcase of pre-built theme presets with easy switching
 */
function ThemePresetsComponent(props: ThemeShowcaseProps) {
	const { currentTheme: activeThemeKey, setTheme } = useDevPanelTheme();

	// Theme selector
	useDevPanel("🎨 Theme Presets", {
		activeTheme: {
			type: "select",
			value: activeThemeKey,
			label: "Choose Theme",
			options: Object.entries(THEME_PRESETS).map(([key, theme]) => ({
				label: theme.name,
				value: key,
			})),
			description: "Select from pre-built theme presets",
			onChange: (value: string) => setTheme(value),
		},

		themeSeparator: {
			type: "separator",
			style: "label",
			label: "Quick Actions",
		},

		applySystemTheme: {
			type: "button",
			label: "🔄 Auto Theme",
			description: "Let system preference control the theme",
			onClick: () => {
				setTheme("auto");
			},
		},

		resetTheme: {
			type: "button",
			label: "🏠 Reset to Default",
			description: "Reset to the default dark theme",
			onClick: () => setTheme("dark"),
		},
	});

	const currentTheme = THEME_PRESETS[activeThemeKey as keyof typeof THEME_PRESETS];

	return (
		<>
			<div
				style={{
					padding: "2rem",
					background: `linear-gradient(135deg, ${currentTheme.colors.background} 0%, ${currentTheme.colors.surface} 100%)`,
					color: currentTheme.colors.text,
					minHeight: "100vh",
					fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
				}}
			>
				<h1
					style={{
						color: currentTheme.colors.accent,
						fontSize: "2.5rem",
						fontWeight: "bold",
						marginBottom: "2rem",
						textAlign: "center",
					}}
				>
					{currentTheme.name}
				</h1>

				<div
					style={{
						maxWidth: "800px",
						margin: "0 auto",
						padding: "2rem",
						background: currentTheme.colors.surface,
						borderRadius: "12px",
						boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
						marginBottom: "2rem",
					}}
				>
					<h2 style={{ color: currentTheme.colors.text, marginBottom: "1rem" }}>Theme Description</h2>

					<p style={{ color: currentTheme.colors.textMuted, fontSize: "1.1rem", lineHeight: "1.6" }}>{currentTheme.description}</p>

					<h3 style={{ color: currentTheme.colors.text, marginTop: "2rem", marginBottom: "1rem" }}>Color Palette</h3>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
							gap: "1rem",
						}}
					>
						{Object.entries(currentTheme.colors).map(([name, color]) => (
							<div key={name} style={{ textAlign: "center" }}>
								<div
									style={{
										width: "100%",
										height: "80px",
										backgroundColor: color,
										borderRadius: "8px",
										marginBottom: "0.5rem",
										boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
									}}
								/>
								<div style={{ fontSize: "0.875rem", color: currentTheme.colors.textMuted, textTransform: "capitalize" }}>
									{name.replace(/([A-Z])/g, " $1")}
								</div>
								<div style={{ fontSize: "0.75rem", color: currentTheme.colors.textMuted, fontFamily: "monospace" }}>{color}</div>
							</div>
						))}
					</div>
				</div>

				{/* Theme Preview Grid */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: "1.5rem",
						maxWidth: "1200px",
						margin: "0 auto",
					}}
				>
					{Object.entries(THEME_PRESETS).map(([key, theme]) => (
						<div
							key={key}
							style={{
								padding: "1rem",
								background: theme.colors.surface,
								borderRadius: "8px",
								border: activeThemeKey === key ? `2px solid ${theme.colors.accent}` : `2px solid ${theme.colors.textMuted}30`,
								cursor: "pointer",
								transition: "all 0.2s ease",
								transform: activeThemeKey === key ? "scale(1.02)" : "scale(1)",
								boxShadow: activeThemeKey === key ? `0 8px 20px ${theme.colors.accent}30` : "0 2px 8px rgba(0, 0, 0, 0.1)",
							}}
							onClick={() => setTheme(key)}
						>
							<h4 style={{ color: theme.colors.text, margin: "0 0 0.5rem 0", fontSize: "1rem" }}>{theme.name}</h4>

							<p style={{ color: theme.colors.textMuted, margin: "0", fontSize: "0.875rem", lineHeight: "1.4" }}>{theme.description}</p>

							<div
								style={{
									display: "flex",
									gap: "4px",
									marginTop: "1rem",
								}}
							>
								{Object.values(theme.colors).map((color, index) => (
									<div
										key={index}
										style={{
											width: "12px",
											height: "12px",
											backgroundColor: color,
											borderRadius: "2px",
										}}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<DevPanel panelTitle={props.devPanelTitle} />
		</>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<ThemeShowcaseProps> = {
	title: "Theming/Theme Showcase",
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
# Theme Showcase

This showcase demonstrates the comprehensive theming capabilities of the React Dev Panel. 
It includes real-time customization of all available CSS custom properties and pre-built theme presets.

## Features

- **Complete Variable Control**: Customize every aspect of the panel's appearance
- **Real-time Updates**: See changes instantly as you modify variables
- **Pre-built Themes**: Switch between professionally designed theme presets using \`data-dev-panel-theme\` attributes
- **Theme Mode Support**: Automatic light/dark switching or manual override via data attributes
- **Typography Control**: Font family, sizes, weights, and spacing
- **Color System**: Full control over all color tokens and semantic colors
- **Layout & Spacing**: Adjust spacing scales, border radius, and component sizes
- **Visual Effects**: Control shadows, opacity, and animations
- **Accessibility**: High contrast themes and reduced motion support

## CSS Custom Properties

The dev panel uses CSS custom properties (variables) for complete theming control. 
All variables are prefixed with \`--dev-panel-\` and can be overridden at the root level 
or targeted to specific components.

## Theme Mode Control

Themes are controlled using the \`data-dev-panel-theme\` attribute on the document root:
- **Auto**: No attribute (follows system preference)
- **Light**: \`data-dev-panel-theme="light"\`
- **Dark**: \`data-dev-panel-theme="dark"\`
- **Custom Themes**: \`data-dev-panel-theme="theme-name"\` (e.g., "orange", "neon", "cyberpunk")

This integrates seamlessly with the SCSS theme system for consistent styling across all components.
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

type Story = StoryObj<ThemeShowcaseProps>;

export const PrebuiltThemes: Story = {
	render: (args) => <ThemePresetsComponent {...args} />,
	args: {
		devPanelTitle: "🎨 Theme Presets",
	},
	parameters: {
		docs: {
			description: {
				story: `
Showcase of pre-built theme presets that demonstrate different visual styles and use cases.
Each theme is carefully designed for specific scenarios and accessibility requirements.
Themes are applied using the \`data-dev-panel-theme\` attribute which integrates with the SCSS theme system.

**Available Themes:**
- **Auto (System)**: Automatically follows system light/dark preference
- **Default Dark**: Classic dark theme with indigo accents
- **Light**: Clean light theme for bright environments  
- **Orange Flame**: Vibrant orange theme with warm tones
- **Purple Magic**: Mystical purple with rich gradients
- **Nature Green**: Fresh green inspired by nature
- **Neon Cyber**: Futuristic theme with bright neon accents
- **Corporate Blue**: Professional business theme
- **High Contrast**: Accessibility-focused high contrast theme
- **Sunset**: Warm sunset colors with orange and pink gradients
- **Ocean Blue**: Deep ocean blues with aqua accents
- **Forest**: Natural forest greens with earthy tones
- **Midnight**: Deep midnight blue with silver accents
- **Cherry Blossom**: Soft cherry blossom pink with warm undertones
- **Gold Luxury**: Elegant gold and black luxury theme
- **Retro Terminal**: Classic green-on-black terminal aesthetic
- **Pastel Dreams**: Soft pastel colors for a gentle interface
- **Cyberpunk**: Futuristic cyberpunk with neon pink and cyan
- **Autumn Leaves**: Warm autumn colors with rust and amber tones
- **Arctic**: Cool arctic theme with ice blue tones
- **Volcano**: Fiery volcano theme with red and orange lava

Click on any theme card to apply it instantly using the proper \`data-dev-panel-theme\` attribute.
The themes are defined in the SCSS theme system and provide complete visual consistency.
				`,
			},
		},
	},
};
