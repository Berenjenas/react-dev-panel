import styles from "./Textarea.module.scss";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	disableAutoExpand?: boolean;
}

const MAX_HEIGHT = 240; // Maximum height in pixels for the textarea

export function Textarea(props: TextareaProps): React.ReactNode {
	const { disableAutoExpand, onChange, ...htmlProps } = props;

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		if (!disableAutoExpand && e.currentTarget) {
			const textarea = e.currentTarget;

			textarea.style.height = "auto"; // Reset height to auto to calculate new scrollHeight
			textarea.style.height = `${textarea.scrollHeight}px`;

			if (textarea.scrollHeight > MAX_HEIGHT) {
				textarea.style.overflowY = "auto";
			} else {
				textarea.style.overflowY = "hidden";
			}
		}

		onChange?.(e);
	}

	return <textarea {...htmlProps} className={styles.textarea} onChange={handleChange} style={{ maxHeight: `${MAX_HEIGHT}px` }} />;
}
