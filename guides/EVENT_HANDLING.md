# Event Handling

Input controls support two event strategies.

## Event Types

### `onChange` (Default)

Updates on every keystroke/interaction.

**Use for:**

-   Live previews
-   Simple state updates
-   Real-time validation

```tsx
{
  type: "text",
  value: searchTerm,
  event: "onChange", // Real-time (default)
  onChange: setSearchTerm
}
```

### `onBlur`

Updates only when control loses focus.

**Use for:**

-   API calls
-   Expensive operations
-   Complex validations

```tsx
{
  type: "text",
  value: apiKey,
  event: "onBlur", // Update on blur
  onChange: validateAndSetApiKey
}
```

## Examples

### Real-time Search

```tsx
const [search, setSearch] = useState("");

useDevPanel("Search", {
	query: {
		type: "text",
		value: search,
		event: "onChange", // Immediate filtering
		onChange: setSearch,
	},
});
```

### API Configuration

```tsx
const [url, setUrl] = useState("");

const validateUrl = async (value: string) => {
	setUrl(value);
	await testConnection(value); // Expensive
};

useDevPanel("API", {
	endpoint: {
		type: "text",
		value: url,
		event: "onBlur", // Only validate on blur
		onChange: validateUrl,
	},
});
```

## Debouncing (Alternative)

For `onChange` with expensive operations, use debouncing:

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

const debouncedSearch = useDebounceCallback((value: string) => {
	performExpensiveSearch(value);
}, 300);

useDevPanel("Search", {
	query: {
		type: "text",
		value: search,
		event: "onChange",
		onChange: (value) => {
			setSearch(value);
			debouncedSearch(value);
		},
	},
});
```

## Quick Decision Guide

| Scenario             | Use                  |
| -------------------- | -------------------- |
| Live preview         | `onChange`           |
| Simple state         | `onChange`           |
| API calls            | `onBlur`             |
| Validation (network) | `onBlur`             |
| Heavy computation    | `onBlur` or debounce |
| Form submission      | `onBlur`             |
