import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function RangeControlDemo(): React.ReactNode {
	const [volume, setVolume] = useState(50);
	const [opacity, setOpacity] = useState(0.8);
	const [temperature, setTemperature] = useState(22);
	const [persistent, setPersistent] = useState(50);

	useDevPanel(
		"Range Control",
		{
			volume: {
				type: "range",
				value: volume,
				label: "Volume",
				min: 0,
				max: 100,
				step: 1,
				onChange: setVolume,
			},
			opacity: {
				type: "range",
				value: opacity,
				label: "Opacity",
				min: 0,
				max: 1,
				step: 0.1,
				onChange: setOpacity,
			},
			temperature: {
				type: "range",
				value: temperature,
				label: "Temperature",
				min: 15,
				max: 30,
				step: 0.5,
				onChange: setTemperature,
			},

			separator: {
				type: "separator",
				style: "label",
				label: "Persistence",
			},

			persistent: {
				type: "range",
				value: persistent,
				label: "Persistent Control",
				description: "This control's state persists across sessions",
				onChange: setPersistent,
				persist: true,
			},
		},
		{ panelTitle: "Range Control Panel" },
	);

	return (
		<Logger
			items={{
				volume,
				opacity,
				temperature,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof RangeControlDemo> = {
	title: "Controls",
	component: RangeControlDemo,
};

export default meta;

type Story = StoryObj<typeof RangeControlDemo>;

export const RangeControl: Story = {};
