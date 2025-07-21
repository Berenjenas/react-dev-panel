import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDevPanel } from "@/hooks/useDevPanel";
import { DevPanel } from "@/components/DevPanel";
import { Logger } from "@/components/logger";

function Main() {
    const [description, setDescription] = useState("Test");

    useDevPanel("Text Control", {
        description: {
            type: "text",
            value: description,
            onChange: (value) => setDescription(value),
        },
    });

    return (
        <>
            <Logger items={{ description }} />
            <DevPanel />
        </>
    );
}

const meta: Meta<typeof Main> = {
    title: "Controls/TextControl",
    component: Main,
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {
    args: {},
};
