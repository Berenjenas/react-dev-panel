# React Dev Panel

![NPM Version](https://badgen.net/npm/v/@berenjena/react-dev-panel)
![npm package minimized gzipped size](<https://img.shields.io/bundlejs/size/%40berenjena%2Freact-dev-panel?label=Bundle%20size%20(gzip)>)
[![License: MIT](https://badgen.net/npm/license/@berenjena/react-dev-panel)](https://opensource.org/licenses/MIT)
[![Weekly Downloads](https://badgen.net/npm/dw/@berenjena/react-dev-panel)](https://www.npmjs.com/package/@berenjena/react-dev-panel)

A powerful, type-safe development panel for React that allows developers to inspect and control component props, manage state, and accelerate prototyping directly within the application UI.

## ✨ Features

-   🎛️ **Rich Control Types** - Boolean, Number, Text, Select, Color, Range, Date, Button, ButtonGroup, and Separator controls
-   🚀 **Zero Configuration** - Auto-mounting and unmounting, no providers or setup required
-   🎨 **Themeable** - Built-in themes and CSS custom properties for customization
-   ⌨️ **Keyboard Shortcuts** - Customizable hotkeys for panel toggle
-   📖 **TypeScript First** - Full type safety and IntelliSense support
-   � **Auto State Management** - Automatic portal rendering and lifecycle management
-   📦 **Lightweight** - Only requires React as peer dependency

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

The package exposes a single hook: `useDevPanel`. This hook handles everything automatically:

-   **Auto-mounting**: Creates and mounts the dev panel UI when first called
-   **Auto-unmounting**: Removes the panel from DOM when no controls are active
-   **State management**: Manages all internal state and control synchronization
-   **Portal rendering**: Renders the panel outside your component tree

### Basic Usage

```tsx
import { useState } from "react";
import { useDevPanel } from "@berenjena/react-dev-panel";

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
		</div>
	);
}
```

That's it! No additional components or providers needed. The hook automatically handles the entire panel lifecycle.

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

The dev panel supports customizable keyboard shortcuts. The default hotkey is `Ctrl+Shift+A`:

```tsx
useDevPanel("My Section", controls, {
	hotKeyConfig: {
		key: "d", // The key to press
		ctrlKey: true, // Requires Ctrl key
		shiftKey: false, // Requires Shift key
		altKey: true, // Requires Alt key
		metaKey: false, // Requires Meta/Cmd key (Mac)
	},
});
```

## 🔧 Advanced Usage

### Multiple Panel Sections

You can call `useDevPanel` from multiple components to create organized sections:

```tsx
function App() {
	// In UserProfile.tsx
	useDevPanel("User Profile", {
		name: { type: "text", value: name, onChange: setName },
		avatar: { type: "text", value: avatar, onChange: setAvatar },
	});

	// In AppSettings.tsx
	useDevPanel("App Settings", {
		theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
		debug: { type: "boolean", value: debug, onChange: setDebug },
	});

	// Both sections appear in the same panel automatically
	return <YourApp />;
}
```

### Panel Configuration

Customize the panel's appearance and behavior:

```tsx
useDevPanel("My Section", controls, {
	panelTitle: "Custom Panel Title",
	theme: "dark", // Built-in themes: light, dark, neon, etc.
	hotKeyConfig: {
		// Custom toggle hotkey (default: Ctrl+Shift+A)
		key: "f",
		ctrlKey: true,
		shiftKey: true,
		altKey: false,
		metaKey: false,
	},
});
```

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

### `useDevPanel(sectionName, controls, devPanelProps?)`

The only export from this package. This hook manages the entire dev panel lifecycle and handles all the heavy lifting for you.

**Parameters:**

-   `sectionName` - Unique identifier for the control group
-   `controls` - Object containing control definitions
-   `devPanelProps` - Optional panel configuration (title, theme, hotkeys)

**What it does automatically:**

-   **Portal Management**: Creates a React portal on first use and renders the panel outside your component tree
-   **State Synchronization**: Keeps all controls in sync across multiple component instances
-   **Lifecycle Management**: Mounts the panel when controls are registered, unmounts when all controls are removed
-   **Memory Management**: Cleans up subscriptions and DOM elements when components unmount
-   **Theme Application**: Applies theme configurations and CSS custom properties

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
