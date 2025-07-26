import { useEffect } from "react";
import type { Preview } from "@storybook/react-vite";

import { useDevPanelStore } from "../src/utils/store";

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
			useEffect(() => {
				// Initialize the store state after Zustand hydration
				const store = useDevPanelStore.getState();

				store.setVisible(true);

				console.log("[DevPanel] Setting visibility to true via decorator");
			}, []);

			return <Story />;
		},
	],
};

export default preview;
