# ⚡ Event Handling Options

React Dev Panel supports two different event handling strategies for input controls, allowing you to choose the best approach for your specific use case.

## Event Types

### onChange Event

The `onChange` event provides **real-time updates** as the user types or interacts with the control.

**When to use:**

-   Live previews and immediate feedback
-   Simple state updates without side effects
-   Small forms with minimal performance impact
-   Real-time validation or formatting

**Characteristics:**

-   Triggers on every keystroke or interaction
-   Provides immediate visual feedback
-   May cause more frequent re-renders
-   Best for responsive UI experiences

**Example:**

```tsx
{
  type: 'text',
  value: searchTerm,
  event: 'onChange', // Real-time updates
  onChange: setSearchTerm,
}
```

### onBlur Event

The `onBlur` event updates the value only when the user **finishes interacting** with the control (loses focus).

**When to use:**

-   API calls or expensive operations
-   Form validation that triggers network requests
-   Complex state updates with side effects
-   Performance-sensitive applications

**Characteristics:**

-   Triggers only when control loses focus
-   Reduces unnecessary API calls or computations
-   Better performance for expensive operations
-   Provides a more "traditional" form experience

**Example:**

```tsx
{
  type: 'number',
  value: price,
  event: 'onBlur', // Update only when focus is lost
  onChange: handlePriceChange, // This might trigger an API call
}
```

## Performance Considerations

### Real-time Updates (onChange)

```tsx
// Good for simple state updates
const [title, setTitle] = useState("");

useDevPanel("Content", {
	title: {
		type: "text",
		value: title,
		event: "onChange", // ✅ Fast, simple update
		onChange: setTitle,
	},
});
```

### Deferred Updates (onBlur)

```tsx
// Better for expensive operations
const [apiEndpoint, setApiEndpoint] = useState("");

const updateEndpoint = useCallback(async (url: string) => {
	setApiEndpoint(url);
	// Expensive operation: validate URL, test connection, etc.
	await validateEndpoint(url);
}, []);

useDevPanel("API Settings", {
	endpoint: {
		type: "text",
		value: apiEndpoint,
		event: "onBlur", // ✅ Prevents excessive API calls
		onChange: updateEndpoint,
	},
});
```

## Default Behavior

If no `event` property is specified, controls default to:

-   **Text controls**: `onBlur` (to prevent excessive updates while typing)
-   **Number controls**: `onChange` (for immediate feedback)
-   **Boolean controls**: `onChange` (immediate toggle response)
-   **Select controls**: `onChange` (immediate selection feedback)
-   **MultiSelect controls**: `onChange` (immediate selection feedback)
-   **Range controls**: `onChange` (smooth slider interaction)
-   **Color controls**: `onChange` (live color preview)
-   **Date controls**: `onChange` (immediate date selection)

## Best Practices

### ✅ Do

-   Use `onChange` for immediate visual feedback
-   Use `onBlur` for expensive operations or API calls
-   Consider user experience when choosing event types
-   Test performance with your specific use case

### ❌ Don't

-   Use `onChange` for API calls without debouncing
-   Use `onBlur` for controls that need immediate feedback
-   Mix event types inconsistently within related controls
-   Forget to handle loading states during async operations

## Advanced Patterns

### Debounced onChange

For cases where you need real-time updates but want to limit frequency:

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

const debouncedUpdate = useDebounceCallback(handleExpensiveUpdate, 300);

useDevPanel("Search", {
	query: {
		type: "text",
		value: searchQuery,
		event: "onChange",
		onChange: debouncedUpdate, // Debounced expensive operation
	},
});
```

### Conditional Event Handling

Choose event type based on context:

```tsx
const eventType = isDevelopment ? "onChange" : "onBlur";

useDevPanel("Settings", {
	setting: {
		type: "text",
		value: setting,
		event: eventType, // Dynamic based on environment
		onChange: handleSettingChange,
	},
});
```
