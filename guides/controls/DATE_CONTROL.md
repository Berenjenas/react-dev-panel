# Date Control

Date picker interface with validation and formatting options.

## Usage

```tsx
{
  type: 'date',
  value: '2025-07-27',
  label: 'Select Date',
  onChange: setDate,
}
```

## Properties

| Property   | Type                      | Default      | Description                |
| ---------- | ------------------------- | ------------ | -------------------------- |
| `type`     | `'date'`                  | —            | Control type               |
| `value`    | `string`                  | —            | ISO date string (YYYY-MM-DD)|
| `onChange` | `(value: string) => void` | —            | Change handler             |
| `label`    | `string`                  | `undefined`  | Display label              |
| `min`      | `string`                  | `undefined`  | Minimum date (ISO)         |
| `max`      | `string`                  | `undefined`  | Maximum date (ISO)         |
| `disabled` | `boolean`                 | `false`      | Disabled state             |
| `persist`  | `boolean`                 | `false`      | Auto-save to localStorage  |

## Examples

### Date Range

```tsx
const [range, setRange] = useState({
  start: "2025-07-01",
  end: "2025-07-31",
});

const days = Math.ceil((new Date(range.end).getTime() - new Date(range.start).getTime()) / (1000 * 60 * 60 * 24));

useDevPanel("Date Range", {
  start: {
    type: "date",
    value: range.start,
    label: "Start Date",
    max: range.end,
    onChange: (value) => setRange(prev => ({ ...prev, start: value })),
  },
  end: {
    type: "date",
    value: range.end,
    label: "End Date",
    min: range.start,
    onChange: (value) => setRange(prev => ({ ...prev, end: value })),
  },
  duration: {
    type: "text",
    value: `${days} days`,
    label: "Duration",
    disabled: true,
    onChange: () => {},
  },
});
```

### Scheduling

```tsx
const [schedule, setSchedule] = useState({
  date: "2025-07-27",
  time: "09:00",
});

useDevPanel("Meeting", {
  date: {
    type: "date",
    value: schedule.date,
    label: "Date",
    min: new Date().toISOString().split("T")[0],
    onChange: (value) => setSchedule(prev => ({ ...prev, date: value })),
  },
  time: {
    type: "time",
    value: schedule.time,
    label: "Time",
    onChange: (value) => setSchedule(prev => ({ ...prev, time: value })),
  },
});
```

### Deadline Tracker

```tsx
const [dueDate, setDueDate] = useState("2025-07-30");

const daysUntil = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
const status = daysUntil < 0 ? "Overdue" : daysUntil === 0 ? "Due Today" : `${daysUntil} days`;

useDevPanel("Task", {
  dueDate: {
    type: "date",
    value: dueDate,
    label: `Due Date (${status})`,
    min: new Date().toISOString().split("T")[0],
    onChange: setDueDate,
  },
});
```

## TypeScript

```tsx
import { DateControl } from "@berenjena/react-dev-panel";

const control: DateControl = {
  type: "date",
  value: "2025-07-27",
  label: "Event Date",
  onChange: setDate,
};
```

## Related

- [Text Control](./TEXT_CONTROL.md) - For text-based date input
- [Select Control](./SELECT_CONTROL.md) - For predefined date options
