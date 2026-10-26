import type { CSSProperties } from "react";
import { horseFrames } from "./ascii-horse-frames";
import styles from "./ascii-horse.module.css";

const frames = horseFrames;

export function AsciiHorse() {
  return (
    <figure
      className={styles.horse}
      role="img"
      aria-label="Animated ASCII horse galloping"
    >
      <div className={styles.stage} aria-hidden="true">
        {frames.map((frame, index) => (
          <pre
            className={styles.frame}
            key={index}
            style={{ "--frame-index": index } as CSSProperties}
          >
            {frame}
          </pre>
        ))}
      </div>
    </figure>
  );
}
