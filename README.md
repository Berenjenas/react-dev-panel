# React Dev Panel

![NPM Version](https://badgen.net/npm/v/@berenjena/react-dev-panel)
![npm package minimized gzipped size](<https://img.shields.io/bundlejs/size/%40berenjena%2Freact-dev-panel?label=Bundle%20size%20(gzip)>)
[![License: MIT](https://badgen.net/npm/license/@berenjena/react-dev-panel)](https://opensource.org/licenses/MIT)
[![Weekly Downloads](https://badgen.net/npm/dw/@berenjena/react-dev-panel)](https://www.npmjs.com/package/@berenjena/react-dev-panel)

A powerful, type-safe React development panel that provides an intuitive interface for controlling component props, debugging state, and rapid prototyping during development.

## ✨ Features

-   🎛️ **Rich Control Types** - Boolean, Number, Text, Select, MultiSelect, Color, Range, Date, Button, ButtonGroup, and Separator controls
-   🎨 **Themeable** - Consistent design system with CSS custom properties
-   ⌨️ **Keyboard Shortcuts** - Quick access with customizable hotkeys
-   📖 **TypeScript First** - Full type safety and IntelliSense support
-   🚀 **Zero Dependencies** - Only requires React (peer dependency)
-   � **Developer Experience** - Comprehensive linting, formatting, and quality tools
-   �📦 **Bundle Size**: ![npm package minimized gzipped size](<https://img.shields.io/bundlejs/size/%40berenjena%2Freact-dev-panel?label=Bundle%20size%20(gzip)>)

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

React Dev Panel provides rich control types for different data types. Here are some quick examples:

### Text Control

```tsx
{
  type: 'text',
  value: 'Hello World',
  label: 'Message',
  placeholder: 'Enter message...',
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

### Button Control

```tsx
{
  type: 'button',
  label: 'Reset Values',
  onClick: () => resetToDefaults(),
}
```

**📖 [View all control types and detailed documentation →](./guides/CONTROLS.md)**

## 🎨 Styling and Theming

The dev panel uses CSS custom properties for easy theming. Here's a quick example:

```css
:root {
	--dev-panel-background-color: #1a1a1a;
	--dev-panel-text-color: #ffffff;
	--dev-panel-accent-color: #ff6200;
	--dev-panel-border-color: #333333;
}
```

**📖 [Complete theming guide and customization options →](./guides/STYLING.md)**

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

**📖 [Advanced patterns, state management, and optimization →](./guides/ADVANCED_USAGE.md)**

### Event Handling Options

React Dev Panel supports two different event handling strategies for input controls:

**onChange Event**: Provides real-time updates as the user types or interacts with the control. This is ideal for immediate feedback and live previews, but may trigger more frequent re-renders.

**onBlur Event**: Updates the value only when the user finishes interacting with the control (loses focus). This approach is more performance-friendly for expensive operations and provides a better user experience when dealing with API calls or heavy computations.

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

## 📚 Documentation

### Core Guides

-   **[Control Types](./guides/CONTROLS.md)** - Complete guide to all available controls
-   **[Event Handling](./guides/EVENT_HANDLING.md)** - onChange vs onBlur strategies and best practices
-   **[Styling & Theming](./guides/STYLING.md)** - Customization, themes, and responsive design
-   **[Advanced Usage](./guides/ADVANCED_USAGE.md)** - Complex patterns, state management, and optimization

### Development

-   **[Development Guide](./guides/DEVELOPMENT.md)** - Setup, contributing, and project structure

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

Want to contribute or set up the project locally?

React Dev Panel maintains high code quality standards with comprehensive tooling:

-   **🔍 ESLint** - Comprehensive linting for TypeScript and React
-   **💅 Prettier** - Automatic code formatting
-   **🎨 Stylelint** - CSS/SCSS linting and formatting
-   **📝 Commitlint** - Conventional commit message validation
-   **🪝 Husky** - Pre-commit hooks for quality assurance
-   **📦 Changesets** - Automated version management and releases

All quality checks run automatically via pre-commit hooks, ensuring consistent code quality.

**📖 [Development setup, contributing guidelines, and project structure →](./guides/DEVELOPMENT.md)**

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

## 🔗 Links

-   [NPM Package](https://www.npmjs.com/package/@berenjena/react-dev-panel)
-   [GitHub Repository](https://github.com/Berenjenas/react-dev-panel)
-   [Bug Reports](https://github.com/Berenjenas/react-dev-panel/issues)
-   [Berenjena](https://berenjena.com.ar)

---

Made with ❤️ by the [Berenjena](https://berenjena.com.ar) team
