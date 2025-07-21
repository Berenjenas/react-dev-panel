import type { Meta, StoryObj } from "@storybook/react-vite";
import { DevPanel } from "./components";
import { useDevPanel } from "./hooks/useDevPanel";
import { useState } from "react";
import { Logger } from "./components/logger";

type MainProps = {
    devPanelTitle?: string;
};

function Main(props: MainProps) {
    const [theme, setTheme] = useState("light");
    const [debugMode, setDebugMode] = useState(false);
    const [color, setColor] = useState("#ff0000");

    useDevPanel("Default", {
        theme: {
            type: "select",
            value: theme,
            options: ["light", "dark"],
            onChange: (value) => setTheme(value),
        },
        debugMode: {
            type: "boolean",
            value: debugMode,
            onChange: (value) => setDebugMode(value),
        },
        data: {
            type: "button",
            label: "Fetch Data",
            onClick: () => {
                console.log("Fetching data...");
                // Simulate data fetching
                setTimeout(() => {
                    console.log("Data fetched successfully!");
                }, 1000);
            },
        },
        color: {
            type: "color",
            value: color,
            onChange: (value) => setColor(value),
        },
    });

    return (
        <>
            <Logger items={{ theme, debugMode, color }} />
            <DevPanel panelTitle={props.devPanelTitle} />
        </>
    );
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Main",
    component: Main,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        //layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        devPanelTitle: {
            name: "Dev Panel Title",
            control: "text",
            description: "Title of the DevPanel",
            defaultValue: "Dev Panel",
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    //args: { onClick: fn() },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        devPanelTitle: "Dev Panel",
    },
};
