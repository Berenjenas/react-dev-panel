import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { FileInfo } from "@/components/ControlRenderer/controls/DragAndDropControl/types";
import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

function ProfileCardDemo(): React.ReactNode {
	const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

	useDevPanel(
		"Drag and Drop Control",
		{
			imagesOnly: {
				type: "dragAndDrop",
				description: "Drop an image here. Only image files are allowed.",
				allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
				onDrop: (value: FileInfo) => setFileInfo(value),
			},
		},
		{ panelTitle: "Profile card demo" },
	);

	return (
		<>
			<figure
				style={{
					margin: 0,
					display: "flex",
					alignItems: "center",
					position: "relative",
					textDecoration: "none",
				}}
			>
				<div
					style={{
						position: "relative",
						display: "flex",
					}}
				>
					<div
						style={{
							height: "80px",
							width: "80px",
							borderRadius: "100px",
							backgroundColor: "#363636",
							backgroundImage: `url(${fileInfo?.base64 || ""})`,
							backgroundSize: "cover",
						}}
					/>
				</div>

				<figcaption
					style={{
						paddingLeft: "15px",
					}}
				>
					<div
						style={{
							color: "#666",
							fontFamily:
								'"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
							fontWeight: 400,
							fontSize: "16px",
							marginTop: "2px",
						}}
					>
						John Doe
					</div>

					<div
						style={{
							color: "#666",
							fontFamily:
								'"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
							fontWeight: 400,
							fontSize: "15px",
							marginTop: "2px",
						}}
					>
						Engineer at Google on Firebase.
					</div>

					<div
						style={{
							color: "#666",
							fontFamily:
								'"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
							fontWeight: 400,
							fontSize: "15px",
							marginTop: "2px",
						}}
					>
						john.doe@gmail.com
					</div>
				</figcaption>
			</figure>

			<Logger
				items={{
					fileInfo: {
						...fileInfo,
						file: fileInfo?.file ? "Object" : undefined,
						base64: fileInfo?.base64 ? `${fileInfo.base64.slice(0, 30)}...` : undefined,
					},
				}}
			/>
		</>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof ProfileCardDemo> = {
	title: "Integration Tests",
	component: ProfileCardDemo,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story): React.JSX.Element => {
			return (
				<div
					style={{
						width: "100%",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Story />
				</div>
			);
		},
	],
};

export default meta;

type Story = StoryObj<typeof ProfileCardDemo>;

export const ProfileCard: Story = {};
