/* ============================================================
   WhyUs — Four value-proposition cards
   ============================================================ */
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import styles from "./WhyUs.module.css";

const ITEMS = ["skills", "approach", "transparency", "reactivity"];

/* Icons per item */
const ICONS = {
  skills: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  approach: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  transparency: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  reactivity: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="why-us" className={styles.section}>
      <div className="container">
        <SectionHeader label={t("whyUs.title")} heading={t("whyUs.title")} />

        <div className={styles.grid}>
          {ITEMS.map((key, index) => (
            <article key={key} className={styles.card}>
              <div className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className={styles.iconWrap}>{ICONS[key]}</div>
              <h3 className={styles.cardTitle}>
                {t(`whyUs.items.${key}.title`)}
              </h3>
              <p className={styles.cardDesc}>
                {t(`whyUs.items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
