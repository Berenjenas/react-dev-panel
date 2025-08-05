/* eslint-disable react/jsx-newline */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";
import { useHotkeys } from "@/hooks/useHotkeys";
import { createHotkey } from "@/utils/createHotkey";

type IntegrationTestProps = {
	devPanelTitle?: string;
};

/**
 * Comprehensive integration test showcasing all available control types
 * and dev panel features in a realistic scenario.
 */
function IntegrationTest(props: IntegrationTestProps): React.ReactNode {
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
	useDevPanel(
		"User Profile",
		{
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
		},
		{
			panelTitle: props.devPanelTitle || "Default title",
		},
	);

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
					onClick: (): void => {
						console.log("Reloading application...");
						// Simulate reload
					},
				},
				{
					label: "🧹 Clear Cache",
					onClick: (): void => {
						console.log("Clearing cache...");
						localStorage.clear();
					},
				},
				{
					label: "📊 Export Logs",
					onClick: (): void => {
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
			onClick: (): void => {
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
					padding: "3rem",
					fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
					fontSize: `${fontSize}px`,
					opacity: opacity,
					color: theme === "dark" ? "#f8fafc" : "#1e293b",
					background:
						theme === "dark"
							? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
							: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
					minHeight: "100vh",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{/* Background decoration */}
				<div
					style={{
						position: "absolute",
						top: "-50%",
						right: "-50%",
						width: "100%",
						height: "100%",
						background: `radial-gradient(circle, ${primaryColor}15 0%, transparent 70%)`,
						pointerEvents: "none",
						zIndex: 0,
					}}
				/>

				<div
					style={{
						position: "absolute",
						bottom: "-30%",
						left: "-30%",
						width: "60%",
						height: "60%",
						background: `radial-gradient(circle, ${primaryColor}10 0%, transparent 50%)`,
						pointerEvents: "none",
						zIndex: 0,
					}}
				/>

				{/* Main content */}
				<div style={{ position: "relative", zIndex: 1 }}>
					{/* Hero section */}
					<div
						style={{
							textAlign: "center",
							marginBottom: "4rem",
							padding: "2rem",
							background: theme === "dark" ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
							borderRadius: "24px",
							backdropFilter: "blur(20px)",
							border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
							boxShadow: theme === "dark" ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
						}}
					>
						<h1
							style={{
								fontSize: "3.5rem",
								fontWeight: "800",
								color: primaryColor,
								margin: "0 0 1rem 0",
								letterSpacing: "-0.02em",
							}}
						>
							React Dev Panel
						</h1>

						<p
							style={{
								fontSize: "1.25rem",
								opacity: 0.8,
								margin: "0",
								fontWeight: "400",
								lineHeight: "1.6",
							}}
						>
							Comprehensive integration test showcasing all control types and features
						</p>

						{/* Status indicators */}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								gap: "1rem",
								marginTop: "2rem",
								flexWrap: "wrap",
							}}
						>
							{[
								{ label: "Theme", value: theme, icon: theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🔄" },
								{ label: "Debug", value: debugMode ? "ON" : "OFF", icon: debugMode ? "🐛" : "✅" },
								{ label: "Notifications", value: notifications ? "ON" : "OFF", icon: notifications ? "🔔" : "🔕" },
							].map(({ label, value, icon }, index) => (
								<div
									key={index}
									style={{
										padding: "0.75rem 1.5rem",
										backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
										borderRadius: "12px",
										border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
										fontSize: "0.9rem",
										fontWeight: "500",
									}}
								>
									<span style={{ marginRight: "0.5rem" }}>{icon}</span>
									{label}: <strong style={{ color: primaryColor }}>{value}</strong>
								</div>
							))}
						</div>
					</div>

					{/* Content grid */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
							gap: "2rem",
							marginBottom: "3rem",
						}}
					>
						{/* User Information Card */}
						<div
							style={{
								padding: "2rem",
								background: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
								borderRadius: "20px",
								border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
								backdropFilter: "blur(20px)",
								boxShadow: theme === "dark" ? "0 20px 25px -5px rgba(0, 0, 0, 0.3)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
								transition: "transform 0.2s ease, box-shadow 0.2s ease",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-4px)";
								e.currentTarget.style.boxShadow =
									theme === "dark" ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									theme === "dark" ? "0 20px 25px -5px rgba(0, 0, 0, 0.3)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
							}}
						>
							<div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
								<div
									style={{
										width: "3rem",
										height: "3rem",
										borderRadius: "12px",
										background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.5rem",
										marginRight: "1rem",
									}}
								>
									👤
								</div>
								<h2 style={{ margin: "0", fontSize: "1.5rem", fontWeight: "600" }}>User Profile</h2>
							</div>

							<div style={{ display: "grid", gap: "1rem" }}>
								{[
									{ label: "Name", value: name, icon: "📝" },
									{ label: "Email", value: email, icon: "📧" },
									{ label: "Age", value: `${age} years old`, icon: "🎂" },
									{ label: "Birth Date", value: new Date(birthDate).toLocaleDateString(), icon: "📅" },
									{ label: "Status", value: isActive ? "Active" : "Inactive", icon: isActive ? "✅" : "❌" },
								].map(({ label, value, icon }, index) => (
									<div
										key={index}
										style={{
											display: "flex",
											alignItems: "center",
											padding: "1rem",
											background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
											borderRadius: "12px",
											border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
										}}
									>
										<span style={{ fontSize: "1.2rem", marginRight: "1rem" }}>{icon}</span>
										<div>
											<div style={{ fontSize: "0.85rem", opacity: 0.7, fontWeight: "500" }}>{label}</div>
											<div style={{ fontWeight: "600", color: primaryColor }}>{value}</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Theme & Customization Card */}
						<div
							style={{
								padding: "2rem",
								background: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
								borderRadius: "20px",
								border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
								backdropFilter: "blur(20px)",
								boxShadow: theme === "dark" ? "0 20px 25px -5px rgba(0, 0, 0, 0.3)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
								transition: "transform 0.2s ease, box-shadow 0.2s ease",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-4px)";
								e.currentTarget.style.boxShadow =
									theme === "dark" ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									theme === "dark" ? "0 20px 25px -5px rgba(0, 0, 0, 0.3)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
							}}
						>
							<div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
								<div
									style={{
										width: "3rem",
										height: "3rem",
										borderRadius: "12px",
										background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.5rem",
										marginRight: "1rem",
									}}
								>
									🎨
								</div>
								<h2 style={{ margin: "0", fontSize: "1.5rem", fontWeight: "600" }}>Theme & Style</h2>
							</div>

							<div style={{ marginBottom: "2rem" }}>
								<h3
									style={{
										fontSize: "1.1rem",
										fontWeight: "600",
										marginBottom: "1rem",
										color: primaryColor,
									}}
								>
									Current Theme: {theme}
								</h3>

								{/* Color palette display */}
								<div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
									<div
										style={{
											width: "4rem",
											height: "4rem",
											backgroundColor: primaryColor,
											borderRadius: "12px",
											border: `3px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "white",
											fontWeight: "600",
											fontSize: "0.8rem",
										}}
									>
										Primary
									</div>
									<div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
										<div
											style={{
												width: "2rem",
												height: "1.75rem",
												backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
												borderRadius: "6px",
												border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
											}}
										/>
										<div
											style={{
												width: "2rem",
												height: "1.75rem",
												backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
												borderRadius: "6px",
												border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
											}}
										/>
									</div>
								</div>
							</div>

							{/* Typography and opacity controls */}
							<div style={{ display: "grid", gap: "1rem" }}>
								<div
									style={{
										padding: "1rem",
										background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
										borderRadius: "12px",
										border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
									}}
								>
									<div style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>Font Size</div>
									<div style={{ fontWeight: "600", color: primaryColor }}>{fontSize}px</div>
									<div
										style={{
											fontSize: `${fontSize}px`,
											marginTop: "0.5rem",
											fontStyle: "italic",
											opacity: 0.8,
										}}
									>
										Sample text at current size
									</div>
								</div>

								<div
									style={{
										padding: "1rem",
										background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
										borderRadius: "12px",
										border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
									}}
								>
									<div style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.5rem" }}>Panel Opacity</div>
									<div style={{ fontWeight: "600", color: primaryColor }}>{Math.round(opacity * 100)}%</div>
									<div
										style={{
											width: "100%",
											height: "6px",
											background: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
											borderRadius: "3px",
											marginTop: "0.5rem",
											position: "relative",
										}}
									>
										<div
											style={{
												width: `${opacity * 100}%`,
												height: "100%",
												background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
												borderRadius: "3px",
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Debug panel (conditional) */}
					{debugMode && (
						<div
							style={{
								padding: "2rem",
								background: theme === "dark" ? "rgba(220, 38, 38, 0.1)" : "rgba(220, 38, 38, 0.05)",
								borderRadius: "20px",
								border: `2px solid ${theme === "dark" ? "rgba(220, 38, 38, 0.3)" : "rgba(220, 38, 38, 0.2)"}`,
								marginBottom: "2rem",
								backdropFilter: "blur(20px)",
							}}
						>
							<div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
								<span style={{ fontSize: "2rem", marginRight: "1rem" }}>🐛</span>
								<h3 style={{ margin: "0", fontSize: "1.5rem", fontWeight: "600", color: "#dc2626" }}>Debug Information</h3>
							</div>

							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
									gap: "1rem",
									fontFamily: "'Fira Code', 'Monaco', 'Cascadia Code', monospace",
									fontSize: "0.9rem",
								}}
							>
								{[
									{ label: "Debug Mode", value: "Enabled", icon: "🔍" },
									{ label: "Notifications", value: notifications ? "Active" : "Disabled", icon: "🔔" },
									{ label: "Panel Opacity", value: `${Math.round(opacity * 100)}%`, icon: "👁️" },
									{ label: "Font Size", value: `${fontSize}px`, icon: "🔤" },
									{ label: "Theme", value: theme, icon: "🌓" },
									{ label: "Primary Color", value: primaryColor, icon: "🎨" },
								].map(({ label, value, icon }, index) => (
									<div
										key={index}
										style={{
											padding: "1rem",
											background: theme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.8)",
											borderRadius: "12px",
											border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
										}}
									>
										<div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
											<span style={{ marginRight: "0.5rem" }}>{icon}</span>
											<span style={{ fontSize: "0.8rem", opacity: 0.7 }}>{label}</span>
										</div>
										<div style={{ fontWeight: "600", color: "#dc2626" }}>{value}</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Footer */}
					<div
						style={{
							textAlign: "center",
							padding: "2rem",
							opacity: 0.6,
							fontSize: "0.9rem",
						}}
					>
						<p style={{ margin: "0" }}>Use the Dev Panel (Ctrl+Shift+A) to modify these values and see real-time updates</p>
					</div>
				</div>
			</div>

			<Logger items={currentState} defaultCollapsed />
		</>
	);
}

/**
 * Focused demo showcasing hotkey functionality and keyboard shortcuts
 */
function HotkeyDemoComponent(props: IntegrationTestProps): React.ReactNode {
	const [message, setMessage] = useState("");
	const [counter, setCounter] = useState(0);
	const [lastAction, setLastAction] = useState("None");
	const [isEnabled, setIsEnabled] = useState(true);
	const [logs, setLogs] = useState<string[]>([]);
	const [selectedTheme, setSelectedTheme] = useState("default");

	function addLog(action: string, shortcut: string): void {
		const timestamp = new Date().toLocaleTimeString();
		const logEntry = `[${timestamp}] ${action} (${shortcut})`;

		setLogs((prev) => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
		setLastAction(action);
	}

	useDevPanel(
		"Hotkey Configuration",
		{
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
						onClick: (): void => {
							setCounter(0);
							setMessage("");
							setSelectedTheme("default");
							addLog("Reset All", "R");
						},
					},
					{
						label: "🎲 Random (Space)",
						onClick: (): void => {
							const randomValue = Math.floor(Math.random() * 100);

							setCounter(randomValue);
							addLog(`Random: ${randomValue}`, "Space");
						},
					},
					{
						label: "📋 Copy (Ctrl+C)",
						onClick: (): void => {
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
				onClick: (): void => {
					setLogs([]);
					setLastAction("Logs cleared");
				},
			},
		},
		{
			panelTitle: props.devPanelTitle || "Hotkey Demo",
		},
	);

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

export const AllControlsDemo: Story = {
	args: {
		devPanelTitle: "Integration Test Panel",
	},
};

export const HotkeyDemo: Story = {
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
