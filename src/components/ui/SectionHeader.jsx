/* ============================================================
   SectionHeader — Reusable section title + heading block
   ============================================================ */
import styles from "./SectionHeader.module.css";

export default function SectionHeader({
  label,
  heading,
  centered = true,
  light = false,
}) {
  return (
    <div
      className={`${styles.wrapper} ${centered ? styles.centered : ""} ${light ? styles.light : ""}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.heading}>{heading}</h2>
    </div>
  );
}
