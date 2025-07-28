# Color Control

The color control provides a color picker interface for selecting and managing color values in hex format.

## Basic Usage

```tsx
{
  type: 'color',
  value: '#ff6200',
  label: 'Brand Color',
  onChange: setColor,
}
```

## Properties

### Required Properties

| Property   | Type                      | Description                                 |
| ---------- | ------------------------- | ------------------------------------------- |
| `type`     | `'color'`                 | Control type identifier                     |
| `value`    | `string`                  | Current color value in hex format (#rrggbb) |
| `onChange` | `(value: string) => void` | Callback when color changes                 |

### Optional Properties

| Property   | Type      | Default     | Description                     |
| ---------- | --------- | ----------- | ------------------------------- |
| `label`    | `string`  | `undefined` | Display label for the control   |
| `disabled` | `boolean` | `false`     | Whether the control is disabled |

## Event Handling

Color controls always use `onChange` event handling for immediate color preview.

```tsx
{
  type: 'color',
  value: backgroundColor,
  label: 'Background Color',
  onChange: setBackgroundColor, // Triggered immediately on color change
}
```

## Common Patterns

### Theme Color Management

```tsx
const [themeColors, setThemeColors] = useState({
	primary: "#007bff",
	secondary: "#6c757d",
	success: "#28a745",
	danger: "#dc3545",
	warning: "#ffc107",
	info: "#17a2b8",
});

useDevPanel("Theme Colors", {
	primary: {
		type: "color",
		value: themeColors.primary,
		label: "Primary Color",
		onChange: (value) => setThemeColors((prev) => ({ ...prev, primary: value })),
	},
	secondary: {
		type: "color",
		value: themeColors.secondary,
		label: "Secondary Color",
		onChange: (value) => setThemeColors((prev) => ({ ...prev, secondary: value })),
	},
	success: {
		type: "color",
		value: themeColors.success,
		label: "Success Color",
		onChange: (value) => setThemeColors((prev) => ({ ...prev, success: value })),
	},
	danger: {
		type: "color",
		value: themeColors.danger,
		label: "Danger Color",
		onChange: (value) => setThemeColors((prev) => ({ ...prev, danger: value })),
	},
});

// Apply colors to CSS custom properties
useEffect(() => {
	const root = document.documentElement;
	Object.entries(themeColors).forEach(([key, value]) => {
		root.style.setProperty(`--color-${key}`, value);
	});
}, [themeColors]);
```

### UI Component Styling

```tsx
const [buttonStyle, setButtonStyle] = useState({
	backgroundColor: "#007bff",
	borderColor: "#007bff",
	textColor: "#ffffff",
});

const [isHovered, setIsHovered] = useState(false);

useDevPanel("Button Styling", {
	backgroundColor: {
		type: "color",
		value: buttonStyle.backgroundColor,
		label: "Background Color",
		onChange: (value) => setButtonStyle((prev) => ({ ...prev, backgroundColor: value })),
	},
	borderColor: {
		type: "color",
		value: buttonStyle.borderColor,
		label: "Border Color",
		onChange: (value) => setButtonStyle((prev) => ({ ...prev, borderColor: value })),
	},
	textColor: {
		type: "color",
		value: buttonStyle.textColor,
		label: "Text Color",
		onChange: (value) => setButtonStyle((prev) => ({ ...prev, textColor: value })),
	},
	separator: { type: "separator", style: "label", label: "Preview" },
	preview: {
		type: "button",
		label: "Preview Button",
		onClick: () => console.log("Button clicked!"),
	},
});

// Apply styles to preview button
const buttonStyles = {
	backgroundColor: buttonStyle.backgroundColor,
	borderColor: buttonStyle.borderColor,
	color: buttonStyle.textColor,
	border: `2px solid ${buttonStyle.borderColor}`,
	padding: "8px 16px",
	borderRadius: "4px",
	cursor: "pointer",
	transition: "all 0.2s ease",
	opacity: isHovered ? 0.8 : 1,
};
```

### Chart/Graph Color Schemes

```tsx
const [chartColors, setChartColors] = useState(["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]);

const addColor = () => {
	setChartColors((prev) => [...prev, "#" + Math.floor(Math.random() * 16777215).toString(16)]);
};

const removeColor = (index: number) => {
	setChartColors((prev) => prev.filter((_, i) => i !== index));
};

const controls: any = {};

chartColors.forEach((color, index) => {
	controls[`color${index}`] = {
		type: "color",
		value: color,
		label: `Color ${index + 1}`,
		onChange: (value: string) => {
			setChartColors((prev) => prev.map((c, i) => (i === index ? value : c)));
		},
	};
});

controls.separator = { type: "separator" };
controls.addColor = {
	type: "button",
	label: "Add Color",
	onClick: addColor,
};

if (chartColors.length > 1) {
	controls.removeColor = {
		type: "button",
		label: "Remove Last Color",
		onClick: () => removeColor(chartColors.length - 1),
	};
}

useDevPanel("Chart Colors", controls);
```

### Gradient Builder

```tsx
const [gradient, setGradient] = useState({
	color1: "#ff0000",
	color2: "#0000ff",
	direction: "to right",
});

const gradientCSS = `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`;

useDevPanel("Gradient Builder", {
	color1: {
		type: "color",
		value: gradient.color1,
		label: "Start Color",
		onChange: (value) => setGradient((prev) => ({ ...prev, color1: value })),
	},
	color2: {
		type: "color",
		value: gradient.color2,
		label: "End Color",
		onChange: (value) => setGradient((prev) => ({ ...prev, color2: value })),
	},
	direction: {
		type: "select",
		value: gradient.direction,
		label: "Direction",
		options: [
			{ label: "Left to Right", value: "to right" },
			{ label: "Top to Bottom", value: "to bottom" },
			{ label: "Diagonal ↘", value: "to bottom right" },
			{ label: "Diagonal ↙", value: "to bottom left" },
		],
		onChange: (value) => setGradient((prev) => ({ ...prev, direction: value })),
	},
	separator: { type: "separator", style: "label", label: "Preview" },
	cssOutput: {
		type: "text",
		value: gradientCSS,
		label: "CSS Value",
		disabled: true,
		onChange: () => {},
	},
});

// Preview element
const previewStyle = {
	background: gradientCSS,
	width: "100%",
	height: "60px",
	borderRadius: "4px",
	margin: "8px 0",
};
```

### Color Palette Generator

```tsx
const [baseColor, setBaseColor] = useState("#3498db");

// Helper function to generate color variations
const generatePalette = (baseHex: string) => {
	const hex = baseHex.replace("#", "");
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	const lighten = (amount: number) => {
		const newR = Math.min(255, Math.floor(r + (255 - r) * amount));
		const newG = Math.min(255, Math.floor(g + (255 - g) * amount));
		const newB = Math.min(255, Math.floor(b + (255 - b) * amount));
		return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
	};

	const darken = (amount: number) => {
		const newR = Math.floor(r * (1 - amount));
		const newG = Math.floor(g * (1 - amount));
		const newB = Math.floor(b * (1 - amount));
		return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
	};

	return {
		lighter: lighten(0.3),
		light: lighten(0.15),
		base: baseHex,
		dark: darken(0.15),
		darker: darken(0.3),
	};
};

const palette = generatePalette(baseColor);

useDevPanel("Color Palette", {
	baseColor: {
		type: "color",
		value: baseColor,
		label: "Base Color",
		onChange: setBaseColor,
	},
	separator: { type: "separator", style: "label", label: "Generated Palette" },
	lighter: {
		type: "color",
		value: palette.lighter,
		label: "Lighter",
		disabled: true,
		onChange: () => {},
	},
	light: {
		type: "color",
		value: palette.light,
		label: "Light",
		disabled: true,
		onChange: () => {},
	},
	base: {
		type: "color",
		value: palette.base,
		label: "Base",
		disabled: true,
		onChange: () => {},
	},
	dark: {
		type: "color",
		value: palette.dark,
		label: "Dark",
		disabled: true,
		onChange: () => {},
	},
	darker: {
		type: "color",
		value: palette.darker,
		label: "Darker",
		disabled: true,
		onChange: () => {},
	},
});
```

## Advanced Features

### Color Format Conversion

```tsx
const [color, setColor] = useState("#ff6200");

// Helper functions for color conversion
const hexToRgb = (hex: string) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
};

const hexToHsl = (hex: string) => {
	const rgb = hexToRgb(hex);
	if (!rgb) return null;

	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
};

const rgb = hexToRgb(color);
const hsl = hexToHsl(color);

useDevPanel("Color Formats", {
	colorPicker: {
		type: "color",
		value: color,
		label: "Pick Color",
		onChange: setColor,
	},
	separator: { type: "separator", style: "label", label: "Format Outputs" },
	hex: {
		type: "text",
		value: color.toUpperCase(),
		label: "HEX",
		disabled: true,
		onChange: () => {},
	},
	rgb: {
		type: "text",
		value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid",
		label: "RGB",
		disabled: true,
		onChange: () => {},
	},
	hsl: {
		type: "text",
		value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid",
		label: "HSL",
		disabled: true,
		onChange: () => {},
	},
});
```

## Styling

Color controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 24px; /* Control height */
	--dev-panel-border-color: #333333; /* Border color */
	--dev-panel-border-radius: 4px; /* Border radius */
}
```

### Custom Color Control Styling

```css
/* Target color controls specifically */
.dev-panel-color-control {
	--dev-panel-inputs-height: 32px;
}

/* Color picker input styling */
.dev-panel-color-control input[type="color"] {
	width: 100%;
	height: var(--dev-panel-inputs-height);
	border: 1px solid var(--dev-panel-border-color);
	border-radius: var(--dev-panel-border-radius);
	cursor: pointer;
	background: none;
	padding: 0;
}

/* Remove default browser styling */
.dev-panel-color-control input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}

.dev-panel-color-control input[type="color"]::-webkit-color-swatch {
	border: none;
	border-radius: calc(var(--dev-panel-border-radius) - 1px);
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Enter/Space**: Open color picker
-   **Escape**: Close color picker

### Screen Reader Support

-   Announces current color value
-   Provides proper labeling
-   Supports color picker navigation

### Best Practices

```tsx
// ✅ Good: Descriptive labels with context
{
  type: 'color',
  value: backgroundColor,
  label: 'Background Color',
  onChange: setBackgroundColor,
}

// ✅ Good: Show current value in label
{
  type: 'color',
  value: accentColor,
  label: `Accent Color (${accentColor})`,
  onChange: setAccentColor,
}

// ❌ Avoid: Generic labels
{
  type: 'color',
  value: color,
  label: 'Color',
  onChange: setColor,
}
```

## TypeScript

The color control provides full TypeScript support:

```tsx
import { ColorControl } from "@berenjena/react-dev-panel";

interface ThemeColors {
	primary: string;
	secondary: string;
	accent: string;
}

const [theme, setTheme] = useState<ThemeColors>({
	primary: "#007bff",
	secondary: "#6c757d",
	accent: "#ff6200",
});

useDevPanel("Theme", {
	primary: {
		type: "color",
		value: theme.primary,
		label: "Primary Color",
		onChange: (value: string) => setTheme((prev) => ({ ...prev, primary: value })),
	} satisfies ColorControl,
});
```

## Performance Considerations

### Debouncing Color Changes

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

const [color, setColor] = useState("#ff6200");

// Expensive operation like updating CSS variables
const updateCSSVariables = useDebounceCallback((newColor: string) => {
	document.documentElement.style.setProperty("--primary-color", newColor);
	// Other expensive DOM operations
}, 100);

useDevPanel("Performance", {
	color: {
		type: "color",
		value: color,
		label: "Primary Color",
		onChange: (value: string) => {
			setColor(value); // Immediate UI update
			updateCSSVariables(value); // Debounced expensive operation
		},
	},
});
```

## Related Controls

-   **[Text Control](./TEXT_CONTROL.md)** - For hex/color string input
-   **[Select Control](./SELECT_CONTROL.md)** - For predefined color options
-   **[Range Control](./RANGE_CONTROL.md)** - For color component sliders
