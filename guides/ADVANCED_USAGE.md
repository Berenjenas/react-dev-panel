# Advanced Usage

Advanced patterns and techniques for React Dev Panel.

## Multiple Sections

Call `useDevPanel` from different components:

```tsx
// UserProfile.tsx
function UserProfile() {
	useDevPanel("User Profile", {
		name: { type: "text", value: name, onChange: setName },
		avatar: { type: "text", value: avatar, onChange: setAvatar },
	});
}

// AppSettings.tsx
function AppSettings() {
	useDevPanel("App Settings", {
		theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
	});
}
```

Both sections appear in the same panel automatically.

## Complex State Management

### Nested State Updates

```tsx
interface Settings {
  ui: { theme: string; fontSize: number };
  api: { endpoint: string; timeout: number };
}

const [settings, setSettings] = useState<Settings>({...});

useDevPanel("Settings", {
  theme: {
    type: "select",
    value: settings.ui.theme,
    options: ["light", "dark"],
    onChange: (value) => setSettings(prev => ({
      ...prev,
      ui: { ...prev.ui, theme: value }
    })),
  },
});
```

### With Redux/Zustand

```tsx
// Redux
import { useDispatch, useSelector } from "react-redux";

function Component() {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	useDevPanel("Redux", {
		theme: {
			type: "select",
			value: theme,
			options: ["light", "dark"],
			onChange: (value) => dispatch(setTheme(value)),
		},
	});
}

// Zustand
import { useStore } from "./store";

function Component() {
	const { theme, setTheme } = useStore();

	useDevPanel("Store", {
		theme: { type: "select", value: theme, options: ["light", "dark"], onChange: setTheme },
	});
}
```

## Dynamic Controls

Generate controls dynamically:

```tsx
const colorKeys = ["primary", "secondary", "accent"];

const colorControls = colorKeys.reduce(
	(acc, key) => ({
		...acc,
		[key]: {
			type: "color",
			value: colors[key],
			label: key,
			onChange: (value) => setColor(key, value),
		},
	}),
	{},
);

useDevPanel("Colors", colorControls);
```

## Conditional Controls

Show controls based on conditions:

```tsx
const controls = {
	mode: { type: "select", value: mode, options: ["basic", "advanced"], onChange: setMode },
	...(mode === "advanced" && {
		advancedOption: { type: "boolean", value: advanced, onChange: setAdvanced },
	}),
};

useDevPanel("Settings", controls);
```

## Performance Optimization

### Memoize Controls

```tsx
const controls = useMemo(
	() => ({
		name: { type: "text", value: name, onChange: setName },
		age: { type: "number", value: age, onChange: setAge },
	}),
	[name, age],
);

useDevPanel("User", controls);
```

### Debounce Expensive Operations

```tsx
import { useDebounceCallback } from "@berenjena/react-dev-panel";

const debouncedSave = useDebounceCallback(async (value) => {
	await saveToApi(value);
}, 500);

useDevPanel("API", {
	data: {
		type: "text",
		value: data,
		onChange: (value) => {
			setData(value);
			debouncedSave(value);
		},
	},
});
```

## Custom Hotkeys

### Multiple Hotkeys

```tsx
import { useHotkeys, createHotkey } from "@berenjena/react-dev-panel";

useHotkeys(
	[
		createHotkey("s", handleSave, { ctrl: true }, { description: "Save" }),
		createHotkey("r", handleReset, { ctrl: true, shift: true }),
		createHotkey("/", toggleSearch),
	],
	{ enabled: true },
);
```

### Mac/Windows Aware

```tsx
import { isMacOS } from "@berenjena/react-dev-panel";

const modifier = isMacOS() ? "Cmd" : "Ctrl";

useDevPanel("Settings", controls, {
	hotKeyConfig: {
		key: "d",
		[isMacOS() ? "metaKey" : "ctrlKey"]: true,
	},
});
```

## Button Groups

Group related actions:

```tsx
useDevPanel("Actions", {
	fileActions: {
		type: "buttonGroup",
		buttons: [
			{ label: "Save", onClick: handleSave },
			{ label: "Load", onClick: handleLoad },
			{ label: "Reset", onClick: handleReset },
		],
	},
});
```

## Separators

Organize controls visually:

```tsx
useDevPanel("Settings", {
  theme: { type: "select", ...},
  separator1: { type: "separator", variant: "line" },
  apiKey: { type: "text", ...},
  separator2: { type: "separator", variant: "label", label: "Advanced" },
  debug: { type: "boolean", ...},
});
```

## File Upload

Handle file uploads:

```tsx
const [files, setFiles] = useState<FileList | null>(null);

useDevPanel("Upload", {
	files: {
		type: "dragAndDrop",
		onChange: (fileList) => {
			setFiles(fileList);
			processFiles(fileList);
		},
	},
});
```

## TypeScript Tips

### Strict Typing

```tsx
import type { ControlsGroup } from "@berenjena/react-dev-panel";

const controls: ControlsGroup = {
	name: { type: "text", value: name, onChange: setName },
	// TypeScript enforces correct types
};
```

### Generic Helper

```tsx
function createControl<T>(type: string, value: T, onChange: (v: T) => void) {
	return { type, value, onChange };
}

const controls = {
	name: createControl("text", name, setName),
	age: createControl("number", age, setAge),
};
```

## Cleanup

The panel auto-unmounts when all sections are removed. Manual cleanup:

```tsx
useEffect(() => {
	useDevPanel("Temporary", controls);

	return () => {
		// Auto-cleanup happens here
	};
}, []);
```

## Best Practices

1. **Group related controls** in the same section
2. **Use descriptive section names** (stable, not dynamic)
3. **Memoize controls** for performance
4. **Enable persistence** for user preferences
5. **Use onBlur** for expensive operations
6. **Debounce** heavy computations
7. **TypeScript** for type safety

## Common Patterns

### Feature Flags

```tsx
const [flags, setFlags] = useState({
	newUI: false,
	betaFeatures: false,
});

useDevPanel("Feature Flags", {
	newUI: {
		type: "boolean",
		value: flags.newUI,
		onChange: (v) => setFlags((prev) => ({ ...prev, newUI: v })),
	},
	betaFeatures: {
		type: "boolean",
		value: flags.betaFeatures,
		onChange: (v) => setFlags((prev) => ({ ...prev, betaFeatures: v })),
	},
});
```

### API Mocking

```tsx
const [mock, setMock] = useState({ enabled: false, delay: 0 });

useDevPanel("API Mock", {
	enabled: { type: "boolean", value: mock.enabled, onChange: (v) => setMock((prev) => ({ ...prev, enabled: v })) },
	delay: { type: "range", value: mock.delay, min: 0, max: 5000, step: 100, onChange: (v) => setMock((prev) => ({ ...prev, delay: v })) },
});
```

### Theme Switcher

```tsx
const themes = ["light", "dark", "auto"];
const [theme, setTheme] = useState("dark");

useDevPanel("Theme", {
	theme: {
		type: "select",
		value: theme,
		options: themes,
		persist: true,
		onChange: (value) => {
			setTheme(value);
			document.documentElement.setAttribute("data-theme", value);
		},
	},
});
```
