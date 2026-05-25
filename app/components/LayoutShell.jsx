import { NavLink, Link, useNavigation } from "react-router";

import { ThemeToggle } from "./ThemeToggle";
import { LoadingIndicator } from "./LoadingIndicator";
import styles from "./LayoutShell.module.css";

export function LayoutShell({ children }) {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <div className={styles.shell}>
      <LoadingIndicator isLoading={isLoading} />
      <header className={styles.header}>
        <Link className={styles.brand} to="/">
          Route Notes
        </Link>
        <nav className={styles.nav} aria-label="メインナビゲーション">
          <NavLink to="/" end>
            ホーム
          </NavLink>
          <NavLink to="/blog">ギャラリー</NavLink>
        </nav>
        <ThemeToggle />
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <span>Built with React Router v7 and Vite.</span>
      </footer>
    </div>
  );
}
