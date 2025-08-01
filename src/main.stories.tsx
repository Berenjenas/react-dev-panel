import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "./components/Logger";
import { useDevPanel } from "./hooks/useDevPanel";
import { useHotkeys } from "./hooks/useHotkeys";
import { DevPanel } from "./components";
import { createHotkey } from "./utils";

type IntegrationTestProps = {
	devPanelTitle?: string;
};

/**
 * Comprehensive integration test showcasing all available control types
 * and dev panel features in a realistic scenario.
 */
function IntegrationTest(props: IntegrationTestProps) {
	// Basic user information
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john.doe@example.com");
	const [age, setAge] = useState(28);
	const [birthDate, setBirthDate] = useState("1995-03-15");

	// UI preferences
	const [theme, setTheme] = useState("dark");
	const [primaryColor, setPrimaryColor] = useState("#ff6200");
	const [fontSize, setFontSize] = useState(16);
	const [opacity, setOpacity] = useState(0.9);

	// Application settings
	const [isActive, setIsActive] = useState(true);
	const [debugMode, setDebugMode] = useState(false);
	const [notifications, setNotifications] = useState(true);

	// User Profile Section
	useDevPanel("User Profile", {
		name: {
			type: "text",
			value: name,
			label: "Full Name",
			placeholder: "Enter your full name",
			description: "User's display name",
			onChange: setName,
		},
		email: {
			type: "text",
			value: email,
			label: "Email Address",
			placeholder: "user@example.com",
			event: "onBlur",
			onChange: setEmail,
		},
		age: {
			type: "number",
			value: age,
			label: "Age",
			min: 13,
			max: 120,
			step: 1,
			description: "Must be 13 or older",
			onChange: setAge,
		},
		birthDate: {
			type: "date",
			value: birthDate,
			label: "Birth Date",
			max: "2011-01-01", // Must be at least 13
			onChange: setBirthDate,
		},

		// Separator for organization
		profileSeparator: {
			type: "separator",
			style: "label",
			label: "Account Status",
		},

		isActive: {
			type: "boolean",
			value: isActive,
			label: "Active Account",
			description: isActive ? "✅ Account is active" : "❌ Account is inactive",
			onChange: setIsActive,
		},
	});

	// UI Customization Section
	useDevPanel("UI Customization", {
		theme: {
			type: "select",
			value: theme,
			label: "Theme",
			options: [
				{ label: "🌙 Dark", value: "dark" },
				{ label: "☀️ Light", value: "light" },
				{ label: "🔄 Auto", value: "auto" },
			],
			description: "Choose your preferred theme",
			onChange: setTheme,
		},

		colorSeparator: {
			type: "separator",
			style: "label",
			label: "Colors & Typography",
		},

		primaryColor: {
			type: "color",
			value: primaryColor,
			label: "Primary Color",
			description: "Main brand color for the interface",
			onChange: setPrimaryColor,
		},
		fontSize: {
			type: "range",
			value: fontSize,
			label: "Font Size",
			min: 12,
			max: 24,
			step: 1,
			description: `Current: ${fontSize}px`,
			onChange: setFontSize,
		},
		opacity: {
			type: "range",
			value: opacity,
			label: "Panel Opacity",
			min: 0.1,
			max: 1.0,
			step: 0.1,
			description: `${Math.round(opacity * 100)}% opacity`,
			onChange: setOpacity,
		},
	});

	// Developer Tools Section
	useDevPanel("Developer Tools", {
		debugMode: {
			type: "boolean",
			value: debugMode,
			label: "Debug Mode",
			description: "Enable detailed logging and debug information",
			onChange: setDebugMode,
		},
		notifications: {
			type: "boolean",
			value: notifications,
			label: "Notifications",
			description: "Show system notifications",
			onChange: setNotifications,
		},

		toolsSeparator: {
			type: "separator",
		},

		devActions: {
			type: "buttonGroup",
			label: "Development Actions",
			buttons: [
				{
					label: "🔄 Reload",
					onClick: () => {
						console.log("Reloading application...");
						// Simulate reload
					},
				},
				{
					label: "🧹 Clear Cache",
					onClick: () => {
						console.log("Clearing cache...");
						localStorage.clear();
					},
				},
				{
					label: "📊 Export Logs",
					onClick: () => {
						console.log("Exporting logs...");
						// Simulate log export
					},
				},
			],
		},

		spaceSeparator: {
			type: "separator",
			style: "space",
		},

		resetButton: {
			type: "button",
			label: "🔧 Reset All Settings",
			description: "Reset all values to defaults",
			onClick: () => {
				setName("John Doe");
				setEmail("john.doe@example.com");
				setAge(28);
				setBirthDate("1995-03-15");
				setTheme("dark");
				setPrimaryColor("#ff6200");
				setFontSize(16);
				setOpacity(0.9);
				setIsActive(true);
				setDebugMode(false);
				setNotifications(true);
				console.log("🔄 All settings reset to defaults");
			},
		},
	});

	// Display current state
	const currentState = {
		userProfile: { name, email, age, birthDate, isActive },
		uiCustomization: { theme, primaryColor, fontSize, opacity },
		developerTools: { debugMode, notifications },
	};

	return (
		<>
			<div
				style={{
					padding: "2rem",
					fontFamily: "system-ui",
					fontSize: `${fontSize}px`,
					opacity: opacity,
					color: theme === "dark" ? "#ffffff" : "#000000",
					backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
					minHeight: "100vh",
				}}
			>
				<h1 style={{ color: primaryColor }}>React Dev Panel Integration Test</h1>
				<p>
					This comprehensive test showcases all control types and features available in the React Dev Panel. Use the dev panel to modify the
					values and see real-time updates.
				</p>

				<div style={{ marginTop: "2rem" }}>
					<h2>User Information</h2>
					{[
						{ label: "Name", value: name },
						{ label: "Email", value: email },
						{ label: "Age", value: `${age} years old` },
						{ label: "Birth Date", value: birthDate },
						{ label: "Status", value: isActive ? "✅ Active" : "❌ Inactive" },
					].map(({ label, value }, index) => (
						<p key={index}>
							<strong>{label}:</strong> {value}
						</p>
					))}
				</div>

				<div style={{ marginTop: "2rem" }}>
					<h2>Current Theme: {theme}</h2>
					<div
						style={{
							width: "100px",
							height: "50px",
							backgroundColor: primaryColor,
							borderRadius: "8px",
							display: "inline-block",
							marginLeft: "1rem",
						}}
					/>
				</div>

				{debugMode && (
					<div
						style={{
							marginTop: "2rem",
							padding: "1rem",
							backgroundColor: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
							borderRadius: "8px",
							fontFamily: "monospace",
							fontSize: "12px",
						}}
					>
						<h3>🐛 Debug Information</h3>
						<p>Debug mode is enabled</p>
						<p>Notifications: {notifications ? "Enabled" : "Disabled"}</p>
						<p>Panel opacity: {Math.round(opacity * 100)}%</p>
					</div>
				)}
			</div>

			<Logger items={currentState} />
			<DevPanel panelTitle={props.devPanelTitle} />
		</>
	);
}

/**
 * Focused demo showcasing hotkey functionality and keyboard shortcuts
 */
function HotkeyDemoComponent(props: IntegrationTestProps) {
	const [message, setMessage] = useState("");
	const [counter, setCounter] = useState(0);
	const [lastAction, setLastAction] = useState("None");
	const [isEnabled, setIsEnabled] = useState(true);
	const [logs, setLogs] = useState<string[]>([]);
	const [selectedTheme, setSelectedTheme] = useState("default");

	function addLog(action: string, shortcut: string) {
		const timestamp = new Date().toLocaleTimeString();
		const logEntry = `[${timestamp}] ${action} (${shortcut})`;

		setLogs((prev) => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
		setLastAction(action);
	}

	useDevPanel("Hotkey Configuration", {
		isEnabled: {
			type: "boolean",
			value: isEnabled,
			label: "Enable Hotkeys",
			description: isEnabled ? "✅ Hotkeys are active" : "❌ Hotkeys disabled",
			onChange: setIsEnabled,
		},

		configSeparator: {
			type: "separator",
			style: "label",
			label: "Panel Hotkeys",
		},

		panelInfo: {
			type: "text",
			value: "Ctrl+Shift+A",
			label: "Toggle Panel",
			description: "Default hotkey to show/hide the dev panel",
			event: "onBlur",
			onChange: () => {}, // Read-only for demo
		},

		demoSeparator: {
			type: "separator",
			style: "label",
			label: "Demo Controls",
		},

		message: {
			type: "text",
			value: message,
			label: "Message",
			placeholder: "Type a message and press Ctrl+S to save",
			description: "Use Ctrl+S to save this message",
			onChange: setMessage,
		},
		counter: {
			type: "number",
			value: counter,
			label: "Counter",
			description: "Use + and - keys to increment/decrement",
			min: 0,
			max: 100,
			onChange: setCounter,
		},
		selectedTheme: {
			type: "select",
			value: selectedTheme,
			label: "Theme",
			options: [
				{ label: "🎨 Default", value: "default" },
				{ label: "🌙 Dark", value: "dark" },
				{ label: "☀️ Light", value: "light" },
				{ label: "🌈 Colorful", value: "colorful" },
			],
			description: "Use T key to cycle through themes",
			onChange: setSelectedTheme,
		},

		actionsSeparator: {
			type: "separator",
			style: "label",
			label: "Actions",
		},

		actionButtons: {
			type: "buttonGroup",
			label: "Quick Actions",
			buttons: [
				{
					label: "🔄 Reset (R)",
					onClick: () => {
						setCounter(0);
						setMessage("");
						setSelectedTheme("default");
						addLog("Reset All", "R");
					},
				},
				{
					label: "🎲 Random (Space)",
					onClick: () => {
						const randomValue = Math.floor(Math.random() * 100);
						setCounter(randomValue);
						addLog(`Random: ${randomValue}`, "Space");
					},
				},
				{
					label: "📋 Copy (Ctrl+C)",
					onClick: () => {
						navigator.clipboard.writeText(`Counter: ${counter}, Message: ${message}`);
						addLog("Copied to clipboard", "Ctrl+C");
					},
				},
			],
		},

		logsSeparator: {
			type: "separator",
			style: "space",
		},

		clearLogs: {
			type: "button",
			label: "🧹 Clear Logs (Escape)",
			description: "Clear the action log",
			onClick: () => {
				setLogs([]);
				setLastAction("Logs cleared");
			},
		},
	});

	// Demo hotkeys using useHotkeys
	useHotkeys(
		[
			createHotkey(
				"s",
				() => {
					if (message.trim()) {
						addLog(`Saved: "${message}"`, "Ctrl+S");
						console.log("Message saved:", message);
					} else {
						addLog("No message to save", "Ctrl+S");
					}
				},
				{ ctrl: true },
				{
					description: "Save message",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				"+",
				() => {
					if (counter < 100) {
						setCounter((prev) => Math.min(prev + 1, 100));
						addLog("Incremented", "+");
					}
				},
				{},
				{
					description: "Increment counter",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				"-",
				() => {
					if (counter > 0) {
						setCounter((prev) => Math.max(prev - 1, 0));
						addLog("Decremented", "-");
					}
				},
				{},
				{
					description: "Decrement counter",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				"t",
				() => {
					const themes = ["default", "dark", "light", "colorful"];
					const currentIndex = themes.indexOf(selectedTheme);
					const nextTheme = themes[(currentIndex + 1) % themes.length];
					setSelectedTheme(nextTheme);
					addLog(`Theme: ${nextTheme}`, "T");
				},
				{},
				{
					description: "Cycle theme",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				"r",
				() => {
					setCounter(0);
					setMessage("");
					setSelectedTheme("default");
					addLog("Reset all values", "R");
				},
				{},
				{
					description: "Reset all",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				" ",
				() => {
					const randomValue = Math.floor(Math.random() * 100);
					setCounter(randomValue);
					addLog(`Random: ${randomValue}`, "Space");
				},
				{},
				{
					description: "Random counter",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				"c",
				() => {
					navigator.clipboard.writeText(`Counter: ${counter}, Message: ${message}, Theme: ${selectedTheme}`);
					addLog("Copied to clipboard", "Ctrl+C");
				},
				{ ctrl: true },
				{
					description: "Copy values",
					preventDefault: true,
					enabled: isEnabled,
				},
			),

			createHotkey(
				"Escape",
				() => {
					setLogs([]);
					addLog("Logs cleared", "Escape");
				},
				{},
				{
					description: "Clear logs",
					preventDefault: true,
					enabled: isEnabled,
				},
			),
		],
		{ enabled: isEnabled },
	);

	const themeStyles = {
		default: { bg: "#f8f9fa", text: "#212529", accent: "#007bff" },
		dark: { bg: "#212529", text: "#ffffff", accent: "#ffc107" },
		light: { bg: "#ffffff", text: "#000000", accent: "#28a745" },
		colorful: { bg: "linear-gradient(45deg, #ff6b6b, #4ecdc4)", text: "#ffffff", accent: "#ff6b6b" },
	};

	const currentTheme = themeStyles[selectedTheme as keyof typeof themeStyles];

	return (
		<>
			<div
				style={{
					padding: "2rem",
					fontFamily: "system-ui",
					background: currentTheme.bg,
					color: currentTheme.text,
					minHeight: "100vh",
					transition: "all 0.3s ease",
				}}
			>
				<h1 style={{ color: currentTheme.accent }}>Hotkey Functionality Demo</h1>

				<p style={{ fontSize: "1.1em", marginBottom: "2rem" }}>
					This demo showcases the React Dev Panel's hotkey system. The panel itself uses <strong>Ctrl+Shift+A</strong> to toggle visibility,
					and this demo includes additional keyboard shortcuts for various actions.
				</p>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "2rem",
						marginBottom: "2rem",
					}}
				>
					<div
						style={{
							padding: "1.5rem",
							backgroundColor: selectedTheme === "dark" ? "#343a40" : "rgba(0,0,0,0.05)",
							borderRadius: "8px",
							border: `2px solid ${currentTheme.accent}`,
						}}
					>
						<h2 style={{ color: currentTheme.accent, marginTop: 0 }}>Available Hotkeys</h2>

						<ul style={{ lineHeight: 1.8 }}>
							{[
								{ key: "Ctrl+Shift+A", action: "Toggle Dev Panel" },
								{ key: "Ctrl+S", action: "Save message" },
								{ key: "+", action: "Increment counter" },
								{ key: "-", action: "Decrement counter" },
								{ key: "T", action: "Cycle theme" },
								{ key: "R", action: "Reset all values" },
								{ key: "Space", action: "Random counter" },
								{ key: "Ctrl+C", action: "Copy values" },
								{ key: "Escape", action: "Clear logs" },
							].map(({ key, action }, index) => (
								<li key={index}>
									<strong>{key}</strong> - {action}
								</li>
							))}
						</ul>

						<p
							style={{
								fontSize: "0.9em",
								opacity: 0.8,
								marginBottom: 0,
								fontStyle: "italic",
							}}
						>
							{isEnabled ? "✅ All hotkeys are enabled" : "❌ Hotkeys are disabled"}
						</p>
					</div>

					<div
						style={{
							padding: "1.5rem",
							backgroundColor: selectedTheme === "dark" ? "#343a40" : "rgba(0,0,0,0.05)",
							borderRadius: "8px",
							border: `2px solid ${currentTheme.accent}`,
						}}
					>
						<h2 style={{ color: currentTheme.accent, marginTop: 0 }}>Current Values</h2>

						{[
							{ label: "Message", value: message || "(empty)" },
							{ label: "Counter", value: counter },
							{ label: "Theme", value: selectedTheme },
							{ label: "Last Action", value: lastAction },
							{ label: "Hotkeys", value: isEnabled ? "Enabled" : "Disabled" },
						].map(({ label, value }, index) => (
							<p key={index}>
								<strong>{label}:</strong> {value}
							</p>
						))}
					</div>
				</div>

				<div
					style={{
						padding: "1.5rem",
						backgroundColor: selectedTheme === "dark" ? "#343a40" : "rgba(0,0,0,0.05)",
						borderRadius: "8px",
						border: `2px solid ${currentTheme.accent}`,
						maxHeight: "300px",
						overflow: "auto",
					}}
				>
					<h2 style={{ color: currentTheme.accent, marginTop: 0 }}>Action Log</h2>

					{logs.length === 0 ? (
						<p style={{ opacity: 0.6, fontStyle: "italic" }}>No actions performed yet. Try using some hotkeys!</p>
					) : (
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							{logs.map((log, index) => (
								<li
									key={index}
									style={{
										padding: "0.5rem",
										marginBottom: "0.25rem",
										backgroundColor: selectedTheme === "dark" ? "#495057" : "rgba(255,255,255,0.5)",
										borderRadius: "4px",
										fontFamily: "monospace",
										fontSize: "0.9em",
									}}
								>
									{log}
								</li>
							))}
						</ul>
					)}
				</div>

				<div
					style={{
						marginTop: "2rem",
						padding: "1rem",
						backgroundColor: currentTheme.accent + "20",
						borderRadius: "8px",
						borderLeft: `4px solid ${currentTheme.accent}`,
					}}
				>
					<h3 style={{ margin: "0 0 0.5rem 0", color: currentTheme.accent }}>💡 How It Works</h3>

					<p style={{ margin: 0, lineHeight: 1.6 }}>
						The React Dev Panel includes a comprehensive hotkey system using the <code>useHotkeys</code> and <code>useHotkey</code> hooks.
						The panel itself can be toggled with <strong>Ctrl+Shift+A</strong> (customizable), and you can add custom hotkeys to your
						application for quick actions. Each hotkey supports modifier keys (Ctrl, Alt, Shift, Meta) and can be enabled/disabled
						dynamically.
					</p>
				</div>
			</div>

			<Logger items={{ message, counter, selectedTheme, lastAction, isEnabled, logsCount: logs.length }} />

			<DevPanel panelTitle={props.devPanelTitle} />
		</>
	);
}

const meta = {
	title: "Integration Tests",
	component: IntegrationTest,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				story: `
## Integration Test Stories

These comprehensive integration tests demonstrate different aspects of the React Dev Panel:

### All Control Types
Shows every available control type in a comprehensive test scenario with multiple panel groups.

### User Profile Demo  
Focused demonstration of user profile management with text, number, date, boolean, and select controls.

### UI Customization Demo
Showcase of UI customization controls including theme selection, color pickers, and range sliders for styling.

### Hotkey Demo
Comprehensive demonstration of the React Dev Panel's hotkey system, including the default Ctrl+Shift+A panel toggle and custom keyboard shortcuts for application actions.

### Features Demonstrated:
- **Multiple Panel Groups**: Organized into logical sections
- **Real-time Updates**: All controls update the UI immediately  
- **Event Handling**: Both onChange and onBlur events
- **Conditional Rendering**: Context-sensitive UI updates
- **State Management**: Complex state with multiple data types
- **Descriptions**: Helpful descriptions and dynamic feedback
- **Validation**: Constraints and proper input handling
- **Reset Functionality**: Button and group controls for resetting values
- **Keyboard Shortcuts**: Comprehensive hotkey system with modifier support

### Usage:
Open the dev panel and experiment with the controls to see how they affect the displayed content in real-time.
				`,
			},
		},
	},
	argTypes: {
		devPanelTitle: {
			name: "Dev Panel Title",
			control: "text",
			description: "Custom title for the development panel",
			defaultValue: "Integration Test Panel",
		},
	},
} satisfies Meta<typeof IntegrationTest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllControlTypes: Story = {
	name: "All Control Types",
	args: {
		devPanelTitle: "Integration Test Panel",
	},
};

export const HotkeyDemo: Story = {
	name: "Hotkey Demo",
	args: {
		devPanelTitle: "Hotkey Controls",
	},
	parameters: {
		docs: {
			description: {
				story: "Comprehensive demonstration of the React Dev Panel's hotkey system, including panel toggle shortcuts and custom keyboard shortcuts for application actions.",
			},
		},
	},
	render: (args) => <HotkeyDemoComponent {...args} />,
};
