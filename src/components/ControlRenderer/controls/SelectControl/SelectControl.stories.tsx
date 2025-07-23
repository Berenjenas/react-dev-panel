import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDevPanel } from "@/hooks/useDevPanel";
import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/logger";

const names = ["", "Alice", "Bob", "Charlie", "David", "Eve"];

function Main() {
	const [name, setName] = useState(names[1]);

	useDevPanel("Select Control", {
		name: {
			type: "select",
			options: names,
			value: name,
			label: "Select Name",
			onChange: (value) => setName(value),
		},
	});

	return (
		<>
			<Logger items={{ name }} />
			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/SelectControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {},
};
