import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

import type { FileInfo } from "./types";

function DragAndDropControlDemo(): React.ReactNode {
	const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

	useDevPanel(
		"Drag and Drop Control",
		{
			default: {
				type: "dragAndDrop",
				description: "Drop any file here. You can drop files here to see their information.",
				onDrop: (value: FileInfo) => setFileInfo(value),
			},
			imagesOnly: {
				type: "dragAndDrop",
				description: "Drop an image here. Only image files are allowed.",
				allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
				onDrop: (value: FileInfo) => setFileInfo(value),
			},
			documentsOnly: {
				type: "dragAndDrop",
				description: "Drop a document here. Only document files are allowed.",
				allowedFileTypes: [".pdf", ".doc", ".docx", ".txt"],
				onDrop: (value: FileInfo) => setFileInfo(value),
			},
			disabled: {
				type: "dragAndDrop",
				description: "Disabled drag and drop control",
				onDrop: (value: FileInfo) => setFileInfo(value),
				disabled: true,
			},
		},
		{ panelTitle: "Drag and Drop Control Panel" },
	);

	return (
		<Logger
			items={{
				fileInfo: {
					...fileInfo,
					file: fileInfo?.file ? "Object" : undefined,
					base64: fileInfo?.base64 ? `${fileInfo.base64.slice(0, 30)}...` : undefined,
				},
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof DragAndDropControlDemo> = {
	title: "Controls",
	component: DragAndDropControlDemo,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof DragAndDropControlDemo>;

export const DragAndDropControl: Story = {};
