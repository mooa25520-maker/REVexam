/* ============================================================
   Header — Sticky header with navigation
   - Logo, nav links (smooth-scroll anchors), language switcher, CTA
   - Burger menu under 1020px
   - Background changes on scroll
   ============================================================ */
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useScrolled from "../../hooks/useScrolled";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "../ui/Button";
import styles from "./Header.module.css";
import useHeaderBehavior from "../../hooks/useHeaderBehavior";
import useScrollProgress from "../../hooks/useScrollProgress";
/* Try importing logos — they may not exist yet */
let logoSrc = null;
try {
  logoSrc = new URL("../../assets/logo.png", import.meta.url).href;
} catch {
  /* logo not available yet */
}

/* Navigation anchor IDs */
const NAV_ITEMS = [
  { key: "home", href: "#hero" },
  { key: "services", href: "#services" },
  { key: "expertise", href: "#expertise" },
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

export default function Header() {
  const { t } = useTranslation();
  const { visible, scrolled } = useHeaderBehavior();
  const progress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);

  /* Close menu on resize past breakpoint */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1020) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback(
    (e) => {
      /* Let the browser handle the anchor scroll, just close the menu */
      closeMenu();
    },
    [closeMenu],
  );

  return (
    <>
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <header
        id="header"
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={`container ${styles.inner}`}>
          {/* ── Logo ────────────────────────────────────── */}
          <a
            href="#hero"
            className={styles.logo}
            aria-label="Digital Bang — Accueil"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Digital Bang"
                className={styles.logoImg}
              />
            ) : (
              <span className={styles.logoText}>
                Digital<span className={styles.logoAccent}>Bang</span>
              </span>
            )}
          </a>

          {/* ── Desktop nav ─────────────────────────────── */}
          <nav className={styles.desktopNav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className={styles.navLink}>
                    {t(`header.nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop actions ─────────────────────────── */}
          <div className={styles.desktopActions}>
            <LanguageSwitcher />
            <Button href="#contact" variant="primary">
              {t("header.cta")}
            </Button>
          </div>

          {/* ── Burger button ───────────────────────────── */}
          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("header.menuClose") : t("header.menuOpen")}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>

          {/* ── Mobile overlay ──────────────────────────── */}
          {menuOpen && (
            <div
              className={styles.overlay}
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          {/* ── Mobile menu ─────────────────────────────── */}
          <nav
            id="mobile-menu"
            className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
            aria-label="Navigation mobile"
          >
            <ul className={styles.mobileList}>
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={styles.mobileLink}
                    onClick={handleNavClick}
                  >
                    {t(`header.nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.mobileActions}>
              <LanguageSwitcher />
              <Button href="#contact" variant="primary" onClick={closeMenu}>
                {t("header.cta")}
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
