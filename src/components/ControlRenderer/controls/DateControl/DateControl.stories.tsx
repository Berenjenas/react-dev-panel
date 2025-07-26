import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDevPanel } from "@/hooks/useDevPanel";
import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/logger";

function Main() {
	const [birthDate, setBirthDate] = useState("1990-01-01");
	const [startDate, setStartDate] = useState("2025-07-26");
	const [deadline, setDeadline] = useState("2025-12-31");

	useDevPanel("Date Control", {
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
	});

	return (
		<>
			<Logger items={{ birthDate, startDate, deadline }} />
			<DevPanel />
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/DateControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
	args: {},
};
