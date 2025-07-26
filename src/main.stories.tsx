import type { Meta, StoryObj } from "@storybook/react-vite";
import { DevPanel } from "./components";
import { useDevPanel } from "./hooks/useDevPanel";
import { useState } from "react";
import { Logger } from "./components/logger";

type MainProps = {
	devPanelTitle?: string;
};

function Main(props: MainProps) {
	const [theme, setTheme] = useState("light");
	const [debugMode, setDebugMode] = useState(false);
	const [color, setColor] = useState("#ff6200");
	const [textMessage, setTextMessage] = useState("Hello World");
	const [amount, setAmount] = useState(10);
	const [coolness, setCoolness] = useState(true);

	useDevPanel("Folder 1", {
		theme: {
			type: "select",
			value: theme,
			label: "Theme",
			options: ["light", "dark"],
			onChange: (value) => setTheme(value),
			description: "Select the theme for the application",
		},
		debugMode: {
			type: "boolean",
			value: debugMode,
			label: "Debug Mode",
			onChange: (value) => setDebugMode(value),
		},
		beingCool: {
			type: "boolean",
			value: coolness,
			label: "Coolness",
			description: `Are you being cool? ${coolness ? "😎" : "😢"}`,
			onChange: (value) => setCoolness(value),
		},
		data: {
			type: "button",
			label: "Fetch Data",
			description: "Click to simulate data fetching",
			onClick: () => {
				console.log("Fetching data...");
				// Simulate data fetching
				setTimeout(() => {
					console.log("Data fetched successfully!");
				}, 1000);
			},
		},
		color: {
			type: "color",
			value: color,
			label: "Color Picker",
			onChange: (value) => setColor(value),
		},
	});

	useDevPanel("Folder 2", {
		anotherControl: {
			type: "text",
			value: textMessage,
			label: "Text Input",
			onChange: (value) => setTextMessage(value),
		},
		buttonGroup: {
			type: "buttonGroup",
			label: "Button Group",
			buttons: [
				{
					label: "Button 1",
					onClick: () => console.log("Button 1 clicked"),
				},
				{
					label: "Button 2",
					onClick: () => console.log("Button 2 clicked"),
				},
				{
					label: "Button 3",
					onClick: () => console.log("Button 3 clicked"),
				},
			],
		},
	});

	useDevPanel("Folder 3", {
		amount: {
			type: "number",
			value: amount,
			label: "Amount",
			min: 0,
			max: 100,
			step: 1,
			description: "Set the amount",
			onChange: (value) => setAmount(value),
		},
	});

	return (
		<>
			<Logger items={{ theme, debugMode, color, textMessage }} />
			<DevPanel panelTitle={props.devPanelTitle} />
		</>
	);
}

const meta = {
	title: "Main",
	component: Main,
	tags: ["autodocs"],
	argTypes: {
		devPanelTitle: {
			name: "Dev Panel Title",
			control: "text",
			description: "Title of the DevPanel",
			defaultValue: "Dev Panel",
		},
	},
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		devPanelTitle: "Dev Panel",
	},
};
