# React Dev Panel

![NPM Version](https://badgen.net/npm/v/@berenjena/react-dev-panel)
![npm package minimized gzipped size](<https://img.shields.io/bundlejs/size/%40berenjena%2Freact-dev-panel?label=Bundle%20size%20(gzip)>)
[![License: MIT](https://badgen.net/npm/license/@berenjena/react-dev-panel)](https://opensource.org/licenses/MIT)
[![Weekly Downloads](https://badgen.net/npm/dw/@berenjena/react-dev-panel)](https://www.npmjs.com/package/@berenjena/react-dev-panel)

A lightweight, type-safe development panel for React that lets you control component state and props in real-time during development.

## Features

-   **One Hook**: Single `useDevPanel` hook - no providers, no setup
-   **13 Control Types**: Text, Number, Boolean, Select, Color, Range, Date, Button, LocalStorage, and more
-   **Auto-Persistence**: Optional localStorage sync for control values
-   **Type-Safe**: Full TypeScript support with IntelliSense
-   **Themeable**: 21 built-in themes + CSS custom properties
-   **Lightweight**: ~16 KB gzipped, zero runtime dependencies

## Installation

```bash
npm install -D @berenjena/react-dev-panel
```

## Quick Start

```tsx
import { useState } from "react";
import { useDevPanel } from "@berenjena/react-dev-panel";

function App() {
	const [name, setName] = useState("John");
	const [age, setAge] = useState(25);
	const [theme, setTheme] = useState("dark");

	useDevPanel("Settings", {
		name: { type: "text", value: name, onChange: setName },
		age: { type: "number", value: age, min: 0, max: 100, onChange: setAge },
		theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
	});

	return <div>Hello, {name}!</div>;
}
```

**That's it!** Press `Ctrl+Shift+A` to toggle the panel.

## Control Types

All 13 control types available:

```tsx
{
  text: { type: "text", value: string, onChange: (v) => void }
  number: { type: "number", value: number, min?: number, max?: number, onChange: (v) => void }
  boolean: { type: "boolean", value: boolean, onChange: (v) => void }
  select: { type: "select", value: string, options: string[], onChange: (v) => void }
  multiselect: { type: "multiselect", value: string[], options: string[], onChange: (v) => void }
  color: { type: "color", value: string, onChange: (v) => void }
  range: { type: "range", value: number, min: number, max: number, step?: number, onChange: (v) => void }
  date: { type: "date", value: string, min?: string, max?: string, onChange: (v) => void }
  button: { type: "button", onClick: () => void }
  buttonGroup: { type: "buttonGroup", buttons: Array<{label: string, onClick: () => void}> }
  dragAndDrop: { type: "dragAndDrop", onChange: (files: FileList) => void }
  localStorage: { type: "localStorage", onRefresh?: () => void }
  separator: { type: "separator", variant?: "line" | "label" | "space" }
}
```

**Common options** (available on most controls):

-   `label?: string` - Display label
-   `description?: string` - Help text
-   `disabled?: boolean` - Disable control
-   `persist?: boolean` - Auto-save to localStorage

📖 **[Full control documentation →](./guides/CONTROLS.md)**

## Configuration

### Custom Hotkey

```tsx
useDevPanel("Settings", controls, {
	hotKeyConfig: { key: "d", ctrlKey: true, shiftKey: true },
});
```

### Panel Theme

```tsx
useDevPanel("Settings", controls, {
	theme: "neon", // 21 built-in themes available
	panelTitle: "My Dev Panel",
});
```

### Event Handling

Choose when controls trigger updates:

```tsx
{
  type: "text",
  value: searchTerm,
  event: "onChange", // Update on every keystroke (default)
  onChange: setSearchTerm
}

{
  type: "text",
  value: apiKey,
  event: "onBlur", // Update only when focus is lost
  onChange: setApiKey
}
```

📖 **[Styling guide](./guides/STYLING.md)** | **[Event handling](./guides/EVENT_HANDLING.md)** | **[Advanced usage](./guides/ADVANCED_USAGE.md)**

## Documentation

**Guides:**

-   [Control Types](./guides/CONTROLS.md) - All 12 control types with examples
-   [Persistence](./guides/PERSISTENCE.md) - Auto-save to localStorage
-   [Styling & Theming](./guides/STYLING.md) - Themes and CSS customization
-   [Event Handling](./guides/EVENT_HANDLING.md) - onChange vs onBlur strategies
-   [Advanced Usage](./guides/ADVANCED_USAGE.md) - Complex patterns and optimization
-   [Bundle Size](./guides/BUNDLE_SIZE.md) - Size tracking and optimization
-   [Development](./guides/DEVELOPMENT.md) - Contributing and setup

**Live Examples:**

-   [Storybook](https://berenjenas.github.io/react-dev-panel/) - Interactive component demos
-   Run locally: `npm run storybook`

## API Reference

### `useDevPanel(sectionName, controls, options?)`

**Parameters:**

-   `sectionName: string` - Unique identifier for this control group
-   `controls: ControlsGroup` - Object mapping control keys to control definitions
-   `options?: DevPanelProps` - Optional configuration

**Options:**

```tsx
{
  panelTitle?: string;           // Custom panel header
  theme?: string;                // Built-in theme name
  hotKeyConfig?: {               // Custom toggle hotkey
    key: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
  }
}
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Development:**

```bash
git clone https://github.com/Berenjenas/react-dev-panel.git
cd react-dev-panel
npm install
npm run storybook
```

## License

MIT © [Berenjena](https://berenjena.com.ar)

---

**Links:** [NPM](https://www.npmjs.com/package/@berenjena/react-dev-panel) · [GitHub](https://github.com/Berenjenas/react-dev-panel) · [Issues](https://github.com/Berenjenas/react-dev-panel/issues) · [Berenjena](https://berenjena.com.ar)

---

Made with ❤️ by the [Berenjena](https://berenjena.com.ar) team
