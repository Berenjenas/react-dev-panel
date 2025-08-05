import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function DateControlDemo(): React.ReactNode {
	const [birthDate, setBirthDate] = useState("1990-01-01");
	const [startDate, setStartDate] = useState("2025-07-26");
	const [deadline, setDeadline] = useState("2025-12-31");

	useDevPanel(
		"Date Control",
		{
			birthDate: {
				type: "date",
				value: birthDate,
				label: "Birth Date",
				max: "2025-12-31",
				onChange: (value) => setBirthDate(value),
			},
			startDate: {
				type: "date",
				value: startDate,
				label: "Start Date",
				min: "2025-01-01",
				max: "2025-12-31",
				onChange: (value) => setStartDate(value),
			},
			deadline: {
				type: "date",
				value: deadline,
				label: "Deadline",
				min: "2025-07-26",
				onChange: (value) => setDeadline(value),
			},
		},
		{ panelTitle: "Date Control Panel" },
	);

	return (
		<Logger
			items={{
				birthDate,
				startDate,
				deadline,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof DateControlDemo> = {
	title: "Controls",
	component: DateControlDemo,
};

export default meta;

type Story = StoryObj<typeof DateControlDemo>;

export const DateControl: Story = {};
