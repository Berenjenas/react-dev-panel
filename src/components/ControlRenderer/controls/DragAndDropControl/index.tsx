import { useCallback, useState } from "react";

import { className } from "@/utils/className";

import type { DragAndDropControl, DragAndDropControlProps } from "./types";

import styles from "./DragAndDropControl.module.scss";

const allowedFileExtensions = [".jpg", ".jpeg", ".gif", ".png"];

export function DragAndDropControl({ control }: DragAndDropControlProps): React.ReactNode {
	const [isDropZoneActive, setIsDropZoneActive] = useState(false);
	const [imageSource, setImageSource] = useState<string>("");
	const [textVisible, setTextVisible] = useState(true);

	const onDragEnterCallback = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDropZoneActive(true);
	}, []);

	const onDropCallback = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();

			const files = e.dataTransfer.files;

			if (files.length > 0) {
				const file = files[0];
				const fileReader = new FileReader();

				fileReader.onload = (): void => {
					setIsDropZoneActive(false);

					const base64Result = fileReader.result as string;

					setImageSource(base64Result);
					setTextVisible(false);

					control.onDrop({
						name: file.name,
						size: file.size,
						type: file.type,
						file: file,
						base64: base64Result,
						blob: file.slice(),
						lastModified: file.lastModified,
						webkitRelativePath: file.webkitRelativePath,
					});
				};

				fileReader.readAsDataURL(file);
			}
		},
		[setImageSource, setIsDropZoneActive, setTextVisible, control],
	);

	const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDropZoneActive(true);
	}, []);

	const onDragLeave = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDropZoneActive(false);
		},
		[setIsDropZoneActive],
	);

	return (
		<div
			{...className(styles.dropZone, {
				[styles.active]: isDropZoneActive,
			})}
			onDragEnter={onDragEnterCallback}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDropCallback}
		>
			{imageSource ? (
				<img src={imageSource} alt="Dropped" className={styles.droppedImage} />
			) : textVisible ? (
				<div>
					<p className={styles.dropText}>Drag & Drop an image here</p>

					<p className={styles.supportedFormats}>Supported formats: {allowedFileExtensions.join(", ")}</p>
				</div>
			) : null}
		</div>
	);
}
