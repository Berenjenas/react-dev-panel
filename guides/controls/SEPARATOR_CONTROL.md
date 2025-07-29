# Separator Control

The separator control provides visual separation and organization within the development panel, helping to group related controls and improve the overall interface structure.

## Basic Usage

```tsx
{
  type: 'separator',
}
```

## Properties

### Required Properties

| Property | Type          | Description             |
| -------- | ------------- | ----------------------- |
| `type`   | `'separator'` | Control type identifier |

### Optional Properties

| Property | Type                             | Default     | Description                       |
| -------- | -------------------------------- | ----------- | --------------------------------- |
| `style`  | `'line' \| 'space' \| 'label'`   | `'line'`    | Visual style of the separator     |
| `label`  | `string`                         | `undefined` | Text label for labeled separators |
| `size`   | `'small' \| 'medium' \| 'large'` | `'medium'`  | Size/spacing of the separator     |
| `color`  | `string`                         | `undefined` | Custom color for the separator    |

## Separator Styles

### Line Separator (Default)

```tsx
{
  type: 'separator',
  style: 'line', // Visual line divider
}
```

### Space Separator

```tsx
{
  type: 'separator',
  style: 'space', // Empty space for grouping
  size: 'large',
}
```

### Label Separator

```tsx
{
  type: 'separator',
  style: 'label',
  label: 'Advanced Settings',
}
```

## Common Patterns

### Grouping Related Controls

```tsx
const [userSettings, setUserSettings] = useState({
	// Basic settings
	username: "john_doe",
	email: "john@example.com",

	// Display preferences
	theme: "dark",
	language: "en",
	fontSize: 14,

	// Notification settings
	emailNotifications: true,
	pushNotifications: false,
	soundEnabled: true,

	// Privacy settings
	profilePublic: false,
	analyticsEnabled: true,
	dataSharing: false,
});

useDevPanel("User Settings", {
	// Basic Information Section
	username: {
		type: "text",
		value: userSettings.username,
		label: "Username",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, username: value })),
	},
	email: {
		type: "text",
		value: userSettings.email,
		label: "Email Address",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, email: value })),
	},

	// Separator for Display Preferences
	displaySeparator: {
		type: "separator",
		style: "label",
		label: "Display Preferences",
	},

	theme: {
		type: "select",
		value: userSettings.theme,
		label: "Theme",
		options: [
			{ value: "light", label: "Light" },
			{ value: "dark", label: "Dark" },
			{ value: "auto", label: "Auto" },
		],
		onChange: (value) => setUserSettings((prev) => ({ ...prev, theme: value })),
	},
	language: {
		type: "select",
		value: userSettings.language,
		label: "Language",
		options: [
			{ value: "en", label: "English" },
			{ value: "es", label: "Español" },
			{ value: "fr", label: "Français" },
		],
		onChange: (value) => setUserSettings((prev) => ({ ...prev, language: value })),
	},
	fontSize: {
		type: "range",
		value: userSettings.fontSize,
		label: `Font Size: ${userSettings.fontSize}px`,
		min: 12,
		max: 24,
		step: 1,
		onChange: (value) => setUserSettings((prev) => ({ ...prev, fontSize: value })),
	},

	// Separator for Notifications
	notificationSeparator: {
		type: "separator",
		style: "label",
		label: "Notifications",
	},

	emailNotifications: {
		type: "boolean",
		value: userSettings.emailNotifications,
		label: "Email Notifications",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, emailNotifications: value })),
	},
	pushNotifications: {
		type: "boolean",
		value: userSettings.pushNotifications,
		label: "Push Notifications",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, pushNotifications: value })),
	},
	soundEnabled: {
		type: "boolean",
		value: userSettings.soundEnabled,
		label: "Sound Effects",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, soundEnabled: value })),
	},

	// Separator for Privacy
	privacySeparator: {
		type: "separator",
		style: "label",
		label: "Privacy & Data",
	},

	profilePublic: {
		type: "boolean",
		value: userSettings.profilePublic,
		label: "Public Profile",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, profilePublic: value })),
	},
	analyticsEnabled: {
		type: "boolean",
		value: userSettings.analyticsEnabled,
		label: "Analytics Collection",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, analyticsEnabled: value })),
	},
	dataSharing: {
		type: "boolean",
		value: userSettings.dataSharing,
		label: "Data Sharing",
		onChange: (value) => setUserSettings((prev) => ({ ...prev, dataSharing: value })),
	},

	// Final separator before actions
	actionsSeparator: {
		type: "separator",
		style: "space",
		size: "large",
	},

	saveSettings: {
		type: "button",
		label: "Save All Settings",
		onClick: () => {
			console.log("Saving settings:", userSettings);
		},
	},
});
```

### Wizard/Step-by-Step Forms

```tsx
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({
	// Step 1: Basic Info
	projectName: "",
	projectType: "web",

	// Step 2: Configuration
	framework: "react",
	language: "typescript",

	// Step 3: Features
	authentication: false,
	database: false,
	testing: true,
});

const totalSteps = 3;

useDevPanel("Project Setup Wizard", {
	// Step Progress
	stepIndicator: {
		type: "text",
		value: `Step ${currentStep} of ${totalSteps}`,
		label: "Progress",
		disabled: true,
		onChange: () => {},
	},

	progressSeparator: {
		type: "separator",
		style: "line",
		size: "small",
	},

	// Step 1: Basic Information
	...(currentStep === 1 && {
		step1Header: {
			type: "separator",
			style: "label",
			label: "📋 Basic Information",
		},

		projectName: {
			type: "text",
			value: formData.projectName,
			label: "Project Name",
			placeholder: "Enter project name...",
			onChange: (value) => setFormData((prev) => ({ ...prev, projectName: value })),
		},

		projectType: {
			type: "select",
			value: formData.projectType,
			label: "Project Type",
			options: [
				{ value: "web", label: "Web Application" },
				{ value: "mobile", label: "Mobile App" },
				{ value: "desktop", label: "Desktop App" },
				{ value: "api", label: "API Service" },
			],
			onChange: (value) => setFormData((prev) => ({ ...prev, projectType: value })),
		},
	}),

	// Step 2: Configuration
	...(currentStep === 2 && {
		step2Header: {
			type: "separator",
			style: "label",
			label: "⚙️ Configuration",
		},

		framework: {
			type: "select",
			value: formData.framework,
			label: "Framework",
			options: [
				{ value: "react", label: "React" },
				{ value: "vue", label: "Vue.js" },
				{ value: "angular", label: "Angular" },
				{ value: "svelte", label: "Svelte" },
			],
			onChange: (value) => setFormData((prev) => ({ ...prev, framework: value })),
		},

		language: {
			type: "select",
			value: formData.language,
			label: "Language",
			options: [
				{ value: "typescript", label: "TypeScript" },
				{ value: "javascript", label: "JavaScript" },
			],
			onChange: (value) => setFormData((prev) => ({ ...prev, language: value })),
		},
	}),

	// Step 3: Features
	...(currentStep === 3 && {
		step3Header: {
			type: "separator",
			style: "label",
			label: "🎯 Features",
		},

		authentication: {
			type: "boolean",
			value: formData.authentication,
			label: "User Authentication",
			onChange: (value) => setFormData((prev) => ({ ...prev, authentication: value })),
		},

		database: {
			type: "boolean",
			value: formData.database,
			label: "Database Integration",
			onChange: (value) => setFormData((prev) => ({ ...prev, database: value })),
		},

		testing: {
			type: "boolean",
			value: formData.testing,
			label: "Testing Setup",
			onChange: (value) => setFormData((prev) => ({ ...prev, testing: value })),
		},
	}),

	// Navigation
	navigationSeparator: {
		type: "separator",
		style: "space",
		size: "medium",
	},

	navigation: {
		type: "buttonGroup",
		label: "Navigation",
		buttons: [
			...(currentStep > 1
				? [
						{
							label: "Previous",
							onClick: () => setCurrentStep((prev) => prev - 1),
							variant: "secondary" as const,
						},
				  ]
				: []),
			...(currentStep < totalSteps
				? [
						{
							label: "Next",
							onClick: () => setCurrentStep((prev) => prev + 1),
							variant: "primary" as const,
							disabled: currentStep === 1 && !formData.projectName,
						},
				  ]
				: [
						{
							label: "Create Project",
							onClick: () => console.log("Creating project:", formData),
							variant: "primary" as const,
						},
				  ]),
		],
	},
});
```

### Dashboard Sections

```tsx
const [dashboardData, setDashboardData] = useState({
	// Metrics
	totalUsers: 1234,
	activeUsers: 856,
	revenue: 45678,

	// Settings
	autoRefresh: true,
	refreshInterval: 30,

	// Filters
	dateRange: "7d",
	userType: "all",
});

useDevPanel("Analytics Dashboard", {
	// Key Metrics Section
	metricsHeader: {
		type: "separator",
		style: "label",
		label: "📊 Key Metrics",
	},

	totalUsers: {
		type: "text",
		value: dashboardData.totalUsers.toLocaleString(),
		label: "Total Users",
		disabled: true,
		onChange: () => {},
	},

	activeUsers: {
		type: "text",
		value: dashboardData.activeUsers.toLocaleString(),
		label: "Active Users (24h)",
		disabled: true,
		onChange: () => {},
	},

	revenue: {
		type: "text",
		value: `$${dashboardData.revenue.toLocaleString()}`,
		label: "Revenue (MTD)",
		disabled: true,
		onChange: () => {},
	},

	// Refresh Settings Section
	refreshSeparator: {
		type: "separator",
		style: "label",
		label: "🔄 Refresh Settings",
	},

	autoRefresh: {
		type: "boolean",
		value: dashboardData.autoRefresh,
		label: "Auto Refresh",
		onChange: (value) => setDashboardData((prev) => ({ ...prev, autoRefresh: value })),
	},

	refreshInterval: {
		type: "range",
		value: dashboardData.refreshInterval,
		label: `Refresh Every ${dashboardData.refreshInterval}s`,
		min: 10,
		max: 300,
		step: 10,
		disabled: !dashboardData.autoRefresh,
		onChange: (value) => setDashboardData((prev) => ({ ...prev, refreshInterval: value })),
	},

	manualRefresh: {
		type: "button",
		label: "Refresh Now",
		onClick: () => {
			console.log("Manual refresh triggered");
		},
	},

	// Filters Section
	filtersSeparator: {
		type: "separator",
		style: "label",
		label: "🔍 Filters",
	},

	dateRange: {
		type: "select",
		value: dashboardData.dateRange,
		label: "Date Range",
		options: [
			{ value: "1d", label: "Last 24 hours" },
			{ value: "7d", label: "Last 7 days" },
			{ value: "30d", label: "Last 30 days" },
			{ value: "90d", label: "Last 90 days" },
		],
		onChange: (value) => setDashboardData((prev) => ({ ...prev, dateRange: value })),
	},

	userType: {
		type: "select",
		value: dashboardData.userType,
		label: "User Type",
		options: [
			{ value: "all", label: "All Users" },
			{ value: "free", label: "Free Users" },
			{ value: "premium", label: "Premium Users" },
			{ value: "enterprise", label: "Enterprise Users" },
		],
		onChange: (value) => setDashboardData((prev) => ({ ...prev, userType: value })),
	},

	// Actions Section
	actionsSeparator: {
		type: "separator",
		style: "space",
		size: "large",
	},

	exportData: {
		type: "button",
		label: "Export Dashboard Data",
		onClick: () => {
			console.log("Exporting data with filters:", dashboardData);
		},
	},
});
```

### Complex Form with Conditional Sections

```tsx
const [formConfig, setFormConfig] = useState({
	// Type selection
	eventType: "meeting",

	// Basic details
	title: "",
	description: "",

	// Meeting-specific
	meetingType: "video",
	attendees: 5,

	// Conference-specific
	venue: "",
	capacity: 100,

	// Workshop-specific
	skill_level: "beginner",
	materials: true,
});

const isConditionalSectionVisible = (section: string) => {
	switch (section) {
		case "meeting":
			return formConfig.eventType === "meeting";
		case "conference":
			return formConfig.eventType === "conference";
		case "workshop":
			return formConfig.eventType === "workshop";
		default:
			return false;
	}
};

useDevPanel("Event Configuration", {
	// Event Type Selection
	typeHeader: {
		type: "separator",
		style: "label",
		label: "🎯 Event Type",
	},

	eventType: {
		type: "select",
		value: formConfig.eventType,
		label: "Event Type",
		options: [
			{ value: "meeting", label: "👥 Meeting" },
			{ value: "conference", label: "🏛️ Conference" },
			{ value: "workshop", label: "🔧 Workshop" },
		],
		onChange: (value) => setFormConfig((prev) => ({ ...prev, eventType: value })),
	},

	// Basic Information (always visible)
	basicHeader: {
		type: "separator",
		style: "label",
		label: "📋 Basic Information",
	},

	title: {
		type: "text",
		value: formConfig.title,
		label: "Event Title",
		placeholder: "Enter event title...",
		onChange: (value) => setFormConfig((prev) => ({ ...prev, title: value })),
	},

	description: {
		type: "text",
		value: formConfig.description,
		label: "Description",
		placeholder: "Enter event description...",
		onChange: (value) => setFormConfig((prev) => ({ ...prev, description: value })),
	},

	// Meeting-specific section
	...(isConditionalSectionVisible("meeting") && {
		meetingSeparator: {
			type: "separator",
			style: "label",
			label: "👥 Meeting Settings",
		},

		meetingType: {
			type: "select",
			value: formConfig.meetingType,
			label: "Meeting Type",
			options: [
				{ value: "video", label: "Video Call" },
				{ value: "audio", label: "Audio Only" },
				{ value: "in-person", label: "In Person" },
			],
			onChange: (value) => setFormConfig((prev) => ({ ...prev, meetingType: value })),
		},

		attendees: {
			type: "range",
			value: formConfig.attendees,
			label: `Expected Attendees: ${formConfig.attendees}`,
			min: 2,
			max: 50,
			step: 1,
			onChange: (value) => setFormConfig((prev) => ({ ...prev, attendees: value })),
		},
	}),

	// Conference-specific section
	...(isConditionalSectionVisible("conference") && {
		conferenceSeparator: {
			type: "separator",
			style: "label",
			label: "🏛️ Conference Settings",
		},

		venue: {
			type: "text",
			value: formConfig.venue,
			label: "Venue",
			placeholder: "Enter venue name...",
			onChange: (value) => setFormConfig((prev) => ({ ...prev, venue: value })),
		},

		capacity: {
			type: "range",
			value: formConfig.capacity,
			label: `Venue Capacity: ${formConfig.capacity}`,
			min: 50,
			max: 1000,
			step: 25,
			onChange: (value) => setFormConfig((prev) => ({ ...prev, capacity: value })),
		},
	}),

	// Workshop-specific section
	...(isConditionalSectionVisible("workshop") && {
		workshopSeparator: {
			type: "separator",
			style: "label",
			label: "🔧 Workshop Settings",
		},

		skillLevel: {
			type: "select",
			value: formConfig.skill_level,
			label: "Skill Level",
			options: [
				{ value: "beginner", label: "Beginner" },
				{ value: "intermediate", label: "Intermediate" },
				{ value: "advanced", label: "Advanced" },
			],
			onChange: (value) => setFormConfig((prev) => ({ ...prev, skill_level: value })),
		},

		materials: {
			type: "boolean",
			value: formConfig.materials,
			label: "Materials Provided",
			onChange: (value) => setFormConfig((prev) => ({ ...prev, materials: value })),
		},
	}),

	// Final actions
	finalSeparator: {
		type: "separator",
		style: "space",
		size: "large",
	},

	saveEvent: {
		type: "button",
		label: "Create Event",
		disabled: !formConfig.title,
		onClick: () => {
			console.log("Creating event:", formConfig);
		},
	},
});
```

### Debug/Development Sections

```tsx
const [debugState, setDebugState] = useState({
	// Performance monitoring
	showMetrics: true,
	logLevel: "info",

	// Development tools
	mockDataEnabled: false,
	bypassAuth: false,

	// Visual debugging
	showBoundingBoxes: false,
	highlightReRenders: false,

	// Network simulation
	networkDelay: 0,
	failureRate: 0,
});

useDevPanel("Debug Tools", {
	// Performance Section
	performanceHeader: {
		type: "separator",
		style: "label",
		label: "⚡ Performance Monitoring",
	},

	showMetrics: {
		type: "boolean",
		value: debugState.showMetrics,
		label: "Show Performance Metrics",
		onChange: (value) => setDebugState((prev) => ({ ...prev, showMetrics: value })),
	},

	logLevel: {
		type: "select",
		value: debugState.logLevel,
		label: "Console Log Level",
		options: [
			{ value: "error", label: "Error Only" },
			{ value: "warn", label: "Warnings & Errors" },
			{ value: "info", label: "Info & Above" },
			{ value: "debug", label: "All Messages" },
		],
		onChange: (value) => setDebugState((prev) => ({ ...prev, logLevel: value })),
	},

	// Development Tools Section
	devToolsSeparator: {
		type: "separator",
		style: "label",
		label: "🛠️ Development Tools",
	},

	mockDataEnabled: {
		type: "boolean",
		value: debugState.mockDataEnabled,
		label: "Use Mock Data",
		onChange: (value) => setDebugState((prev) => ({ ...prev, mockDataEnabled: value })),
	},

	bypassAuth: {
		type: "boolean",
		value: debugState.bypassAuth,
		label: "Bypass Authentication",
		onChange: (value) => setDebugState((prev) => ({ ...prev, bypassAuth: value })),
	},

	// Visual Debugging Section
	visualSeparator: {
		type: "separator",
		style: "label",
		label: "👁️ Visual Debugging",
	},

	showBoundingBoxes: {
		type: "boolean",
		value: debugState.showBoundingBoxes,
		label: "Show Component Boundaries",
		onChange: (value) => setDebugState((prev) => ({ ...prev, showBoundingBoxes: value })),
	},

	highlightReRenders: {
		type: "boolean",
		value: debugState.highlightReRenders,
		label: "Highlight Re-renders",
		onChange: (value) => setDebugState((prev) => ({ ...prev, highlightReRenders: value })),
	},

	// Network Simulation Section
	networkSeparator: {
		type: "separator",
		style: "label",
		label: "🌐 Network Simulation",
	},

	networkDelay: {
		type: "range",
		value: debugState.networkDelay,
		label: `Network Delay: ${debugState.networkDelay}ms`,
		min: 0,
		max: 5000,
		step: 100,
		onChange: (value) => setDebugState((prev) => ({ ...prev, networkDelay: value })),
	},

	failureRate: {
		type: "range",
		value: debugState.failureRate,
		label: `Failure Rate: ${debugState.failureRate}%`,
		min: 0,
		max: 50,
		step: 5,
		onChange: (value) => setDebugState((prev) => ({ ...prev, failureRate: value })),
	},

	// Reset and Export Section
	actionsSeparator: {
		type: "separator",
		style: "space",
		size: "medium",
	},

	resetDebug: {
		type: "button",
		label: "Reset All Debug Settings",
		onClick: () => {
			setDebugState({
				showMetrics: true,
				logLevel: "info",
				mockDataEnabled: false,
				bypassAuth: false,
				showBoundingBoxes: false,
				highlightReRenders: false,
				networkDelay: 0,
				failureRate: 0,
			});
		},
	},
});
```

## Styling

Separator controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-separator-color: #333333; /* Line color */
	--dev-panel-separator-thickness: 1px; /* Line thickness */
	--dev-panel-separator-spacing-small: 8px; /* Small spacing */
	--dev-panel-separator-spacing-medium: 16px; /* Medium spacing */
	--dev-panel-separator-spacing-large: 24px; /* Large spacing */

	/* Label separator styles */
	--dev-panel-separator-label-color: #888888; /* Label text color */
	--dev-panel-separator-label-size: 12px; /* Label font size */
	--dev-panel-separator-label-weight: 600; /* Label font weight */
}
```

### Custom Separator Styling

```css
/* Line separators */
.dev-panel-separator[data-style="line"] {
	border-top: var(--dev-panel-separator-thickness) solid var(--dev-panel-separator-color);
	margin: var(--dev-panel-separator-spacing-medium) 0;
}

/* Space separators */
.dev-panel-separator[data-style="space"] {
	height: var(--dev-panel-separator-spacing-medium);
}

/* Size variants for space separators */
.dev-panel-separator[data-style="space"][data-size="small"] {
	height: var(--dev-panel-separator-spacing-small);
}

.dev-panel-separator[data-style="space"][data-size="large"] {
	height: var(--dev-panel-separator-spacing-large);
}

/* Label separators */
.dev-panel-separator[data-style="label"] {
	display: flex;
	align-items: center;
	margin: var(--dev-panel-separator-spacing-medium) 0;
	color: var(--dev-panel-separator-label-color);
	font-size: var(--dev-panel-separator-label-size);
	font-weight: var(--dev-panel-separator-label-weight);
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.dev-panel-separator[data-style="label"]::before,
.dev-panel-separator[data-style="label"]::after {
	content: "";
	flex: 1;
	height: var(--dev-panel-separator-thickness);
	background-color: var(--dev-panel-separator-color);
}

.dev-panel-separator[data-style="label"]::before {
	margin-right: 12px;
}

.dev-panel-separator[data-style="label"]::after {
	margin-left: 12px;
}

/* Custom colors */
.dev-panel-separator[data-color="accent"] {
	--dev-panel-separator-color: var(--dev-panel-accent-color);
}

.dev-panel-separator[data-color="success"] {
	--dev-panel-separator-color: #28a745;
}

.dev-panel-separator[data-color="warning"] {
	--dev-panel-separator-color: #ffc107;
}

.dev-panel-separator[data-color="danger"] {
	--dev-panel-separator-color: #dc3545;
}
```

## Accessibility

### Screen Reader Support

-   Label separators are announced as headings
-   Line and space separators are ignored by screen readers
-   Proper semantic structure for form sections

### Best Practices

```tsx
// ✅ Good: Clear, descriptive labels for sections
{
  type: 'separator',
  style: 'label',
  label: 'Account Settings',
}

// ✅ Good: Logical grouping
{
  type: 'separator',
  style: 'space',
  size: 'medium',
}

// ✅ Good: Visual hierarchy
{
  type: 'separator',
  style: 'line',
}

// ❌ Avoid: Overusing separators
// Too many separators can create visual noise
```

## TypeScript

The separator control provides full TypeScript support:

```tsx
import { SeparatorControl } from "@berenjena/react-dev-panel";

interface FormSection {
	header: SeparatorControl;
	// ... other controls
}

const createFormSection = (label: string): FormSection => ({
	header: {
		type: "separator",
		style: "label",
		label,
	} satisfies SeparatorControl,
});

useDevPanel("Settings", {
	...createFormSection("Display Preferences"),
	// ... display controls

	...createFormSection("Privacy Settings"),
	// ... privacy controls
});
```

## Performance Considerations

Separators are lightweight controls that don't affect performance. They're purely visual and don't maintain any state.

## Related Controls

-   **[Text Control](./TEXT_CONTROL.md)** - Often used with label separators
-   **[Button Group Control](./BUTTON_GROUP_CONTROL.md)** - Can be separated into logical groups
-   All other controls benefit from proper separation and organization
