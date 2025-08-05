import styles from "./Select.module.scss";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): React.ReactNode {
	return <select {...props} className={styles.select} />;
}
