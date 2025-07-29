# Number Control

The number control provides numeric input functionality with support for constraints, step values, and validation.

## Basic Usage

```tsx
{
  type: 'number',
  value: numberValue,
  label: 'Count',
  onChange: setNumberValue,
}
```

## Properties

### Required Properties

| Property   | Type                      | Description                 |
| ---------- | ------------------------- | --------------------------- |
| `type`     | `'number'`                | Control type identifier     |
| `value`    | `number`                  | Current numeric value       |
| `onChange` | `(value: number) => void` | Callback when value changes |

### Optional Properties

| Property   | Type                     | Default      | Description                       |
| ---------- | ------------------------ | ------------ | --------------------------------- |
| `label`    | `string`                 | `undefined`  | Display label for the control     |
| `min`      | `number`                 | `undefined`  | Minimum allowed value             |
| `max`      | `number`                 | `undefined`  | Maximum allowed value             |
| `step`     | `number`                 | `1`          | Step increment for arrow keys     |
| `event`    | `'onChange' \| 'onBlur'` | `'onChange'` | When to trigger onChange callback |
| `disabled` | `boolean`                | `false`      | Whether the control is disabled   |

## Event Handling

Number controls default to `onChange` event handling for immediate feedback.

### Real-time Updates (onChange)

```tsx
{
  type: 'number',
  value: volume,
  label: 'Volume',
  min: 0,
  max: 100,
  event: 'onChange', // Updates immediately
  onChange: setVolume,
}
```

### Deferred Updates (onBlur)

```tsx
{
  type: 'number',
  value: price,
  label: 'Price ($)',
  event: 'onBlur', // Updates when focus is lost
  onChange: updatePrice,
}
```

## Common Patterns

### Counter with Constraints

```tsx
const [count, setCount] = useState(0);

useDevPanel("Counter", {
	count: {
		type: "number",
		value: count,
		label: `Count: ${count}`,
		min: 0,
		max: 100,
		step: 1,
		onChange: setCount,
	},
	reset: {
		type: "button",
		label: "Reset",
		onClick: () => setCount(0),
	},
});
```

### Percentage Input

```tsx
const [opacity, setOpacity] = useState(100);

useDevPanel("Styling", {
	opacity: {
		type: "number",
		value: opacity,
		label: "Opacity (%)",
		min: 0,
		max: 100,
		step: 5,
		onChange: setOpacity,
	},
});

// Usage in CSS
const style = {
	opacity: opacity / 100,
};
```

### Currency Input

```tsx
const [price, setPrice] = useState(99.99);

useDevPanel("Product", {
	price: {
		type: "number",
		value: price,
		label: `Price: $${price.toFixed(2)}`,
		min: 0,
		step: 0.01,
		onChange: setPrice,
	},
});
```

### Age with Validation

```tsx
const [age, setAge] = useState(25);
const [isValidAge, setIsValidAge] = useState(true);

const validateAge = (value: number) => {
	const valid = value >= 0 && value <= 120;
	setIsValidAge(valid);
	return valid;
};

useDevPanel("User Info", {
	age: {
		type: "number",
		value: age,
		label: `Age ${isValidAge ? "✅" : "❌"}`,
		min: 0,
		max: 120,
		onChange: (value: number) => {
			setAge(value);
			validateAge(value);
		},
	},
});
```

## Advanced Features

### Decimal Precision Control

```tsx
const [temperature, setTemperature] = useState(20.5);

useDevPanel("Environment", {
	temperature: {
		type: "number",
		value: temperature,
		label: `Temperature: ${temperature.toFixed(1)}°C`,
		min: -10,
		max: 50,
		step: 0.1,
		onChange: setTemperature,
	},
});
```

### Dynamic Constraints

```tsx
const [minValue, setMinValue] = useState(0);
const [maxValue, setMaxValue] = useState(100);
const [currentValue, setCurrentValue] = useState(50);

// Ensure current value stays within bounds
const handleValueChange = (value: number) => {
	const constrainedValue = Math.max(minValue, Math.min(maxValue, value));
	setCurrentValue(constrainedValue);
};

useDevPanel("Range Settings", {
	minValue: {
		type: "number",
		value: minValue,
		label: "Minimum",
		max: maxValue - 1,
		onChange: setMinValue,
	},
	maxValue: {
		type: "number",
		value: maxValue,
		label: "Maximum",
		min: minValue + 1,
		onChange: setMaxValue,
	},
	currentValue: {
		type: "number",
		value: currentValue,
		label: "Current Value",
		min: minValue,
		max: maxValue,
		onChange: handleValueChange,
	},
});
```

## Styling

Number controls can be styled using CSS custom properties:

```css
:root {
	--dev-panel-inputs-height: 24px; /* Control height */
	--dev-panel-input-background-color: #2a2a2a; /* Background */
	--dev-panel-text-color: #ffffff; /* Text color */
	--dev-panel-border-color: #333333; /* Border color */
	--dev-panel-accent-color: #ff6200; /* Focus color */
}
```

### Custom Number Control Styling

```css
/* Target number controls specifically */
.dev-panel-number-control {
	--dev-panel-inputs-height: 32px;
}

/* Style the spinner buttons */
.dev-panel-number-control input[type="number"]::-webkit-outer-spin-button,
.dev-panel-number-control input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox spinner */
.dev-panel-number-control input[type="number"] {
	-moz-appearance: textfield;
}
```

## Accessibility

### Keyboard Navigation

-   **Tab**: Move to next control
-   **Shift + Tab**: Move to previous control
-   **Arrow Up**: Increment by step value
-   **Arrow Down**: Decrement by step value
-   **Page Up**: Increment by larger amount
-   **Page Down**: Decrement by larger amount
-   **Home**: Set to minimum value
-   **End**: Set to maximum value

### Screen Reader Support

-   Announces current value and constraints
-   Provides role and state information
-   Supports aria-describedby for additional context

### Best Practices

```tsx
// ✅ Good: Clear constraints and labels
{
  type: 'number',
  value: quantity,
  label: 'Quantity (1-99)',
  min: 1,
  max: 99,
  onChange: setQuantity,
}

// ❌ Avoid: Unclear constraints
{
  type: 'number',
  value: num,
  onChange: setNum,
}
```

## TypeScript

The number control provides full TypeScript support:

```tsx
import { NumberControl } from "@berenjena/react-dev-panel";

interface Settings {
	volume: number;
	brightness: number;
	contrast: number;
}

const [settings, setSettings] = useState<Settings>({
	volume: 50,
	brightness: 80,
	contrast: 100,
});

useDevPanel("Display Settings", {
	volume: {
		type: "number",
		value: settings.volume,
		label: "Volume",
		min: 0,
		max: 100,
		onChange: (value: number) => setSettings((prev) => ({ ...prev, volume: value })),
	} satisfies NumberControl,
});
```

## Validation and Error Handling

### Input Validation

```tsx
const [port, setPort] = useState(3000);
const [error, setError] = useState("");

const validatePort = (value: number) => {
	if (value < 1 || value > 65535) {
		setError("Port must be between 1 and 65535");
		return false;
	}
	if (![80, 443, 3000, 8080].includes(value) && value < 1024) {
		setError("Ports below 1024 may require admin privileges");
	} else {
		setError("");
	}
	return true;
};

useDevPanel("Server Config", {
	port: {
		type: "number",
		value: port,
		label: `Port ${error ? "❌" : "✅"}`,
		min: 1,
		max: 65535,
		onChange: (value: number) => {
			setPort(value);
			validatePort(value);
		},
	},
});
```

## Performance Considerations

### Throttling Expensive Updates

```tsx
import { useThrottle } from "react-use";

const [value, setValue] = useState(50);
const throttledValue = useThrottle(value, 100);

useEffect(() => {
	// Expensive operation with throttled value
	performExpensiveCalculation(throttledValue);
}, [throttledValue]);

useDevPanel("Performance", {
	value: {
		type: "number",
		value: value,
		onChange: setValue, // Updates immediately for UI
	},
});
```

## Related Controls

-   **[Range Control](./RANGE_CONTROL.md)** - For slider-based numeric input
-   **[Text Control](./TEXT_CONTROL.md)** - For string input
-   **[Date Control](./DATE_CONTROL.md)** - For date/time values
