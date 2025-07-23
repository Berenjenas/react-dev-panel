import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDevPanel } from "@/hooks/useDevPanel";
import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/logger";

function Main() {
	const [amount, setAmount] = useState(0);

	useDevPanel("Number Control", {
		amount: {
			type: "number",
			value: amount,
			label: "Amount",
			onChange: (value) => setAmount(value),
		},
	});

	return (
		<>
			<Logger items={{ amount }} />
			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/NumberControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {},
};
