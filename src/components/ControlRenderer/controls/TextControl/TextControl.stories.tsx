import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function TextControlDemo(): React.ReactNode {
	const [description, setDescription] = useState("Test");
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john@example.com");

	useDevPanel(
		"Text Control",
		{
			description: {
				type: "text",
				value: description,
				placeholder: "Enter a description",
				label: "Description",
				onChange: (value) => setDescription(value),
			},
			name: {
				type: "text",
				value: name,
				placeholder: "Enter your name",
				label: "Name",
				onChange: (value) => setName(value),
			},
			email: {
				type: "text",
				value: email,
				placeholder: "Enter your email",
				label: "Email",
				onChange: (value) => setEmail(value),
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
