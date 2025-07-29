# Select Control

The select control provides a dropdown interface for choosing from predefined options, supporting both simple arrays and complex option objects.

## Basic Usage

```tsx
{
  type: 'select',
  value: selectedValue,
  label: 'Choose Option',
  options: ['option1', 'option2', 'option3'],
  onChange: setSelectedValue,
}
```

## Properties

### Required Properties

| Property   | Type                         | Description                     |
| ---------- | ---------------------------- | ------------------------------- |
| `type`     | `'select'`                   | Control type identifier         |
| `value`    | `string`                     | Currently selected value        |
| `options`  | `string[] \| SelectOption[]` | Available options               |
| `onChange` | `(value: string) => void`    | Callback when selection changes |

### Optional Properties

| Property   | Type      | Default     | Description                     |
| ---------- | --------- | ----------- | ------------------------------- |
| `label`    | `string`  | `undefined` | Display label for the control   |
| `disabled` | `boolean` | `false`     | Whether the control is disabled |

### Option Types

```tsx
// Simple string array
options: ["red", "green", "blue"];

// Option objects with labels
options: [
	{ label: "Red Color", value: "red" },
	{ label: "Green Color", value: "green" },
	{ label: "Blue Color", value: "blue" },
];
```

## Event Handling

Select controls always use `onChange` event handling for immediate selection feedback.

```tsx
{
  type: 'select',
  value: theme,
  label: 'Theme',
  options: ['light', 'dark', 'auto'],
  onChange: setTheme, // Triggered immediately on selection
}
```

## Common Patterns

### Theme Selector

```tsx
const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

useDevPanel("Appearance", {
	theme: {
		type: "select",
		value: theme,
		label: "Color Theme",
		options: [
			{ label: "☀️ Light", value: "light" },
			{ label: "🌙 Dark", value: "dark" },
			{ label: "🔄 Auto", value: "auto" },
		],
		onChange: setTheme,
	},
});

// Apply theme
useEffect(() => {
	document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
```

### Environment Configuration

```tsx
const [environment, setEnvironment] = useState("development");
const [apiUrl, setApiUrl] = useState("");

const environments = {
	development: "http://localhost:3000",
	staging: "https://staging.example.com",
	production: "https://api.example.com",
};

useEffect(() => {
	setApiUrl(environments[environment as keyof typeof environments]);
}, [environment]);

useDevPanel("Environment", {
	environment: {
		type: "select",
		value: environment,
		label: "Environment",
		options: [
			{ label: "🛠️ Development", value: "development" },
			{ label: "🧪 Staging", value: "staging" },
			{ label: "🚀 Production", value: "production" },
		],
		onChange: setEnvironment,
	},
	apiUrl: {
		type: "text",
		value: apiUrl,
		label: "API URL",
		disabled: true, // Read-only, derived from environment
		onChange: () => {},
	},
});
```

### Language Selector

```tsx
const [language, setLanguage] = useState("en");

const languages = [
	{ label: "🇺🇸 English", value: "en" },
	{ label: "🇪🇸 Español", value: "es" },
	{ label: "🇫🇷 Français", value: "fr" },
	{ label: "🇩🇪 Deutsch", value: "de" },
	{ label: "🇮🇹 Italiano", value: "it" },
];

useDevPanel("Localization", {
	language: {
		type: "select",
		value: language,
		label: "Language",
		options: languages,
		onChange: setLanguage,
	},
});
```

### Status Selector with Styling

```tsx
const [status, setStatus] = useState<"active" | "inactive" | "pending">("active");

const statusOptions = [
	{ label: "🟢 Active", value: "active" },
	{ label: "🔴 Inactive", value: "inactive" },
	{ label: "🟡 Pending", value: "pending" },
];

useDevPanel("User Status", {
	status: {
		type: "select",
		value: status,
		label: "Current Status",
		options: statusOptions,
		onChange: setStatus,
	},
});

// Use status for conditional rendering
const getStatusColor = (status: string) => {
	switch (status) {
		case "active":
			return "#28a745";
		case "inactive":
			return "#dc3545";
		case "pending":
			return "#ffc107";
		default:
			return "#6c757d";
	}
};
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

const categoryOptions = Object.keys(categories).map((cat) => ({
	label: cat.charAt(0).toUpperCase() + cat.slice(1),
	value: cat,
}));

const subcategoryOptions = category
	? categories[category as keyof typeof categories].map((sub) => ({
			label: sub.charAt(0).toUpperCase() + sub.slice(1),
			value: sub,
	  }))
	: [];

// Reset subcategory when category changes
useEffect(() => {
	setSubcategory("");
}, [category]);

useDevPanel("Product Filter", {
	category: {
		type: "select",
		value: category,
		label: "Category",
		options: [{ label: "Select Category...", value: "" }, ...categoryOptions],
		onChange: setCategory,
	},
	subcategory: {
		type: "select",
		value: subcategory,
		label: "Subcategory",
		options: [{ label: "Select Subcategory...", value: "" }, ...subcategoryOptions],
		disabled: !category,
		onChange: setSubcategory,
	},
});
```

## Advanced Features

### Grouped Options

```tsx
const [font, setFont] = useState("Arial");

// Note: This shows the concept - actual implementation may vary
const fontOptions = [
	{ label: "--- Sans Serif ---", value: "", disabled: true },
	{ label: "Arial", value: "Arial" },
	{ label: "Helvetica", value: "Helvetica" },
	{ label: "Verdana", value: "Verdana" },
	{ label: "--- Serif ---", value: "", disabled: true },
	{ label: "Times New Roman", value: "Times New Roman" },
	{ label: "Georgia", value: "Georgia" },
	{ label: "Garamond", value: "Garamond" },
];

useDevPanel("Typography", {
	font: {
		type: "select",
		value: font,
		label: "Font Family",
		options: fontOptions,
		onChange: setFont,
	},
});
```

### Multi-level Selection

```tsx
const [region, setRegion] = useState("");
const [country, setCountry] = useState("");
const [city, setCity] = useState("");

const locationData = {
	"north-america": {
		label: "North America",
		countries: {
			us: { label: "United States", cities: ["New York", "Los Angeles", "Chicago"] },
			ca: { label: "Canada", cities: ["Toronto", "Vancouver", "Montreal"] },
		},
	},
	europe: {
		label: "Europe",
		countries: {
			uk: { label: "United Kingdom", cities: ["London", "Manchester", "Edinburgh"] },
			fr: { label: "France", cities: ["Paris", "Lyon", "Marseille"] },
		},
	},
};

useDevPanel("Location", {
	region: {
		type: "select",
		value: region,
		label: "Region",
		options: [
			{ label: "Select Region...", value: "" },
			...Object.entries(locationData).map(([key, data]) => ({
				label: data.label,
				value: key,
			})),
		],
		onChange: (value) => {
			setRegion(value);
			setCountry("");
			setCity("");
		},
	},
	country: {
		type: "select",
		value: country,
		label: "Country",
		options: region
			? [
					{ label: "Select Country...", value: "" },
					...Object.entries(locationData[region].countries).map(([key, data]) => ({
						label: data.label,
						value: key,
					})),
			  ]
			: [{ label: "Select Region first", value: "" }],
		disabled: !region,
		onChange: (value) => {
			setCountry(value);
			setCity("");
		},
	},
	city: {
		type: "select",
		value: city,
		label: "City",
		options:
			country && region
				? [
						{ label: "Select City...", value: "" },
						...locationData[region].countries[country].cities.map((city) => ({
							label: city,
							value: city.toLowerCase().replace(" ", "-"),
						})),
				  ]
				: [{ label: "Select Country first", value: "" }],
		disabled: !country,
		onChange: setCity,
	},
});
```

## Styling

Select controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 24px; /* Control height */
	--dev-panel-input-background-color: #2a2a2a; /* Background */
	--dev-panel-text-color: #ffffff; /* Text color */
	--dev-panel-border-color: #333333; /* Border color */
	--dev-panel-accent-color: #ff6200; /* Focus color */
}
```

### Custom Select Styling

```css
/* Target select controls specifically */
.dev-panel-select-control {
	--dev-panel-inputs-height: 32px;
}

/* Custom dropdown arrow */
.dev-panel-select-control select {
	appearance: none;
	background-image: url("data:image/svg+xml,..."); /* Custom arrow */
	background-repeat: no-repeat;
	background-position: right 8px center;
	padding-right: 32px;
}

/* Focus states */
.dev-panel-select-control select:focus {
	outline: 2px solid var(--dev-panel-accent-color);
	outline-offset: 2px;
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Arrow Up/Down**: Navigate through options
-   **Enter/Space**: Open dropdown
-   **Escape**: Close dropdown
-   **Home**: First option
-   **End**: Last option

### Screen Reader Support

-   Announces selected option
-   Provides option count and position
-   Supports aria-describedby for additional context

### Best Practices

```tsx
// ✅ Good: Clear option labels
{
  type: 'select',
  value: priority,
  label: 'Task Priority',
  options: [
    { label: 'Low Priority', value: 'low' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'High Priority', value: 'high' },
    { label: 'Critical Priority', value: 'critical' },
  ],
  onChange: setPriority,
}

// ❌ Avoid: Unclear or abbreviated options
{
  type: 'select',
  value: priority,
  options: ['L', 'M', 'H', 'C'],
  onChange: setPriority,
}
```

## TypeScript

The select control provides full TypeScript support:

```tsx
import { SelectControl } from "@berenjena/react-dev-panel";

type Theme = "light" | "dark" | "auto";

interface AppSettings {
	theme: Theme;
	language: string;
	timezone: string;
}

const [settings, setSettings] = useState<AppSettings>({
	theme: "auto",
	language: "en",
	timezone: "UTC",
});

const themeOptions: { label: string; value: Theme }[] = [
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
	{ label: "Auto", value: "auto" },
];

useDevPanel("Settings", {
	theme: {
		type: "select",
		value: settings.theme,
		label: "Theme",
		options: themeOptions,
		onChange: (value: Theme) => setSettings((prev) => ({ ...prev, theme: value })),
	} satisfies SelectControl,
});
```

## Performance Considerations

### Large Option Lists

```tsx
// For large datasets, consider virtualization or filtering
const [searchTerm, setSearchTerm] = useState("");
const [selectedCountry, setSelectedCountry] = useState("");

const allCountries = ["Afghanistan", "Albania" /* ... 200+ countries */];
const filteredCountries = useMemo(() => allCountries.filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

useDevPanel("Location", {
	search: {
		type: "text",
		value: searchTerm,
		label: "Search Countries",
		placeholder: "Type to filter...",
		onChange: setSearchTerm,
	},
	country: {
		type: "select",
		value: selectedCountry,
		label: `Country (${filteredCountries.length} options)`,
		options: [{ label: "Select Country...", value: "" }, ...filteredCountries.map((country) => ({ label: country, value: country }))],
		onChange: setSelectedCountry,
	},
});
```

## Related Controls

-   **[Boolean Control](./BOOLEAN_CONTROL.md)** - For true/false choices
-   **[Button Group Control](./BUTTON_GROUP_CONTROL.md)** - For action-based selections
-   **[Text Control](./TEXT_CONTROL.md)** - For free-form input
