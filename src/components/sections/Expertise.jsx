/* ============================================================
   Expertise — Tech stack categories displayed as cards with
   icon + title. Items are placeholder text for now.
   ============================================================ */
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import expertise from "../../data/expertise";
import styles from "./Expertise.module.css";

/* Simple SVG icons */
const ICONS = {
  layout: (
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  terminal: (
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
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  smartphone: (
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
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  database: (
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "pen-tool": (
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
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
};

export default function Expertise() {
  const { t } = useTranslation();

  return (
    <section id="expertise" className={styles.section}>
      <div className="container">
        <SectionHeader
          label={t("expertise.title")}
          heading={t("expertise.heading")}
        />

        <div className={styles.grid}>
          {expertise.map(({ id, icon }) => (
            <div key={id} className={styles.card}>
              <div className={styles.iconWrap}>{ICONS[icon] || null}</div>
              <h3 className={styles.cardTitle}>
                {t(`expertise.categories.${id}.title`)}
              </h3>
              <p className={styles.cardItems}>
                {t(`expertise.categories.${id}.items`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
