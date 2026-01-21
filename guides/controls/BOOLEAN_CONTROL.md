# Boolean Control

Toggle switch for true/false values.

## Usage

```tsx
{
  type: "boolean",
  value: isEnabled,
  label: "Enable Feature",
  onChange: setIsEnabled,
}
```

## Properties

**Required:**

-   `type: "boolean"`
-   `value: boolean`
-   `onChange: (value: boolean) => void`

**Optional:**

-   `label?: string` - Display label
-   `description?: string` - Help text
-   `disabled?: boolean` - Disable control
-   `persist?: boolean` - Auto-save to localStorage

## Examples

### Basic Toggle

```tsx
{
  type: "boolean",
  value: darkMode,
  label: "Dark Mode",
  onChange: setDarkMode,
}
```

### With Persistence

```tsx
{
  type: "boolean",
  value: debugMode,
  label: "Debug Mode",
  persist: true,
  onChange: setDebugMode,
}
```

### Conditional Feature

```tsx
{
  type: "boolean",
  value: betaFeatures,
  label: "Enable Beta Features",
  description: "Experimental features (may be unstable)",
  onChange: setBetaFeatures,
}
```
