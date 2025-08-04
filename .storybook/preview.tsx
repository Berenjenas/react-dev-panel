import { useEffect } from "react";
import type { Preview } from "@storybook/react-vite";

import { useDevPanelUI } from "../src/store/UIStore";

import "../src/styles/index.scss";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => {
			const { isVisible, setVisible } = useDevPanelUI();

			useEffect(() => {
				if (!isVisible) {
					setVisible(true);

					console.log("[DevPanel] Setting visibility to true via decorator");
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, []);

			return <Story />;
		},
	],
};

export default preview;
