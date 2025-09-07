import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function BooleanControlDemo(): React.ReactNode {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [persistent, setPersistent] = useState<boolean>(false);

	useDevPanel(
		"Boolean Control",
		{
			isActive: {
				type: "boolean",
				value: isActive,
				label: "Active",
				description: "Toggle active state",
				onChange: (value) => setIsActive(value),
			},
			isVisible: {
				type: "boolean",
				value: isVisible,
				label: "Visible",
				description: "Toggle visibility",
				onChange: (value) => setIsVisible(value),
			},
			isEnabled: {
				type: "boolean",
				value: isEnabled,
				label: "Enabled",
				description: "Toggle enabled state",
				onChange: (value) => setIsEnabled(value),
			},
			disabledControl: {
				type: "boolean",
				value: false,
				label: "Disabled Control",
				description: "Boolean control can be disabled",
				onChange: () => {},
				disabled: true,
			},
			persistent: {
				type: "boolean",
				value: persistent,
				label: "Persistent Control",
				description: "This control's state persists across sessions",
				onChange: (value) => setPersistent(value),
				persist: true,
			},
		},
		{ panelTitle: "Boolean Control Panel" },
	);

	return (
		<Logger
			items={{
				isActive,
				isVisible,
				isEnabled,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof BooleanControlDemo> = {
	title: "Controls",
	component: BooleanControlDemo,
};

export default meta;

type Story = StoryObj<typeof BooleanControlDemo>;

export const BooleanControl: Story = {};
