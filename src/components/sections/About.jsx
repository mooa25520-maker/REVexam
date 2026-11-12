/* ============================================================
   About — Company introduction section
   ============================================================ */
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import styles from "./About.module.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <SectionHeader
          label={t("about.title")}
          heading={t("about.heading")}
          centered={false}
        />

        <div className={styles.content}>
          <p className={styles.text}>{t("about.text1")}</p>
          <p className={styles.text}>{t("about.text2")}</p>
        </div>

        {/* Decorative accent bar */}
        <div className={styles.accent} aria-hidden="true" />
      </div>
    </section>
  );
}
