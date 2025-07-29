# Boolean Control

The boolean control provides a toggle switch for true/false values with immediate visual feedback.

## Basic Usage

```tsx
{
  type: 'boolean',
  value: booleanValue,
  label: 'Enable Feature',
  onChange: setBooleanValue,
}
```

## Properties

### Required Properties

| Property   | Type                       | Description                 |
| ---------- | -------------------------- | --------------------------- |
| `type`     | `'boolean'`                | Control type identifier     |
| `value`    | `boolean`                  | Current boolean value       |
| `onChange` | `(value: boolean) => void` | Callback when value changes |

### Optional Properties

| Property   | Type      | Default     | Description                     |
| ---------- | --------- | ----------- | ------------------------------- |
| `label`    | `string`  | `undefined` | Display label for the control   |
| `disabled` | `boolean` | `false`     | Whether the control is disabled |

## Event Handling

Boolean controls always use `onChange` event handling for immediate toggle response.

```tsx
{
  type: 'boolean',
  value: isEnabled,
  label: 'Enable Notifications',
  onChange: setIsEnabled, // Triggered immediately on click
}
```

## Common Patterns

### Feature Toggles

```tsx
const [features, setFeatures] = useState({
	darkMode: false,
	notifications: true,
	autoSave: true,
});

useDevPanel("Feature Flags", {
	darkMode: {
		type: "boolean",
		value: features.darkMode,
		label: "Dark Mode",
		onChange: (value) => setFeatures((prev) => ({ ...prev, darkMode: value })),
	},
	notifications: {
		type: "boolean",
		value: features.notifications,
		label: "Push Notifications",
		onChange: (value) => setFeatures((prev) => ({ ...prev, notifications: value })),
	},
	autoSave: {
		type: "boolean",
		value: features.autoSave,
		label: "Auto Save",
		onChange: (value) => setFeatures((prev) => ({ ...prev, autoSave: value })),
	},
});
```

### Debug Mode Toggle

```tsx
const [debugMode, setDebugMode] = useState(false);
const [showLogs, setShowLogs] = useState(false);

useDevPanel("Debug Settings", {
	debugMode: {
		type: "boolean",
		value: debugMode,
		label: "Debug Mode",
		onChange: (value) => {
			setDebugMode(value);
			if (!value) {
				setShowLogs(false); // Disable logs when debug is off
			}
		},
	},
	showLogs: {
		type: "boolean",
		value: showLogs && debugMode, // Only enabled when debug is on
		label: "Show Console Logs",
		disabled: !debugMode,
		onChange: setShowLogs,
	},
});

// Usage
useEffect(() => {
	if (debugMode && showLogs) {
		console.log("Debug mode active with logging");
	}
}, [debugMode, showLogs]);
```

### Form Validation

```tsx
const [formData, setFormData] = useState({
	name: "",
	email: "",
	termsAccepted: false,
	newsletter: false,
});

const isFormValid = formData.name && formData.email && formData.termsAccepted;

useDevPanel("Form State", {
	termsAccepted: {
		type: "boolean",
		value: formData.termsAccepted,
		label: "Accept Terms & Conditions",
		onChange: (value) => setFormData((prev) => ({ ...prev, termsAccepted: value })),
	},
	newsletter: {
		type: "boolean",
		value: formData.newsletter,
		label: "Subscribe to Newsletter",
		onChange: (value) => setFormData((prev) => ({ ...prev, newsletter: value })),
	},
	separator: { type: "separator" },
	formValid: {
		type: "boolean",
		value: isFormValid,
		label: `Form Valid: ${isFormValid ? "Yes" : "No"}`,
		disabled: true, // Read-only status
		onChange: () => {}, // No-op for read-only
	},
});
```

### API Configuration

```tsx
const [apiConfig, setApiConfig] = useState({
	useCache: true,
	enableRetry: true,
	enableLogging: false,
	mockMode: false,
});

useDevPanel("API Configuration", {
	useCache: {
		type: "boolean",
		value: apiConfig.useCache,
		label: "Enable Caching",
		onChange: (value) => setApiConfig((prev) => ({ ...prev, useCache: value })),
	},
	enableRetry: {
		type: "boolean",
		value: apiConfig.enableRetry,
		label: "Auto Retry Failed Requests",
		onChange: (value) => setApiConfig((prev) => ({ ...prev, enableRetry: value })),
	},
	enableLogging: {
		type: "boolean",
		value: apiConfig.enableLogging,
		label: "Log API Calls",
		onChange: (value) => setApiConfig((prev) => ({ ...prev, enableLogging: value })),
	},
	mockMode: {
		type: "boolean",
		value: apiConfig.mockMode,
		label: "Use Mock Data",
		onChange: (value) => setApiConfig((prev) => ({ ...prev, mockMode: value })),
	},
});
```

## Visual States and Feedback

### Conditional Labels

```tsx
const [isConnected, setIsConnected] = useState(false);

useDevPanel("Connection", {
	connection: {
		type: "boolean",
		value: isConnected,
		label: `Server ${isConnected ? "🟢 Connected" : "🔴 Disconnected"}`,
		onChange: setIsConnected,
	},
});
```

### Progress Indicators

```tsx
const [settings, setSettings] = useState({
	task1: false,
	task2: false,
	task3: false,
});

const completedTasks = Object.values(settings).filter(Boolean).length;
const totalTasks = Object.keys(settings).length;
const progress = Math.round((completedTasks / totalTasks) * 100);

useDevPanel(`Setup Progress (${progress}%)`, {
	task1: {
		type: "boolean",
		value: settings.task1,
		label: "Configure Database",
		onChange: (value) => setSettings((prev) => ({ ...prev, task1: value })),
	},
	task2: {
		type: "boolean",
		value: settings.task2,
		label: "Setup Authentication",
		onChange: (value) => setSettings((prev) => ({ ...prev, task2: value })),
	},
	task3: {
		type: "boolean",
		value: settings.task3,
		label: "Deploy Application",
		onChange: (value) => setSettings((prev) => ({ ...prev, task3: value })),
	},
});
```

## Styling

Boolean controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-accent-color: #ff6200; /* Toggle active color */
	--dev-panel-background-color: #1a1a1a; /* Panel background */
	--dev-panel-text-color: #ffffff; /* Text color */
	--dev-panel-border-color: #333333; /* Border color */
	--dev-panel-transition: all 0.2s ease; /* Toggle animation */
}
```

### Custom Toggle Styling

```css
/* Target boolean controls specifically */
.dev-panel-boolean-control {
	--dev-panel-accent-color: #28a745; /* Green for enabled */
}

/* Custom toggle switch appearance */
.dev-panel-boolean-control .toggle-switch {
	background: var(--dev-panel-border-color);
	border-radius: 12px;
	transition: var(--dev-panel-transition);
}

.dev-panel-boolean-control .toggle-switch.active {
	background: var(--dev-panel-accent-color);
}

/* Toggle handle */
.dev-panel-boolean-control .toggle-handle {
	background: var(--dev-panel-text-color);
	border-radius: 50%;
	transition: var(--dev-panel-transition);
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Space**: Toggle value
-   **Enter**: Toggle value

### Screen Reader Support

-   Announces current state (checked/unchecked)
-   Provides proper role and state information
-   Associates labels correctly

### Best Practices

```tsx
// ✅ Good: Clear, descriptive labels
{
  type: 'boolean',
  value: enableNotifications,
  label: 'Enable Push Notifications',
  onChange: setEnableNotifications,
}

// ✅ Good: State indication in label
{
  type: 'boolean',
  value: isOnline,
  label: `Status: ${isOnline ? 'Online' : 'Offline'}`,
  onChange: setIsOnline,
}

// ❌ Avoid: Vague labels
{
  type: 'boolean',
  value: flag,
  label: 'Flag',
  onChange: setFlag,
}
```

## TypeScript

The boolean control provides full TypeScript support:

```tsx
import { BooleanControl } from "@berenjena/react-dev-panel";

interface AppSettings {
	darkMode: boolean;
	notifications: boolean;
	autoSave: boolean;
}

const [settings, setSettings] = useState<AppSettings>({
	darkMode: false,
	notifications: true,
	autoSave: true,
});

useDevPanel("App Settings", {
	darkMode: {
		type: "boolean",
		value: settings.darkMode,
		label: "Dark Mode",
		onChange: (value: boolean) => setSettings((prev) => ({ ...prev, darkMode: value })),
	} satisfies BooleanControl,
});
```

## Integration with State Management

### Redux Integration

```tsx
import { useSelector, useDispatch } from "react-redux";
import { toggleFeature } from "./store/featuresSlice";

function FeatureToggles() {
	const features = useSelector((state: RootState) => state.features);
	const dispatch = useDispatch();

	useDevPanel("Feature Flags", {
		newUI: {
			type: "boolean",
			value: features.newUI,
			label: "New UI Components",
			onChange: (value) => dispatch(toggleFeature({ feature: "newUI", enabled: value })),
		},
		betaFeatures: {
			type: "boolean",
			value: features.betaFeatures,
			label: "Beta Features",
			onChange: (value) => dispatch(toggleFeature({ feature: "betaFeatures", enabled: value })),
		},
	});

	return <DevPanel />;
}
```

### Context API Integration

```tsx
const SettingsContext = createContext<{
	settings: Settings;
	updateSetting: (key: string, value: boolean) => void;
} | null>(null);

function SettingsPanel() {
	const context = useContext(SettingsContext);
	if (!context) throw new Error("Must be within SettingsProvider");

	const { settings, updateSetting } = context;

	useDevPanel("User Preferences", {
		emailNotifications: {
			type: "boolean",
			value: settings.emailNotifications,
			label: "Email Notifications",
			onChange: (value) => updateSetting("emailNotifications", value),
		},
		pushNotifications: {
			type: "boolean",
			value: settings.pushNotifications,
			label: "Push Notifications",
			onChange: (value) => updateSetting("pushNotifications", value),
		},
	});

	return <DevPanel />;
}
```

## Performance Considerations

Boolean controls are inherently performant since they only handle simple true/false values. However, consider these patterns:

### Debouncing Side Effects

```tsx
const [autoSave, setAutoSave] = useState(true);

const debouncedSaveSettings = useDebounceCallback(() => saveSettingsToAPI({ autoSave }), 1000);

useDevPanel("Settings", {
	autoSave: {
		type: "boolean",
		value: autoSave,
		label: "Auto Save",
		onChange: (value) => {
			setAutoSave(value);
			debouncedSaveSettings();
		},
	},
});
```

## Related Controls

-   **[Select Control](./SELECT_CONTROL.md)** - For multiple choice options
-   **[Button Control](./BUTTON_CONTROL.md)** - For one-time actions
-   **[Button Group Control](./BUTTON_GROUP_CONTROL.md)** - For related toggle actions
