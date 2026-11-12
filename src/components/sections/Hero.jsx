/* ============================================================
   Hero — Full-screen dark hero
   Split: headline (left) + product showcase (right as an image)
   ============================================================ */
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className={styles.hero}>
      {/* Background glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* ── LEFT: text ── */}
        <div className={styles.text}>
          <span className={styles.badge}>{t("hero.tagline")}</span>
          <h1 className={styles.title}>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          <div className={styles.actions}>
            <Button
              href="#contact"
              variant="primary"
              className={styles.ctaPrimary}
            >
              {t("hero.cta1")} <span aria-hidden="true">→</span>
            </Button>
            <Button
              href="#services"
              variant="outlineLight"
              className={styles.ctaSecondary}
            >
              {t("hero.cta2")}
            </Button>
          </div>
        </div>

        {/* ── RIGHT: product showcase (Image) ── */}
        <div className={styles.showcase}>
          <img 
            src="public\hero-mockup.png" 
            alt="Digital Bang Platform Mockup" 
            className={styles.mockupImage} 
          />
        </div>
      </div>
    </section>
  );
}