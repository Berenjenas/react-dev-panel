import { useCallback, useRef, useState } from "react";

import { className } from "@/utils/className";

import type { DragAndDropControl, DragAndDropControlProps, FileInfo } from "./types";

import styles from "./DragAndDropControl.module.scss";

export function DragAndDropControl({ control }: DragAndDropControlProps): React.ReactNode {
	const [isDropZoneActive, setIsDropZoneActive] = useState(false);
	const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
	const [textVisible, setTextVisible] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isFileAllowed = useCallback(
		(fileName: string): boolean => {
			if (!control.allowedFileTypes) {
				return true;
			}

			const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf("."));

			return control.allowedFileTypes.some((ext: string) => ext.toLowerCase() === fileExtension);
		},
		[control.allowedFileTypes],
	);

	const processFile = useCallback(
		(file: File) => {
			if (control.allowedFileTypes && !isFileAllowed(file.name)) {
				setErrorMessage(`File type not allowed. \n Supported formats: ${control.allowedFileTypes.join(", ")}`);
				setIsDropZoneActive(false);

				return;
			}

			setErrorMessage("");

			const fileReader = new FileReader();

			fileReader.onload = (): void => {
				setIsDropZoneActive(false);

				const base64Result = fileReader.result as string;

				const fileInfoObject: FileInfo = {
					base64: base64Result,
					file: file,
					name: file.name,
					size: file.size,
					type: file.type,
					lastModified: file.lastModified,
					webkitRelativePath: file.webkitRelativePath,
				};

				setFileInfo(fileInfoObject);
				setTextVisible(false);

				control.onDrop(fileInfoObject);
			};

			fileReader.readAsDataURL(file);
		},
		[control, isFileAllowed, setErrorMessage, setFileInfo, setTextVisible, setIsDropZoneActive],
	);

	const handleDropZoneClick = useCallback(() => {
		if (!fileInfo && fileInputRef.current && !control.disabled) {
			fileInputRef.current.click();
		}
	}, [fileInfo, control.disabled]);

	const handleFileInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;

			if (files && files.length > 0) {
				processFile(files[0]);
			}

			e.target.value = "";
		},
		[processFile],
	);

	const onDragEnterCallback = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			if (control.disabled) return;

			e.preventDefault();
			e.stopPropagation();
			setIsDropZoneActive(true);
			setErrorMessage("");
		},
		[control.disabled],
	);

	const onDropCallback = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			if (control.disabled) return;

			e.preventDefault();
			e.stopPropagation();

			const files = e.dataTransfer.files;

			if (files.length > 0) {
				processFile(files[0]);
			}
		},
		[processFile, control.disabled],
	);

	const onDragOver = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			if (control.disabled) return;

			e.preventDefault();
			e.stopPropagation();
			setIsDropZoneActive(true);
			setErrorMessage("");
		},
		[control.disabled],
	);

	const onDragLeave = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			if (control.disabled) return;

			e.preventDefault();
			e.stopPropagation();
			setIsDropZoneActive(false);
		},
		[control.disabled],
	);

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				style={{ display: "none" }}
				accept={control.allowedFileTypes?.join(",")}
				onChange={handleFileInputChange}
				disabled={control.disabled}
			/>

			<div
				{...className(styles.dropZone, {
					[styles.active]: isDropZoneActive,
					[styles.disabled]: !!control.disabled,
				})}
				onDragEnter={onDragEnterCallback}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDropCallback}
				onClick={handleDropZoneClick}
			>
				{errorMessage ? (
					<div className={styles.errorMessage}>
						<p>{errorMessage}</p>
					</div>
				) : fileInfo ? (
					<div className={styles.droppedFile}>
						<p className={styles.droppedText}>Dropped '{fileInfo.name}'</p>
					</div>
				) : textVisible ? (
					<div>
						<p className={styles.dropText}>Drag & Drop a file here or click to browse</p>

						<p className={styles.supportedFormats}>
							{control.allowedFileTypes ? `Supported formats: ${control.allowedFileTypes.join(", ")}` : "All file types are supported"}
						</p>
					</div>
				) : null}
			</div>
		</>
	);
}
