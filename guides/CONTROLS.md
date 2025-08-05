# 🎛️ Control Types

React Dev Panel provides a comprehensive set of control types to manage different kinds of data in your development interface. Each control type is designed to handle specific data types and use cases.

## Overview

All controls share common properties:

-   `label` - Display label for the control
-   `value` - Current value
-   `onChange` - Callback function when value changes

## Available Controls

### Input Controls

-   [**Text Control**](./controls/TEXT_CONTROL.md) - String input with optional validation
-   [**Number Control**](./controls/NUMBER_CONTROL.md) - Numeric input with min/max constraints
-   [**Color Control**](./controls/COLOR_CONTROL.md) - Color picker with hex output
-   [**Date Control**](./controls/DATE_CONTROL.md) - Date picker with range constraints
-   [**Range Control**](./controls/RANGE_CONTROL.md) - Slider input for numeric ranges

### Selection Controls

-   [**Boolean Control**](./controls/BOOLEAN_CONTROL.md) - Toggle switch for true/false values
-   [**Select Control**](./controls/SELECT_CONTROL.md) - Dropdown with single selection
-   [**MultiSelect Control**](./controls/MULTISELECT_CONTROL.md) - Dropdown with multiple selection support

### Action Controls

-   [**Button Control**](./controls/BUTTON_CONTROL.md) - Single action button
-   [**Button Group Control**](./controls/BUTTON_GROUP_CONTROL.md) - Multiple related actions

### Layout Controls

-   [**Separator Control**](./controls/SEPARATOR_CONTROL.md) - Visual separators and labels

## Event Handling

All input controls support two event handling strategies:

-   **onChange**: Real-time updates as user interacts
-   **onBlur**: Updates only when control loses focus

For more details, see [Event Handling](./EVENT_HANDLING.md).

## Quick Examples

### Basic Text Input

```tsx
{
  type: 'text',
  value: 'Hello World',
  label: 'Message',
  onChange: setValue,
}
```

### Number with Constraints

```tsx
{
  type: 'number',
  value: 42,
  label: 'Count',
  min: 0,
  max: 100,
  onChange: setValue,
}
```

### Selection Dropdown

```tsx
{
  type: 'select',
  value: 'option1',
  label: 'Choose Option',
  options: ['option1', 'option2', 'option3'],
  onChange: setValue,
}
```

### Multiple Selection

```tsx
{
  type: 'multiselect',
  value: ['option1', 'option3'],
  label: 'Choose Multiple',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
  onChange: setMultipleValues,
}
```

## TypeScript Support

All controls provide full TypeScript support with proper type inference for values and change handlers. The library exports comprehensive type definitions for all control configurations.
