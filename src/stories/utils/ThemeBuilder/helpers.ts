import type { ThemeVariables } from "./types";

/**
 * Applies CSS variables to the document root for live theme preview
 */
export function applyThemeVariables(variables: ThemeVariables): void {
	const root = document.documentElement;

	// Color Variables
	root.style.setProperty("--dev-panel-accent-color", variables.accentColor);
	root.style.setProperty("--dev-panel-accent-color-hover", variables.accentColorHover);
	root.style.setProperty("--dev-panel-accent-color-active", variables.accentColorActive);
	root.style.setProperty("--dev-panel-background-color", variables.backgroundColor);
	root.style.setProperty("--dev-panel-background-color-secondary", variables.backgroundColorSecondary);
	root.style.setProperty("--dev-panel-foreground-color", variables.foregroundColor);
	root.style.setProperty("--dev-panel-surface-color", variables.surfaceColor);
	root.style.setProperty("--dev-panel-surface-color-hover", variables.surfaceColorHover);
	root.style.setProperty("--dev-panel-text-color", variables.textColor);
	root.style.setProperty("--dev-panel-text-color-secondary", variables.textColorSecondary);
	root.style.setProperty("--dev-panel-text-color-muted", variables.textColorMuted);
	root.style.setProperty("--dev-panel-text-color-on-accent", variables.textColorOnAccent);
	root.style.setProperty("--dev-panel-border-color", variables.borderColor);
	root.style.setProperty("--dev-panel-border-color-light", variables.borderColorLight);
	root.style.setProperty("--dev-panel-border-color-strong", variables.borderColorStrong);
	root.style.setProperty("--dev-panel-border-color-accent", variables.borderColorAccent);
	root.style.setProperty("--dev-panel-input-background-color", variables.inputBackgroundColor);
	root.style.setProperty("--dev-panel-input-border-color", variables.inputBorderColor);
	root.style.setProperty("--dev-panel-input-text-color", variables.inputTextColor);
	root.style.setProperty("--dev-panel-input-placeholder-color", variables.inputPlaceholderColor);

	// Layout Variables
	root.style.setProperty("--dev-panel-border-radius", variables.borderRadius);
	root.style.setProperty("--dev-panel-spacing-base", variables.spacingBase);
	root.style.setProperty("--dev-panel-font-size-sm", variables.fontSize);
	root.style.setProperty("--dev-panel-font-family", variables.fontFamily);
	root.style.setProperty("--dev-panel-shadow", variables.shadow);

	// Dimensions
	root.style.setProperty("--dev-panel-max-width", variables.maxWidth);
	root.style.setProperty("--dev-panel-max-height", variables.maxHeight);
}

/**
 * Generates CSS code for the theme
 */
export function generateThemeCSS(variables: ThemeVariables, themeName: string): string {
	return `:root[data-dev-panel-theme="${themeName}"] {
	color-scheme: dark !important;

	/* Color Variables */
	--dev-panel-accent-color: ${variables.accentColor} !important;
	--dev-panel-accent-color-hover: ${variables.accentColorHover} !important;
	--dev-panel-accent-color-active: ${variables.accentColorActive} !important;
	--dev-panel-background-color: ${variables.backgroundColor} !important;
	--dev-panel-background-color-secondary: ${variables.backgroundColorSecondary} !important;
	--dev-panel-foreground-color: ${variables.foregroundColor} !important;
	--dev-panel-surface-color: ${variables.surfaceColor} !important;
	--dev-panel-surface-color-hover: ${variables.surfaceColorHover} !important;
	--dev-panel-text-color: ${variables.textColor} !important;
	--dev-panel-text-color-secondary: ${variables.textColorSecondary} !important;
	--dev-panel-text-color-muted: ${variables.textColorMuted} !important;
	--dev-panel-text-color-on-accent: ${variables.textColorOnAccent} !important;
	--dev-panel-border-color: ${variables.borderColor} !important;
	--dev-panel-border-color-light: ${variables.borderColorLight} !important;
	--dev-panel-border-color-strong: ${variables.borderColorStrong} !important;
	--dev-panel-border-color-accent: ${variables.borderColorAccent} !important;
	--dev-panel-input-background-color: ${variables.inputBackgroundColor} !important;
	--dev-panel-input-border-color: ${variables.inputBorderColor} !important;
	--dev-panel-input-text-color: ${variables.inputTextColor} !important;
	--dev-panel-input-placeholder-color: ${variables.inputPlaceholderColor} !important;

	/* Layout Variables */
	--dev-panel-border-radius: ${variables.borderRadius} !important;
	--dev-panel-spacing-base: ${variables.spacingBase} !important;
	--dev-panel-font-size-sm: ${variables.fontSize} !important;
	--dev-panel-font-family: ${variables.fontFamily} !important;
	--dev-panel-shadow: ${variables.shadow} !important;
	
	/* Dimensions */
	--dev-panel-max-width: ${variables.maxWidth} !important;
	--dev-panel-max-height: ${variables.maxHeight} !important;
}`;
}

/**
 * Generates TypeScript configuration object
 */
export function generateThemeConfig(variables: ThemeVariables, themeName: string): string {
	return `// Theme configuration for: ${themeName}
export const ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}Theme = {
	name: "${themeName}",
	variables: {
		// Color Variables
		accentColor: "${variables.accentColor}",
		accentColorHover: "${variables.accentColorHover}",
		accentColorActive: "${variables.accentColorActive}",
		backgroundColor: "${variables.backgroundColor}",
		backgroundColorSecondary: "${variables.backgroundColorSecondary}",
		foregroundColor: "${variables.foregroundColor}",
		surfaceColor: "${variables.surfaceColor}",
		surfaceColorHover: "${variables.surfaceColorHover}",
		textColor: "${variables.textColor}",
		textColorSecondary: "${variables.textColorSecondary}",
		textColorMuted: "${variables.textColorMuted}",
		textColorOnAccent: "${variables.textColorOnAccent}",
		borderColor: "${variables.borderColor}",
		borderColorLight: "${variables.borderColorLight}",
		borderColorStrong: "${variables.borderColorStrong}",
		borderColorAccent: "${variables.borderColorAccent}",
		inputBackgroundColor: "${variables.inputBackgroundColor}",
		inputBorderColor: "${variables.inputBorderColor}",
		inputTextColor: "${variables.inputTextColor}",
		inputPlaceholderColor: "${variables.inputPlaceholderColor}",
		
		// Layout Variables
		borderRadius: "${variables.borderRadius}",
		spacingBase: "${variables.spacingBase}",
		fontSize: "${variables.fontSize}",
		fontFamily: "${variables.fontFamily}",
		shadow: "${variables.shadow}",
		
		// Dimensions
		maxWidth: "${variables.maxWidth}",
		maxHeight: "${variables.maxHeight}",
	},
};`;
}
