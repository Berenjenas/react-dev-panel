# Button Control

Clickable control for triggering actions without managing state values.

## Usage

```tsx
{
  type: 'button',
  label: 'Reset Values',
  onClick: () => resetToDefaults(),
}
```

## Properties

| Property   | Type         | Default | Description    |
| ---------- | ------------ | ------- | -------------- |
| `type`     | `'button'`   | —       | Control type   |
| `label`    | `string`     | —       | Button text    |
| `onClick`  | `() => void` | —       | Click handler  |
| `disabled` | `boolean`    | `false` | Disabled state |

## Examples

### Action Triggers

```tsx
const [data, setData] = useState([]);

useDevPanel("Data", {
	loadData: {
		type: "button",
		label: "Load Data",
		onClick: async () => {
			const response = await fetch("/api/data");
			setData(await response.json());
		},
	},
	clearData: {
		type: "button",
		label: "Clear Data",
		disabled: data.length === 0,
		onClick: () => setData([]),
	},
});
```

### With Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

useDevPanel("Actions", {
	save: {
		type: "button",
		label: isLoading ? "Saving..." : "Save Changes",
		disabled: isLoading,
		onClick: async () => {
			setIsLoading(true);
			await saveData();
			setIsLoading(false);
		},
	},
});
```

### Confirmation Pattern

```tsx
const [confirmDelete, setConfirmDelete] = useState(false);

useDevPanel("Actions", {
	delete: {
		type: "button",
		label: confirmDelete ? "Click again to confirm" : "Delete All",
		onClick: () => {
			if (confirmDelete) {
				deleteAllData();
				setConfirmDelete(false);
			} else {
				setConfirmDelete(true);
				setTimeout(() => setConfirmDelete(false), 5000);
			}
		},
	},
});
```

## TypeScript

```tsx
import { ButtonControl } from "@berenjena/react-dev-panel";

const control: ButtonControl = {
	type: "button",
	label: "Save",
	onClick: handleSave,
};
```

## Related

-   [Button Group Control](./BUTTON_GROUP_CONTROL.md) - Multiple related buttons
-   [Boolean Control](./BOOLEAN_CONTROL.md) - Toggle actions
