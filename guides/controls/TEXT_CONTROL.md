# Text Control

The text control provides string input functionality with support for placeholders, validation, and event handling strategies.

## Basic Usage

```tsx
{
  type: 'text',
  value: textValue,
  label: 'Your Message',
  onChange: setTextValue,
}
```

## Properties

### Required Properties

| Property   | Type                      | Description                 |
| ---------- | ------------------------- | --------------------------- |
| `type`     | `'text'`                  | Control type identifier     |
| `value`    | `string`                  | Current text value          |
| `onChange` | `(value: string) => void` | Callback when value changes |

### Optional Properties

| Property      | Type                     | Default     | Description                       |
| ------------- | ------------------------ | ----------- | --------------------------------- |
| `label`       | `string`                 | `undefined` | Display label for the control     |
| `placeholder` | `string`                 | `undefined` | Placeholder text when empty       |
| `event`       | `'onChange' \| 'onBlur'` | `'onBlur'`  | When to trigger onChange callback |
| `disabled`    | `boolean`                | `false`     | Whether the control is disabled   |

## Event Handling

Text controls default to `onBlur` event handling to prevent excessive updates while typing.

### Real-time Updates (onChange)

```tsx
{
  type: 'text',
  value: searchTerm,
  label: 'Search',
  event: 'onChange', // Updates on every keystroke
  onChange: setSearchTerm,
}
```

### Deferred Updates (onBlur)

```tsx
{
  type: 'text',
  value: username,
  label: 'Username',
  event: 'onBlur', // Updates when focus is lost
  onChange: setUsername,
}
```

## Common Patterns

### Search Input with Live Updates

```tsx
const [searchTerm, setSearchTerm] = useState("");
const [results, setResults] = useState([]);

// Debounced search function
const debouncedSearch = useDebounceCallback(async (term: string) => {
	if (term.length > 2) {
		const searchResults = await searchAPI(term);
		setResults(searchResults);
	}
}, 300);

useDevPanel("Search", {
	searchTerm: {
		type: "text",
		value: searchTerm,
		label: `Search (${results.length} results)`,
		placeholder: "Type to search...",
		event: "onChange",
		onChange: (value: string) => {
			setSearchTerm(value);
			debouncedSearch(value);
		},
	},
});
```

### Form Input with Validation

```tsx
const [email, setEmail] = useState("");
const [isValid, setIsValid] = useState(true);

const validateEmail = (value: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const valid = emailRegex.test(value);
	setIsValid(valid);
	return valid;
};

useDevPanel("User Info", {
	email: {
		type: "text",
		value: email,
		label: `Email ${isValid ? "✅" : "❌"}`,
		placeholder: "user@example.com",
		event: "onBlur",
		onChange: (value: string) => {
			setEmail(value);
			validateEmail(value);
		},
	},
});
```

### Multi-line Text (Textarea-like)

```tsx
const [description, setDescription] = useState("");

useDevPanel("Content", {
	description: {
		type: "text",
		value: description,
		label: "Description",
		placeholder: "Enter a detailed description...",
		onChange: setDescription,
	},
});
```

## Styling

Text controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 32px; /* Control height */
	--dev-panel-input-background-color: #2a2a2a; /* Background */
	--dev-panel-text-color: #ffffff; /* Text color */
	--dev-panel-border-color: #333333; /* Border color */
	--dev-panel-accent-color: #ff6200; /* Focus color */
}
```

### Custom Styling

```css
/* Target specific text controls */
.dev-panel-text-control {
	--dev-panel-inputs-height: 40px;
}

/* Focus states */
.dev-panel-text-control input:focus {
	outline: 2px solid var(--dev-panel-accent-color);
	outline-offset: 2px;
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Enter**: Submit (if within a form)
-   **Escape**: Clear focus

### Screen Reader Support

-   Proper labeling with `aria-label`
-   Form association with `htmlFor`
-   Error state announcements

### Best Practices

```tsx
// ✅ Good: Clear, descriptive labels
{
  type: 'text',
  value: firstName,
  label: 'First Name',
  placeholder: 'Enter your first name',
  onChange: setFirstName,
}

// ❌ Avoid: Vague or missing labels
{
  type: 'text',
  value: name,
  placeholder: 'Name', // Label would be better
  onChange: setName,
}
```

## TypeScript

The text control provides full TypeScript support:

```tsx
import { TextControl } from "@berenjena/react-dev-panel";

interface FormData {
	username: string;
	email: string;
}

const [formData, setFormData] = useState<FormData>({
	username: "",
	email: "",
});

useDevPanel("Form", {
	username: {
		type: "text",
		value: formData.username,
		label: "Username",
		onChange: (value: string) => setFormData((prev) => ({ ...prev, username: value })),
	} satisfies TextControl,
});
```

## Performance Considerations

### Debouncing for Expensive Operations

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

const expensiveOperation = useDebounceCallback(async (value: string) => {
	// API call, validation, etc.
	await processValue(value);
}, 500);

useDevPanel("Settings", {
	setting: {
		type: "text",
		value: setting,
		event: "onChange",
		onChange: expensiveOperation,
	},
});
```

### Memoization for Complex Validators

```tsx
const validator = useMemo(() => createValidator(complexRules), [complexRules]);

useDevPanel("Validation", {
	input: {
		type: "text",
		value: inputValue,
		onChange: (value: string) => {
			setInputValue(value);
			validator(value);
		},
	},
});
```

## Related Controls

-   **[Number Control](./NUMBER_CONTROL.md)** - For numeric input
-   **[Select Control](./SELECT_CONTROL.md)** - For predefined options
-   **[Color Control](./COLOR_CONTROL.md)** - For color values as text
