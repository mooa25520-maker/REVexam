/* ============================================================
   Services — Three service cards with icon, title, description
   plus a row of chip tags.
   ============================================================ */
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import services, { serviceChips } from "../../data/services";
import styles from "./Services.module.css";

/* Simple SVG icons keyed by service icon id */
const ICONS = {
  code: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  server: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="0" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <circle cx="6" cy="18" r="0" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  shield: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
};

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <SectionHeader
          label={t("services.title")}
          heading={t("services.heading")}
        />

        {/* Service cards */}
        <div className={styles.grid}>
          {services.map(({ id, icon }) => (
            <article key={id} className={styles.card}>
              <div className={styles.iconWrap}>{ICONS[icon] || null}</div>
              <h3 className={styles.cardTitle}>
                {t(`services.items.${id}.title`)}
              </h3>
              <p className={styles.cardDesc}>
                {t(`services.items.${id}.description`)}
              </p>
            </article>
          ))}
        </div>

        {/* Chip tags */}
        <div className={styles.chips}>
          {serviceChips.map((key) => (
            <span key={key} className={styles.chip}>
              {t(`services.chips.${key}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
