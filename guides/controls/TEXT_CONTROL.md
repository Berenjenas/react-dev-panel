# Text Control

String input field.

## Usage

```tsx
{
  type: "text",
  value: name,
  label: "Name",
  onChange: setName,
}
```

## Properties

**Required:**

-   `type: "text"`
-   `value: string`
-   `onChange: (value: string) => void`

**Optional:**

-   `label?: string`
-   `description?: string`
-   `placeholder?: string`
-   `disabled?: boolean`
-   `persist?: boolean`
-   `event?: "onChange" | "onBlur"` - Update strategy (default: "onChange")

## Examples

```tsx
// Basic text
{ type: "text", value: title, onChange: setTitle }

// With placeholder
{ type: "text", value: search, placeholder: "Search...", onChange: setSearch }

// Update on blur (better for API calls)
{ type: "text", value: apiKey, event: "onBlur", onChange: setApiKey }
```
