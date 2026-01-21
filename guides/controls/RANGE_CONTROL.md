# Range Control

Slider interface for selecting numeric values within a range.

## Usage

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

| Property   | Type                      | Default     | Description                |
| ---------- | ------------------------- | ----------- | -------------------------- |
| `type`     | `'range'`                 | —           | Control type               |
| `value`    | `number`                  | —           | Current value              |
| `onChange` | `(value: number) => void` | —           | Change handler             |
| `label`    | `string`                  | `undefined` | Display label              |
| `min`      | `number`                  | `0`         | Minimum value              |
| `max`      | `number`                  | `100`       | Maximum value              |
| `step`     | `number`                  | `1`         | Step increment             |
| `disabled` | `boolean`                 | `false`     | Disabled state             |
| `persist`  | `boolean`                 | `false`     | Auto-save to localStorage  |

## Examples

### Audio Controls

```tsx
const [audio, setAudio] = useState({
  volume: 75,
  bass: 0,
  treble: 0,
});

useDevPanel("Audio", {
  volume: {
    type: "range",
    value: audio.volume,
    label: `Volume: ${audio.volume}%`,
    min: 0,
    max: 100,
    onChange: (value) => setAudio(prev => ({ ...prev, volume: value })),
  },
  bass: {
    type: "range",
    value: audio.bass,
    label: `Bass: ${audio.bass > 0 ? '+' : ''}${audio.bass}dB`,
    min: -10,
    max: 10,
    onChange: (value) => setAudio(prev => ({ ...prev, bass: value })),
  },
  treble: {
    type: "range",
    value: audio.treble,
    label: `Treble: ${audio.treble > 0 ? '+' : ''}${audio.treble}dB`,
    min: -10,
    max: 10,
    onChange: (value) => setAudio(prev => ({ ...prev, treble: value })),
  },
});
```

### Image Filters

```tsx
const [filters, setFilters] = useState({
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
});

const filterCSS = `
  brightness(${filters.brightness}%)
  contrast(${filters.contrast}%)
  saturate(${filters.saturation}%)
  blur(${filters.blur}px)
`;

useDevPanel("Filters", {
  brightness: {
    type: "range",
    value: filters.brightness,
    label: `Brightness: ${filters.brightness}%`,
    min: 0,
    max: 200,
    step: 5,
    onChange: (value) => setFilters(prev => ({ ...prev, brightness: value })),
  },
  contrast: {
    type: "range",
    value: filters.contrast,
    label: `Contrast: ${filters.contrast}%`,
    min: 0,
    max: 200,
    step: 5,
    onChange: (value) => setFilters(prev => ({ ...prev, contrast: value })),
  },
  saturation: {
    type: "range",
    value: filters.saturation,
    label: `Saturation: ${filters.saturation}%`,
    min: 0,
    max: 200,
    step: 5,
    onChange: (value) => setFilters(prev => ({ ...prev, saturation: value })),
  },
  blur: {
    type: "range",
    value: filters.blur,
    label: `Blur: ${filters.blur}px`,
    min: 0,
    max: 10,
    step: 0.5,
    onChange: (value) => setFilters(prev => ({ ...prev, blur: value })),
  },
});
```

### Quality Settings

```tsx
const [quality, setQuality] = useState(75);

const getLabel = (value: number) => {
  if (value <= 25) return "Low";
  if (value <= 50) return "Medium";
  if (value <= 75) return "High";
  return "Ultra";
};

useDevPanel("Quality", {
  quality: {
    type: "range",
    value: quality,
    label: `Quality: ${getLabel(quality)} (${quality}%)`,
    min: 0,
    max: 100,
    step: 5,
    onChange: setQuality,
  },
});
```

## TypeScript

```tsx
import { RangeControl } from "@berenjena/react-dev-panel";

const control: RangeControl = {
  type: "range",
  value: 75,
  label: "Volume: 75%",
  min: 0,
  max: 100,
  step: 5,
  onChange: setVolume,
};
```

## Related

- [Number Control](./NUMBER_CONTROL.md) - For precise numeric input
- [Color Control](./COLOR_CONTROL.md) - For color values
