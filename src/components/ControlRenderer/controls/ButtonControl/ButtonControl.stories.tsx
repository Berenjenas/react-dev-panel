import type { Meta, StoryObj } from "@storybook/react-vite";

import { DevPanel } from "@/components/DevPanel";
import { useDevPanel } from "@/hooks/useDevPanel";

function Main(): React.ReactNode {
	useDevPanel("Button Control", {
		alert: {
			type: "button",
			label: "Click Me",
			onClick: () => {
				alert("Button clicked!");
			},
		},
	});

	return (
		<>
			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/ButtonControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {
		alert: "Click Me",
	},
};
