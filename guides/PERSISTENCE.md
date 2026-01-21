# Data Persistence

React Dev Panel automatically saves and restores control values using localStorage.

## Quick Start

Add `persist: true` to any control:

```tsx
useDevPanel("Settings", {
	theme: {
		type: "select",
		value: theme,
		options: ["light", "dark"],
		persist: true, // Auto-saved to localStorage
		onChange: setTheme,
	},
});
```

Values automatically:

-   Save when changed
-   Restore on page reload
-   Clean up when component unmounts

## All Control Types Support Persistence

```tsx
{ type: "text", value: str, persist: true, onChange: set }
{ type: "number", value: num, persist: true, onChange: set }
{ type: "boolean", value: bool, persist: true, onChange: set }
{ type: "select", value: str, options: [], persist: true, onChange: set }
{ type: "multiselect", value: [], options: [], persist: true, onChange: set }
{ type: "color", value: "#hex", persist: true, onChange: set }
{ type: "date", value: "YYYY-MM-DD", persist: true, onChange: set }
{ type: "range", value: num, persist: true, onChange: set }
```

## Storage Structure

Stored in `localStorage['dev-panel-controls-persistence']`:

```json
{
	"Settings": {
		"theme": "dark",
		"fontSize": 16
	},
	"Character": {
		"name": "Hero",
		"level": 5
	}
}
```

## Manual Control (Advanced)

```tsx
import { controlPersistenceService } from "@berenjena/react-dev-panel";

// Get value
const value = controlPersistenceService.getPersistedValue("Settings", "theme");

// Set value
controlPersistenceService.setPersistedValue("Settings", "theme", "dark");

// Remove value
controlPersistenceService.removePersistedValue("Settings", "theme");

// Clear section
controlPersistenceService.removeSection("Settings");
```

## When NOT to Use

Avoid persisting:

-   **Sensitive data** (passwords, tokens)
-   **Temporary states** (loading, errors)
-   **Session data** (auth status, current user)
-   **Real-time data** (timestamps, live feeds)

## Best Practices

**✅ DO:**

-   Use stable section names
-   Persist user preferences
-   Group related controls

**❌ DON'T:**

-   Include dynamic data in section names
-   Persist sensitive information
-   Over-persist (avoid persisting frequently changing values)

## Troubleshooting

**Values not persisting?**

1. Check `persist: true` is set
2. Verify localStorage is available
3. Check section/control names haven't changed
4. Inspect: `localStorage['dev-panel-controls-persistence']`

**Storage limits:**

-   localStorage: ~5-10MB per domain
-   Only JSON-serializable values supported
