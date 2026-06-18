---
"@berenjena/react-dev-panel": minor
---

Add `searchable` (and `searchPlaceholder`) support to the `multiselect` control, mirroring the `select` control. When `searchable: true`, a filter box appears above the options and narrows the list by label (case-insensitive) while keeping multiple selection. The underlying shared `Select` already supported this in multi mode; the control now exposes the props.
