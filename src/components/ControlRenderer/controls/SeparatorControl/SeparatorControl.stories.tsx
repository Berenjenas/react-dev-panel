import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function Main(): React.ReactNode {
	const [name, setName] = useState("John Doe");
	const [age, setAge] = useState(25);
	const [email, setEmail] = useState("john@example.com");
	const [isActive, setIsActive] = useState(true);
	const [theme, setTheme] = useState("dark");
	const [volume, setVolume] = useState(80);

	useDevPanel("Separator Control", {
		// Basic Info Section
		name: {
			type: "text",
			value: name,
			label: "Name",
			onChange: (value) => setName(value),
		},
		age: {
			type: "number",
			value: age,
			label: "Age",
			min: 0,
			max: 120,
			onChange: (value) => setAge(value),
		},

		// Line separator
		separator1: {
			type: "separator",
		},

		// Contact Section
		contactSection: {
			type: "separator",
			style: "label",
			label: "Contact Information",
		},
		email: {
			type: "text",
			value: email,
			label: "Email",
			onChange: (value) => setEmail(value),
		},

		// Space separator
		separator2: {
			type: "separator",
			style: "space",
		},

		// Settings Section
		settingsSection: {
			type: "separator",
			style: "label",
			label: "User Settings",
		},
		isActive: {
			type: "boolean",
			value: isActive,
			label: "Active",
			onChange: (value) => setIsActive(value),
		},
		theme: {
			type: "select",
			value: theme,
			label: "Theme",
			options: ["light", "dark", "auto"],
			onChange: (value) => setTheme(value),
		},
		volume: {
			type: "range",
			value: volume,
			label: "Volume",
			min: 0,
			max: 100,
			onChange: (value) => setVolume(value),
		},
	});

	return (
		<>
			<Logger items={{ name, age, email, isActive, theme, volume }} />

			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/SeparatorControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {},
};
