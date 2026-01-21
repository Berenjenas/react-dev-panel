# Number Control

Numeric input with constraints.

## Usage

```tsx
{
  type: "number",
  value: age,
  min: 0,
  max: 120,
  onChange: setAge,
}
```

## Properties

**Required:**

-   `type: "number"`
-   `value: number`
-   `onChange: (value: number) => void`

**Optional:**

-   `label?: string`
-   `min?: number`
-   `max?: number`
-   `step?: number`
-   `disabled?: boolean`
-   `persist?: boolean`
-   `event?: "onChange" | "onBlur"`

## Examples

```tsx
// With constraints
{ type: "number", value: age, min: 0, max: 120, onChange: setAge }

// With step
{ type: "number", value: price, min: 0, step: 0.01, onChange: setPrice }
```
