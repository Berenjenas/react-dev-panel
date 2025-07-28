# Button Control

The button control provides a clickable interface for triggering actions without managing state values.

## Basic Usage

```tsx
{
  type: 'button',
  label: 'Reset Values',
  onClick: () => resetToDefaults(),
}
```

## Properties

### Required Properties

| Property  | Type         | Description                     |
| --------- | ------------ | ------------------------------- |
| `type`    | `'button'`   | Control type identifier         |
| `label`   | `string`     | Button text                     |
| `onClick` | `() => void` | Callback when button is clicked |

### Optional Properties

| Property   | Type      | Default | Description                    |
| ---------- | --------- | ------- | ------------------------------ |
| `disabled` | `boolean` | `false` | Whether the button is disabled |

## Common Patterns

### Action Triggers

```tsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const loadData = async () => {
	setIsLoading(true);
	try {
		const response = await fetch("/api/data");
		const newData = await response.json();
		setData(newData);
	} catch (error) {
		console.error("Failed to load data:", error);
	} finally {
		setIsLoading(false);
	}
};

const clearData = () => {
	setData([]);
};

useDevPanel("Data Management", {
	loadData: {
		type: "button",
		label: isLoading ? "Loading..." : "Load Data",
		disabled: isLoading,
		onClick: loadData,
	},
	clearData: {
		type: "button",
		label: "Clear Data",
		disabled: data.length === 0,
		onClick: clearData,
	},
	separator: { type: "separator" },
	dataCount: {
		type: "text",
		value: `${data.length} items`,
		label: "Current Data",
		disabled: true,
		onChange: () => {},
	},
});
```

### State Reset Functions

```tsx
const [form, setForm] = useState({
	name: "",
	email: "",
	message: "",
});

const resetForm = () => {
	setForm({
		name: "",
		email: "",
		message: "",
	});
};

const fillSampleData = () => {
	setForm({
		name: "John Doe",
		email: "john.doe@example.com",
		message: "This is a sample message for testing.",
	});
};

useDevPanel("Form Actions", {
	name: {
		type: "text",
		value: form.name,
		label: "Name",
		onChange: (value) => setForm((prev) => ({ ...prev, name: value })),
	},
	email: {
		type: "text",
		value: form.email,
		label: "Email",
		onChange: (value) => setForm((prev) => ({ ...prev, email: value })),
	},
	message: {
		type: "text",
		value: form.message,
		label: "Message",
		onChange: (value) => setForm((prev) => ({ ...prev, message: value })),
	},
	separator: { type: "separator" },
	fillSample: {
		type: "button",
		label: "Fill Sample Data",
		onClick: fillSampleData,
	},
	reset: {
		type: "button",
		label: "Reset Form",
		onClick: resetForm,
	},
});
```

### Development Tools

```tsx
const [logs, setLogs] = useState<string[]>([]);

const addLog = (message: string) => {
	setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
};

const clearLogs = () => {
	setLogs([]);
};

const exportLogs = () => {
	const logText = logs.join("\n");
	const blob = new Blob([logText], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "debug-logs.txt";
	link.click();
	URL.revokeObjectURL(url);
};

const triggerError = () => {
	try {
		throw new Error("Test error for debugging");
	} catch (error) {
		console.error(error);
		addLog(`Error: ${error.message}`);
	}
};

useDevPanel("Debug Tools", {
	triggerError: {
		type: "button",
		label: "Trigger Test Error",
		onClick: triggerError,
	},
	addInfo: {
		type: "button",
		label: "Add Info Log",
		onClick: () => addLog("Info: Debug information logged"),
	},
	separator1: { type: "separator", style: "space" },
	exportLogs: {
		type: "button",
		label: "Export Logs",
		disabled: logs.length === 0,
		onClick: exportLogs,
	},
	clearLogs: {
		type: "button",
		label: "Clear Logs",
		disabled: logs.length === 0,
		onClick: clearLogs,
	},
	separator2: { type: "separator", style: "label", label: "Log Count" },
	logCount: {
		type: "text",
		value: `${logs.length} logs`,
		label: "Total Logs",
		disabled: true,
		onChange: () => {},
	},
});
```

### API Testing

```tsx
const [apiResponse, setApiResponse] = useState(null);
const [isTestingAPI, setIsTestingAPI] = useState(false);

const testAPI = async (endpoint: string) => {
	setIsTestingAPI(true);
	try {
		const response = await fetch(endpoint);
		const data = await response.json();
		setApiResponse({
			status: response.status,
			data,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		setApiResponse({
			error: error.message,
			timestamp: new Date().toISOString(),
		});
	} finally {
		setIsTestingAPI(false);
	}
};

useDevPanel("API Testing", {
	testUsers: {
		type: "button",
		label: isTestingAPI ? "Testing..." : "Test /api/users",
		disabled: isTestingAPI,
		onClick: () => testAPI("/api/users"),
	},
	testPosts: {
		type: "button",
		label: isTestingAPI ? "Testing..." : "Test /api/posts",
		disabled: isTestingAPI,
		onClick: () => testAPI("/api/posts"),
	},
	clearResponse: {
		type: "button",
		label: "Clear Response",
		disabled: !apiResponse,
		onClick: () => setApiResponse(null),
	},
});
```

### Mock Data Generation

```tsx
const [users, setUsers] = useState([]);

const generateUser = () => {
	const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana"];
	const lastNames = ["Smith", "Johnson", "Brown", "Davis", "Wilson", "Moore"];

	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

	return {
		id: Date.now() + Math.random(),
		name: `${firstName} ${lastName}`,
		email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
		active: Math.random() > 0.3,
	};
};

const addUser = () => {
	setUsers((prev) => [...prev, generateUser()]);
};

const addMultipleUsers = (count: number) => {
	const newUsers = Array.from({ length: count }, generateUser);
	setUsers((prev) => [...prev, ...newUsers]);
};

const clearUsers = () => {
	setUsers([]);
};

useDevPanel("Mock Data", {
	addOne: {
		type: "button",
		label: "Add 1 User",
		onClick: addUser,
	},
	addFive: {
		type: "button",
		label: "Add 5 Users",
		onClick: () => addMultipleUsers(5),
	},
	addTwenty: {
		type: "button",
		label: "Add 20 Users",
		onClick: () => addMultipleUsers(20),
	},
	separator: { type: "separator" },
	clearAll: {
		type: "button",
		label: "Clear All Users",
		disabled: users.length === 0,
		onClick: clearUsers,
	},
	userCount: {
		type: "text",
		value: `${users.length} users`,
		label: "Total Users",
		disabled: true,
		onChange: () => {},
	},
});
```

## Advanced Patterns

### Async Operations with Status

```tsx
const [operationStatus, setOperationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

const performOperation = async () => {
	setOperationStatus("loading");
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async work
		setOperationStatus("success");
		setTimeout(() => setOperationStatus("idle"), 3000); // Reset after 3 seconds
	} catch (error) {
		setOperationStatus("error");
		setTimeout(() => setOperationStatus("idle"), 3000);
	}
};

const getButtonLabel = () => {
	switch (operationStatus) {
		case "loading":
			return "Processing...";
		case "success":
			return "✅ Success!";
		case "error":
			return "❌ Failed";
		default:
			return "Start Operation";
	}
};

useDevPanel("Async Operation", {
	operation: {
		type: "button",
		label: getButtonLabel(),
		disabled: operationStatus === "loading",
		onClick: performOperation,
	},
});
```

### Confirmation Dialogs

```tsx
const [confirmDelete, setConfirmDelete] = useState(false);
const [data, setData] = useState(["item1", "item2", "item3"]);

const deleteAllData = () => {
	if (confirmDelete) {
		setData([]);
		setConfirmDelete(false);
	} else {
		setConfirmDelete(true);
		// Reset confirmation after 5 seconds
		setTimeout(() => setConfirmDelete(false), 5000);
	}
};

useDevPanel("Dangerous Actions", {
	deleteAll: {
		type: "button",
		label: confirmDelete ? "⚠️ Click again to confirm" : "Delete All Data",
		disabled: data.length === 0,
		onClick: deleteAllData,
	},
});
```

## Styling

Button controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-button-height: 28px; /* Button height */
	--dev-panel-accent-color: #ff6200; /* Button color */
	--dev-panel-text-color: #ffffff; /* Button text */
	--dev-panel-transition: all 0.2s ease; /* Hover animation */
}
```

### Custom Button Styling

```css
/* Target button controls specifically */
.dev-panel-button-control {
	--dev-panel-button-height: 32px;
	--dev-panel-accent-color: #28a745; /* Green buttons */
}

/* Different button types */
.dev-panel-button-control.danger {
	--dev-panel-accent-color: #dc3545; /* Red for dangerous actions */
}

.dev-panel-button-control.secondary {
	--dev-panel-accent-color: #6c757d; /* Gray for secondary actions */
}

/* Hover and active states */
.dev-panel-button-control button:hover {
	opacity: var(--dev-panel-hover-opacity, 0.8);
}

.dev-panel-button-control button:active {
	transform: translateY(1px);
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Enter**: Activate button
-   **Space**: Activate button

### Screen Reader Support

-   Proper button role and labeling
-   State announcements (disabled, loading)
-   Focus management

### Best Practices

```tsx
// ✅ Good: Clear, action-oriented labels
{
  type: 'button',
  label: 'Save Changes',
  onClick: saveChanges,
}

// ✅ Good: State indication in label
{
  type: 'button',
  label: isLoading ? 'Saving...' : 'Save Changes',
  disabled: isLoading,
  onClick: saveChanges,
}

// ❌ Avoid: Vague labels
{
  type: 'button',
  label: 'Click',
  onClick: doSomething,
}
```

## TypeScript

The button control provides full TypeScript support:

```tsx
import { ButtonControl } from "@berenjena/react-dev-panel";

interface Actions {
	onSave: () => void;
	onReset: () => void;
	onDelete: () => Promise<void>;
}

function ActionPanel({ onSave, onReset, onDelete }: Actions) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await onDelete();
		} finally {
			setIsDeleting(false);
		}
	};

	useDevPanel("Actions", {
		save: {
			type: "button",
			label: "Save",
			onClick: onSave,
		} satisfies ButtonControl,

		reset: {
			type: "button",
			label: "Reset",
			onClick: onReset,
		} satisfies ButtonControl,

		delete: {
			type: "button",
			label: isDeleting ? "Deleting..." : "Delete",
			disabled: isDeleting,
			onClick: handleDelete,
		} satisfies ButtonControl,
	});

	return <DevPanel />;
}
```

## Related Controls

-   **[Button Group Control](./BUTTON_GROUP_CONTROL.md)** - For multiple related buttons
-   **[Boolean Control](./BOOLEAN_CONTROL.md)** - For toggle actions
-   **[Select Control](./SELECT_CONTROL.md)** - For choosing between options
