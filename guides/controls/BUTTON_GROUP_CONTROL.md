# Button Group Control

The button group control provides a set of related action buttons that can work together as a cohesive interface element, perfect for toolbars, tabs, and multi-action workflows.

## Basic Usage

```tsx
{
  type: 'buttonGroup',
  buttons: [
    { label: 'Save', onClick: handleSave },
    { label: 'Cancel', onClick: handleCancel },
  ],
}
```

## Properties

### Required Properties

| Property  | Type             | Description                    |
| --------- | ---------------- | ------------------------------ |
| `type`    | `'buttonGroup'`  | Control type identifier        |
| `buttons` | `ButtonConfig[]` | Array of button configurations |

### ButtonConfig Properties

| Property   | Type                                   | Default       | Description                    |
| ---------- | -------------------------------------- | ------------- | ------------------------------ |
| `label`    | `string`                               | Required      | Button text content            |
| `onClick`  | `() => void`                           | Required      | Button click handler           |
| `disabled` | `boolean`                              | `false`       | Whether button is disabled     |
| `variant`  | `'primary' \| 'secondary' \| 'danger'` | `'secondary'` | Button style variant           |
| `icon`     | `string`                               | `undefined`   | Icon to display (emoji/symbol) |
| `size`     | `'small' \| 'medium' \| 'large'`       | `'medium'`    | Button size                    |

### Optional Properties

| Property      | Type                               | Default        | Description                       |
| ------------- | ---------------------------------- | -------------- | --------------------------------- |
| `label`       | `string`                           | `undefined`    | Label for the entire button group |
| `orientation` | `'horizontal' \| 'vertical'`       | `'horizontal'` | Layout direction                  |
| `spacing`     | `'compact' \| 'normal' \| 'loose'` | `'normal'`     | Spacing between buttons           |

## Common Patterns

### Action Buttons (Save/Cancel)

```tsx
const [isDirty, setIsDirty] = useState(false);
const [isSaving, setIsSaving] = useState(false);

const handleSave = async () => {
	setIsSaving(true);
	try {
		await saveData();
		setIsDirty(false);
	} finally {
		setIsSaving(false);
	}
};

const handleCancel = () => {
	if (isDirty) {
		const confirmed = window.confirm("You have unsaved changes. Are you sure?");
		if (!confirmed) return;
	}
	resetForm();
	setIsDirty(false);
};

useDevPanel("Form Actions", {
	formActions: {
		type: "buttonGroup",
		label: "Form Actions",
		buttons: [
			{
				label: isSaving ? "Saving..." : "Save",
				onClick: handleSave,
				disabled: !isDirty || isSaving,
				variant: "primary",
				icon: isSaving ? "⏳" : "💾",
			},
			{
				label: "Cancel",
				onClick: handleCancel,
				disabled: isSaving,
				variant: "secondary",
				icon: "❌",
			},
		],
	},
});
```

### View Mode Switcher

```tsx
const [viewMode, setViewMode] = useState<"grid" | "list" | "card">("grid");

const viewModes = [
	{ mode: "grid", label: "Grid", icon: "⊞" },
	{ mode: "list", label: "List", icon: "☰" },
	{ mode: "card", label: "Card", icon: "🃏" },
] as const;

useDevPanel("View Controls", {
	viewSelector: {
		type: "buttonGroup",
		label: "View Mode",
		orientation: "horizontal",
		spacing: "compact",
		buttons: viewModes.map(({ mode, label, icon }) => ({
			label,
			icon,
			onClick: () => setViewMode(mode),
			variant: viewMode === mode ? "primary" : "secondary",
		})),
	},
});
```

### Media Player Controls

```tsx
const [playerState, setPlayerState] = useState({
	isPlaying: false,
	currentTime: 0,
	duration: 180, // 3 minutes
	volume: 0.8,
	isMuted: false,
	playbackRate: 1,
});

const togglePlay = () => {
	setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
};

const skipBackward = () => {
	setPlayerState((prev) => ({
		...prev,
		currentTime: Math.max(0, prev.currentTime - 10),
	}));
};

const skipForward = () => {
	setPlayerState((prev) => ({
		...prev,
		currentTime: Math.min(prev.duration, prev.currentTime + 10),
	}));
};

const restart = () => {
	setPlayerState((prev) => ({ ...prev, currentTime: 0, isPlaying: true }));
};

const toggleMute = () => {
	setPlayerState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
};

useDevPanel("Media Player", {
	transportControls: {
		type: "buttonGroup",
		label: "Transport Controls",
		orientation: "horizontal",
		spacing: "compact",
		buttons: [
			{
				label: "Restart",
				icon: "⏮",
				onClick: restart,
				size: "small",
			},
			{
				label: "Back 10s",
				icon: "⏪",
				onClick: skipBackward,
				size: "small",
			},
			{
				label: playerState.isPlaying ? "Pause" : "Play",
				icon: playerState.isPlaying ? "⏸" : "▶️",
				onClick: togglePlay,
				variant: "primary",
				size: "large",
			},
			{
				label: "Forward 10s",
				icon: "⏩",
				onClick: skipForward,
				size: "small",
			},
			{
				label: playerState.isMuted ? "Unmute" : "Mute",
				icon: playerState.isMuted ? "🔇" : "🔊",
				onClick: toggleMute,
				size: "small",
			},
		],
	},
	playbackRateControls: {
		type: "buttonGroup",
		label: "Playback Speed",
		orientation: "horizontal",
		spacing: "compact",
		buttons: [0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => ({
			label: `${rate}x`,
			onClick: () => setPlayerState((prev) => ({ ...prev, playbackRate: rate })),
			variant: playerState.playbackRate === rate ? "primary" : "secondary",
			size: "small",
		})),
	},
});
```

### Tab Navigation

```tsx
const [activeTab, setActiveTab] = useState("overview");

interface TabData {
	id: string;
	label: string;
	icon: string;
	count?: number;
}

const tabs: TabData[] = [
	{ id: "overview", label: "Overview", icon: "📊" },
	{ id: "details", label: "Details", icon: "📋" },
	{ id: "comments", label: "Comments", icon: "💬", count: 5 },
	{ id: "history", label: "History", icon: "📈" },
	{ id: "settings", label: "Settings", icon: "⚙️" },
];

useDevPanel("Tab Navigation", {
	tabSelector: {
		type: "buttonGroup",
		label: "Sections",
		orientation: "vertical",
		spacing: "normal",
		buttons: tabs.map((tab) => ({
			label: `${tab.icon} ${tab.label}${tab.count ? ` (${tab.count})` : ""}`,
			onClick: () => setActiveTab(tab.id),
			variant: activeTab === tab.id ? "primary" : "secondary",
		})),
	},
});
```

### Bulk Actions

```tsx
const [selectedItems, setSelectedItems] = useState<number[]>([]);
const [items] = useState([
	{ id: 1, name: "Document 1.pdf", type: "pdf" },
	{ id: 2, name: "Image 1.jpg", type: "image" },
	{ id: 3, name: "Spreadsheet.xlsx", type: "excel" },
]);

const hasSelection = selectedItems.length > 0;
const hasMultipleSelection = selectedItems.length > 1;

const deleteSelected = async () => {
	const confirmed = window.confirm(`Delete ${selectedItems.length} item(s)? This cannot be undone.`);
	if (confirmed) {
		// Perform delete operation
		console.log("Deleting items:", selectedItems);
		setSelectedItems([]);
	}
};

const downloadSelected = () => {
	console.log("Downloading items:", selectedItems);
};

const shareSelected = () => {
	console.log("Sharing items:", selectedItems);
};

const selectAll = () => {
	setSelectedItems(items.map((item) => item.id));
};

const clearSelection = () => {
	setSelectedItems([]);
};

useDevPanel("Bulk Actions", {
	selectionControls: {
		type: "buttonGroup",
		label: `Selection (${selectedItems.length}/${items.length})`,
		orientation: "horizontal",
		spacing: "compact",
		buttons: [
			{
				label: "Select All",
				onClick: selectAll,
				disabled: selectedItems.length === items.length,
				size: "small",
			},
			{
				label: "Clear",
				onClick: clearSelection,
				disabled: !hasSelection,
				size: "small",
			},
		],
	},
	bulkActions: {
		type: "buttonGroup",
		label: "Actions",
		orientation: "horizontal",
		spacing: "normal",
		buttons: [
			{
				label: "Download",
				icon: "⬇️",
				onClick: downloadSelected,
				disabled: !hasSelection,
				variant: "secondary",
			},
			{
				label: "Share",
				icon: "🔗",
				onClick: shareSelected,
				disabled: !hasSelection,
				variant: "secondary",
			},
			{
				label: hasMultipleSelection ? "Delete All" : "Delete",
				icon: "🗑",
				onClick: deleteSelected,
				disabled: !hasSelection,
				variant: "danger",
			},
		],
	},
});
```

### Quick Actions Toolbar

```tsx
const [documentState, setDocumentState] = useState({
	isBold: false,
	isItalic: false,
	isUnderline: false,
	alignment: "left" as "left" | "center" | "right" | "justify",
	fontSize: 14,
});

const toggleFormatting = (format: "bold" | "italic" | "underline") => {
	setDocumentState((prev) => ({
		...prev,
		[`is${format.charAt(0).toUpperCase() + format.slice(1)}`]:
			!prev[`is${format.charAt(0).toUpperCase() + format.slice(1)}` as keyof typeof prev],
	}));
};

const setAlignment = (alignment: typeof documentState.alignment) => {
	setDocumentState((prev) => ({ ...prev, alignment }));
};

useDevPanel("Text Editor", {
	formatting: {
		type: "buttonGroup",
		label: "Text Formatting",
		orientation: "horizontal",
		spacing: "compact",
		buttons: [
			{
				label: "Bold",
				icon: "𝐁",
				onClick: () => toggleFormatting("bold"),
				variant: documentState.isBold ? "primary" : "secondary",
				size: "small",
			},
			{
				label: "Italic",
				icon: "𝐼",
				onClick: () => toggleFormatting("italic"),
				variant: documentState.isItalic ? "primary" : "secondary",
				size: "small",
			},
			{
				label: "Underline",
				icon: "𝐔",
				onClick: () => toggleFormatting("underline"),
				variant: documentState.isUnderline ? "primary" : "secondary",
				size: "small",
			},
		],
	},
	alignment: {
		type: "buttonGroup",
		label: "Text Alignment",
		orientation: "horizontal",
		spacing: "compact",
		buttons: [
			{
				label: "Left",
				icon: "⬅️",
				onClick: () => setAlignment("left"),
				variant: documentState.alignment === "left" ? "primary" : "secondary",
				size: "small",
			},
			{
				label: "Center",
				icon: "↔️",
				onClick: () => setAlignment("center"),
				variant: documentState.alignment === "center" ? "primary" : "secondary",
				size: "small",
			},
			{
				label: "Right",
				icon: "➡️",
				onClick: () => setAlignment("right"),
				variant: documentState.alignment === "right" ? "primary" : "secondary",
				size: "small",
			},
			{
				label: "Justify",
				icon: "⬌",
				onClick: () => setAlignment("justify"),
				variant: documentState.alignment === "justify" ? "primary" : "secondary",
				size: "small",
			},
		],
	},
	utilities: {
		type: "buttonGroup",
		label: "Utilities",
		orientation: "horizontal",
		spacing: "normal",
		buttons: [
			{
				label: "Undo",
				icon: "↶",
				onClick: () => console.log("Undo"),
				size: "small",
			},
			{
				label: "Redo",
				icon: "↷",
				onClick: () => console.log("Redo"),
				size: "small",
			},
			{
				label: "Copy Formatting",
				icon: "📋",
				onClick: () => console.log("Copy formatting"),
				size: "small",
			},
			{
				label: "Clear Formatting",
				icon: "🧹",
				onClick: () =>
					setDocumentState({
						isBold: false,
						isItalic: false,
						isUnderline: false,
						alignment: "left",
						fontSize: 14,
					}),
				variant: "danger",
				size: "small",
			},
		],
	},
});
```

### Workflow States

```tsx
type WorkflowState = "draft" | "review" | "approved" | "published" | "archived";

const [currentState, setCurrentState] = useState<WorkflowState>("draft");

const workflowTransitions: Record<WorkflowState, WorkflowState[]> = {
	draft: ["review"],
	review: ["draft", "approved"],
	approved: ["review", "published"],
	published: ["archived"],
	archived: ["draft"],
};

const stateLabels: Record<WorkflowState, { label: string; icon: string; variant: "primary" | "secondary" | "danger" }> = {
	draft: { label: "Draft", icon: "📝", variant: "secondary" },
	review: { label: "In Review", icon: "👀", variant: "secondary" },
	approved: { label: "Approved", icon: "✅", variant: "primary" },
	published: { label: "Published", icon: "🌐", variant: "primary" },
	archived: { label: "Archived", icon: "📦", variant: "danger" },
};

const getAvailableTransitions = (state: WorkflowState) => {
	return workflowTransitions[state] || [];
};

useDevPanel("Workflow Management", {
	currentState: {
		type: "text",
		value: `${stateLabels[currentState].icon} ${stateLabels[currentState].label}`,
		label: "Current State",
		disabled: true,
		onChange: () => {},
	},
	actions: {
		type: "buttonGroup",
		label: "Available Actions",
		orientation: "vertical",
		spacing: "normal",
		buttons: getAvailableTransitions(currentState).map((targetState) => {
			const config = stateLabels[targetState];
			return {
				label: `Move to ${config.label}`,
				icon: config.icon,
				onClick: () => setCurrentState(targetState),
				variant: config.variant,
			};
		}),
	},
});
```

## Advanced Features

### Conditional Button Visibility

```tsx
const [userRole, setUserRole] = useState<"viewer" | "editor" | "admin">("viewer");
const [hasChanges, setHasChanges] = useState(false);

const getAvailableActions = () => {
	const actions = [];

	// View action available to all
	actions.push({
		label: "View",
		icon: "👁",
		onClick: () => console.log("View"),
		variant: "secondary" as const,
	});

	// Edit actions for editors and admins
	if (userRole === "editor" || userRole === "admin") {
		actions.push({
			label: "Edit",
			icon: "✏️",
			onClick: () => console.log("Edit"),
			variant: "primary" as const,
		});

		if (hasChanges) {
			actions.push({
				label: "Save",
				icon: "💾",
				onClick: () => {
					setHasChanges(false);
					console.log("Save");
				},
				variant: "primary" as const,
			});
		}
	}

	// Admin-only actions
	if (userRole === "admin") {
		actions.push({
			label: "Delete",
			icon: "🗑",
			onClick: () => console.log("Delete"),
			variant: "danger" as const,
		});
	}

	return actions;
};

useDevPanel("Permission-Based Actions", {
	roleSelector: {
		type: "select",
		value: userRole,
		label: "User Role",
		options: [
			{ value: "viewer", label: "Viewer" },
			{ value: "editor", label: "Editor" },
			{ value: "admin", label: "Administrator" },
		],
		onChange: (value) => setUserRole(value as typeof userRole),
	},
	hasChanges: {
		type: "boolean",
		value: hasChanges,
		label: "Has Unsaved Changes",
		onChange: setHasChanges,
	},
	actions: {
		type: "buttonGroup",
		label: "Available Actions",
		buttons: getAvailableActions(),
	},
});
```

### Loading States and Progress

```tsx
const [operations, setOperations] = useState({
	upload: { isLoading: false, progress: 0 },
	download: { isLoading: false, progress: 0 },
	process: { isLoading: false, progress: 0 },
});

const startOperation = async (operationType: keyof typeof operations) => {
	setOperations((prev) => ({
		...prev,
		[operationType]: { isLoading: true, progress: 0 },
	}));

	// Simulate progress
	for (let i = 0; i <= 100; i += 10) {
		await new Promise((resolve) => setTimeout(resolve, 200));
		setOperations((prev) => ({
			...prev,
			[operationType]: { isLoading: true, progress: i },
		}));
	}

	setOperations((prev) => ({
		...prev,
		[operationType]: { isLoading: false, progress: 100 },
	}));

	// Reset after completion
	setTimeout(() => {
		setOperations((prev) => ({
			...prev,
			[operationType]: { isLoading: false, progress: 0 },
		}));
	}, 1000);
};

const anyOperationRunning = Object.values(operations).some((op) => op.isLoading);

useDevPanel("File Operations", {
	fileActions: {
		type: "buttonGroup",
		label: "File Operations",
		orientation: "vertical",
		spacing: "normal",
		buttons: [
			{
				label: operations.upload.isLoading ? `Uploading... ${operations.upload.progress}%` : "Upload File",
				icon: operations.upload.isLoading ? "⏳" : "⬆️",
				onClick: () => startOperation("upload"),
				disabled: anyOperationRunning,
				variant: operations.upload.progress === 100 ? "primary" : "secondary",
			},
			{
				label: operations.download.isLoading ? `Downloading... ${operations.download.progress}%` : "Download File",
				icon: operations.download.isLoading ? "⏳" : "⬇️",
				onClick: () => startOperation("download"),
				disabled: anyOperationRunning,
				variant: operations.download.progress === 100 ? "primary" : "secondary",
			},
			{
				label: operations.process.isLoading ? `Processing... ${operations.process.progress}%` : "Process File",
				icon: operations.process.isLoading ? "⏳" : "⚙️",
				onClick: () => startOperation("process"),
				disabled: anyOperationRunning,
				variant: operations.process.progress === 100 ? "primary" : "secondary",
			},
		],
	},
});
```

## Styling

Button group controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-button-height: 32px; /* Button height */
	--dev-panel-button-padding: 8px 16px; /* Button padding */
	--dev-panel-button-border-radius: 4px; /* Button border radius */
	--dev-panel-button-gap: 4px; /* Gap between buttons */

	/* Button variants */
	--dev-panel-button-primary-bg: #ff6200; /* Primary background */
	--dev-panel-button-secondary-bg: #333333; /* Secondary background */
	--dev-panel-button-danger-bg: #dc3545; /* Danger background */

	--dev-panel-button-primary-text: #ffffff; /* Primary text */
	--dev-panel-button-secondary-text: #ffffff; /* Secondary text */
	--dev-panel-button-danger-text: #ffffff; /* Danger text */
}
```

### Custom Button Group Styling

```css
/* Target button groups specifically */
.dev-panel-button-group {
	gap: var(--dev-panel-button-gap);
}

/* Horizontal layout */
.dev-panel-button-group[data-orientation="horizontal"] {
	display: flex;
	flex-direction: row;
}

/* Vertical layout */
.dev-panel-button-group[data-orientation="vertical"] {
	display: flex;
	flex-direction: column;
}

/* Button spacing variants */
.dev-panel-button-group[data-spacing="compact"] {
	gap: 2px;
}

.dev-panel-button-group[data-spacing="loose"] {
	gap: 8px;
}

/* Individual button styling */
.dev-panel-button-group button {
	height: var(--dev-panel-button-height);
	padding: var(--dev-panel-button-padding);
	border-radius: var(--dev-panel-button-border-radius);
	border: none;
	cursor: pointer;
	font-size: 14px;
	font-weight: 500;
	transition: all 0.2s ease;
}

/* Button variants */
.dev-panel-button-group button[data-variant="primary"] {
	background-color: var(--dev-panel-button-primary-bg);
	color: var(--dev-panel-button-primary-text);
}

.dev-panel-button-group button[data-variant="secondary"] {
	background-color: var(--dev-panel-button-secondary-bg);
	color: var(--dev-panel-button-secondary-text);
}

.dev-panel-button-group button[data-variant="danger"] {
	background-color: var(--dev-panel-button-danger-bg);
	color: var(--dev-panel-button-danger-text);
}

/* Hover states */
.dev-panel-button-group button:hover:not(:disabled) {
	opacity: 0.9;
	transform: translateY(-1px);
}

/* Disabled state */
.dev-panel-button-group button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
	transform: none;
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move between button groups
-   **Arrow Keys**: Navigate within button group
-   **Enter/Space**: Activate focused button
-   **Escape**: Exit button group focus

### Screen Reader Support

-   Proper role="group" for button groups
-   aria-label support for group context
-   Individual button descriptions

### Best Practices

```tsx
// ✅ Good: Clear, descriptive button labels
{
  type: 'buttonGroup',
  label: 'Document Actions',
  buttons: [
    { label: 'Save Document', onClick: save },
    { label: 'Export as PDF', onClick: exportPdf },
  ],
}

// ✅ Good: Logical grouping
{
  type: 'buttonGroup',
  label: 'Text Formatting',
  buttons: [
    { label: 'Bold', onClick: toggleBold },
    { label: 'Italic', onClick: toggleItalic },
  ],
}

// ❌ Avoid: Unclear or unrelated actions
{
  type: 'buttonGroup',
  buttons: [
    { label: 'Click', onClick: doSomething },
    { label: 'Action', onClick: doOtherThing },
  ],
}
```

## TypeScript

The button group control provides full TypeScript support:

```tsx
import { ButtonGroupControl, ButtonConfig } from "@berenjena/react-dev-panel";

interface ActionConfig {
	save: () => void;
	cancel: () => void;
	delete: () => void;
}

const createActionButtons = (actions: ActionConfig): ButtonConfig[] => [
	{
		label: "Save Changes",
		onClick: actions.save,
		variant: "primary",
		icon: "💾",
	},
	{
		label: "Cancel",
		onClick: actions.cancel,
		variant: "secondary",
		icon: "❌",
	},
	{
		label: "Delete",
		onClick: actions.delete,
		variant: "danger",
		icon: "🗑",
	},
];

useDevPanel("Actions", {
	actions: {
		type: "buttonGroup",
		label: "Available Actions",
		buttons: createActionButtons({
			save: handleSave,
			cancel: handleCancel,
			delete: handleDelete,
		}),
	} satisfies ButtonGroupControl,
});
```

## Performance Considerations

### Memoizing Button Configurations

```tsx
const buttons = useMemo(
	() => [
		{
			label: "Heavy Operation",
			onClick: () => performExpensiveOperation(),
			disabled: isLoading,
		},
		{
			label: "Quick Action",
			onClick: quickAction,
		},
	],
	[isLoading],
); // Only recreate when isLoading changes

useDevPanel("Operations", {
	operations: {
		type: "buttonGroup",
		buttons,
	},
});
```

## Related Controls

-   **[Button Control](./BUTTON_CONTROL.md)** - For single action buttons
-   **[Select Control](./SELECT_CONTROL.md)** - For single-choice selections
-   **[Boolean Control](./BOOLEAN_CONTROL.md)** - For toggle actions
