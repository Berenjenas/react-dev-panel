import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDevPanel } from "@/hooks/useDevPanel";
import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/logger";

function Main() {
	const [volume, setVolume] = useState(50);
	const [opacity, setOpacity] = useState(0.8);
	const [temperature, setTemperature] = useState(22);

	useDevPanel("Range Control", {
		volume: {
			type: "range",
			value: volume,
			label: "Volume",
			min: 0,
			max: 100,
			step: 1,
			onChange: (value) => setVolume(value),
		},
		opacity: {
			type: "range",
			value: opacity,
			label: "Opacity",
			min: 0,
			max: 1,
			step: 0.1,
			onChange: (value) => setOpacity(value),
		},
		temperature: {
			type: "range",
			value: temperature,
			label: "Temperature",
			min: 15,
			max: 30,
			step: 0.5,
			onChange: (value) => setTemperature(value),
		},
	});

	return (
		<>
			<Logger items={{ volume, opacity, temperature }} />
			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/RangeControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {},
};
