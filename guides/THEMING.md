# Dev Panel CSS Theming Guide

The React Dev Panel includes a comprehensive CSS-based theming system that allows you to customize every aspect of the panel's appearance using CSS custom properties (CSS variables). This guide covers all theming capabilities and how to use them.

## Theme Modes

The dev panel supports automatic theme switching based on system preferences and manual theme overrides:

-   **Auto** - Automatically follows system preference (default)
-   **Light** - Force light theme using data attributes
-   **Dark** - Force dark theme using data attributes

## Basic Theme Usage

### Automatic Theme Switching

By default, the dev panel respects the user's system color scheme preference:

```css
/* Dark theme styles (default) */
:root {
	--dev-panel-background-color: #1e293b;
	--dev-panel-text-color: #f1f5f9;
	/* ... other dark theme tokens */
}

/* Light theme styles (applied automatically when user prefers light mode) */
@media (prefers-color-scheme: light) {
	:root {
		--dev-panel-background-color: #f8fafc;
		--dev-panel-text-color: #0f172a;
		/* ... other light theme tokens */
	}
}
```

### Forcing a Specific Theme

You can force a specific theme by applying data attributes:

```html
<!-- Force dark theme -->
<html data-dev-panel-theme="dark">
	<!-- Force light theme -->
	<html data-dev-panel-theme="light"></html>
</html>
```

```css
/* These will override the automatic theme detection */
[data-dev-panel-theme="dark"] {
	--dev-panel-background-color: #1e293b;
	--dev-panel-text-color: #f1f5f9;
}

[data-dev-panel-theme="light"] {
	--dev-panel-background-color: #f8fafc;
	--dev-panel-text-color: #0f172a;
}
```

## Custom Color Schemes

### Override Individual Colors

```css
/* Custom accent color */
:root {
	--dev-panel-accent-color: #ff6b6b;
	--dev-panel-accent-color-hover: #ff5252;
	--dev-panel-accent-color-active: #ff1744;
}

/* Custom brand colors */
:root {
	--dev-panel-accent-color: #0066cc;
	--dev-panel-primary-color: #0066cc;
	--dev-panel-success-color: #28a745;
	--dev-panel-warning-color: #ffc107;
	--dev-panel-error-color: #dc3545;
}
```

### Complete Custom Theme

```css
/* Complete custom dark theme */
:root {
	/* Colors */
	--dev-panel-accent-color: #bb86fc;
	--dev-panel-background-color: #121212;
	--dev-panel-foreground-color: #1e1e1e;
	--dev-panel-text-color: #ffffff;
	--dev-panel-text-color-muted: #b3b3b3;
	--dev-panel-border-color: #333333;

	/* Typography */
	--dev-panel-font-family: "Roboto", sans-serif;
	--dev-panel-font-size-sm: 13px;

	/* Spacing */
	--dev-panel-spacing-md: 12px;
	--dev-panel-spacing-lg: 16px;

	/* Border radius */
	--dev-panel-border-radius: 8px;
}
```

## CSS Custom Properties Reference

### Color Tokens

```css
:root {
	/* Accent Colors */
	--dev-panel-accent-color: #6366f1;
	--dev-panel-accent-color-hover: #5855eb;
	--dev-panel-accent-color-active: #4f46e5;
	--dev-panel-accent-color-disabled: #6366f150;

	/* Primary Colors */
	--dev-panel-primary-color: #6366f1;
	--dev-panel-primary-color-hover: #5855eb;
	--dev-panel-primary-color-active: #4f46e5;

	/* Status Colors */
	--dev-panel-success-color: #10b981;
	--dev-panel-warning-color: #f59e0b;
	--dev-panel-error-color: #ef4444;
	--dev-panel-info-color: #06b6d4;

	/* Background Colors */
	--dev-panel-background-color: #1e293b;
	--dev-panel-background-color-secondary: #334155;
	--dev-panel-foreground-color: #0f172a;
	--dev-panel-surface-color: #334155;
	--dev-panel-surface-color-hover: #475569;

	/* Text Colors */
	--dev-panel-text-color: #f1f5f9;
	--dev-panel-text-color-secondary: #cbd5e1;
	--dev-panel-text-color-muted: #94a3b8;
	--dev-panel-text-color-disabled: #64748b;
	--dev-panel-text-color-on-accent: #ffffff;

	/* Border Colors */
	--dev-panel-border-color: #475569;
	--dev-panel-border-color-light: #64748b;
	--dev-panel-border-color-strong: #334155;

	/* Input Colors */
	--dev-panel-input-background-color: #0f172a;
	--dev-panel-input-border-color: #475569;
	--dev-panel-input-text-color: #f1f5f9;
	--dev-panel-input-placeholder-color: #64748b;
}
```

### Typography Tokens

```css
:root {
	/* Font Family */
	--dev-panel-font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

	/* Font Sizes */
	--dev-panel-font-size-xs: 11px;
	--dev-panel-font-size-sm: 12px;
	--dev-panel-font-size-md: 14px;
	--dev-panel-font-size-lg: 16px;
	--dev-panel-font-size-xl: 18px;

	/* Font Weights */
	--dev-panel-font-weight-normal: 400;
	--dev-panel-font-weight-medium: 500;
	--dev-panel-font-weight-semibold: 600;
	--dev-panel-font-weight-bold: 700;

	/* Line Heights */
	--dev-panel-line-height-tight: 1.25;
	--dev-panel-line-height-normal: 1.5;
	--dev-panel-line-height-relaxed: 1.75;
}
```

### Spacing Tokens

```css
:root {
	--dev-panel-spacing-xs: 2px;
	--dev-panel-spacing-sm: 4px;
	--dev-panel-spacing-md: 8px;
	--dev-panel-spacing-lg: 12px;
	--dev-panel-spacing-xl: 16px;
	--dev-panel-spacing-2xl: 20px;
	--dev-panel-spacing-3xl: 24px;
	--dev-panel-spacing-4xl: 32px;
}
```

### Component Sizes

```css
:root {
	--dev-panel-max-width: 320px;
	--dev-panel-min-width: 280px;
	--dev-panel-max-height: 80vh;
	--dev-panel-inputs-height: 32px;
	--dev-panel-button-height: 32px;
	--dev-panel-header-height: 40px;
}
```

### Visual Effects

```css
:root {
	/* Shadows */
	--dev-panel-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
	--dev-panel-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
	--dev-panel-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
	--dev-panel-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);

	/* Border Radius */
	--dev-panel-border-radius-sm: 2px;
	--dev-panel-border-radius-md: 4px;
	--dev-panel-border-radius-lg: 6px;
	--dev-panel-border-radius-xl: 8px;
	--dev-panel-border-radius-full: 9999px;
	--dev-panel-border-radius: 6px;

	/* Transitions */
	--dev-panel-transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	--dev-panel-transition-normal: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	--dev-panel-transition-slow: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	--dev-panel-transition: var(--dev-panel-transition-normal);

	/* Opacity */
	--dev-panel-opacity-50: 0.5;
	--dev-panel-opacity-60: 0.6;
	--dev-panel-opacity-80: 0.8;
}
```

## Pre-built Color Schemes

### Blue Theme

```css
:root {
	--dev-panel-accent-color: #3b82f6;
	--dev-panel-accent-color-hover: #2563eb;
	--dev-panel-accent-color-active: #1d4ed8;
}
```

### Green Theme

```css
:root {
	--dev-panel-accent-color: #10b981;
	--dev-panel-accent-color-hover: #059669;
	--dev-panel-accent-color-active: #047857;
}
```

### Purple Theme

```css
:root {
	--dev-panel-accent-color: #8b5cf6;
	--dev-panel-accent-color-hover: #7c3aed;
	--dev-panel-accent-color-active: #6d28d9;
}
```

### Red Theme

```css
:root {
	--dev-panel-accent-color: #ef4444;
	--dev-panel-accent-color-hover: #dc2626;
	--dev-panel-accent-color-active: #b91c1c;
}
```

### Orange Theme

```css
:root {
	--dev-panel-accent-color: #f97316;
	--dev-panel-accent-color-hover: #ea580c;
	--dev-panel-accent-color-active: #c2410c;
}
```

## Advanced Theming Examples

### High Contrast Theme

```css
:root {
	--dev-panel-background-color: #000000;
	--dev-panel-foreground-color: #ffffff;
	--dev-panel-text-color: #ffffff;
	--dev-panel-accent-color: #ffff00;
	--dev-panel-border-color: #ffffff;
	--dev-panel-input-background-color: #000000;
	--dev-panel-input-border-color: #ffffff;
}
```

### Corporate Brand Theme

```css
:root {
	--dev-panel-accent-color: #0066cc;
	--dev-panel-primary-color: #0066cc;
	--dev-panel-font-family: "Helvetica Neue", Arial, sans-serif;
	--dev-panel-border-radius: 2px;
	--dev-panel-border-radius-lg: 4px;
}
```

### Neon Theme

```css
:root {
	--dev-panel-accent-color: #00ff41;
	--dev-panel-background-color: #0a0a0a;
	--dev-panel-foreground-color: #111111;
	--dev-panel-text-color: #00ff41;
	--dev-panel-text-color-muted: #00cc33;
	--dev-panel-border-color: #003d10;
	--dev-panel-input-background-color: #000000;
	--dev-panel-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}
```

## Responsive Theming

```css
/* Adjust for mobile devices */
@media (max-width: 768px) {
	:root {
		--dev-panel-max-width: 280px;
		--dev-panel-font-size-sm: 11px;
		--dev-panel-spacing-md: 6px;
		--dev-panel-inputs-height: 28px;
	}
}

/* Adjust for high-resolution displays */
@media (min-resolution: 2dppx) {
	:root {
		--dev-panel-border-radius: 3px;
		--dev-panel-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}
}
```

## Component-Specific Theming

### Input Components

```css
/* Style all input-like components */
:root {
	--dev-panel-input-background-color: #1a1a1a;
	--dev-panel-input-border-color: #333333;
	--dev-panel-input-border-color-focus: #0066cc;
	--dev-panel-input-text-color: #ffffff;
	--dev-panel-input-placeholder-color: #666666;
}
```

### Button Components

```css
/* Style all button components */
:root {
	--dev-panel-button-height: 36px;
	--dev-panel-accent-color: #ff6b6b;
	--dev-panel-accent-color-hover: #ff5252;
}
```

### Panel Layout

```css
/* Panel sizing and positioning */
:root {
	--dev-panel-max-width: 400px;
	--dev-panel-max-height: 85vh;
	--dev-panel-border-radius: 12px;
	--dev-panel-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}
```

## Best Practices

1. **Start Simple**: Begin by overriding just the accent color
2. **Use System Themes**: Let users' system preferences be respected by default
3. **Test Contrast**: Ensure sufficient color contrast for accessibility
4. **Be Consistent**: Use the design token system rather than hard-coded values
5. **Performance**: CSS custom properties are fast and efficient
6. **Fallbacks**: Consider fallback values for older browsers

## Accessibility Considerations

```css
/* Ensure proper contrast ratios */
:root {
	--dev-panel-text-color: #ffffff; /* 21:1 contrast on dark backgrounds */
	--dev-panel-accent-color: #4dabf7; /* WCAG AA compliant */
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
	:root {
		--dev-panel-transition: none;
		--dev-panel-transition-fast: none;
		--dev-panel-transition-slow: none;
	}
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	:root {
		--dev-panel-border-color: currentColor;
		--dev-panel-shadow: none;
	}
}
```

This CSS-only theming system provides complete control over the dev panel's appearance while keeping things simple and performant. No JavaScript required!
