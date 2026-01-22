# Control Types

React Dev Panel provides 12 control types for managing different data types in your development interface.

## Common Properties

All controls support:

-   `label?: string` - Display label
-   `description?: string` - Help text below control
-   `disabled?: boolean` - Disable the control
-   `persist?: boolean` - Auto-save to localStorage ([details](./PERSISTENCE.md))

## Control Reference

### Input Controls

-   [**Text**](./controls/TEXT_CONTROL.md) - String input
-   [**Number**](./controls/NUMBER_CONTROL.md) - Numeric input with min/max
-   [**Color**](./controls/COLOR_CONTROL.md) - Color picker (hex)
-   [**Date**](./controls/DATE_CONTROL.md) - Date selector
-   [**Range**](./controls/RANGE_CONTROL.md) - Slider with step control

### Selection Controls

-   [**Boolean**](./controls/BOOLEAN_CONTROL.md) - Checkbox toggle
-   [**Select**](./controls/SELECT_CONTROL.md) - Dropdown (single)
-   [**MultiSelect**](./controls/MULTISELECT_CONTROL.md) - Dropdown (multiple)

### Action Controls

-   [**Button**](./controls/BUTTON_CONTROL.md) - Single action
-   [**Button Group**](./controls/BUTTON_GROUP_CONTROL.md) - Multiple actions

### File & Storage Controls

-   **DragAndDrop** - File upload area
-   [**LocalStorage**](./controls/LOCALSTORAGE_CONTROL.md) - Browser storage manager

### Layout Controls

-   [**Separator**](./controls/SEPARATOR_CONTROL.md) - Visual dividers

## Quick Reference

```tsx
// Text input
{ type: "text", value: str, onChange: (v: string) => void }

// Number with constraints
{ type: "number", value: num, min: 0, max: 100, onChange: (v: number) => void }

// Boolean toggle
{ type: "boolean", value: bool, onChange: (v: boolean) => void }

// Select dropdown
{ type: "select", value: str, options: string[], onChange: (v: string) => void }

// Color picker
{ type: "color", value: "#hex", onChange: (v: string) => void }

// Date selector
{ type: "date", value: "YYYY-MM-DD", onChange: (v: string) => void }

// Range slider
{ type: "range", value: num, min: 0, max: 100, step: 1, onChange: (v: number) => void }

// Button
{ type: "button", label: "Click me", onClick: () => void }
```

## Event Handling

Input controls support two update strategies:

```tsx
// Real-time updates (default)
{ type: "text", value: search, event: "onChange", onChange: setSearch }

// Update on blur (better for expensive operations)
{ type: "text", value: apiKey, event: "onBlur", onChange: setApiKey }
```

See [Event Handling](./EVENT_HANDLING.md) for details.

## Persistence

Add `persist: true` to auto-save values:

```tsx
{ type: "text", value: name, persist: true, onChange: setName }
```

See [Persistence](./PERSISTENCE.md) for details.
