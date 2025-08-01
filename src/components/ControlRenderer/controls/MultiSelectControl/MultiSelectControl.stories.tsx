import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];
const colors = [
	{ label: "Red", value: "red" },
	{ label: "Green", value: "green" },
	{ label: "Blue", value: "blue" },
	{ label: "Yellow", value: "yellow" },
	{ label: "Purple", value: "purple" },
];

function Main() {
	const [selectedFruits, setSelectedFruits] = useState<string[]>(["Apple", "Cherry"]);
	const [selectedColors, setSelectedColors] = useState<string[]>(["red", "blue"]);

	useDevPanel("MultiSelect Control", {
		fruits: {
			type: "multiselect",
			options: fruits,
			value: selectedFruits,
			label: "Select Fruits",
			onChange: (value) => setSelectedFruits(value),
		},
		colors: {
			type: "multiselect",
			options: colors,
			value: selectedColors,
			label: "Select Colors",
			onChange: (value) => setSelectedColors(value),
		},
	});

	return (
		<>
			<Logger items={{ selectedFruits, selectedColors }} />
			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/MultiSelectControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {},
};
