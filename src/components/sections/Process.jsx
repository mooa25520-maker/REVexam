/* ============================================================
   Process — Numbered step timeline
   ============================================================ */
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import processSteps from "../../data/process";
import styles from "./Process.module.css";

export default function Process() {
  const { t } = useTranslation();

  return (
    <section id="process" className={styles.section}>
      <div className="container">
        <SectionHeader
          label={t("process.title")}
          heading={t("process.heading")}
        />

        <div className={styles.timeline}>
          {processSteps.map(({ id, step }) => (
            <div key={id} className={styles.step}>
              <div className={styles.stepNumber}>
                <span>{String(step).padStart(2, "0")}</span>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{t(`process.steps.${id}`)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
