import styles from "./LoadingIndicator.module.css";

export function LoadingIndicator({ isLoading }) {
  return (
    <div
      className={styles.track}
      data-visible={isLoading ? "true" : "false"}
      role="status"
      aria-live="polite"
      aria-label={isLoading ? "読み込み中" : undefined}
    >
      <span className={styles.bar} />
    </div>
  );
}
