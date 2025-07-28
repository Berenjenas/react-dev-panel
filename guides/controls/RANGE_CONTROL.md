# Range Control

The range control provides a slider interface for selecting numeric values within a specified range with visual feedback.

## Basic Usage

```tsx
{
  type: 'range',
  value: 50,
  label: 'Volume',
  min: 0,
  max: 100,
  onChange: setValue,
}
```

## Properties

### Required Properties

| Property   | Type                      | Description                 |
| ---------- | ------------------------- | --------------------------- |
| `type`     | `'range'`                 | Control type identifier     |
| `value`    | `number`                  | Current numeric value       |
| `onChange` | `(value: number) => void` | Callback when value changes |

### Optional Properties

| Property   | Type      | Default     | Description                     |
| ---------- | --------- | ----------- | ------------------------------- |
| `label`    | `string`  | `undefined` | Display label for the control   |
| `min`      | `number`  | `0`         | Minimum allowed value           |
| `max`      | `number`  | `100`       | Maximum allowed value           |
| `step`     | `number`  | `1`         | Step increment for slider       |
| `disabled` | `boolean` | `false`     | Whether the control is disabled |

## Event Handling

Range controls always use `onChange` event handling for smooth slider interaction.

```tsx
{
  type: 'range',
  value: opacity,
  label: 'Opacity',
  min: 0,
  max: 1,
  step: 0.1,
  onChange: setOpacity, // Triggered on every slider movement
}
```

## Common Patterns

### Volume/Audio Controls

```tsx
const [audioSettings, setAudioSettings] = useState({
	volume: 75,
	bass: 0,
	treble: 0,
	balance: 0,
});

useDevPanel("Audio Controls", {
	volume: {
		type: "range",
		value: audioSettings.volume,
		label: `Volume: ${audioSettings.volume}%`,
		min: 0,
		max: 100,
		step: 1,
		onChange: (value) => setAudioSettings((prev) => ({ ...prev, volume: value })),
	},
	bass: {
		type: "range",
		value: audioSettings.bass,
		label: `Bass: ${audioSettings.bass > 0 ? "+" : ""}${audioSettings.bass}dB`,
		min: -10,
		max: 10,
		step: 1,
		onChange: (value) => setAudioSettings((prev) => ({ ...prev, bass: value })),
	},
	treble: {
		type: "range",
		value: audioSettings.treble,
		label: `Treble: ${audioSettings.treble > 0 ? "+" : ""}${audioSettings.treble}dB`,
		min: -10,
		max: 10,
		step: 1,
		onChange: (value) => setAudioSettings((prev) => ({ ...prev, treble: value })),
	},
	balance: {
		type: "range",
		value: audioSettings.balance,
		label: `Balance: ${
			audioSettings.balance === 0 ? "Center" : audioSettings.balance > 0 ? `R${audioSettings.balance}` : `L${Math.abs(audioSettings.balance)}`
		}`,
		min: -10,
		max: 10,
		step: 1,
		onChange: (value) => setAudioSettings((prev) => ({ ...prev, balance: value })),
	},
});
```

### Animation Controls

```tsx
const [animation, setAnimation] = useState({
	duration: 300,
	delay: 0,
	iterations: 1,
	progress: 0,
});

const [isPlaying, setIsPlaying] = useState(false);

useDevPanel("Animation Controls", {
	duration: {
		type: "range",
		value: animation.duration,
		label: `Duration: ${animation.duration}ms`,
		min: 100,
		max: 2000,
		step: 50,
		onChange: (value) => setAnimation((prev) => ({ ...prev, duration: value })),
	},
	delay: {
		type: "range",
		value: animation.delay,
		label: `Delay: ${animation.delay}ms`,
		min: 0,
		max: 1000,
		step: 50,
		onChange: (value) => setAnimation((prev) => ({ ...prev, delay: value })),
	},
	iterations: {
		type: "range",
		value: animation.iterations,
		label: `Iterations: ${animation.iterations === 0 ? "Infinite" : animation.iterations}`,
		min: 0,
		max: 10,
		step: 1,
		onChange: (value) => setAnimation((prev) => ({ ...prev, iterations: value })),
	},
	separator: { type: "separator", style: "label", label: "Playback" },
	progress: {
		type: "range",
		value: animation.progress,
		label: `Progress: ${Math.round(animation.progress * 100)}%`,
		min: 0,
		max: 1,
		step: 0.01,
		disabled: isPlaying,
		onChange: (value) => setAnimation((prev) => ({ ...prev, progress: value })),
	},
	playToggle: {
		type: "button",
		label: isPlaying ? "Pause" : "Play",
		onClick: () => setIsPlaying(!isPlaying),
	},
});
```

### Image/Filter Controls

```tsx
const [imageFilters, setImageFilters] = useState({
	brightness: 100,
	contrast: 100,
	saturation: 100,
	hue: 0,
	blur: 0,
	sepia: 0,
});

const filterCSS = `
  brightness(${imageFilters.brightness}%)
  contrast(${imageFilters.contrast}%)
  saturate(${imageFilters.saturation}%)
  hue-rotate(${imageFilters.hue}deg)
  blur(${imageFilters.blur}px)
  sepia(${imageFilters.sepia}%)
`;

useDevPanel("Image Filters", {
	brightness: {
		type: "range",
		value: imageFilters.brightness,
		label: `Brightness: ${imageFilters.brightness}%`,
		min: 0,
		max: 200,
		step: 5,
		onChange: (value) => setImageFilters((prev) => ({ ...prev, brightness: value })),
	},
	contrast: {
		type: "range",
		value: imageFilters.contrast,
		label: `Contrast: ${imageFilters.contrast}%`,
		min: 0,
		max: 200,
		step: 5,
		onChange: (value) => setImageFilters((prev) => ({ ...prev, contrast: value })),
	},
	saturation: {
		type: "range",
		value: imageFilters.saturation,
		label: `Saturation: ${imageFilters.saturation}%`,
		min: 0,
		max: 200,
		step: 5,
		onChange: (value) => setImageFilters((prev) => ({ ...prev, saturation: value })),
	},
	hue: {
		type: "range",
		value: imageFilters.hue,
		label: `Hue: ${imageFilters.hue}°`,
		min: 0,
		max: 360,
		step: 5,
		onChange: (value) => setImageFilters((prev) => ({ ...prev, hue: value })),
	},
	blur: {
		type: "range",
		value: imageFilters.blur,
		label: `Blur: ${imageFilters.blur}px`,
		min: 0,
		max: 10,
		step: 0.5,
		onChange: (value) => setImageFilters((prev) => ({ ...prev, blur: value })),
	},
	sepia: {
		type: "range",
		value: imageFilters.sepia,
		label: `Sepia: ${imageFilters.sepia}%`,
		min: 0,
		max: 100,
		step: 5,
		onChange: (value) => setImageFilters((prev) => ({ ...prev, sepia: value })),
	},
	separator: { type: "separator" },
	reset: {
		type: "button",
		label: "Reset Filters",
		onClick: () =>
			setImageFilters({
				brightness: 100,
				contrast: 100,
				saturation: 100,
				hue: 0,
				blur: 0,
				sepia: 0,
			}),
	},
});

// Apply filters to image
const imageStyle = {
	filter: filterCSS,
	transition: "filter 0.2s ease",
};
```

### Performance/Quality Settings

```tsx
const [quality, setQuality] = useState({
	renderQuality: 75,
	particleCount: 100,
	shadowDistance: 50,
	lodBias: 0,
});

const getQualityLabel = (value: number) => {
	if (value <= 25) return "Low";
	if (value <= 50) return "Medium";
	if (value <= 75) return "High";
	return "Ultra";
};

useDevPanel("Quality Settings", {
	renderQuality: {
		type: "range",
		value: quality.renderQuality,
		label: `Render Quality: ${getQualityLabel(quality.renderQuality)} (${quality.renderQuality}%)`,
		min: 0,
		max: 100,
		step: 5,
		onChange: (value) => setQuality((prev) => ({ ...prev, renderQuality: value })),
	},
	particleCount: {
		type: "range",
		value: quality.particleCount,
		label: `Particle Count: ${quality.particleCount}`,
		min: 0,
		max: 500,
		step: 10,
		onChange: (value) => setQuality((prev) => ({ ...prev, particleCount: value })),
	},
	shadowDistance: {
		type: "range",
		value: quality.shadowDistance,
		label: `Shadow Distance: ${quality.shadowDistance}m`,
		min: 10,
		max: 200,
		step: 5,
		onChange: (value) => setQuality((prev) => ({ ...prev, shadowDistance: value })),
	},
	lodBias: {
		type: "range",
		value: quality.lodBias,
		label: `LOD Bias: ${quality.lodBias > 0 ? "+" : ""}${quality.lodBias}`,
		min: -2,
		max: 2,
		step: 0.1,
		onChange: (value) => setQuality((prev) => ({ ...prev, lodBias: value })),
	},
});
```

### Data Visualization Controls

```tsx
const [chartSettings, setChartSettings] = useState({
	dataPoints: 50,
	smoothing: 0.3,
	zoom: 1,
	timeRange: 24,
});

useDevPanel("Chart Controls", {
	dataPoints: {
		type: "range",
		value: chartSettings.dataPoints,
		label: `Data Points: ${chartSettings.dataPoints}`,
		min: 10,
		max: 1000,
		step: 10,
		onChange: (value) => setChartSettings((prev) => ({ ...prev, dataPoints: value })),
	},
	smoothing: {
		type: "range",
		value: chartSettings.smoothing,
		label: `Smoothing: ${Math.round(chartSettings.smoothing * 100)}%`,
		min: 0,
		max: 1,
		step: 0.1,
		onChange: (value) => setChartSettings((prev) => ({ ...prev, smoothing: value })),
	},
	zoom: {
		type: "range",
		value: chartSettings.zoom,
		label: `Zoom: ${chartSettings.zoom}x`,
		min: 0.1,
		max: 5,
		step: 0.1,
		onChange: (value) => setChartSettings((prev) => ({ ...prev, zoom: value })),
	},
	timeRange: {
		type: "range",
		value: chartSettings.timeRange,
		label: `Time Range: ${chartSettings.timeRange}h`,
		min: 1,
		max: 168, // 1 week
		step: 1,
		onChange: (value) => setChartSettings((prev) => ({ ...prev, timeRange: value })),
	},
});
```

## Advanced Features

### Custom Step Functions

```tsx
const [volume, setVolume] = useState(50);

// Custom logarithmic scale for volume
const volumeToDecibels = (value: number) => {
	if (value === 0) return -Infinity;
	return 20 * Math.log10(value / 100);
};

const decibelsToVolume = (db: number) => {
	if (db === -Infinity) return 0;
	return Math.round(100 * Math.pow(10, db / 20));
};

useDevPanel("Audio (Advanced)", {
	volume: {
		type: "range",
		value: volume,
		label: `Volume: ${volume}% (${volumeToDecibels(volume).toFixed(1)}dB)`,
		min: 0,
		max: 100,
		step: 1,
		onChange: setVolume,
	},
});
```

### Linked Controls

```tsx
const [rgbColor, setRgbColor] = useState({
	r: 255,
	g: 98,
	b: 0,
});

const rgbToHex = (r: number, g: number, b: number) => {
	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);

useDevPanel("RGB Color Mixer", {
	red: {
		type: "range",
		value: rgbColor.r,
		label: `Red: ${rgbColor.r}`,
		min: 0,
		max: 255,
		step: 1,
		onChange: (value) => setRgbColor((prev) => ({ ...prev, r: value })),
	},
	green: {
		type: "range",
		value: rgbColor.g,
		label: `Green: ${rgbColor.g}`,
		min: 0,
		max: 255,
		step: 1,
		onChange: (value) => setRgbColor((prev) => ({ ...prev, g: value })),
	},
	blue: {
		type: "range",
		value: rgbColor.b,
		label: `Blue: ${rgbColor.b}`,
		min: 0,
		max: 255,
		step: 1,
		onChange: (value) => setRgbColor((prev) => ({ ...prev, b: value })),
	},
	separator: { type: "separator", style: "label", label: "Result" },
	hexColor: {
		type: "color",
		value: hexColor,
		label: "Color Preview",
		disabled: true,
		onChange: () => {},
	},
	hexValue: {
		type: "text",
		value: hexColor.toUpperCase(),
		label: "Hex Value",
		disabled: true,
		onChange: () => {},
	},
});
```

## Styling

Range controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 24px; /* Control height */
	--dev-panel-accent-color: #ff6200; /* Slider track color */
	--dev-panel-background-color: #1a1a1a; /* Background */
	--dev-panel-border-color: #333333; /* Track background */
}
```

### Custom Range Styling

```css
/* Target range controls specifically */
.dev-panel-range-control {
	--dev-panel-inputs-height: 32px;
	--dev-panel-accent-color: #28a745; /* Green slider */
}

/* Slider track */
.dev-panel-range-control input[type="range"] {
	width: 100%;
	height: var(--dev-panel-inputs-height);
	background: transparent;
	cursor: pointer;
}

/* Track styling */
.dev-panel-range-control input[type="range"]::-webkit-slider-track {
	height: 4px;
	background: var(--dev-panel-border-color);
	border-radius: 2px;
}

/* Thumb styling */
.dev-panel-range-control input[type="range"]::-webkit-slider-thumb {
	appearance: none;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: var(--dev-panel-accent-color);
	cursor: pointer;
	border: 2px solid var(--dev-panel-background-color);
}

/* Focus states */
.dev-panel-range-control input[type="range"]:focus::-webkit-slider-thumb {
	outline: 2px solid var(--dev-panel-accent-color);
	outline-offset: 2px;
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Arrow Left/Down**: Decrease value by step
-   **Arrow Right/Up**: Increase value by step
-   **Home**: Set to minimum value
-   **End**: Set to maximum value
-   **Page Up**: Increase by larger step
-   **Page Down**: Decrease by larger step

### Screen Reader Support

-   Announces current value and range
-   Provides proper role and orientation
-   Supports aria-valuenow, aria-valuemin, aria-valuemax

### Best Practices

```tsx
// ✅ Good: Clear value indication in label
{
  type: 'range',
  value: opacity,
  label: `Opacity: ${Math.round(opacity * 100)}%`,
  min: 0,
  max: 1,
  step: 0.01,
  onChange: setOpacity,
}

// ✅ Good: Meaningful range and steps
{
  type: 'range',
  value: fontSize,
  label: `Font Size: ${fontSize}px`,
  min: 12,
  max: 72,
  step: 2,
  onChange: setFontSize,
}

// ❌ Avoid: Unclear value representation
{
  type: 'range',
  value: value,
  label: 'Value',
  onChange: setValue,
}
```

## TypeScript

The range control provides full TypeScript support:

```tsx
import { RangeControl } from "@berenjena/react-dev-panel";

interface SliderSettings {
	volume: number;
	brightness: number;
	contrast: number;
}

const [settings, setSettings] = useState<SliderSettings>({
	volume: 75,
	brightness: 50,
	contrast: 100,
});

useDevPanel("Slider Settings", {
	volume: {
		type: "range",
		value: settings.volume,
		label: `Volume: ${settings.volume}%`,
		min: 0,
		max: 100,
		step: 5,
		onChange: (value: number) => setSettings((prev) => ({ ...prev, volume: value })),
	} satisfies RangeControl,
});
```

## Performance Considerations

### Throttling High-Frequency Updates

```tsx
import { useThrottle } from "react-use";

const [position, setPosition] = useState(0);
const throttledPosition = useThrottle(position, 50); // Throttle to 20fps

useEffect(() => {
	// Expensive operation with throttled value
	updateExpensiveVisualization(throttledPosition);
}, [throttledPosition]);

useDevPanel("Performance", {
	position: {
		type: "range",
		value: position,
		label: `Position: ${position}`,
		min: 0,
		max: 1000,
		onChange: setPosition, // Updates immediately for smooth UI
	},
});
```

### Debouncing Final Values

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

const [quality, setQuality] = useState(75);

const saveQualitySettings = useDebounceCallback(async (value: number) => {
	await saveSettingsToAPI({ quality: value });
}, 1000);

useDevPanel("Quality", {
	quality: {
		type: "range",
		value: quality,
		label: `Quality: ${quality}%`,
		min: 0,
		max: 100,
		onChange: (value: number) => {
			setQuality(value);
			saveQualitySettings(value);
		},
	},
});
```

## Related Controls

-   **[Number Control](./NUMBER_CONTROL.md)** - For precise numeric input
-   **[Color Control](./COLOR_CONTROL.md)** - For color value selection
-   **[Boolean Control](./BOOLEAN_CONTROL.md)** - For on/off toggles
