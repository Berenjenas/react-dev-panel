# Color Control

Color picker for selecting and managing hex color values.

## Usage

```tsx
{
  type: 'color',
  value: '#ff6200',
  label: 'Brand Color',
  onChange: setColor,
}
```

## Properties

| Property   | Type                      | Default     | Description                |
| ---------- | ------------------------- | ----------- | -------------------------- |
| `type`     | `'color'`                 | —           | Control type               |
| `value`    | `string`                  | —           | Current color (hex format) |
| `onChange` | `(value: string) => void` | —           | Change handler             |
| `label`    | `string`                  | `undefined` | Display label              |
| `disabled` | `boolean`                 | `false`     | Disabled state             |
| `persist`  | `boolean`                 | `false`     | Auto-save to localStorage  |

## Examples

### Theme Colors

```tsx
const [colors, setColors] = useState({
	primary: "#007bff",
	secondary: "#6c757d",
	accent: "#ff6200",
});

useDevPanel("Theme", {
	primary: {
		type: "color",
		value: colors.primary,
		label: "Primary",
		onChange: (value) => setColors((prev) => ({ ...prev, primary: value })),
	},
	secondary: {
		type: "color",
		value: colors.secondary,
		label: "Secondary",
		onChange: (value) => setColors((prev) => ({ ...prev, secondary: value })),
	},
	accent: {
		type: "color",
		value: colors.accent,
		label: "Accent",
		persist: true,
		onChange: (value) => setColors((prev) => ({ ...prev, accent: value })),
	},
});

// Apply to CSS variables
useEffect(() => {
	Object.entries(colors).forEach(([key, value]) => {
		document.documentElement.style.setProperty(`--color-${key}`, value);
	});
}, [colors]);
```

### Gradient Builder

```tsx
const [gradient, setGradient] = useState({
	start: "#ff0000",
	end: "#0000ff",
	direction: "to right",
});

const css = `linear-gradient(${gradient.direction}, ${gradient.start}, ${gradient.end})`;

useDevPanel("Gradient", {
	start: {
		type: "color",
		value: gradient.start,
		label: "Start Color",
		onChange: (value) => setGradient((prev) => ({ ...prev, start: value })),
	},
	end: {
		type: "color",
		value: gradient.end,
		label: "End Color",
		onChange: (value) => setGradient((prev) => ({ ...prev, end: value })),
	},
	direction: {
		type: "select",
		value: gradient.direction,
		label: "Direction",
		options: [
			{ value: "to right", label: "→" },
			{ value: "to bottom", label: "↓" },
			{ value: "to bottom right", label: "↘" },
		],
		onChange: (value) => setGradient((prev) => ({ ...prev, direction: value })),
	},
});
```

### RGB to Hex

```tsx
const [rgb, setRgb] = useState({ r: 255, g: 98, b: 0 });

const toHex = (r: number, g: number, b: number) =>
	`#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

useDevPanel("RGB Mixer", {
	red: {
		type: "range",
		value: rgb.r,
		label: `Red: ${rgb.r}`,
		min: 0,
		max: 255,
		onChange: (value) => setRgb((prev) => ({ ...prev, r: value })),
	},
	green: {
		type: "range",
		value: rgb.g,
		label: `Green: ${rgb.g}`,
		min: 0,
		max: 255,
		onChange: (value) => setRgb((prev) => ({ ...prev, g: value })),
	},
	blue: {
		type: "range",
		value: rgb.b,
		label: `Blue: ${rgb.b}`,
		min: 0,
		max: 255,
		onChange: (value) => setRgb((prev) => ({ ...prev, b: value })),
	},
	result: {
		type: "color",
		value: toHex(rgb.r, rgb.g, rgb.b),
		label: "Result",
		disabled: true,
		onChange: () => {},
	},
});
```

## TypeScript

```tsx
import { ColorControl } from "@berenjena/react-dev-panel";

const control: ColorControl = {
	type: "color",
	value: "#ff6200",
	label: "Brand Color",
	onChange: setColor,
};
```

## Related

-   [Range Control](./RANGE_CONTROL.md) - For color component sliders
-   [Text Control](./TEXT_CONTROL.md) - For hex string input
