import styles from "./Input.module.scss";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return <input {...props} className={styles.input} />;
}
