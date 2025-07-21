import type { Meta, StoryObj } from "@storybook/react-vite";
import { DevPanel } from "@/components/DevPanel";

const meta = {
    title: "Empty Content",
    component: DevPanel,
} satisfies Meta<typeof DevPanel>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
