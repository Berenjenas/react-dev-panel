import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function TextControlDemo(): React.ReactNode {
	const [description, setDescription] = useState("Test");
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john@example.com");
	const [persistent, setPersistent] = useState("Change this value to check persistence");

	useDevPanel(
		"Text Control",
		{
			description: {
				type: "text",
				value: description,
				placeholder: "Enter a description",
				label: "Description",
				onChange: setDescription,
			},
			name: {
				type: "text",
				value: name,
				placeholder: "Enter your name",
				label: "Name",
				disableAutoExpand: true,
				onChange: setName,
			},
			email: {
				type: "text",
				value: email,
				placeholder: "Enter your email",
				label: "Email",
				onChange: setEmail,
			},

			separator: {
				type: "separator",
				style: "label",
				label: "Persistence",
			},

			persistent: {
				type: "text",
				value: persistent,
				label: "Persistent Control",
				description: "This control's state persists across sessions",
				onChange: setPersistent,
				persist: true,
			},
		},
		{ panelTitle: "Text Control Panel" },
	);

	return <Logger items={{ description, name, email }} />;
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof TextControlDemo> = {
	title: "Controls",
	component: TextControlDemo,
};

export default meta;

type Story = StoryObj<typeof TextControlDemo>;

export const TextControl: Story = {};
