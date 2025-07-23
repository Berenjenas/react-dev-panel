import styles from "./Select.module.scss";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
	return <select {...props} className={styles.select}></select>;
}
