import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

const fruits = [
	"Apple",
	"Banana",
	"Cherry",
	"Date",
	"Elderberry",
	"Fig",
	"Grape",
	"Honeydew",
	"Kiwi",
	"Lemon",
	"Mango",
	"Orange",
	"Papaya",
	"Quince",
	"Raspberry",
];
const colors = [
	{ label: "Red", value: "red" },
	{ label: "Green", value: "green" },
	{ label: "Blue", value: "blue" },
	{ label: "Yellow", value: "yellow" },
	{ label: "Purple", value: "purple" },
	{ label: "Orange", value: "orange" },
	{ label: "Pink", value: "pink" },
	{ label: "Cyan", value: "cyan" },
	{ label: "Magenta", value: "magenta" },
	{ label: "Lime", value: "lime" },
];

const frameworks = [
	{ label: "React", value: "react" },
	{ label: "Vue.js", value: "vue" },
	{ label: "Angular", value: "angular" },
	{ label: "Svelte", value: "svelte" },
	{ label: "Next.js", value: "nextjs" },
	{ label: "Nuxt.js", value: "nuxtjs" },
	{ label: "SvelteKit", value: "sveltekit" },
	{ label: "Gatsby", value: "gatsby" },
	{ label: "Remix", value: "remix" },
];

function MultiSelectControlDemo(): React.ReactNode {
	const [selectedFruits, setSelectedFruits] = useState<string[]>(["Apple", "Cherry"]);
	const [selectedColors, setSelectedColors] = useState<string[]>(["red", "blue"]);
	const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react"]);
	const [disabledSelection, setDisabledSelection] = useState<string[]>(["disabled1"]);

	useDevPanel(
		"MultiSelect Control",
		{
			info: {
				type: "separator",
				style: "label",
				label: "MultiSelect Options",
			},

			fruits: {
				type: "multiselect",
				options: fruits,
				value: selectedFruits,
				label: "Select Fruits",
				description: "Choose multiple fruits from the list",
				onChange: (value) => setSelectedFruits(value),
			},

			colors: {
				type: "multiselect",
				options: colors,
				value: selectedColors,
				label: "Select Colors",
				description: "Options as objects with label/value pairs",
				onChange: (value) => setSelectedColors(value),
			},

			frameworks: {
				type: "multiselect",
				options: frameworks,
				value: selectedFrameworks,
				label: "Frontend Frameworks",
				description: "Choose your preferred frameworks",
				onChange: (value) => setSelectedFrameworks(value),
			},

			separator: {
				type: "separator",
				style: "line",
			},

			disabled: {
				type: "multiselect",
				options: ["disabled1", "disabled2", "disabled3"],
				value: disabledSelection,
				label: "Disabled MultiSelect",
				description: "This control is disabled",
				disabled: true,
				onChange: (value) => setDisabledSelection(value),
			},
		},
		{ panelTitle: "MultiSelect Control Panel" },
	);

	return (
		<Logger
			items={{
				selectedFruits,
				selectedColors,
				selectedFrameworks,
				disabledSelection,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof MultiSelectControlDemo> = {
	title: "Controls",
	component: MultiSelectControlDemo,
};

export default meta;

type Story = StoryObj<typeof MultiSelectControlDemo>;

export const MultiSelectControl: Story = {};
