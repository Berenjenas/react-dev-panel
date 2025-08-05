import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function Main(): React.ReactNode {
	const [fast, setFast] = useState<boolean>(false);
	const [good, setGood] = useState<boolean>(false);
	const [cheap, setCheap] = useState<boolean>(false);
	const message = useMemo<string>(() => {
		const activeCount = [fast, good, cheap].filter(Boolean).length;

		return activeCount <= 2
			? activeCount === 2
				? "Perfect! You can only have 2 out of 3 ✅"
				: "Try to enable them all"
			: "This shouldn't happen! 🤔";
	}, [cheap, fast, good]);

	/**
	 * Handle changes to the developer triangle controls.
	 * @param target The control that changed.
	 * @param newValue The new value of the control.
	 */
	function handleTriangleChange(target: "fast" | "good" | "cheap", newValue: boolean): void {
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
	}

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
