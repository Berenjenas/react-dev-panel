# React Dev Panel

[![npm version](https://badge.fury.io/js/@berenjena%2Freact-dev-panel.svg)](https://badge.fury.io/js/@berenjena%2Freact-dev-panel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Weekly Downloads](https://img.shields.io/npm/dw/@berenjena/react-dev-panel)](https://www.npmjs.com/package/@berenjena/react-dev-panel)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/%40berenjena%2Freact-dev-panel?label=gzipped)

A powerful, type-safe React development panel that provides an intuitive interface for controlling component props, debugging state, and rapid prototyping during development.

## ✨ Features

-   🎛️ **Rich Control Types** - Boolean, Number, Text, Select, Color, Range, Date, Button, and Separator controls
-   🎨 **Themeable** - Consistent design system with CSS custom properties
-   📱 **Responsive** - Adapts to different screen sizes and can be positioned anywhere
-   ⌨️ **Keyboard Shortcuts** - Quick access with customizable hotkeys
-   🔄 **State Management** - Built-in state persistence
-   📖 **TypeScript First** - Full type safety and IntelliSense support
-   🚀 **Zero Dependencies** - Only requires React (peer dependency)

## 📊 Package Stats

-   **Bundle Size**: ~35KB (minified)
-   **Total Files**: 142
-   **License**: MIT

## 🆕 What's New

### Recent Updates (v1.0.1+)

-   **🔄 Zero External Dependencies**: Replaced Zustand with React's built-in `useSyncExternalStore` for state management
-   **📊 Logger Component**: New floating, collapsible logger component for debugging object data in JSON format
-   **⚡ Performance Optimizations**: Selective subscriptions for better re-render performance
-   **🔧 Development Mode Improvements**: Removed development mode checks - panel now works in all environments
-   **📝 Enhanced Documentation**: Comprehensive code documentation and better TypeScript support

## 📦 Installation

```bash
npm install -D @berenjena/react-dev-panel
```

```bash
yarn add -D @berenjena/react-dev-panel
```

```bash
pnpm add -D @berenjena/react-dev-panel
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { useState } from "react";
import { useDevPanel, DevPanel } from "@berenjena/react-dev-panel";

function App() {
	const [name, setName] = useState("John Doe");
	const [age, setAge] = useState(25);
	const [isActive, setIsActive] = useState(true);
	const [theme, setTheme] = useState("dark");

	useDevPanel("User Settings", {
		name: {
			type: "text",
			value: name,
			label: "Full Name",
			onChange: setName,
		},
		age: {
			type: "number",
			value: age,
			label: "Age",
			min: 0,
			max: 120,
			onChange: setAge,
		},
		isActive: {
			type: "boolean",
			value: isActive,
			label: "Active User",
			onChange: setIsActive,
		},
		theme: {
			type: "select",
			value: theme,
			label: "Theme",
			options: ["light", "dark", "auto"],
			onChange: setTheme,
		},
	});

	return (
		<div>
			<h1>Hello, {name}!</h1>
			<p>Age: {age}</p>
			<p>Status: {isActive ? "Active" : "Inactive"}</p>
			<p>Theme: {theme}</p>

			<DevPanel />
		</div>
	);
}
```

## 🎛️ Control Types

### Text Control

```tsx
{
  type: 'text',
  value: 'Hello World',
  label: 'Message',
  placeholder: 'Enter message...',
  event: 'onBlur', // or 'onChange'
  onChange: (value: string) => setValue(value),
}
```

### Number Control

```tsx
{
  type: 'number',
  value: 42,
  label: 'Count',
  min: 0,
  max: 100,
  step: 1,
  onChange: (value: number) => setValue(value),
}
```

### Boolean Control

```tsx
{
  type: 'boolean',
  value: true,
  label: 'Enable Feature',
  onChange: (value: boolean) => setValue(value),
}
```

### Select Control

```tsx
{
  type: 'select',
  value: 'option1',
  label: 'Choose Option',
  options: ['option1', 'option2', 'option3'],
  // or with labels:
  options: [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ],
  onChange: (value: string) => setValue(value),
}
```

### Color Control

```tsx
{
  type: 'color',
  value: '#ff6200',
  label: 'Brand Color',
  onChange: (value: string) => setValue(value),
}
```

### Range Control

```tsx
{
  type: 'range',
  value: 50,
  label: 'Volume',
  min: 0,
  max: 100,
  step: 1,
  onChange: (value: number) => setValue(value),
}
```

### Date Control

```tsx
{
  type: 'date',
  value: '2025-07-26',
  label: 'Start Date',
  min: '2025-01-01',
  max: '2025-12-31',
  onChange: (value: string) => setValue(value),
}
```

### Button Control

```tsx
{
  type: 'button',
  label: 'Reset Values',
  onClick: () => resetToDefaults(),
}
```

### Button Group Control

```tsx
{
  type: 'buttonGroup',
  label: 'Actions',
  buttons: [
    { label: 'Save', onClick: handleSave },
    { label: 'Load', onClick: handleLoad },
    { label: 'Reset', onClick: handleReset, disabled: true },
  ],
}
```

### Separator Control

```tsx
// Line separator
{ type: 'separator' }

// Space separator
{ type: 'separator', style: 'space' }

// Label separator
{ type: 'separator', style: 'label', label: 'Advanced Settings' }
```

## 🎨 Styling and Theming

The dev panel uses CSS custom properties for easy theming:

```css
:root {
	--dev-panel-background-color: #1a1a1a;
	--dev-panel-text-color: #ffffff;
	--dev-panel-text-color-highlight: #ffffff;
	--dev-panel-text-color-muted: #888888;
	--dev-panel-accent-color: #ff6200;
	--dev-panel-border-color: #333333;
	--dev-panel-input-background-color: #2a2a2a;
	--dev-panel-highlight-color: #ff620020;
	--dev-panel-font-size-xs: 11px;
	--dev-panel-font-size-sm: 12px;
	--dev-panel-spacing-xs: 4px;
	--dev-panel-spacing-sm: 8px;
	--dev-panel-spacing-md: 16px;
	--dev-panel-border-radius: 4px;
	--dev-panel-inputs-height: 24px;
	--dev-panel-transition: all 0.2s ease;
}
```

### Custom Panel Positioning

```tsx
<DevPanel panelTitle="Custom Panel" position={{ x: 100, y: 100 }} defaultExpanded={true} />
```

## ⌨️ Keyboard Shortcuts

The dev panel supports customizable keyboard shortcuts:

```tsx
import { useHotkeys } from "@berenjena/react-dev-panel";

function App() {
	useHotkeys([
		{
			keys: ["ctrl", "d"],
			action: () => toggleDevPanel(),
			description: "Toggle Dev Panel",
		},
		{
			keys: ["ctrl", "shift", "r"],
			action: () => resetAllValues(),
			description: "Reset All Values",
		},
	]);
}
```

## 🔧 Advanced Usage

### Multiple Panel Groups

```tsx
function App() {
	// Group 1: User Settings
	useDevPanel("User", {
		name: { type: "text", value: name, onChange: setName },
		age: { type: "number", value: age, onChange: setAge },
	});

	// Group 2: App Settings
	useDevPanel("App", {
		theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
		debug: { type: "boolean", value: debug, onChange: setDebug },
	});

	return <DevPanel />;
}
```

### Conditional Controls

```tsx
useDevPanel("Settings", {
	mode: {
		type: "select",
		value: mode,
		options: ["simple", "advanced"],
		onChange: setMode,
	},
	// Only show advanced settings when mode is 'advanced'
	...(mode === "advanced" && {
		separator1: { type: "separator", style: "label", label: "Advanced" },
		complexValue: {
			type: "range",
			value: complexValue,
			min: 0,
			max: 1000,
			onChange: setComplexValue,
		},
	}),
});
```

### Event Handling Options

```tsx
{
  type: 'text',
  value: searchTerm,
  event: 'onChange', // Real-time updates
  onChange: setSearchTerm,
}

{
  type: 'number',
  value: price,
  event: 'onBlur', // Update only when focus is lost
  onChange: setPrice,
}
```

## 📚 API Reference

### `useDevPanel(groupName: string, controls: ControlsGroup)`

Registers a group of controls with the dev panel.

**Parameters:**

-   `groupName` - Unique identifier for the control group
-   `controls` - Object containing control definitions

### `<DevPanel />`

Main component that renders the development panel.

**Props:**

-   `panelTitle?: string` - Custom title for the panel
-   `position?: { x: number, y: number }` - Initial position
-   `defaultExpanded?: boolean` - Whether the panel starts expanded

### `useHotkeys(hotkeys: Hotkey[])`

Registers keyboard shortcuts.

**Parameters:**

-   `hotkeys` - Array of hotkey definitions with keys, action, and description

## 🛠️ Development

### Prerequisites

-   Node.js 18+
-   React 18+

### Setup

```bash
git clone https://github.com/Berenjenas/react-dev-panel.git
cd react-dev-panel
npm install
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run storybook    # Start Storybook
npm run test         # Run tests
npm run lint         # Lint code
```

## 📖 Storybook

Explore all components and controls in our Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to see interactive examples and documentation.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

-   [NPM Package](https://www.npmjs.com/package/@berenjena/react-dev-panel)
-   [GitHub Repository](https://github.com/Berenjenas/react-dev-panel)
-   [Bug Reports](https://github.com/Berenjenas/react-dev-panel/issues)
-   [Berenjena](https://berenjena.com.ar)

---

Made with ❤️ by the [Berenjena](https://berenjena.com.ar) team
