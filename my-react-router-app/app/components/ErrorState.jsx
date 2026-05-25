import { Link } from "react-router";

import styles from "./ErrorState.module.css";

export function ErrorState({ title, message, stack }) {
  return (
    <main className={styles.error}>
      <p className={styles.kicker}>Something went wrong</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link className={styles.link} to="/">
        ホームへ戻る
      </Link>
      {stack ? (
        <pre className={styles.stack}>
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
