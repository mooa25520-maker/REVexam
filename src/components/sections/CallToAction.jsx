/* ============================================================
   CallToAction — Full-width magenta CTA band
   ============================================================ */
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import styles from "./CallToAction.module.css";

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section id="cta" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>{t("cta.heading")}</h2>
        <p className={styles.subheading}>{t("cta.subheading")}</p>
        <Button href="#contact" variant="primary" className={styles.btn}>
          {t("cta.button")}
        </Button>
      </div>
    </section>
  );
}
