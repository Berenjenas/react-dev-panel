import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function ButtonControlDemo(): React.ReactNode {
	const [clickCount, setClickCount] = useState(0);
	const [lastClicked, setLastClicked] = useState<string | null>(null);

	useDevPanel(
		"Button Control",
		{
			alert: {
				type: "button",
				label: "Show Alert",
				onClick: () => {
					alert("Button clicked!");
					setClickCount((prev) => prev + 1);
					setLastClicked(new Date().toLocaleTimeString());
				},
			},
			increment: {
				type: "button",
				label: "Increment Counter",
				onClick: () => {
					setClickCount((prev) => prev + 1);
					setLastClicked(new Date().toLocaleTimeString());
				},
			},
			reset: {
				type: "button",
				label: "Reset Counter",
				onClick: () => {
					setClickCount(0);
					setLastClicked(new Date().toLocaleTimeString());
				},
			},
		},
		{ panelTitle: "Button Control Panel" },
	);

	return (
		<Logger
			items={{
				clickCount,
				lastClicked,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof ButtonControlDemo> = {
	title: "Controls",
	component: ButtonControlDemo,
};

export default meta;

type Story = StoryObj<typeof ButtonControlDemo>;

export const ButtonControl: Story = {};
