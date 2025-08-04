# MultiSelect Control

The MultiSelect control provides a dropdown interface for selecting multiple options from predefined choices, featuring checkbox-based selection and portal rendering to prevent overflow clipping.

## Basic Usage

```tsx
{
  type: 'multiselect',
  value: ['red', 'blue'],
  label: 'Choose Colors',
  options: ['red', 'green', 'blue', 'yellow'],
  onChange: setSelectedColors,
}
```

## Properties

### Required Properties

| Property   | Type                         | Description                     |
| ---------- | ---------------------------- | ------------------------------- |
| `type`     | `'multiselect'`              | Control type identifier         |
| `value`    | `string[]`                   | Array of selected values        |
| `options`  | `string[] \| SelectOption[]` | Available options               |
| `onChange` | `(value: string[]) => void`  | Callback when selection changes |

### Optional Properties

| Property      | Type      | Default     | Description                     |
| ------------- | --------- | ----------- | ------------------------------- |
| `label`       | `string`  | `undefined` | Display label for the control   |
| `description` | `string`  | `undefined` | Help text for the control       |
| `disabled`    | `boolean` | `false`     | Whether the control is disabled |

### Option Types

```tsx
// Simple string array
options: ["apple", "banana", "cherry"];

// Option objects with labels
options: [
	{ label: "Red Apple", value: "apple" },
	{ label: "Yellow Banana", value: "banana" },
	{ label: "Red Cherry", value: "cherry" },
];
```

## Event Handling

MultiSelect controls use `onChange` event handling for immediate selection feedback. The callback receives an array of selected values.

```tsx
{
  type: 'multiselect',
  value: selectedFrameworks,
  label: 'Frontend Frameworks',
  options: [
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ],
  onChange: (values) => {
    console.log('Selected frameworks:', values);
    setSelectedFrameworks(values);
  },
}
```

## Common Patterns

### Framework Selection

```tsx
const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react"]);

const frameworks = [
	{ label: "React", value: "react" },
	{ label: "Vue.js", value: "vue" },
	{ label: "Angular", value: "angular" },
	{ label: "Svelte", value: "svelte" },
];

useDevPanel("Configuration", {
	frameworks: {
		type: "multiselect",
		value: selectedFrameworks,
		label: "Frontend Frameworks",
		description: "Choose your preferred frameworks",
		options: frameworks,
		onChange: setSelectedFrameworks,
	},
});

// Use selections for conditional logic
const usesModernFramework = selectedFrameworks.some((fw) => ["react", "vue", "angular", "svelte"].includes(fw));
```

### Feature Flags

```tsx
const [enabledFeatures, setEnabledFeatures] = useState<string[]>(["auth"]);

const features = [
	{ label: "Authentication", value: "auth" },
	{ label: "Notifications", value: "notifications" },
	{ label: "Dark Mode", value: "darkMode" },
	{ label: "Analytics", value: "analytics" },
];

useDevPanel("Features", {
	activeFeatures: {
		type: "multiselect",
		value: enabledFeatures,
		label: "Enabled Features",
		description: "Toggle application features",
		options: features,
		onChange: setEnabledFeatures,
	},
});

// Use in components
const hasAuth = enabledFeatures.includes("auth");
const hasNotifications = enabledFeatures.includes("notifications");
```

### Tag Selection

```tsx
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const availableTags = ["react", "typescript", "css", "testing", "performance"];

useDevPanel("Content", {
	tags: {
		type: "multiselect",
		value: selectedTags,
		label: "Content Tags",
		description: "Select relevant tags",
		options: availableTags,
		onChange: setSelectedTags,
	},
});

// Filter content based on selected tags
const filteredContent = useMemo(() => {
	if (selectedTags.length === 0) return allContent;
	return allContent.filter((item) => selectedTags.some((tag) => item.tags.includes(tag)));
}, [allContent, selectedTags]);
```

## Advanced Usage

### Dynamic Options

```tsx
const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
const [userOptions, setUserOptions] = useState<SelectOption[]>([]);

useEffect(() => {
	const loadUsers = async () => {
		const users = await fetchUsers();
		setUserOptions(
			users.map((user) => ({
				label: `${user.name} (${user.email})`,
				value: user.id,
			})),
		);
	};
	loadUsers();
}, []);

useDevPanel("Team", {
	members: {
		type: "multiselect",
		value: selectedUsers,
		label: "Team Members",
		description: "Select project team members",
		options: userOptions,
		onChange: setSelectedUsers,
	},
});
```

### With Helper Controls

```tsx
const [selectedItems, setSelectedItems] = useState<string[]>([]);
const allItems = ["item1", "item2", "item3", "item4"];

useDevPanel("Bulk Actions", {
	items: {
		type: "multiselect",
		value: selectedItems,
		label: "Items",
		options: allItems,
		onChange: setSelectedItems,
	},

	// Helper buttons
	selectAll: {
		type: "button",
		label: "Select All",
		onClick: () => setSelectedItems([...allItems]),
	},

	clearAll: {
		type: "button",
		label: "Clear All",
		onClick: () => setSelectedItems([]),
	},
});
```

### Conditional Rendering

```tsx
const [enabledModules, setEnabledModules] = useState<string[]>(["core"]);

const modules = [
	{ label: "Core Module", value: "core" },
	{ label: "Advanced Features", value: "advanced" },
	{ label: "Admin Panel", value: "admin" },
];

useDevPanel("Modules", {
	activeModules: {
		type: "multiselect",
		value: enabledModules,
		label: "Active Modules",
		options: modules,
		onChange: setEnabledModules,
	},

	// Show additional controls based on selection
	...(enabledModules.includes("admin") && {
		adminSettings: {
			type: "boolean",
			value: adminEnabled,
			label: "Enable Admin Features",
			onChange: setAdminEnabled,
		},
	}),
});
```

## Portal Rendering

The MultiSelect control uses React Portal for dropdown rendering, preventing clipping issues:

```tsx
// Dropdown renders outside normal DOM hierarchy
// Works even in containers with overflow:hidden
{
  type: 'multiselect',
  value: selectedItems,
  label: 'Long Options List',
  options: veryLongOptionsList, // 100+ options
  onChange: setSelectedItems,
}
```

## Styling

MultiSelect controls inherit styling from the global CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 32px;
	--dev-panel-input-background-color: #2a2a2a;
	--dev-panel-input-border-color: #333333;
	--dev-panel-accent-color: #ff6200;
	--dev-panel-border-radius: 4px;
}
```

## TypeScript Support

Full TypeScript support with proper type inference:

```tsx
import { MultiSelectControl } from "@berenjena/react-dev-panel";

type Theme = "light" | "dark" | "auto";
type Feature = "auth" | "notifications" | "analytics";

interface AppConfig {
	themes: Theme[];
	features: Feature[];
}

const [config, setConfig] = useState<AppConfig>({
	themes: ["light"],
	features: ["auth"],
});

useDevPanel("App Configuration", {
	themes: {
		type: "multiselect",
		value: config.themes,
		label: "Supported Themes",
		options: [
			{ label: "Light Theme", value: "light" },
			{ label: "Dark Theme", value: "dark" },
			{ label: "Auto Theme", value: "auto" },
		],
		onChange: (themes: Theme[]) => setConfig((prev) => ({ ...prev, themes })),
	} satisfies MultiSelectControl,
});
```

## Related Controls

-   **[Select Control](./SELECT_CONTROL.md)** - For single selection
-   **[Boolean Control](./BOOLEAN_CONTROL.md)** - For simple true/false choices
-   **[Button Group Control](./BUTTON_GROUP_CONTROL.md)** - For action-based selections
-   **[Text Control](./TEXT_CONTROL.md)** - For free-form input
