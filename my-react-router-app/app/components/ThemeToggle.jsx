import { useEffect, useState } from "react";

import styles from "./ThemeToggle.module.css";

function getInitialTheme() {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme || "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className={styles.button}
      type="button"
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      title={isDark ? "ライトモード" : "ダークモード"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
    </button>
  );
}
