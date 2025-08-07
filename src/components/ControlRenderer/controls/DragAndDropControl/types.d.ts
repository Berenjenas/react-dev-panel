import type { BaseControl } from "../types";

export type FileInfo = {
	name: string;
	size: number;
	type: string;
	file: File;
	base64: string;
	blob: Blob;
	lastModified: number;
	webkitRelativePath: string;
};

export interface DragAndDropControl extends BaseControl {
	type: "dragAndDrop";
	onDrop: (value: FileInfo) => void;
}

export interface DragAndDropControlProps {
	control: DragAndDropControl;
}
