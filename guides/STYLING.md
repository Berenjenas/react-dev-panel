# 🎨 Styling and Theming

React Dev Panel provides a comprehensive theming system using CSS custom properties, allowing you to customize the appearance to match your application's design system.

## CSS Custom Properties

The dev panel uses CSS custom properties (CSS variables) for all styling, making it easy to create custom themes.

### Complete Variable Reference

```css
:root {
	/* Colors */
	--dev-panel-background-color: #1a1a1a;
	--dev-panel-text-color: #ffffff;
	--dev-panel-text-color-highlight: #ffffff;
	--dev-panel-text-color-muted: #888888;
	--dev-panel-accent-color: #ff6200;
	--dev-panel-border-color: #333333;
	--dev-panel-input-background-color: #2a2a2a;
	--dev-panel-highlight-color: #ff620020;

	/* Typography */
	--dev-panel-font-size-xs: 11px;
	--dev-panel-font-size-sm: 12px;
	--dev-panel-font-size-md: 14px;
	--dev-panel-font-size-lg: 16px;
	--dev-panel-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	--dev-panel-font-weight-normal: 400;
	--dev-panel-font-weight-medium: 500;
	--dev-panel-font-weight-bold: 600;

	/* Spacing */
	--dev-panel-spacing-xs: 4px;
	--dev-panel-spacing-sm: 8px;
	--dev-panel-spacing-md: 16px;
	--dev-panel-spacing-lg: 24px;
	--dev-panel-spacing-xl: 32px;

	/* Layout */
	--dev-panel-border-radius: 4px;
	--dev-panel-border-radius-lg: 8px;
	--dev-panel-inputs-height: 24px;
	--dev-panel-button-height: 28px;
	--dev-panel-panel-width: 300px;
	--dev-panel-panel-max-height: 70vh;

	/* Effects */
	--dev-panel-transition: all 0.2s ease;
	--dev-panel-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	--dev-panel-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.25);

	/* States */
	--dev-panel-hover-opacity: 0.8;
	--dev-panel-active-opacity: 0.6;
	--dev-panel-disabled-opacity: 0.4;
}
```

## Pre-built Themes

### Dark Theme (Default)

```css
:root {
	--dev-panel-background-color: #1a1a1a;
	--dev-panel-text-color: #ffffff;
	--dev-panel-text-color-muted: #888888;
	--dev-panel-accent-color: #ff6200;
	--dev-panel-border-color: #333333;
	--dev-panel-input-background-color: #2a2a2a;
	--dev-panel-highlight-color: #ff620020;
}
```

### Light Theme

```css
:root {
	--dev-panel-background-color: #ffffff;
	--dev-panel-text-color: #1a1a1a;
	--dev-panel-text-color-muted: #666666;
	--dev-panel-accent-color: #0066cc;
	--dev-panel-border-color: #e1e5e9;
	--dev-panel-input-background-color: #f8f9fa;
	--dev-panel-highlight-color: #0066cc20;
}
```

### High Contrast Theme

```css
:root {
	--dev-panel-background-color: #000000;
	--dev-panel-text-color: #ffffff;
	--dev-panel-text-color-muted: #cccccc;
	--dev-panel-accent-color: #ffff00;
	--dev-panel-border-color: #ffffff;
	--dev-panel-input-background-color: #1a1a1a;
	--dev-panel-highlight-color: #ffff0040;
}
```

## Custom Theming

### Creating a Custom Theme

1. **Define your color palette**

    ```css
    :root {
    	/* Brand colors */
    	--brand-primary: #6366f1;
    	--brand-secondary: #8b5cf6;
    	--brand-background: #0f172a;
    	--brand-surface: #1e293b;
    	--brand-text: #f1f5f9;
    	--brand-muted: #64748b;
    }
    ```

2. **Map to dev panel variables**
    ```css
    :root {
    	--dev-panel-background-color: var(--brand-surface);
    	--dev-panel-text-color: var(--brand-text);
    	--dev-panel-text-color-muted: var(--brand-muted);
    	--dev-panel-accent-color: var(--brand-primary);
    	--dev-panel-border-color: var(--brand-muted);
    	--dev-panel-input-background-color: var(--brand-background);
    	--dev-panel-highlight-color: color-mix(in srgb, var(--brand-primary) 20%, transparent);
    }
    ```

### Theme Switching

Implement dynamic theme switching with JavaScript:

```typescript
const themes = {
	dark: {
		"--dev-panel-background-color": "#1a1a1a",
		"--dev-panel-text-color": "#ffffff",
		"--dev-panel-accent-color": "#ff6200",
		// ... other properties
	},
	light: {
		"--dev-panel-background-color": "#ffffff",
		"--dev-panel-text-color": "#1a1a1a",
		"--dev-panel-accent-color": "#0066cc",
		// ... other properties
	},
};

function applyTheme(themeName: keyof typeof themes) {
	const theme = themes[themeName];
	const root = document.documentElement;

	Object.entries(theme).forEach(([property, value]) => {
		root.style.setProperty(property, value);
	});
}

// Usage
applyTheme("dark");
```

### React Hook for Theme Management

```typescript
import { useState, useEffect } from "react";

export function useTheme() {
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return { theme, setTheme, toggleTheme };
}
```

## Panel Positioning and Layout

### Custom Panel Positioning

```tsx
// Fixed position
<DevPanel
  position={{ x: 100, y: 100 }}
  defaultExpanded={true}
/>

// Responsive positioning
<DevPanel
  position={{
    x: window.innerWidth - 320,
    y: 20
  }}
/>
```

### Panel Size Customization

```css
:root {
	--dev-panel-panel-width: 400px; /* Wider panel */
	--dev-panel-panel-max-height: 80vh; /* Taller panel */
	--dev-panel-inputs-height: 32px; /* Larger inputs */
}
```

## Control-Specific Styling

### Individual Control Customization

Each control type can be styled independently:

```css
/* Text controls */
.dev-panel-text-control {
	--dev-panel-inputs-height: 36px;
}

/* Button controls */
.dev-panel-button-control {
	--dev-panel-button-height: 32px;
	--dev-panel-accent-color: #28a745;
}

/* Range controls */
.dev-panel-range-control {
	--dev-panel-accent-color: #dc3545;
}
```

### State-based Styling

```css
/* Hover states */
.dev-panel-control:hover {
	opacity: var(--dev-panel-hover-opacity);
}

/* Focus states */
.dev-panel-input:focus {
	outline: 2px solid var(--dev-panel-accent-color);
	outline-offset: 2px;
}

/* Disabled states */
.dev-panel-control:disabled {
	opacity: var(--dev-panel-disabled-opacity);
	cursor: not-allowed;
}
```

## Responsive Design

### Mobile Adaptations

```css
@media (max-width: 768px) {
	:root {
		--dev-panel-panel-width: 100vw;
		--dev-panel-spacing-md: 12px;
		--dev-panel-inputs-height: 44px; /* Larger touch targets */
	}
}
```

### Touch-Friendly Controls

```css
@media (hover: none) and (pointer: coarse) {
	:root {
		--dev-panel-inputs-height: 44px;
		--dev-panel-button-height: 44px;
		--dev-panel-spacing-sm: 12px;
	}
}
```

## Advanced Customization

### CSS-in-JS Integration

```typescript
import styled from "styled-components";

const CustomDevPanel = styled.div`
	.dev-panel {
		--dev-panel-background-color: ${(props) => props.theme.surface};
		--dev-panel-text-color: ${(props) => props.theme.text};
		--dev-panel-accent-color: ${(props) => props.theme.primary};
	}
`;
```

### Sass/SCSS Variables

```scss
// Define theme variables
$panel-bg: #1a1a1a;
$panel-text: #ffffff;
$panel-accent: #ff6200;

:root {
	--dev-panel-background-color: #{$panel-bg};
	--dev-panel-text-color: #{$panel-text};
	--dev-panel-accent-color: #{$panel-accent};
}
```

## Best Practices

### ✅ Do

-   Use CSS custom properties for consistent theming
-   Test themes across all control types
-   Ensure sufficient color contrast for accessibility
-   Consider system theme preferences
-   Provide smooth transitions between theme changes

### ❌ Don't

-   Override internal component classes directly
-   Use hardcoded colors in custom CSS
-   Ignore responsive design considerations
-   Forget to test in different browsers
-   Break existing functionality with custom styles

## Accessibility Considerations

### Color Contrast

Ensure sufficient contrast ratios:

-   Normal text: 4.5:1 minimum
-   Large text: 3:1 minimum
-   Interactive elements: 3:1 minimum

### High Contrast Mode

```css
@media (prefers-contrast: high) {
	:root {
		--dev-panel-border-color: currentColor;
		--dev-panel-text-color-muted: var(--dev-panel-text-color);
	}
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
	:root {
		--dev-panel-transition: none;
	}
}
```
