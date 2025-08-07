import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";
import { createMatrixEffect, type MatrixEffect } from "@/utils/matrixEffect";

import "./matrix.css";

function MatrixDemo(): React.ReactNode {
	const matrixEffectRef = useRef<MatrixEffect | null>(null);
	const [matrixMode, setMatrixMode] = useState(false);
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
		return (): void => {
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
				onChange: (value): void => setMatrixMode(!value),
			},
			matrixMode: {
				type: "boolean",
				value: matrixMode,
				label: "Matrix Mode",
				description: "Follow the white rabbit",
				onChange: (value): void => setMatrixMode(value),
			},
			...(matrixMode && {
				fontSize: {
					type: "range",
					value: fontSize,
					label: "Font Size",
					min: 10,
					max: 30,
					step: 1,
					onChange: (value): void => setFontSize(value),
				},
				gap: {
					type: "range",
					value: speed,
					label: "Drop Gap",
					min: 0.5,
					max: 5,
					step: 0.5,
					onChange: (value): void => setSpeed(value),
				},
				textColor: {
					type: "color",
					value: textColor,
					label: "Text Color",
					onChange: (value): void => setTextColor(value),
				},
			}),
		},
		{
			panelTitle: "Wake up, Neo...",
			theme: matrixMode ? "neon" : "light",
		},
	);

	return (
		<Logger
			defaultCollapsed
			items={{
				matrixMode,
				humanMode: !matrixMode,
				fontSize,
				speed,
				textColor,
			}}
		/>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof MatrixDemo> = {
	title: "Integration Tests",
	component: MatrixDemo,
};

export default meta;

type Story = StoryObj<typeof MatrixDemo>;

export const Matrix: Story = {};
