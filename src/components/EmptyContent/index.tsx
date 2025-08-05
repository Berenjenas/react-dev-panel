import styles from "./EmptyContent.module.scss";

export function EmptyContent(): React.ReactNode {
	return (
		<div className={styles.empty}>
			<span>No controls registered yet.</span>

			<br />

			<br />

			<span>
				Use <code>useDevPanel()</code> to add controls.
			</span>
		</div>
	);
}
