import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function LocalStorageControlDemo(): React.ReactNode {
	const [refreshCount, setRefreshCount] = useState(0);

	// Populate some demo data in localStorage
	useState(() => {
		// Only set if not already present
		if (!localStorage.getItem("demo_user")) {
			localStorage.setItem("demo_user", JSON.stringify({ name: "John Doe", age: 30, role: "Developer" }));
		}

		if (!localStorage.getItem("demo_settings")) {
			localStorage.setItem("demo_settings", JSON.stringify({ theme: "dark", language: "es", notifications: true }));
		}

		if (!localStorage.getItem("demo_token")) {
			localStorage.setItem("demo_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
		}

		if (!localStorage.getItem("demo_simple")) {
			localStorage.setItem("demo_simple", "Simple string value");
		}
	});

	useDevPanel(
		"LocalStorage Control",
		{
			localStorage: {
				type: "localStorage",
				description: "Manage localStorage entries. You can view, edit, and delete values.",
				onRefresh: () => setRefreshCount((prev) => prev + 1),
			},
		},
		{ panelTitle: "LocalStorage Manager" },
	);

	return (
		<Logger
			items={{
				refreshCount,
				totalItems: localStorage.length,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof LocalStorageControlDemo> = {
	title: "Controls",
	component: LocalStorageControlDemo,
};

export default meta;

type Story = StoryObj<typeof LocalStorageControlDemo>;

export const LocalStorageControl: Story = {};
