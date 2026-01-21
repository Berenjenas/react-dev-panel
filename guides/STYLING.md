# Styling & Theming

React Dev Panel uses CSS custom properties for easy theming.

## Built-in Themes

21 themes available out of the box:

```tsx
useDevPanel("Settings", controls, {
	theme: "dark", // or: light, neon, ocean, forest, sunset, etc.
});
```

**Popular themes:**

-   `dark` - Default dark theme
-   `light` - Clean light theme
-   `neon` - Cyberpunk colors
-   `ocean` - Blue tones
-   `forest` - Green tones
-   `sunset` - Warm colors
-   `nord` - Nordic color palette
-   `dracula` - Dracula theme
-   `monokai` - Monokai theme
-   `github` - GitHub colors

## Custom Theme

Override CSS variables:

```css
:root {
	/* Colors */
	--dev-panel-background-color: #1a1a1a;
	--dev-panel-text-color: #ffffff;
	--dev-panel-accent-color: #ff6200;
	--dev-panel-border-color: #333333;
	--dev-panel-input-background-color: #2a2a2a;

	/* Typography */
	--dev-panel-font-size-md: 14px;
	--dev-panel-font-family: "Inter", sans-serif;

	/* Spacing */
	--dev-panel-spacing-md: 16px;
	--dev-panel-border-radius: 8px;

	/* Layout */
	--dev-panel-panel-width: 320px;
	--dev-panel-panel-max-height: 80vh;
}
```

## Theme per Data Attribute

Scope themes to specific selectors:

```css
[data-dev-panel-theme="custom"] {
	--dev-panel-background-color: #your-color;
	--dev-panel-accent-color: #your-accent;
}
```

Then use:

```tsx
useDevPanel("Settings", controls, { theme: "custom" });
```

## System Theme

Auto-detect system preference:

```tsx
useDevPanel("Settings", controls, { theme: "auto" });
```

This respects `prefers-color-scheme` media query.

## Key Variables

**Most commonly customized:**

```css
/* Main colors */
--dev-panel-background-color
--dev-panel-text-color
--dev-panel-accent-color
--dev-panel-border-color

/* Interactive elements */
--dev-panel-input-background-color
--dev-panel-highlight-color
--dev-panel-hover-opacity

/* Layout */
--dev-panel-panel-width
--dev-panel-border-radius
--dev-panel-spacing-md
```

## Example: Custom Corporate Theme

```css
:root {
	--dev-panel-background-color: #002b5c;
	--dev-panel-text-color: #e0e7ff;
	--dev-panel-accent-color: #00d4ff;
	--dev-panel-border-color: #004080;
	--dev-panel-input-background-color: #003366;
	--dev-panel-font-family: "Roboto", sans-serif;
	--dev-panel-border-radius: 12px;
}
```

## Responsive Panel

The panel automatically adjusts to small screens. Customize breakpoints:

```css
@media (max-width: 768px) {
	:root {
		--dev-panel-panel-width: 100vw;
		--dev-panel-panel-max-height: 60vh;
	}
}
```

## Complete Variable List

See [source code](../src/styles/abstracts/_variables.scss) for all available variables (100+ customization points).
