import styles from "./Input.module.scss";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>): React.ReactNode {
	return <input {...props} className={styles.input} />;
}
