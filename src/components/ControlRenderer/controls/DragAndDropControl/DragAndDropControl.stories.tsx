import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";

import type { FileInfo } from "./types";

function DragAndDropControlDemo(): React.ReactNode {
	const [imageInfo, setImageInfo] = useState<FileInfo | null>(null);

	useDevPanel(
		"Drag and Drop Control",
		{
			birthDate: {
				type: "dragAndDrop",
				label: "Drop an image here",
				onDrop: (value: FileInfo) => {
					console.log("Dropped file info:", value);
					setImageInfo(value);
				},
			},
		},
		{ panelTitle: "Drag and Drop Control Panel" },
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
							backgroundImage: `url(${imageInfo?.base64 || ""})`,
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
					imageInfo: {
						...imageInfo,
						base64: imageInfo?.base64 ? `${imageInfo.base64.slice(0, 30)}...` : undefined,
					},
				}}
			/>
		</>
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

type Story = StoryObj<typeof DragAndDropControlDemo>;

export const DragAndDropControl: Story = {};
