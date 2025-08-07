import type { BaseControl } from "../types";

export type FileInfo = {
	name: string;
	size: number;
	type: string;
	file: File;
	base64: string;
	lastModified: number;
	webkitRelativePath: string;
};

export interface DragAndDropControl extends BaseControl {
	type: "dragAndDrop";
	onDrop: (value: FileInfo) => void;
	allowedFileTypes?: string[];
}

export interface DragAndDropControlProps {
	control: DragAndDropControl;
}
