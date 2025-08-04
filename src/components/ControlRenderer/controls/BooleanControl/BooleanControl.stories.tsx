import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function Main() {
	const [fast, setFast] = useState(false);
	const [good, setGood] = useState(false);
	const [cheap, setCheap] = useState(false);

	const handleTriangleChange = (target: "fast" | "good" | "cheap", newValue: boolean) => {
		if (newValue) {
			const currentCount = [fast, good, cheap].filter(Boolean).length;

			if (currentCount >= 2) {
				if (target !== "fast" && fast) setFast(false);
				else if (target !== "good" && good) setGood(false);
				else if (target !== "cheap" && cheap) setCheap(false);
			}
		}

		switch (target) {
			case "fast":
				setFast(newValue);
				break;
			case "good":
				setGood(newValue);
				break;
			case "cheap":
				setCheap(newValue);
				break;
		}
	};

	useDevPanel(
		"Developer Triangle",
		{
			fast: {
				type: "boolean",
				value: fast,
				label: "⚡ Fast",
				description: "Quick development and delivery",
				onChange: (value) => handleTriangleChange("fast", value),
			},
			good: {
				type: "boolean",
				value: good,
				label: "✨ Good",
				description: "High quality and well-architected",
				onChange: (value) => handleTriangleChange("good", value),
			},
			cheap: {
				type: "boolean",
				value: cheap,
				label: "💰 Cheap",
				description: "Low cost and budget-friendly",
				onChange: (value) => handleTriangleChange("cheap", value),
			},
			disabledControl: {
				type: "boolean",
				value: false,
				label: "Disabled Control",
				description: "Boolean control can be disabled",
				onChange: () => {},
				disabled: true,
			},
		},
		{
			panelTitle: "The Developer Triangle",
		},
	);

	const activeCount = [fast, good, cheap].filter(Boolean).length;
	const message =
		activeCount <= 2 ? (activeCount === 2 ? "Perfect! You can only have 2 out of 3 ✅" : "Try to enable them all") : "This shouldn't happen! 🤔";

	return (
		<Logger
			items={{
				fast,
				good,
				cheap,
				message,
			}}
		/>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const BooleanControl: Story = {
	args: {},
};
