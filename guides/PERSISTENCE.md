# Data Persistence Guide

React Dev Panel provides automatic persistence for control values using browser localStorage. This means your control values are automatically saved and restored when users refresh the page, navigate away, or restart their browser.

## Quick Start

To enable persistence for any control, simply add `persist: true` to its configuration:

```tsx
import { useState } from "react";
import { useDevPanel } from "@berenjena/react-dev-panel";

function MyComponent() {
	const [theme, setTheme] = useState("dark");
	const [debugMode, setDebugMode] = useState(false);

	useDevPanel("Settings", {
		theme: {
			type: "select",
			value: theme,
			options: ["light", "dark", "auto"],
			persist: true,
			onChange: setTheme,
		},
		debugMode: {
			type: "boolean",
			value: debugMode,
			persist: true,
			onChange: setDebugMode,
		},
	});

	return <div>Your component content...</div>;
}
```

That's it! The values will automatically:

-   Save when changed
-   Restore on page reload
-   Clean up when components unmount

## 🎛️ Persistence by Control Type

All control types support persistence. Here are examples for each:

### Text Controls

```tsx
{
  type: "text",
  value: userInput,
  label: "User Input",
  persist: true,
  onChange: setUserInput,
}
```

### Number & Range Controls

```tsx
{
  type: "range",
  value: volume,
  label: "Volume",
  min: 0,
  max: 100,
  persist: true,
  onChange: setVolume,
}
```

### Boolean Controls

```tsx
{
  type: "boolean",
  value: isEnabled,
  label: "Feature Enabled",
  persist: true,
  onChange: setIsEnabled,
}
```

### Color Controls

```tsx
{
  type: "color",
  value: accentColor,
  label: "Accent Color",
  persist: true,
  onChange: setAccentColor,
}
```

### Select Controls

```tsx
{
  type: "select",
  value: selectedOption,
  options: ["option1", "option2", "option3"],
  persist: true,
  onChange: setSelectedOption,
}
```

### Multiselect Controls

```tsx
{
  type: "multiselect",
  value: selectedItems,
  options: ["item1", "item2", "item3"],
  persist: true,
  onChange: setSelectedItems,
}
```

### Date Controls

```tsx
{
  type: "date",
  value: selectedDate,
  label: "Event Date",
  persist: true,
  onChange: setSelectedDate,
}
```

## 🏗️ Advanced Patterns

### Initializing State with Persisted Values

For optimal user experience, initialize your component state with persisted values:

```tsx
import { controlPersistenceService } from "@berenjena/react-dev-panel";

function getInitialValue<T>(sectionName: string, controlKey: string, defaultValue: T): T {
	const persistedValue = controlPersistenceService.getPersistedValue(sectionName, controlKey);
	return persistedValue !== undefined ? (persistedValue as T) : defaultValue;
}

function MyComponent() {
	const sectionName = "User Preferences";

	// Initialize state with persisted values
	const [theme, setTheme] = useState(() => getInitialValue(sectionName, "theme", "dark"));
	const [fontSize, setFontSize] = useState(() => getInitialValue(sectionName, "fontSize", 14));

	useDevPanel(sectionName, {
		theme: {
			type: "select",
			value: theme,
			options: ["light", "dark", "auto"],
			persist: true,
			onChange: setTheme,
		},
		fontSize: {
			type: "range",
			value: fontSize,
			min: 10,
			max: 24,
			persist: true,
			onChange: setFontSize,
		},
	});

	return <div style={{ fontSize }}>Content with persistent settings</div>;
}
```

### Complex State Management

For complex objects, persistence works seamlessly:

```tsx
interface UserSettings {
	notifications: boolean;
	theme: string;
	language: string;
	preferences: {
		autoSave: boolean;
		showTips: boolean;
	};
}

function SettingsPanel() {
	const [settings, setSettings] = useState<UserSettings>({
		notifications: true,
		theme: "dark",
		language: "en",
		preferences: {
			autoSave: true,
			showTips: true,
		},
	});

	useDevPanel("User Settings", {
		notifications: {
			type: "boolean",
			value: settings.notifications,
			persist: true,
			onChange: (value) => setSettings((prev) => ({ ...prev, notifications: value })),
		},
		theme: {
			type: "select",
			value: settings.theme,
			options: ["light", "dark", "auto"],
			persist: true,
			onChange: (value) => setSettings((prev) => ({ ...prev, theme: value })),
		},
		autoSave: {
			type: "boolean",
			value: settings.preferences.autoSave,
			persist: true,
			onChange: (value) =>
				setSettings((prev) => ({
					...prev,
					preferences: { ...prev.preferences, autoSave: value },
				})),
		},
	});

	return <div>Settings panel content...</div>;
}
```

### Character Creator Example

Here's a complete example from our Storybook that demonstrates persistence with a complex state:

```tsx
interface Character {
	name: string;
	class: string;
	level: number;
	hairColor: string;
	skinColor: string;
	eyeColor: string;
	stats: {
		strength: number;
		agility: number;
		intelligence: number;
		vitality: number;
	};
	equipment: string[];
	skills: string[];
	hasHelmet: boolean;
	hasCape: boolean;
	hasArmor: boolean;
	hasWeapon: boolean;
}

function CharacterCreator() {
	const sectionName = "Character Creator";

	// Initialize with persisted values
	const [character, setCharacter] = useState<Character>({
		name: getInitialValue(sectionName, "characterName", "Unnamed Hero"),
		class: getInitialValue(sectionName, "characterClass", "Warrior"),
		level: getInitialValue(sectionName, "level", 1),
		hairColor: getInitialValue(sectionName, "hairColor", "#8B4513"),
		skinColor: getInitialValue(sectionName, "skinColor", "#FDBCB4"),
		eyeColor: getInitialValue(sectionName, "eyeColor", "#2563eb"),
		stats: {
			strength: getInitialValue(sectionName, "strength", 10),
			agility: getInitialValue(sectionName, "agility", 10),
			intelligence: getInitialValue(sectionName, "intelligence", 10),
			vitality: getInitialValue(sectionName, "vitality", 10),
		},
		equipment: getInitialValue(sectionName, "equipment", []),
		skills: getInitialValue(sectionName, "skills", []),
		hasHelmet: getInitialValue(sectionName, "hasHelmet", false),
		hasCape: getInitialValue(sectionName, "hasCape", false),
		hasArmor: getInitialValue(sectionName, "hasArmor", true),
		hasWeapon: getInitialValue(sectionName, "hasWeapon", true),
	});

	useDevPanel(sectionName, {
		// Basic Info
		characterName: {
			type: "text",
			value: character.name,
			label: "Character Name",
			persist: true,
			onChange: (value) => setCharacter((prev) => ({ ...prev, name: value })),
		},
		characterClass: {
			type: "select",
			value: character.class,
			options: ["Warrior", "Mage", "Rogue", "Paladin"],
			persist: true,
			onChange: (value) => setCharacter((prev) => ({ ...prev, class: value })),
		},

		// Appearance
		hairColor: {
			type: "color",
			value: character.hairColor,
			label: "Hair Color",
			persist: true,
			onChange: (value) => setCharacter((prev) => ({ ...prev, hairColor: value })),
		},

		// Stats
		strength: {
			type: "range",
			value: character.stats.strength,
			min: 1,
			max: 20,
			persist: true,
			onChange: (value) =>
				setCharacter((prev) => ({
					...prev,
					stats: { ...prev.stats, strength: value },
				})),
		},

		// Equipment
		hasArmor: {
			type: "boolean",
			value: character.hasArmor,
			label: "Armor",
			persist: true,
			onChange: (value) => setCharacter((prev) => ({ ...prev, hasArmor: value })),
		},

		// Skills
		skills: {
			type: "multiselect",
			value: character.skills,
			options: ["Fireball", "Healing", "Stealth", "Shield Bash"],
			persist: true,
			onChange: (value) => setCharacter((prev) => ({ ...prev, skills: value })),
		},
	});

	return <CharacterDisplay character={character} />;
}
```

## Manual Persistence Control

For advanced use cases, you can manually control persistence using the `controlPersistenceService`:

```tsx
import { controlPersistenceService } from "@berenjena/react-dev-panel";

// Get persisted value
const persistedTheme = controlPersistenceService.getPersistedValue("Settings", "theme");

// Set persisted value
controlPersistenceService.setPersistedValue("Settings", "theme", "dark");

// Remove specific persisted value
controlPersistenceService.removePersistedValue("Settings", "theme");

// Remove all persisted values for a section
controlPersistenceService.removeSection("Settings");
```

## 🗂️ Storage Structure

Persisted values are stored in localStorage under the key `dev-panel-controls-persistence`:

```json
{
	"User Settings": {
		"theme": "dark",
		"debugMode": true,
		"fontSize": 16
	},
	"Character Creator": {
		"characterName": "Aragorn",
		"characterClass": "Ranger",
		"hairColor": "#8B4513",
		"strength": 15,
		"skills": ["Tracking", "Archery"]
	}
}
```

## 🚫 When NOT to Use Persistence

Avoid persistence for:

-   **Sensitive data** (passwords, tokens, personal information)
-   **Temporary states** (loading states, error messages, modal visibility)
-   **Session-specific data** (current user, authentication status)
-   **Real-time data** (live feeds, current time, dynamic content)

```tsx
// ❌ Don't persist sensitive or temporary data
{
  type: "text",
  value: password,
  label: "Password",
  persist: false, // Or omit entirely
  onChange: setPassword,
}

// ❌ Don't persist loading states
{
  type: "boolean",
  value: isLoading,
  label: "Loading",
  // No persist property
  onChange: setIsLoading,
}

// ✅ DO persist user preferences
{
  type: "select",
  value: theme,
  label: "Theme",
  persist: true, // User preference should be remembered
  onChange: setTheme,
}
```

## 🔍 Troubleshooting

### Values Not Persisting

1. **Check the `persist` property**: Ensure `persist: true` is set
2. **Verify localStorage**: Check if localStorage is available in your environment
3. **Check for section/control name changes**: Changing names breaks persistence links
4. **Inspect storage**: Use browser dev tools to examine `localStorage["dev-panel-controls-persistence"]`

### Performance Considerations

1. **Batch updates**: For multiple related controls, consider batching state updates
2. **Debounce expensive operations**: Use debouncing for controls that trigger heavy computations
3. **Avoid over-persistence**: Don't persist values that change frequently or are expensive to serialize

### Storage Limits

-   **localStorage limit**: Typically 5-10MB per domain
-   **JSON serialization**: Only JSON-serializable values are supported
-   **Complex objects**: Deeply nested objects work, but functions and non-serializable values are ignored

## 🏆 Best Practices

### 1. Use Descriptive Section Names

```tsx
// ✅ Good - descriptive and stable
useDevPanel("Theme Settings", controls);
useDevPanel("User Preferences", controls);
useDevPanel("Debug Tools", controls);

// ❌ Avoid - generic or dynamic names
useDevPanel("Section1", controls);
useDevPanel(`Settings-${userId}`, controls); // Don't include dynamic data
```

### 2. Initialize State with Persisted Values

```tsx
// ✅ Good - prevents flash of default values
const [theme, setTheme] = useState(() => getInitialValue("Settings", "theme", "dark"));

// ❌ Suboptimal - will show default value briefly
const [theme, setTheme] = useState("dark");
```

### 3. Group Related Controls

```tsx
// ✅ Good - logical grouping
useDevPanel("Appearance", {
	theme: {
		/* theme control */
	},
	fontSize: {
		/* font size control */
	},
	colorScheme: {
		/* color scheme control */
	},
});

useDevPanel("Behavior", {
	autoSave: {
		/* auto save control */
	},
	notifications: {
		/* notifications control */
	},
});
```

### 4. Handle Complex State Updates

```tsx
// ✅ Good - immutable updates
onChange: (value) =>
	setSettings((prev) => ({
		...prev,
		theme: value,
	}));

// ❌ Avoid - direct mutation
onChange: (value) => {
	settings.theme = value;
	setSettings(settings);
};
```

## Migration Guide

If you're adding persistence to existing controls:

1. Add `persist: true` to desired controls
2. Consider initializing state with persisted values
3. Test the user experience with existing and new users
4. Document the persistence behavior for your team

```tsx
// Before
{
  type: "select",
  value: theme,
  options: ["light", "dark"],
  onChange: setTheme,
}

// After
{
  type: "select",
  value: theme,
  options: ["light", "dark"],
  persist: true, // 🆕 Added persistence
  onChange: setTheme,
}
```

---

**Pro Tip**: Start by adding persistence to user preferences and theme settings, then gradually expand to other controls based on user feedback and usage patterns.
