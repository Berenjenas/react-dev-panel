# LocalStorage Control

Complete localStorage management interface with CRUD operations for viewing, editing, adding, and removing browser storage entries.

## Usage

```tsx
{
  type: 'localStorage',
  description: 'Manage localStorage entries',
  onRefresh: () => console.log('Refreshed'),
}
```

## Properties

| Property      | Type             | Default | Description                               |
| ------------- | ---------------- | ------- | ----------------------------------------- |
| `type`        | `'localStorage'` | —       | Control type                              |
| `description` | `string`         | —       | Help text                                 |
| `onRefresh`   | `() => void`     | —       | Callback triggered when data is refreshed |
| `disabled`    | `boolean`        | `false` | Disabled state                            |

## Features

-   **View All Items**: Displays all localStorage entries in collapsible cards
-   **Add New**: Create new localStorage entries with key-value pairs
-   **Edit Inline**: Modify existing values directly in the interface
-   **Delete**: Remove entries with confirmation dialog
-   **Smart Formatting**: Automatically prettifies JSON values
-   **Expand/Collapse**: Show truncated previews (100 chars) with expand option
-   **Auto-sync**: Listens to storage events from other tabs/windows
-   **Manual Refresh**: Reload localStorage data on demand

## Examples

### Basic Setup

```tsx
useDevPanel("Storage", {
	localStorage: {
		type: "localStorage",
		description: "Manage browser localStorage entries",
	},
});
```

### With Refresh Callback

```tsx
const [refreshCount, setRefreshCount] = useState(0);

useDevPanel("Storage Manager", {
	localStorage: {
		type: "localStorage",
		description: "View and edit localStorage. Changes sync across tabs.",
		onRefresh: () => {
			setRefreshCount((prev) => prev + 1);
			console.log("Storage refreshed");
		},
	},
});
```

### Developer Tools Panel

```tsx
import { useDevPanel } from "@berenjena/react-dev-panel";

function App() {
	useDevPanel(
		"Developer Tools",
		{
			storage: {
				type: "localStorage",
				description: "Inspect and manage localStorage values",
			},
			separator: { type: "separator" },
			clearAll: {
				type: "button",
				label: "Clear All Storage",
				onClick: () => {
					if (confirm("Clear all localStorage?")) {
						localStorage.clear();
					}
				},
			},
		},
		{ panelTitle: "Dev Tools" },
	);

	return <div>Your app...</div>;
}
```

### Debugging User Preferences

```tsx
const [theme, setTheme] = useState("dark");
const [locale, setLocale] = useState("en");

useDevPanel("Debug", {
	preferences: { type: "separator", variant: "label", label: "Preferences" },
	theme: {
		type: "select",
		value: theme,
		options: ["light", "dark"],
		persist: true,
		onChange: setTheme,
	},
	locale: {
		type: "select",
		value: locale,
		options: ["en", "es", "fr"],
		persist: true,
		onChange: setLocale,
	},
	storage: { type: "separator", variant: "label", label: "Storage Inspector" },
	localStorage: {
		type: "localStorage",
		description: "View persisted preferences and other localStorage data",
	},
});
```

## Behavior

### Auto-formatting

The control attempts to parse and prettify JSON:

```tsx
// If value is valid JSON:
'{"name":"John"}' → displays as:
{
  "name": "John"
}

// If not JSON:
'simple-value' → displays as: simple-value
```

### Validation

-   **Add**: Prevents duplicate keys, requires both key and value
-   **Edit**: Prevents empty values, shows error if save fails
-   **Keys**: Cannot be empty or contain only whitespace

## TypeScript

```tsx
import { LocalStorageControl } from "@berenjena/react-dev-panel";

const control: LocalStorageControl = {
	type: "localStorage",
	description: "Manage localStorage entries",
	onRefresh: () => {
		// Handle refresh event
	},
};
```

## Use Cases

**Best for:**

-   Debugging persisted state
-   Inspecting localStorage during development
-   Testing persistence features
-   Clearing cached data without DevTools
-   Viewing control persistence values

**Not recommended for:**

-   Production environments (dev panel should be disabled)
-   Storing sensitive data (use secure storage instead)
-   Real-time data that changes frequently
