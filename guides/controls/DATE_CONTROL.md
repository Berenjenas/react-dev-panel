# Date Control

The date control provides a date picker interface for selecting dates, times, and date ranges with validation and formatting options.

## Basic Usage

```tsx
{
  type: 'date',
  value: '2025-07-27',
  label: 'Select Date',
  onChange: setDate,
}
```

## Properties

### Required Properties

| Property   | Type                      | Description                 |
| ---------- | ------------------------- | --------------------------- |
| `type`     | `'date'`                  | Control type identifier     |
| `value`    | `string`                  | Current date value (ISO)    |
| `onChange` | `(value: string) => void` | Callback when value changes |

### Optional Properties

| Property   | Type                     | Default      | Description                        |
| ---------- | ------------------------ | ------------ | ---------------------------------- |
| `label`    | `string`                 | `undefined`  | Display label for the control      |
| `min`      | `string`                 | `undefined`  | Minimum allowed date (ISO)         |
| `max`      | `string`                 | `undefined`  | Maximum allowed date (ISO)         |
| `disabled` | `boolean`                | `false`      | Whether the control is disabled    |
| `persist`  | `boolean`                | `false`      | Enable automatic value persistence |
| `max`      | `string`                 | `undefined`  | Maximum allowed date (ISO)         |
| `step`     | `number`                 | `1`          | Step increment in days             |
| `disabled` | `boolean`                | `false`      | Whether the control is disabled    |
| `event`    | `'onChange' \| 'onBlur'` | `'onChange'` | When to trigger onChange callback  |

## Date Formats

Date controls use ISO 8601 format strings:

-   **Date**: `"2025-07-27"` (YYYY-MM-DD)
-   **Time**: `"14:30"` (HH:MM)
-   **DateTime**: `"2025-07-27T14:30"` (YYYY-MM-DDTHH:MM)

## Common Patterns

### Basic Date Picker

```tsx
const [selectedDate, setSelectedDate] = useState("2025-07-27");

useDevPanel("Date Selection", {
	eventDate: {
		type: "date",
		value: selectedDate,
		label: "Event Date",
		onChange: setSelectedDate,
	},
});
```

### Date Range Picker

```tsx
const [dateRange, setDateRange] = useState({
	startDate: "2025-07-01",
	endDate: "2025-07-31",
});

// Helper to format date for display
const formatDateForDisplay = (dateStr: string) => {
	return new Date(dateStr).toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

useDevPanel("Date Range", {
	startDate: {
		type: "date",
		value: dateRange.startDate,
		label: `Start Date (${formatDateForDisplay(dateRange.startDate)})`,
		max: dateRange.endDate, // End date is the limit
		onChange: (value) => setDateRange((prev) => ({ ...prev, startDate: value })),
	},
	endDate: {
		type: "date",
		value: dateRange.endDate,
		label: `End Date (${formatDateForDisplay(dateRange.endDate)})`,
		min: dateRange.startDate, // Start date is the minimum
		onChange: (value) => setDateRange((prev) => ({ ...prev, endDate: value })),
	},
	separator: { type: "separator", style: "label", label: "Range Info" },
	duration: {
		type: "text",
		value: `${Math.ceil((new Date(dateRange.endDate).getTime() - new Date(dateRange.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`,
		label: "Duration",
		disabled: true,
		onChange: () => {},
	},
});
```

### Scheduling Controls

```tsx
const [schedule, setSchedule] = useState({
	date: "2025-07-27",
	time: "09:00",
	timezone: "America/New_York",
	recurring: false,
});

const getDateTime = () => {
	return new Date(`${schedule.date}T${schedule.time}`);
};

const isInPast = getDateTime() < new Date();

useDevPanel("Meeting Scheduler", {
	date: {
		type: "date",
		value: schedule.date,
		label: "Meeting Date",
		min: new Date().toISOString().split("T")[0], // Today or later
		onChange: (value) => setSchedule((prev) => ({ ...prev, date: value })),
	},
	time: {
		type: "time",
		value: schedule.time,
		label: "Meeting Time",
		onChange: (value) => setSchedule((prev) => ({ ...prev, time: value })),
	},
	timezone: {
		type: "select",
		value: schedule.timezone,
		label: "Timezone",
		options: [
			{ value: "America/New_York", label: "Eastern Time" },
			{ value: "America/Chicago", label: "Central Time" },
			{ value: "America/Denver", label: "Mountain Time" },
			{ value: "America/Los_Angeles", label: "Pacific Time" },
			{ value: "UTC", label: "UTC" },
		],
		onChange: (value) => setSchedule((prev) => ({ ...prev, timezone: value })),
	},
	recurring: {
		type: "boolean",
		value: schedule.recurring,
		label: "Recurring Meeting",
		onChange: (value) => setSchedule((prev) => ({ ...prev, recurring: value })),
	},
	separator: { type: "separator" },
	preview: {
		type: "text",
		value: getDateTime().toLocaleString("en-US", {
			timeZone: schedule.timezone,
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			timeZoneName: "short",
		}),
		label: isInPast ? "⚠️ Scheduled Time" : "✅ Scheduled Time",
		disabled: true,
		onChange: () => {},
	},
});
```

### Deadline/Due Date Tracker

```tsx
const [tasks, setTasks] = useState([
	{ id: 1, name: "Project Proposal", dueDate: "2025-07-30", priority: "high" },
	{ id: 2, name: "Code Review", dueDate: "2025-08-05", priority: "medium" },
	{ id: 3, name: "Documentation", dueDate: "2025-08-15", priority: "low" },
]);

const [selectedTask, setSelectedTask] = useState(1);
const task = tasks.find((t) => t.id === selectedTask);

const getDaysUntilDue = (dateStr: string) => {
	const dueDate = new Date(dateStr);
	const today = new Date();
	const diffTime = dueDate.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
};

const getDueDateStatus = (dateStr: string) => {
	const days = getDaysUntilDue(dateStr);
	if (days < 0) return "🔴 Overdue";
	if (days === 0) return "🟡 Due Today";
	if (days <= 3) return "🟠 Due Soon";
	return "🟢 On Track";
};

useDevPanel("Task Deadlines", {
	taskSelector: {
		type: "select",
		value: selectedTask.toString(),
		label: "Select Task",
		options: tasks.map((t) => ({
			value: t.id.toString(),
			label: `${t.name} (${getDaysUntilDue(t.dueDate)} days)`,
		})),
		onChange: (value) => setSelectedTask(parseInt(value)),
	},
	separator1: { type: "separator", style: "label", label: "Task Details" },
	taskName: {
		type: "text",
		value: task?.name || "",
		label: "Task Name",
		disabled: true,
		onChange: () => {},
	},
	priority: {
		type: "text",
		value: task?.priority || "",
		label: "Priority",
		disabled: true,
		onChange: () => {},
	},
	separator2: { type: "separator", style: "label", label: "Due Date" },
	dueDate: {
		type: "date",
		value: task?.dueDate || "",
		label: `Due Date (${getDueDateStatus(task?.dueDate || "")})`,
		min: new Date().toISOString().split("T")[0],
		onChange: (value) => {
			setTasks((prev) => prev.map((t) => (t.id === selectedTask ? { ...t, dueDate: value } : t)));
		},
	},
	daysRemaining: {
		type: "number",
		value: getDaysUntilDue(task?.dueDate || ""),
		label: "Days Until Due",
		disabled: true,
		onChange: () => {},
	},
});
```

### Event Calendar

```tsx
const [events, setEvents] = useState([
	{ id: 1, title: "Team Meeting", date: "2025-07-28", type: "meeting" },
	{ id: 2, title: "Project Deadline", date: "2025-07-30", type: "deadline" },
	{ id: 3, title: "Conference", date: "2025-08-15", type: "event" },
]);

const [newEvent, setNewEvent] = useState({
	title: "",
	date: new Date().toISOString().split("T")[0],
	type: "meeting",
});

const getEventsForDate = (dateStr: string) => {
	return events.filter((event) => event.date === dateStr);
};

const formatEventList = (events: typeof events) => {
	if (events.length === 0) return "No events scheduled";
	return events.map((e) => `• ${e.title} (${e.type})`).join("\n");
};

useDevPanel("Event Calendar", {
	selectedDate: {
		type: "date",
		value: newEvent.date,
		label: `Selected Date (${getEventsForDate(newEvent.date).length} events)`,
		onChange: (value) => setNewEvent((prev) => ({ ...prev, date: value })),
	},
	eventsOnDate: {
		type: "text",
		value: formatEventList(getEventsForDate(newEvent.date)),
		label: "Events on Selected Date",
		disabled: true,
		onChange: () => {},
	},
	separator: { type: "separator", style: "label", label: "Add New Event" },
	eventTitle: {
		type: "text",
		value: newEvent.title,
		label: "Event Title",
		placeholder: "Enter event title...",
		onChange: (value) => setNewEvent((prev) => ({ ...prev, title: value })),
	},
	eventType: {
		type: "select",
		value: newEvent.type,
		label: "Event Type",
		options: [
			{ value: "meeting", label: "📅 Meeting" },
			{ value: "deadline", label: "⏰ Deadline" },
			{ value: "event", label: "🎉 Event" },
			{ value: "reminder", label: "📝 Reminder" },
		],
		onChange: (value) => setNewEvent((prev) => ({ ...prev, type: value })),
	},
	addEvent: {
		type: "button",
		label: "Add Event",
		disabled: !newEvent.title.trim(),
		onClick: () => {
			if (newEvent.title.trim()) {
				const event = {
					id: Date.now(),
					title: newEvent.title,
					date: newEvent.date,
					type: newEvent.type,
				};
				setEvents((prev) => [...prev, event]);
				setNewEvent((prev) => ({ ...prev, title: "" }));
			}
		},
	},
});
```

### Historical Data Viewer

```tsx
const [dataView, setDataView] = useState({
	startDate: "2025-01-01",
	endDate: "2025-07-27",
	granularity: "daily",
});

const getDataPointCount = () => {
	const start = new Date(dataView.startDate);
	const end = new Date(dataView.endDate);
	const diffTime = end.getTime() - start.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	switch (dataView.granularity) {
		case "hourly":
			return diffDays * 24;
		case "daily":
			return diffDays;
		case "weekly":
			return Math.ceil(diffDays / 7);
		case "monthly":
			return Math.ceil(diffDays / 30);
		default:
			return diffDays;
	}
};

const getMaxDataPoints = () => {
	switch (dataView.granularity) {
		case "hourly":
			return 1000;
		case "daily":
			return 365;
		case "weekly":
			return 52;
		case "monthly":
			return 24;
		default:
			return 365;
	}
};

const dataPointCount = getDataPointCount();
const maxPoints = getMaxDataPoints();
const tooManyPoints = dataPointCount > maxPoints;

useDevPanel("Historical Data", {
	startDate: {
		type: "date",
		value: dataView.startDate,
		label: "Start Date",
		max: dataView.endDate,
		onChange: (value) => setDataView((prev) => ({ ...prev, startDate: value })),
	},
	endDate: {
		type: "date",
		value: dataView.endDate,
		label: "End Date",
		min: dataView.startDate,
		max: new Date().toISOString().split("T")[0],
		onChange: (value) => setDataView((prev) => ({ ...prev, endDate: value })),
	},
	granularity: {
		type: "select",
		value: dataView.granularity,
		label: "Data Granularity",
		options: [
			{ value: "hourly", label: "Hourly" },
			{ value: "daily", label: "Daily" },
			{ value: "weekly", label: "Weekly" },
			{ value: "monthly", label: "Monthly" },
		],
		onChange: (value) => setDataView((prev) => ({ ...prev, granularity: value })),
	},
	separator: { type: "separator", style: "label", label: "Data Summary" },
	pointCount: {
		type: "text",
		value: `${dataPointCount.toLocaleString()} points ${tooManyPoints ? "⚠️" : "✅"}`,
		label: "Data Points",
		disabled: true,
		onChange: () => {},
	},
	maxPoints: {
		type: "text",
		value: `${maxPoints.toLocaleString()} max`,
		label: "Maximum Allowed",
		disabled: true,
		onChange: () => {},
	},
	loadData: {
		type: "button",
		label: tooManyPoints ? "Too Many Points" : "Load Data",
		disabled: tooManyPoints,
		onClick: () => {
			console.log("Loading data for:", dataView);
		},
	},
});
```

## Advanced Features

### Time Zones and Localization

```tsx
const [appointment, setAppointment] = useState({
	date: "2025-07-27",
	time: "14:00",
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const convertToTimezone = (date: string, time: string, targetTz: string) => {
	const dt = new Date(`${date}T${time}`);
	return dt.toLocaleString("en-US", {
		timeZone: targetTz,
		hour12: false,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
};

useDevPanel("Global Scheduling", {
	localDate: {
		type: "date",
		value: appointment.date,
		label: "Local Date",
		onChange: (value) => setAppointment((prev) => ({ ...prev, date: value })),
	},
	localTime: {
		type: "time",
		value: appointment.time,
		label: "Local Time",
		onChange: (value) => setAppointment((prev) => ({ ...prev, time: value })),
	},
	timezone: {
		type: "select",
		value: appointment.timezone,
		label: "Display Timezone",
		options: [
			{ value: "UTC", label: "UTC" },
			{ value: "America/New_York", label: "New York" },
			{ value: "Europe/London", label: "London" },
			{ value: "Asia/Tokyo", label: "Tokyo" },
			{ value: "Australia/Sydney", label: "Sydney" },
		],
		onChange: (value) => setAppointment((prev) => ({ ...prev, timezone: value })),
	},
	separator: { type: "separator" },
	convertedTime: {
		type: "text",
		value: convertToTimezone(appointment.date, appointment.time, appointment.timezone),
		label: `Time in ${appointment.timezone}`,
		disabled: true,
		onChange: () => {},
	},
});
```

### Date Validation and Business Rules

```tsx
const [booking, setBooking] = useState({
	checkIn: "",
	checkOut: "",
	guests: 1,
});

const isWeekend = (dateStr: string) => {
	const date = new Date(dateStr);
	const day = date.getDay();
	return day === 0 || day === 6; // Sunday or Saturday
};

const isHoliday = (dateStr: string) => {
	const holidays = ["2025-07-04", "2025-12-25", "2025-01-01"];
	return holidays.includes(dateStr);
};

const getMinCheckOut = () => {
	if (!booking.checkIn) return undefined;
	const checkIn = new Date(booking.checkIn);
	checkIn.setDate(checkIn.getDate() + 1); // Minimum 1 night
	return checkIn.toISOString().split("T")[0];
};

const getNights = () => {
	if (!booking.checkIn || !booking.checkOut) return 0;
	const checkIn = new Date(booking.checkIn);
	const checkOut = new Date(booking.checkOut);
	const diffTime = checkOut.getTime() - checkIn.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getWeekendSurcharge = () => {
	if (!booking.checkIn || !booking.checkOut) return 0;
	let weekendNights = 0;
	const current = new Date(booking.checkIn);
	const end = new Date(booking.checkOut);

	while (current < end) {
		if (isWeekend(current.toISOString().split("T")[0])) {
			weekendNights++;
		}
		current.setDate(current.getDate() + 1);
	}

	return weekendNights * 50; // $50 surcharge per weekend night
};

useDevPanel("Hotel Booking", {
	checkIn: {
		type: "date",
		value: booking.checkIn,
		label: `Check-in ${isWeekend(booking.checkIn) ? "🎉 Weekend" : ""}${isHoliday(booking.checkIn) ? " 🏖️ Holiday" : ""}`,
		min: new Date().toISOString().split("T")[0],
		max: booking.checkOut || undefined,
		onChange: (value) => setBooking((prev) => ({ ...prev, checkIn: value })),
	},
	checkOut: {
		type: "date",
		value: booking.checkOut,
		label: `Check-out ${isWeekend(booking.checkOut) ? "🎉 Weekend" : ""}${isHoliday(booking.checkOut) ? " 🏖️ Holiday" : ""}`,
		min: getMinCheckOut(),
		onChange: (value) => setBooking((prev) => ({ ...prev, checkOut: value })),
	},
	guests: {
		type: "number",
		value: booking.guests,
		label: "Number of Guests",
		min: 1,
		max: 8,
		onChange: (value) => setBooking((prev) => ({ ...prev, guests: value })),
	},
	separator: { type: "separator", style: "label", label: "Booking Summary" },
	nights: {
		type: "text",
		value: getNights().toString(),
		label: "Number of Nights",
		disabled: true,
		onChange: () => {},
	},
	weekendSurcharge: {
		type: "text",
		value: `$${getWeekendSurcharge()}`,
		label: "Weekend Surcharge",
		disabled: true,
		onChange: () => {},
	},
	baseRate: {
		type: "text",
		value: `$${getNights() * 100}`,
		label: "Base Rate ($100/night)",
		disabled: true,
		onChange: () => {},
	},
	totalCost: {
		type: "text",
		value: `$${getNights() * 100 + getWeekendSurcharge()}`,
		label: "Total Cost",
		disabled: true,
		onChange: () => {},
	},
});
```

## Styling

Date controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 32px; /* Control height */
	--dev-panel-input-background-color: #2a2a2a; /* Background */
	--dev-panel-text-color: #ffffff; /* Text color */
	--dev-panel-border-color: #333333; /* Border color */
	--dev-panel-accent-color: #ff6200; /* Focus color */
}
```

### Custom Date Picker Styling

```css
/* Target date controls specifically */
.dev-panel-date-control {
	--dev-panel-inputs-height: 40px;
}

/* Date input styling */
.dev-panel-date-control input[type="date"] {
	color-scheme: dark; /* Dark calendar popup */
	cursor: pointer;
}

/* Calendar icon styling */
.dev-panel-date-control input[type="date"]::-webkit-calendar-picker-indicator {
	background-color: var(--dev-panel-accent-color);
	border-radius: 3px;
	cursor: pointer;
	padding: 2px;
}

/* Focus states */
.dev-panel-date-control input[type="date"]:focus {
	outline: 2px solid var(--dev-panel-accent-color);
	outline-offset: 2px;
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Enter/Space**: Open date picker
-   **Arrow Keys**: Navigate calendar (when open)
-   **Escape**: Close date picker

### Screen Reader Support

-   Announces selected date
-   Provides proper date format context
-   Supports aria-label and aria-describedby

### Best Practices

```tsx
// ✅ Good: Clear, descriptive labels
{
  type: 'date',
  value: birthDate,
  label: 'Date of Birth',
  max: new Date().toISOString().split('T')[0],
  onChange: setBirthDate,
}

// ✅ Good: Logical constraints
{
  type: 'date',
  value: startDate,
  label: 'Project Start Date',
  min: new Date().toISOString().split('T')[0],
  max: endDate,
  onChange: setStartDate,
}

// ❌ Avoid: Unclear date context
{
  type: 'date',
  value: date,
  label: 'Date',
  onChange: setDate,
}
```

## TypeScript

The date control provides full TypeScript support:

```tsx
import { DateControl } from "@berenjena/react-dev-panel";

interface EventData {
	startDate: string;
	endDate: string;
	allDay: boolean;
}

const [eventData, setEventData] = useState<EventData>({
	startDate: "",
	endDate: "",
	allDay: false,
});

useDevPanel("Event Scheduler", {
	startDate: {
		type: "date",
		value: eventData.startDate,
		label: "Event Start Date",
		onChange: (value: string) => setEventData((prev) => ({ ...prev, startDate: value })),
	} satisfies DateControl,
});
```

## Performance Considerations

### Date Calculations

```tsx
import { useMemo } from "react";

const [dateRange, setDateRange] = useState({
	start: "2025-01-01",
	end: "2025-12-31",
});

// Memoize expensive date calculations
const dateStats = useMemo(() => {
	const start = new Date(dateRange.start);
	const end = new Date(dateRange.end);
	const diffTime = end.getTime() - start.getTime();
	const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const weeks = Math.ceil(days / 7);
	const months = Math.ceil(days / 30);

	return { days, weeks, months };
}, [dateRange]);

useDevPanel("Date Analysis", {
	startDate: {
		type: "date",
		value: dateRange.start,
		label: `Start Date (${dateStats.days} days total)`,
		onChange: (value) => setDateRange((prev) => ({ ...prev, start: value })),
	},
});
```

## Related Controls

-   **[Text Control](./TEXT_CONTROL.md)** - For text-based date input
-   **[Number Control](./NUMBER_CONTROL.md)** - For numeric date components
-   **[Select Control](./SELECT_CONTROL.md)** - For predefined date options
