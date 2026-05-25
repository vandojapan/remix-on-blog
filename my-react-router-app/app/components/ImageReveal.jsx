import { useState } from "react";

import styles from "./ImageReveal.module.css";

export function ImageReveal({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.frame} ${className}`} data-loaded={loaded ? "true" : "false"}>
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} />
    </div>
  );
}
