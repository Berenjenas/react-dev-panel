import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DevPanel } from "@/components/DevPanel";
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

function Main() {
	const [name, setName] = useState(users[0].name);
	const [lastName, setLastName] = useState(users[0].lastName);
	const [email, setEmail] = useState(users[0].email);
	const [phone, setPhone] = useState(users[0].phone);

	useDevPanel("Button Control", {
		group: {
			type: "buttonGroup",
			label: "Select User",
			buttons: [
				{
					label: "User 1",
					onClick: () => {
						setName(users[0].name);
						setLastName(users[0].lastName);
						setEmail(users[0].email);
						setPhone(users[0].phone);
					},
				},
				{
					label: "User 2",
					onClick: () => {
						setName(users[1].name);
						setLastName(users[1].lastName);
						setEmail(users[1].email);
						setPhone(users[1].phone);
					},
				},
				{
					label: "User 3",
					onClick: () => {
						setName(users[2].name);
						setLastName(users[2].lastName);
						setEmail(users[2].email);
						setPhone(users[2].phone);
					},
				},
				{
					label: "Reset",
					onClick: () => {
						setName("");
						setLastName("");
						setEmail("");
						setPhone("");
					},
					disabled: true,
				},
			],
		},
	});

	return (
		<>
			<DevPanel />

			<form action="">
				<input type="text" name="name" placeholder="User name" value={name} onChange={(e) => setName(e.target.value)} />
				<input type="text" name="lastName" placeholder="User last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				<input type="email" name="email" placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="tel" name="phone" placeholder="User phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
			</form>
		</>
	);
}

const meta: Meta<typeof Main> = {
	title: "Controls/ButtonGroupControl",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {};
