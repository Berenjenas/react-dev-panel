import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDevPanel } from "@/hooks/useDevPanel";
import { DevPanel } from "@/components/DevPanel";
import { useState } from "react";

function Main() {
    const [color, setColor] = useState("#ff0000");

    useDevPanel("Button Control", {
        alert: {
            type: "button",
            label: "Click Me",
            onClick: () => {
                alert("Button clicked!");
            },
        },
        color1: {
            type: "color",
            value: color,
            onChange: (value) => setColor(value),
            label: "Select Color",
        },
    });

    useDevPanel("Maxi Control", {
        alert: {
            type: "color",
            value: color,
            onChange: (value) => setColor(value),
            label: "Select Color",
        },
    });

    return (
        <>
            <DevPanel />
        </>
    );
}

const meta: Meta<typeof Main> = {
    title: "Controls/ButtonControl",
    component: Main,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
    args: {
        alert: "Click Me",
    },
};
