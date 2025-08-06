import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeBuilderComponent } from "./utils/ThemeBuilder";
import type { ThemeBuilderProps } from "./utils/ThemeBuilder/types";

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<ThemeBuilderProps> = {
	title: "Theme Builder",
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
# Theme Builder

An interactive theme builder that allows you to create, customize, and export your own themes for the React Dev Panel. 
This tool provides real-time customization of all available CSS custom properties without the bundle size overhead of prebuilt themes.

## Features

- **Live Preview**: See changes instantly as you modify theme variables
- **Complete Control**: Customize every aspect of the panel's appearance including colors, typography, spacing, and layout
- **Export Options**: Generate ready-to-use CSS or TypeScript configurations
- **Copy to Clipboard**: Easily copy theme configurations to integrate into your project
- **Real-time Application**: All changes are applied immediately to see the exact results

## Usage

1. **Customize**: Use the dev panel controls to adjust colors, spacing, typography, and other visual properties
2. **Preview**: See your changes applied in real-time to the theme preview area
3. **Export**: Use the export buttons to copy CSS or TypeScript configurations
4. **Integrate**: Apply the exported code to your project using the \`data-dev-panel-theme\` attribute

## Export Formats

### CSS Export
Generates a complete CSS theme that can be added to your stylesheet:
\`\`\`css
:root[data-dev-panel-theme="my-theme"] {
  --dev-panel-accent-color: #6366f1 !important;
  /* ... all theme variables */
}
\`\`\`

### TypeScript Export
Generates a TypeScript configuration object for programmatic theme management:
\`\`\`typescript
export const MyTheme = {
  name: "my-theme",
  variables: {
    accentColor: "#6366f1",
    // ... all theme variables
  },
};
\`\`\`

## Integration

Apply your custom theme using the \`data-dev-panel-theme\` attribute:
\`\`\`html
<html data-dev-panel-theme="my-custom-theme">
\`\`\`

Or programmatically using the theme management hooks:
\`\`\`typescript
const { setTheme } = useDevPanelTheme();
setTheme("my-custom-theme");
\`\`\`

This approach eliminates the need for prebuilt themes in your bundle while providing maximum customization flexibility.
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

type Story = StoryObj<ThemeBuilderProps>;

export const ThemeBuilder: Story = {
	render: ThemeBuilderComponent,
	args: {
		devPanelTitle: "🎨 Theme Builder",
	},
	parameters: {
		docs: {
			description: {
				story: `
Interactive theme builder for creating custom dev panel themes. This tool allows you to:

**🎨 Customize All Aspects:**
- Color palette (accent, background, surface, text colors)
- Typography (font family, size, spacing)
- Layout properties (border radius, spacing, shadows)
- Input styling (background, borders, text)

**⚡ Real-time Preview:**
- All changes are applied instantly
- Live preview shows exactly how your theme will look
- Interactive elements demonstrate hover states and behaviors

**💾 Export & Share:**
- Copy CSS code ready for production use
- Generate TypeScript configuration objects
- Easy integration with existing projects

**🚀 Bundle Optimization:**
- No prebuilt themes bloating your bundle
- Generate only the themes you need
- Lightweight runtime theme switching

**How to Use:**
1. Adjust theme variables using the dev panel controls
2. See changes applied immediately in the preview area
3. Export your theme using the CSS or Config buttons
4. Integrate the exported code into your project

The generated themes work seamlessly with the existing theme system and can be applied using \`data-dev-panel-theme\` attributes or the theme management hooks.
				`,
			},
		},
	},
};
