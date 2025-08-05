import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function NumberControlDemo(): React.ReactNode {
	const [amount, setAmount] = useState(0);

	useDevPanel(
		"Number Control",
		{
			amount: {
				type: "number",
				value: amount,
				label: "Amount",
				onChange: (value) => setAmount(value),
			},
		},
		{ panelTitle: "Number Control Panel" },
	);

	return <Logger items={{ amount }} />;
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof NumberControlDemo> = {
	title: "Controls",
	component: NumberControlDemo,
};

export default meta;

type Story = StoryObj<typeof NumberControlDemo>;

export const NumberControl: Story = {};
