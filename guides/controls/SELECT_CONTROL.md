# Select Control

Dropdown interface for choosing from predefined options.

## Usage

```tsx
{
  type: 'select',
  value: selectedValue,
  label: 'Choose Option',
  options: ['option1', 'option2', 'option3'],
  onChange: setValue,
}
```

## Properties

| Property   | Type                         | Default     | Description               |
| ---------- | ---------------------------- | ----------- | ------------------------- |
| `type`     | `'select'`                   | —           | Control type              |
| `value`    | `string`                     | —           | Selected value            |
| `options`  | `string[] \| SelectOption[]` | —           | Available options         |
| `onChange` | `(value: string) => void`    | —           | Change handler            |
| `label`    | `string`                     | `undefined` | Display label             |
| `disabled` | `boolean`                    | `false`     | Disabled state            |
| `persist`  | `boolean`                    | `false`     | Auto-save to localStorage |

## Option Types

```tsx
// Simple strings
options: ["red", "green", "blue"];

// Option objects
options: [
	{ label: "Red Color", value: "red" },
	{ label: "Green Color", value: "green" },
	{ label: "Blue Color", value: "blue" },
];
```

## Examples

### Theme Selector

```tsx
const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

useDevPanel("Appearance", {
	theme: {
		type: "select",
		value: theme,
		label: "Theme",
		options: [
			{ label: "Light", value: "light" },
			{ label: "Dark", value: "dark" },
			{ label: "Auto", value: "auto" },
		],
		onChange: setTheme,
	},
});

useEffect(() => {
	document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
```

### Environment Config

```tsx
const [env, setEnv] = useState("development");

const envUrls = {
	development: "http://localhost:3000",
	staging: "https://staging.example.com",
	production: "https://api.example.com",
};

useDevPanel("Environment", {
	environment: {
		type: "select",
		value: env,
		label: "Environment",
		options: [
			{ label: "Development", value: "development" },
			{ label: "Staging", value: "staging" },
			{ label: "Production", value: "production" },
		],
		onChange: setEnv,
	},
	apiUrl: {
		type: "text",
		value: envUrls[env as keyof typeof envUrls],
		label: "API URL",
		disabled: true,
		onChange: () => {},
	},
});
```

### Dynamic Options

```tsx
const [category, setCategory] = useState("");
const [subcategory, setSubcategory] = useState("");

const categories = {
	electronics: ["phones", "laptops", "tablets"],
	clothing: ["shirts", "pants", "shoes"],
	books: ["fiction", "non-fiction", "textbooks"],
};

const subcategoryOptions = category ? categories[category as keyof typeof categories] : [];

useEffect(() => {
	setSubcategory(""); // Reset on category change
}, [category]);

useDevPanel("Filter", {
	category: {
		type: "select",
		value: category,
		label: "Category",
		options: [{ label: "Select...", value: "" }, ...Object.keys(categories).map((c) => ({ label: c, value: c }))],
		onChange: setCategory,
	},
	subcategory: {
		type: "select",
		value: subcategory,
		label: "Subcategory",
		options: [{ label: "Select...", value: "" }, ...subcategoryOptions.map((s) => ({ label: s, value: s }))],
		disabled: !category,
		onChange: setSubcategory,
	},
});
```

## TypeScript

```tsx
import { SelectControl } from "@berenjena/react-dev-panel";

type Theme = "light" | "dark" | "auto";

const control: SelectControl = {
	type: "select",
	value: "auto",
	options: [
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" },
		{ label: "Auto", value: "auto" },
	],
	onChange: (value: string) => setTheme(value as Theme),
};
```

## Related

-   [MultiSelect Control](./MULTISELECT_CONTROL.md) - For multiple selections
-   [Boolean Control](./BOOLEAN_CONTROL.md) - For true/false choices
