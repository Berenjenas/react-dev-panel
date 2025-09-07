# Advanced Usage

This guide covers advanced patterns and techniques for using React Dev Panel in complex applications.

## Multiple Panel Groups

Organize related controls into logical groups for better organization and user experience.

### Basic Grouping

```tsx
function App() {
	// User-related controls
	useDevPanel("User Settings", {
		name: { type: "text", value: name, onChange: setName },
		age: { type: "number", value: age, onChange: setAge },
		isActive: { type: "boolean", value: isActive, onChange: setIsActive },
	});

	// App-level controls
	useDevPanel("App Configuration", {
		theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
		debug: { type: "boolean", value: debug, onChange: setDebug },
		apiUrl: { type: "text", value: apiUrl, onChange: setApiUrl },
	});

	// Development tools
	useDevPanel("Dev Tools", {
		showGrid: { type: "boolean", value: showGrid, onChange: setShowGrid },
		mockData: { type: "button", label: "Load Mock Data", onClick: loadMockData },
		resetApp: { type: "button", label: "Reset Application", onClick: resetApp },
	});

	return <DevPanel />;
}
```

### Dynamic Group Management

```tsx
function DynamicGroupsExample() {
	const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

	// Base configuration always available
	useDevPanel("Base Config", {
		environment: {
			type: "select",
			value: environment,
			options: ["development", "staging", "production"],
			onChange: setEnvironment,
		},
	});

	// Conditional groups based on features
	if (activeFeatures.includes("analytics")) {
		useDevPanel("Analytics", {
			trackingEnabled: { type: "boolean", value: tracking, onChange: setTracking },
			sampleRate: { type: "range", value: sampleRate, min: 0, max: 1, step: 0.1, onChange: setSampleRate },
		});
	}

	if (activeFeatures.includes("experimental")) {
		useDevPanel("Experimental", {
			betaFeatures: { type: "boolean", value: betaFeatures, onChange: setBetaFeatures },
			debugMode: { type: "boolean", value: debugMode, onChange: setDebugMode },
		});
	}

	return <DevPanel />;
}
```

## State Persistence and Synchronization

React Dev Panel now includes built-in persistence that automatically saves and restores control values. This section covers advanced persistence patterns and integration with external state management.

### Automatic Persistence

Enable automatic persistence for any control by adding `persist: true`:

```tsx
function PersistentSettingsPanel() {
	const [settings, setSettings] = useState({
		theme: "dark",
		debugMode: false,
		apiEndpoint: "https://api.example.com",
	});

	useDevPanel("Persistent Settings", {
		theme: {
			type: "select",
			value: settings.theme,
			options: ["light", "dark", "auto"],
			persist: true, // Automatically saved to localStorage
			onChange: (theme) => setSettings((prev) => ({ ...prev, theme })),
		},
		debugMode: {
			type: "boolean",
			value: settings.debugMode,
			persist: true, // Persists across page reloads
			onChange: (debugMode) => setSettings((prev) => ({ ...prev, debugMode })),
		},
		apiEndpoint: {
			type: "text",
			value: settings.apiEndpoint,
			persist: true, // Saved and restored automatically
			onChange: (apiEndpoint) => setSettings((prev) => ({ ...prev, apiEndpoint })),
		},
	});

	return <DevPanel />;
}
```

### Initializing State with Persisted Values

For optimal user experience, initialize your component state with persisted values:

```tsx
import { controlPersistenceService } from "@berenjena/react-dev-panel";

function getInitialValue<T>(sectionName: string, controlKey: string, defaultValue: T): T {
	const persistedValue = controlPersistenceService.getPersistedValue(sectionName, controlKey);
	return persistedValue !== undefined ? (persistedValue as T) : defaultValue;
}

function AdvancedPersistenceExample() {
	const sectionName = "Advanced Settings";

	// Initialize state with persisted values to prevent flash of defaults
	const [settings, setSettings] = useState(() => ({
		theme: getInitialValue(sectionName, "theme", "dark"),
		debugMode: getInitialValue(sectionName, "debugMode", false),
		apiEndpoint: getInitialValue(sectionName, "apiEndpoint", "https://api.example.com"),
		features: getInitialValue(sectionName, "features", []),
	}));

	useDevPanel(sectionName, {
		theme: {
			type: "select",
			value: settings.theme,
			options: ["light", "dark", "auto"],
			persist: true,
			onChange: (theme) => setSettings((prev) => ({ ...prev, theme })),
		},
		debugMode: {
			type: "boolean",
			value: settings.debugMode,
			persist: true,
			onChange: (debugMode) => setSettings((prev) => ({ ...prev, debugMode })),
		},
		apiEndpoint: {
			type: "text",
			value: settings.apiEndpoint,
			persist: true,
			onChange: (apiEndpoint) => setSettings((prev) => ({ ...prev, apiEndpoint })),
		},
		features: {
			type: "multiselect",
			value: settings.features,
			options: ["analytics", "logging", "cache", "debugging"],
			persist: true,
			onChange: (features) => setSettings((prev) => ({ ...prev, features })),
		},
	});

	return <DevPanel />;
}
```

### Manual Persistence Control

For advanced scenarios, you can manually control persistence:

```tsx
import { controlPersistenceService } from "@berenjena/react-dev-panel";

function ManualPersistenceExample() {
	const [config, setConfig] = useState({});

	const saveConfiguration = () => {
		controlPersistenceService.setPersistedValue("MyApp", "config", config);
	};

	const loadConfiguration = () => {
		const savedConfig = controlPersistenceService.getPersistedValue("MyApp", "config");
		if (savedConfig) {
			setConfig(savedConfig);
		}
	};

	const clearConfiguration = () => {
		controlPersistenceService.removeSection("MyApp");
		setConfig({});
	};

	useDevPanel("Manual Persistence", {
		saveConfig: {
			type: "button",
			label: "Save Configuration",
			onClick: saveConfiguration,
		},
		loadConfig: {
			type: "button",
			label: "Load Configuration",
			onClick: loadConfiguration,
		},
		clearConfig: {
			type: "button",
			label: "Clear All Data",
			onClick: clearConfiguration,
		},
	});

	return <DevPanel />;
}
```

### URL State Synchronization

```tsx
import { useSearchParams } from "react-router-dom";

function URLSyncedDevPanel() {
	const [searchParams, setSearchParams] = useSearchParams();

	const getParam = (key: string, defaultValue: string) => searchParams.get(key) || defaultValue;

	const setParam = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams);
		newParams.set(key, value);
		setSearchParams(newParams);
	};

	useDevPanel("URL Synced", {
		page: {
			type: "select",
			value: getParam("page", "home"),
			options: ["home", "about", "contact"],
			onChange: (value) => setParam("page", value),
		},
		filter: {
			type: "text",
			value: getParam("filter", ""),
			onChange: (value) => setParam("filter", value),
		},
	});

	return <DevPanel />;
}
```

## Complex Control Patterns

### Dependent Controls

```tsx
function DependentControlsExample() {
	const [authType, setAuthType] = useState<"none" | "basic" | "oauth">("none");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [clientId, setClientId] = useState("");

	const controls: any = {
		authType: {
			type: "select",
			value: authType,
			label: "Authentication Type",
			options: [
				{ label: "No Authentication", value: "none" },
				{ label: "Basic Auth", value: "basic" },
				{ label: "OAuth 2.0", value: "oauth" },
			],
			onChange: setAuthType,
		},
	};

	// Add conditional controls based on auth type
	if (authType === "basic") {
		controls.separator1 = { type: "separator", style: "label", label: "Basic Auth Credentials" };
		controls.username = { type: "text", value: username, label: "Username", onChange: setUsername };
		controls.password = { type: "text", value: password, label: "Password", onChange: setPassword };
	}

	if (authType === "oauth") {
		controls.separator2 = { type: "separator", style: "label", label: "OAuth Configuration" };
		controls.clientId = { type: "text", value: clientId, label: "Client ID", onChange: setClientId };
	}

	useDevPanel("Authentication", controls);

	return <DevPanel />;
}
```

### Validation and Error Handling

```tsx
function ValidatedControlsExample() {
	const [email, setEmail] = useState("");
	const [port, setPort] = useState(3000);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateEmail = (value: string) => {
		const isValid = /\S+@\S+\.\S+/.test(value);
		setErrors((prev) => ({
			...prev,
			email: isValid ? "" : "Invalid email format",
		}));
		return isValid;
	};

	const validatePort = (value: number) => {
		const isValid = value > 0 && value <= 65535;
		setErrors((prev) => ({
			...prev,
			port: isValid ? "" : "Port must be between 1 and 65535",
		}));
		return isValid;
	};

	useDevPanel("Validated Inputs", {
		email: {
			type: "text",
			value: email,
			label: `Email ${errors.email ? "❌" : "✅"}`,
			onChange: (value: string) => {
				setEmail(value);
				validateEmail(value);
			},
		},
		port: {
			type: "number",
			value: port,
			label: `Port ${errors.port ? "❌" : "✅"}`,
			min: 1,
			max: 65535,
			onChange: (value: number) => {
				setPort(value);
				validatePort(value);
			},
		},
		submit: {
			type: "button",
			label: "Submit",
			onClick: () => {
				if (!errors.email && !errors.port) {
					console.log("Form is valid!");
				}
			},
		},
	});

	return <DevPanel />;
}
```

## Performance Optimization

### Memoized Controls

```tsx
import { useMemo } from "react";

function OptimizedDevPanel() {
	const [settings, setSettings] = useState({
		theme: "dark",
		debug: false,
		count: 0,
	});

	// Memoize controls to prevent unnecessary re-renders
	const controls = useMemo(
		() => ({
			theme: {
				type: "select" as const,
				value: settings.theme,
				options: ["light", "dark", "auto"],
				onChange: (theme: string) => setSettings((prev) => ({ ...prev, theme })),
			},
			debug: {
				type: "boolean" as const,
				value: settings.debug,
				onChange: (debug: boolean) => setSettings((prev) => ({ ...prev, debug })),
			},
			increment: {
				type: "button" as const,
				label: `Count: ${settings.count}`,
				onClick: () => setSettings((prev) => ({ ...prev, count: prev.count + 1 })),
			},
		}),
		[settings],
	);

	useDevPanel("Optimized Controls", controls);

	return <DevPanel />;
}
```

### Debounced Updates

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

function DebouncedExample() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState<string[]>([]);

	// Expensive search operation
	const performSearch = async (term: string) => {
		if (!term) {
			setResults([]);
			return;
		}

		// Simulate API call
		const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
		const data = await response.json();
		setResults(data.results);
	};

	// Debounce the search to avoid excessive API calls
	const debouncedSearch = useDebounceCallback(performSearch, 300);

	useDevPanel("Search", {
		searchTerm: {
			type: "text",
			value: searchTerm,
			label: `Search (${results.length} results)`,
			placeholder: "Enter search term...",
			onChange: (value: string) => {
				setSearchTerm(value);
				debouncedSearch(value);
			},
		},
	});

	return <DevPanel />;
}
```

## Integration Patterns

### Redux Integration

```tsx
import { useSelector, useDispatch } from "react-redux";
import { updateSettings } from "./store/settingsSlice";

function ReduxIntegratedPanel() {
	const settings = useSelector((state: RootState) => state.settings);
	const dispatch = useDispatch();

	useDevPanel("Redux Settings", {
		theme: {
			type: "select",
			value: settings.theme,
			options: ["light", "dark"],
			onChange: (theme) => dispatch(updateSettings({ theme })),
		},
		debugMode: {
			type: "boolean",
			value: settings.debugMode,
			onChange: (debugMode) => dispatch(updateSettings({ debugMode })),
		},
	});

	return <DevPanel />;
}
```

### Context API Integration

```tsx
const SettingsContext = createContext<{
	settings: Settings;
	updateSetting: (key: string, value: any) => void;
} | null>(null);

function ContextIntegratedPanel() {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error("Panel must be used within SettingsProvider");
	}

	const { settings, updateSetting } = context;

	useDevPanel("Context Settings", {
		language: {
			type: "select",
			value: settings.language,
			options: ["en", "es", "fr"],
			onChange: (value) => updateSetting("language", value),
		},
		notifications: {
			type: "boolean",
			value: settings.notifications,
			onChange: (value) => updateSetting("notifications", value),
		},
	});

	return <DevPanel />;
}
```

## Testing with Dev Panel

### Mock Data Generation

```tsx
function TestDataPanel() {
	const [mockUsers, setMockUsers] = useState<User[]>([]);

	const generateMockUsers = (count: number) => {
		const users = Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@example.com`,
			active: Math.random() > 0.5,
		}));
		setMockUsers(users);
	};

	useDevPanel("Test Data", {
		userCount: {
			type: "range",
			value: mockUsers.length,
			min: 0,
			max: 100,
			label: `Generate ${mockUsers.length} users`,
			onChange: generateMockUsers,
		},
		separator: { type: "separator" },
		clearData: {
			type: "button",
			label: "Clear All Data",
			onClick: () => setMockUsers([]),
		},
		exportData: {
			type: "button",
			label: "Export JSON",
			onClick: () => {
				const dataStr = JSON.stringify(mockUsers, null, 2);
				const dataBlob = new Blob([dataStr], { type: "application/json" });
				const url = URL.createObjectURL(dataBlob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "mock-users.json";
				link.click();
			},
		},
	});

	return (
		<div>
			<DevPanel />
			<UserList users={mockUsers} />
		</div>
	);
}
```

### Feature Flags

```tsx
function FeatureFlagsPanel() {
	const [features, setFeatures] = useState({
		newDashboard: false,
		experimentalUI: false,
		betaFeatures: false,
	});

	useDevPanel("Feature Flags", {
		newDashboard: {
			type: "boolean",
			value: features.newDashboard,
			label: "New Dashboard",
			onChange: (value) => setFeatures((prev) => ({ ...prev, newDashboard: value })),
		},
		experimentalUI: {
			type: "boolean",
			value: features.experimentalUI,
			label: "Experimental UI",
			onChange: (value) => setFeatures((prev) => ({ ...prev, experimentalUI: value })),
		},
		betaFeatures: {
			type: "boolean",
			value: features.betaFeatures,
			label: "Beta Features",
			onChange: (value) => setFeatures((prev) => ({ ...prev, betaFeatures: value })),
		},
		separator: { type: "separator" },
		resetAll: {
			type: "button",
			label: "Reset All Flags",
			onClick: () =>
				setFeatures({
					newDashboard: false,
					experimentalUI: false,
					betaFeatures: false,
				}),
		},
	});

	return (
		<div>
			<DevPanel />
			{features.newDashboard && <NewDashboard />}
			{features.experimentalUI && <ExperimentalUI />}
			{features.betaFeatures && <BetaFeatures />}
		</div>
	);
}
```

## Best Practices for Advanced Usage

### ✅ Do

-   Group related controls logically
-   Use memoization for expensive control configurations
-   Implement proper error handling and validation
-   Consider performance implications of frequent updates
-   Test integration with your state management solution

### ❌ Don't

-   Create too many small groups (aim for 3-8 controls per group)
-   Update controls too frequently without debouncing
-   Ignore TypeScript warnings about control types
-   Mix unrelated controls in the same group
-   Forget to clean up side effects in control handlers
