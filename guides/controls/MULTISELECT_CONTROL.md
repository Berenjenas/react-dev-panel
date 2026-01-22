# MultiSelect Control

Dropdown interface for selecting multiple options with checkbox-based selection.

## Usage

```tsx
{
  type: 'multiselect',
  value: ['red', 'blue'],
  label: 'Colors',
  options: ['red', 'green', 'blue', 'yellow'],
  onChange: setColors,
}
```

## Properties

| Property   | Type                         | Default     | Description               |
| ---------- | ---------------------------- | ----------- | ------------------------- |
| `type`     | `'multiselect'`              | —           | Control type              |
| `value`    | `string[]`                   | —           | Selected values           |
| `options`  | `string[] \| SelectOption[]` | —           | Available options         |
| `onChange` | `(value: string[]) => void`  | —           | Change handler            |
| `label`    | `string`                     | `undefined` | Display label             |
| `disabled` | `boolean`                    | `false`     | Disabled state            |
| `persist`  | `boolean`                    | `false`     | Auto-save to localStorage |

## Examples

### Feature Flags

```tsx
const [features, setFeatures] = useState<string[]>(["auth"]);

useDevPanel("Features", {
	enabled: {
		type: "multiselect",
		value: features,
		label: "Enabled Features",
		options: [
			{ label: "Authentication", value: "auth" },
			{ label: "Notifications", value: "notifications" },
			{ label: "Analytics", value: "analytics" },
			{ label: "Dark Mode", value: "darkMode" },
		],
		onChange: setFeatures,
	},
});

// Use in components
const hasAuth = features.includes("auth");
const hasNotifications = features.includes("notifications");
```

### Tag Filter

```tsx
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const tags = ["react", "typescript", "css", "testing", "performance"];

useDevPanel("Content", {
	tags: {
		type: "multiselect",
		value: selectedTags,
		label: "Filter by Tags",
		options: tags,
		onChange: setSelectedTags,
	},
});

// Filter content
const filteredContent = useMemo(() => {
	if (selectedTags.length === 0) return allContent;
	return allContent.filter((item) => selectedTags.some((tag) => item.tags.includes(tag)));
}, [allContent, selectedTags]);
```

### With Helper Buttons

```tsx
const [selected, setSelected] = useState<string[]>([]);
const allItems = ["item1", "item2", "item3", "item4"];

useDevPanel("Bulk", {
	items: {
		type: "multiselect",
		value: selected,
		label: "Items",
		options: allItems,
		onChange: setSelected,
	},
	selectAll: {
		type: "button",
		label: "Select All",
		onClick: () => setSelected([...allItems]),
	},
	clearAll: {
		type: "button",
		label: "Clear",
		onClick: () => setSelected([]),
	},
});
```

## TypeScript

```tsx
import { MultiSelectControl } from "@berenjena/react-dev-panel";

type Feature = "auth" | "notifications" | "analytics";

const control: MultiSelectControl = {
	type: "multiselect",
	value: ["auth"],
	options: [
		{ label: "Authentication", value: "auth" },
		{ label: "Notifications", value: "notifications" },
		{ label: "Analytics", value: "analytics" },
	],
	onChange: (values: string[]) => setFeatures(values as Feature[]),
};
```

## Related

-   [Select Control](./SELECT_CONTROL.md) - For single selection
-   [Boolean Control](./BOOLEAN_CONTROL.md) - For simple toggles
