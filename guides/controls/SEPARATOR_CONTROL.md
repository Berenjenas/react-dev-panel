# Separator Control

Visual separation and organization within the development panel.

## Usage

```tsx
{
  type: 'separator',
}
```

## Properties

| Property | Type                             | Default     | Description              |
| -------- | -------------------------------- | ----------- | ------------------------ |
| `type`   | `'separator'`                    | —           | Control type             |
| `style`  | `'line' \| 'space' \| 'label'`   | `'line'`    | Visual style             |
| `label`  | `string`                         | `undefined` | Text (for `label` style) |
| `size`   | `'small' \| 'medium' \| 'large'` | `'medium'`  | Spacing size             |

## Styles

### Line Separator

```tsx
{
  type: 'separator',
  style: 'line',
}
```

### Space Separator

```tsx
{
  type: 'separator',
  style: 'space',
  size: 'large',
}
```

### Label Separator

```tsx
{
  type: 'separator',
  style: 'label',
  label: 'Advanced Settings',
}
```

## Examples

### Grouping Sections

```tsx
useDevPanel("Settings", {
	// Basic Info
	username: { type: "text", value: username, onChange: setUsername },
	email: { type: "text", value: email, onChange: setEmail },

	// Separator
	displaySep: {
		type: "separator",
		style: "label",
		label: "Display Preferences",
	},

	// Display Settings
	theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
	fontSize: { type: "range", value: fontSize, min: 12, max: 24, onChange: setFontSize },

	// Separator
	privacySep: {
		type: "separator",
		style: "label",
		label: "Privacy",
	},

	// Privacy Settings
	profilePublic: { type: "boolean", value: profilePublic, onChange: setProfilePublic },
	analytics: { type: "boolean", value: analytics, onChange: setAnalytics },
});
```

### Wizard Steps

```tsx
const [step, setStep] = useState(1);

useDevPanel("Setup Wizard", {
	progress: {
		type: "text",
		value: `Step ${step} of 3`,
		disabled: true,
		onChange: () => {},
	},

	progressSep: { type: "separator", style: "line", size: "small" },

	...(step === 1 && {
		step1Header: { type: "separator", style: "label", label: "Basic Info" },
		projectName: { type: "text", value: projectName, onChange: setProjectName },
	}),

	...(step === 2 && {
		step2Header: { type: "separator", style: "label", label: "Configuration" },
		framework: { type: "select", value: framework, options: ["react", "vue"], onChange: setFramework },
	}),

	...(step === 3 && {
		step3Header: { type: "separator", style: "label", label: "Features" },
		auth: { type: "boolean", value: auth, onChange: setAuth },
	}),

	navSep: { type: "separator", style: "space", size: "medium" },

	navigation: {
		type: "buttonGroup",
		buttons: [
			...(step > 1 ? [{ label: "Previous", onClick: () => setStep(step - 1) }] : []),
			...(step < 3 ? [{ label: "Next", onClick: () => setStep(step + 1) }] : []),
		],
	},
});
```

### Debug Sections

```tsx
useDevPanel("Debug", {
	perfHeader: { type: "separator", style: "label", label: "Performance" },
	showMetrics: { type: "boolean", value: showMetrics, onChange: setShowMetrics },
	logLevel: { type: "select", value: logLevel, options: ["error", "warn", "info"], onChange: setLogLevel },

	devToolsHeader: { type: "separator", style: "label", label: "Dev Tools" },
	mockData: { type: "boolean", value: mockData, onChange: setMockData },
	bypassAuth: { type: "boolean", value: bypassAuth, onChange: setBypassAuth },

	networkHeader: { type: "separator", style: "label", label: "Network Simulation" },
	delay: { type: "range", value: delay, min: 0, max: 5000, label: `Delay: ${delay}ms`, onChange: setDelay },
	failureRate: { type: "range", value: failureRate, min: 0, max: 50, label: `Failures: ${failureRate}%`, onChange: setFailureRate },

	actionsSep: { type: "separator", style: "space", size: "medium" },
	reset: { type: "button", label: "Reset All", onClick: resetDebugSettings },
});
```

## TypeScript

```tsx
import { SeparatorControl } from "@berenjena/react-dev-panel";

const separator: SeparatorControl = {
	type: "separator",
	style: "label",
	label: "Advanced Settings",
};
```

## Related

-   All controls benefit from proper separation and grouping
