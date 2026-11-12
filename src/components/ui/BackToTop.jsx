/* ============================================================
   BackToTop — Floating button that appears after scrolling.
   Smoothly scrolls the user back to the top of the page.
   ============================================================ */
import { useTranslation } from "react-i18next";
import useScrolled from "../../hooks/useScrolled";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const { t } = useTranslation();
  const visible = useScrolled(400);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      id="back-to-top"
      className={`${styles.btn} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label={t("backToTop")}
      title={t("backToTop")}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 16V4M4 10l6-6 6 6" />
      </svg>
    </button>
  );
}
