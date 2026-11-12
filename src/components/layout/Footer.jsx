/* ============================================================
   Footer — Dark footer with logo, description, nav, services,
   social links, copyright, and language switcher.
   ============================================================ */
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Footer.module.css";

/* Try importing white logo */
let logoWhiteSrc = null;
try {
  logoWhiteSrc = new URL("../../assets/logo.png", import.meta.url).href;
} catch {
  /* logo not available yet */
}

/* Navigation links (same anchors as header) */
const NAV_LINKS = [
  { key: "home", href: "#hero" },
  { key: "services", href: "#services" },
  { key: "expertise", href: "#expertise" },
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

/* Service keys for the services column */
const SERVICE_KEYS = ["dev", "it", "backup"];

/* Social media links (placeholders) */
const SOCIALS = [
  { key: "linkedin", href: "#", icon: "linkedin" },
  { key: "facebook", href: "#", icon: "facebook" },
  { key: "instagram", href: "#", icon: "instagram" },
  { key: "x", href: "#", icon: "x" },
];

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* ── Top grid ────────────────────────────────── */}
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <a href="#hero" className={styles.logo} aria-label="Digital Bang">
              {logoWhiteSrc ? (
                <img
                  src={logoWhiteSrc}
                  alt="Digital Bang"
                  className={styles.logoImg}
                />
              ) : (
                <span className={styles.logoText}>
                  Digital<span className={styles.logoAccent}>Bang</span>
                </span>
              )}
            </a>
            <p className={styles.description}>{t("footer.description")}</p>
          </div>

          {/* Navigation column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t("footer.navTitle")}</h4>
            <ul className={styles.linkList}>
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className={styles.link}>
                    {t(`header.nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t("footer.servicesTitle")}</h4>
            <ul className={styles.linkList}>
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <a href="#services" className={styles.link}>
                    {t(`services.items.${key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t("footer.socialTitle")}</h4>
            <ul className={styles.socialList}>
              {SOCIALS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(`footer.social.${key}`)}
                  >
                    {t(`footer.social.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────── */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t("footer.copyright", { year: currentYear })}
          </p>
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  );
}
