import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

type MainProps = {
	devPanelTitle?: string;
};

function Main(props: MainProps) {
	const [debugMode, setDebugMode] = useState(false);

	useDevPanel("Default", {
		debugMode: {
			type: "boolean",
			value: debugMode,
			onChange: (value) => setDebugMode(value),
		},
	});

	return (
		<>
			<Logger items={{ debugMode }} />
			<DevPanel panelTitle={props.devPanelTitle} />
		</>
	);
}

const meta: Meta<MainProps> = {
	title: "Controls/BooleanControl",
	component: Main,
	argTypes: {
		devPanelTitle: {
			control: "text",
			description: "Title for the DevPanel",
			defaultValue: "DevPanel",
		},
	},
};

export default meta;

type Story = StoryObj<MainProps>;

export const Default: Story = {
	args: {
		devPanelTitle: "DevPanel",
	},
};
