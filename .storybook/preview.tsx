import { useEffect } from "react";
import type { Preview } from "@storybook/react-vite";

import { useDevPanelStore } from "../src/store";

import "../src/styles.scss";

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
			const store = useDevPanelStore();

			useEffect(() => {
				if (!store.isVisible) {
					store.setVisible(true);

					console.log("[DevPanel] Setting visibility to true via decorator");
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, []);

			return <Story />;
		},
	],
};

export default preview;
