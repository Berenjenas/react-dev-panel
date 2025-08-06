import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

const users = [
	{
		name: "John Doe",
		lastName: "Doe",
		email: "johndoe@example.com",
		phone: "+1234567890",
	},
	{
		name: "Jane Smith",
		lastName: "Smith",
		email: "janesmith@example.com",
		phone: "+0987654321",
	},
	{
		name: "Alice Johnson",
		lastName: "Johnson",
		email: "alicejohnson@example.com",
		phone: "+1122334455",
	},
];

function ButtonGroupControlDemo(): React.ReactNode {
	const [name, setName] = useState(users[0].name);
	const [lastName, setLastName] = useState(users[0].lastName);
	const [email, setEmail] = useState(users[0].email);
	const [phone, setPhone] = useState(users[0].phone);

	useDevPanel(
		"ButtonGroup Control",
		{
			group: {
				type: "buttonGroup",
				label: "Select User",
				buttons: [
					{
						label: "User 1",
						onClick: (): void => {
							setName(users[0].name);
							setLastName(users[0].lastName);
							setEmail(users[0].email);
							setPhone(users[0].phone);
						},
					},
					{
						label: "User 2",
						onClick: (): void => {
							setName(users[1].name);
							setLastName(users[1].lastName);
							setEmail(users[1].email);
							setPhone(users[1].phone);
						},
					},
					{
						label: "User 3",
						onClick: (): void => {
							setName(users[2].name);
							setLastName(users[2].lastName);
							setEmail(users[2].email);
							setPhone(users[2].phone);
						},
					},
					{
						label: "Reset",
						onClick: (): void => {
							setName("");
							setLastName("");
							setEmail("");
							setPhone("");
						},
						disabled: true,
					},
				],
			},
		},
		{ panelTitle: "Button Group Control Panel" },
	);

	return (
		<Logger
			items={{
				name,
				lastName,
				email,
				phone,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof ButtonGroupControlDemo> = {
	title: "Controls",
	component: ButtonGroupControlDemo,
};

export default meta;

type Story = StoryObj<typeof ButtonGroupControlDemo>;

export const ButtonGroupControl: Story = {};
