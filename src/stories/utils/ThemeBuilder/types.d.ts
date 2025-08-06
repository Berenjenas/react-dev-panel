export interface ThemeVariables {
	// Color Variables
	accentColor: string;
	accentColorHover: string;
	accentColorActive: string;
	backgroundColor: string;
	backgroundColorSecondary: string;
	foregroundColor: string;
	surfaceColor: string;
	surfaceColorHover: string;
	textColor: string;
	textColorSecondary: string;
	textColorMuted: string;
	textColorOnAccent: string;
	borderColor: string;
	borderColorLight: string;
	borderColorStrong: string;
	borderColorAccent: string;
	inputBackgroundColor: string;
	inputBorderColor: string;
	inputTextColor: string;
	inputPlaceholderColor: string;
	// Layout Variables
	borderRadius: string;
	spacingBase: string;
	fontSize: string;
	fontFamily: string;
	shadow: string;
	// Dimensions
	maxWidth: string;
	maxHeight: string;
}

export interface ThemeBuilderProps {
	devPanelTitle?: string;
}
