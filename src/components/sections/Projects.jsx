/* ============================================================
   Projects — Portfolio showcase cards
   ============================================================ */
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import projects from "../../data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <SectionHeader
          label={t("projects.title")}
          heading={t("projects.heading")}
        />

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              {/* Image area */}
              <div className={styles.imageWrap}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={lang === "fr" ? project.titleFr : project.titleEn}
                    className={styles.image}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.3"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className={styles.info}>
                <h3 className={styles.projectTitle}>
                  {lang === "fr" ? project.titleFr : project.titleEn}
                </h3>
                <p className={styles.projectDesc}>
                  {lang === "fr"
                    ? project.descriptionFr
                    : project.descriptionEn}
                </p>

                {project.tags.length > 0 && (
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <a href={project.link} className={styles.viewLink}>
                  {t("projects.viewProject")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
