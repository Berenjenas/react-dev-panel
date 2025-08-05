import styles from "./EmptyContent.module.scss";

export function EmptyContent() {
    return (
        <div className={styles.empty}>
            No controls registered yet.
            <br /> <br />
            Use <code>useDevPanel()</code> to add controls.
        </div>
    );
}
