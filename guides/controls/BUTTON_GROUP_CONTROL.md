# Button Group Control

Set of related action buttons for toolbars, tabs, and multi-action workflows.

## Usage

```tsx
{
  type: 'buttonGroup',
  buttons: [
    { label: 'Save', onClick: handleSave },
    { label: 'Cancel', onClick: handleCancel },
  ],
}
```

## Properties

| Property      | Type                               | Default        | Description                |
| ------------- | ---------------------------------- | -------------- | -------------------------- |
| `type`        | `'buttonGroup'`                    | —              | Control type               |
| `buttons`     | `ButtonConfig[]`                   | —              | Array of button configs    |
| `label`       | `string`                           | `undefined`    | Group label                |
| `orientation` | `'horizontal' \| 'vertical'`       | `'horizontal'` | Layout direction           |
| `spacing`     | `'compact' \| 'normal' \| 'loose'` | `'normal'`     | Button spacing             |

### ButtonConfig

| Property   | Type                                   | Default       | Description        |
| ---------- | -------------------------------------- | ------------- | ------------------ |
| `label`    | `string`                               | —             | Button text        |
| `onClick`  | `() => void`                           | —             | Click handler      |
| `disabled` | `boolean`                              | `false`       | Disabled state     |
| `variant`  | `'primary' \| 'secondary' \| 'danger'` | `'secondary'` | Button style       |
| `icon`     | `string`                               | `undefined`   | Icon (emoji/symbol)|
| `size`     | `'small' \| 'medium' \| 'large'`       | `'medium'`    | Button size        |

## Examples

### Action Buttons

```tsx
const [isSaving, setIsSaving] = useState(false);

useDevPanel("Form", {
  actions: {
    type: "buttonGroup",
    buttons: [
      {
        label: isSaving ? "Saving..." : "Save",
        onClick: handleSave,
        disabled: isSaving,
        variant: "primary",
      },
      {
        label: "Cancel",
        onClick: handleCancel,
        variant: "secondary",
      },
    ],
  },
});
```

### View Switcher

```tsx
const [view, setView] = useState<"grid" | "list">("grid");

useDevPanel("View", {
  viewMode: {
    type: "buttonGroup",
    buttons: [
      {
        label: "Grid",
        onClick: () => setView("grid"),
        variant: view === "grid" ? "primary" : "secondary",
      },
      {
        label: "List",
        onClick: () => setView("list"),
        variant: view === "list" ? "primary" : "secondary",
      },
    ],
  },
});
```

### Vertical Navigation

```tsx
const [tab, setTab] = useState("overview");

useDevPanel("Navigation", {
  tabs: {
    type: "buttonGroup",
    orientation: "vertical",
    buttons: [
      { label: "Overview", onClick: () => setTab("overview"), variant: tab === "overview" ? "primary" : "secondary" },
      { label: "Settings", onClick: () => setTab("settings"), variant: tab === "settings" ? "primary" : "secondary" },
      { label: "History", onClick: () => setTab("history"), variant: tab === "history" ? "primary" : "secondary" },
    ],
  },
});
```

## TypeScript

```tsx
import { ButtonGroupControl, ButtonConfig } from "@berenjena/react-dev-panel";

const buttons: ButtonConfig[] = [
  { label: "Save", onClick: save, variant: "primary" },
  { label: "Cancel", onClick: cancel, variant: "secondary" },
];

const control: ButtonGroupControl = {
  type: "buttonGroup",
  buttons,
};
```

## Related

- [Button Control](./BUTTON_CONTROL.md) - Single action buttons
- [Select Control](./SELECT_CONTROL.md) - Single-choice selections
