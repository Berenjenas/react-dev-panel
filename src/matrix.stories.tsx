import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";
import { createMatrixEffect, type MatrixEffect } from "@/utils/matrixEffect";

function Main() {
	const [matrixMode, setMatrixMode] = useState(false);
	const matrixEffectRef = useRef<MatrixEffect | null>(null);
	const [fontSize, setFontSize] = useState(18);
	const [speed, setSpeed] = useState(1);
	const [textColor, setTextColor] = useState("#0F0");

	useEffect(() => {
		if (matrixMode && !matrixEffectRef.current) {
			// Create new effect
			matrixEffectRef.current = createMatrixEffect({
				fontSize,
				speed,
				textColor,
			});
			matrixEffectRef.current.start();
		} else if (matrixMode && matrixEffectRef.current) {
			// Update existing effect configuration
			matrixEffectRef.current.updateConfig({
				fontSize,
				speed,
				textColor,
			});
		} else if (!matrixMode && matrixEffectRef.current) {
			// Destroy effect
			matrixEffectRef.current.destroy();
			matrixEffectRef.current = null;
		}

		// Cleanup on unmount
		return () => {
			if (matrixEffectRef.current) {
				matrixEffectRef.current.destroy();
				matrixEffectRef.current = null;
			}
		};
	}, [matrixMode, fontSize, speed, textColor]);

	useDevPanel(
		"Matrix",
		{
			humanMode: {
				type: "boolean",
				value: !matrixMode,
				label: "Human Mode",
				description: "Which pill will you take?",
				onChange: (value) => setMatrixMode(!value),
			},
			matrixMode: {
				type: "boolean",
				value: matrixMode,
				label: "Matrix Mode",
				description: "Follow the white rabbit",
				onChange: (value) => setMatrixMode(value),
			},
			...(matrixMode && {
				fontSize: {
					type: "range",
					value: fontSize,
					label: "Font Size",
					min: 10,
					max: 30,
					step: 1,
					onChange: (value) => setFontSize(value),
				},
				gap: {
					type: "range",
					value: speed,
					label: "Drop Gap",
					min: 0.5,
					max: 5,
					step: 0.5,
					onChange: (value) => setSpeed(value),
				},
				textColor: {
					type: "color",
					value: textColor,
					label: "Text Color",
					onChange: (value) => setTextColor(value),
				},
			}),
		},
		{
			panelTitle: "Wake up, Neo...",
			theme: !matrixMode ? "corporate" : "neon",
		},
	);

	return <Logger items={{ matrixMode, humanMode: !matrixMode, fontSize, speed, textColor }} />;
}

const meta: Meta<typeof Main> = {
	title: "Integration Tests",
	component: Main,
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Matrix: Story = {
	args: {},
};
