/* ============================================================
   LanguageSwitcher — FR | EN toggle
   Switches language instantly, persisted via i18n config.
   ============================================================ */
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher({ variant = "default" }) {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const switchTo = (lng) => {
    if (lng !== currentLang) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div
      className={`${styles.switcher} ${variant === "footer" ? styles.footer : ""}`}
      role="radiogroup"
      aria-label={t("languageSwitcher.label")}
    >
      <button
        type="button"
        className={`${styles.btn} ${currentLang === "fr" ? styles.active : ""}`}
        onClick={() => switchTo("fr")}
        role="radio"
        aria-checked={currentLang === "fr"}
        aria-label="Français"
      >
        {t("languageSwitcher.fr")}
      </button>

      <span className={styles.divider} aria-hidden="true">
        |
      </span>

      <button
        type="button"
        className={`${styles.btn} ${currentLang === "en" ? styles.active : ""}`}
        onClick={() => switchTo("en")}
        role="radio"
        aria-checked={currentLang === "en"}
        aria-label="English"
      >
        {t("languageSwitcher.en")}
      </button>
    </div>
  );
}
