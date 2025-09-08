import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

const names = ["", "Alice", "Bob", "Charlie", "David", "Eve"];

function SelectControlDemo(): React.ReactNode {
	const [name, setName] = useState(names[1]);
	const [persistent, setPersistent] = useState(names[1]);

	useDevPanel(
		"Select Control",
		{
			name: {
				type: "select",
				options: names,
				value: name,
				label: "Select Name",
				onChange: (value) => setName(value),
			},

			separator: {
				type: "separator",
				style: "label",
				label: "Persistence",
			},

			persistent: {
				type: "select",
				options: names,
				value: persistent,
				label: "Persistent Control",
				description: "This control's state persists across sessions",
				onChange: setPersistent,
				persist: true,
			},
		},
		{ panelTitle: "Select Control Panel" },
	);

	return <Logger items={{ name }} />;
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof SelectControlDemo> = {
	title: "Controls",
	component: SelectControlDemo,
};

export default meta;

type Story = StoryObj<typeof SelectControlDemo>;

export const SelectControl: Story = {};
