/* ============================================================
   Contact — Form + company info sidebar
   Uses useFormValidation hook for client-side validation.
   EmailJS integration ready (env vars needed).
   ============================================================ */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import useFormValidation from "../../hooks/useFormValidation";
import styles from "./Contact.module.css";

export default function Contact() {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    resetForm,
  } = useFormValidation();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Anti-spam honeypot */
    if (values.honeypot) return;

    if (!validate()) return;

    setStatus("sending");

    try {
      /* EmailJS integration — uncomment when env vars are set:
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          company: values.company,
          role: values.role,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      */

      /* Simulate success for now */
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
      resetForm();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field) =>
    `${styles.input} ${touched[field] && errors[field] ? styles.inputError : ""}`;

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <SectionHeader
          label={t("contact.title")}
          heading={t("contact.heading")}
        />

        <div className={styles.grid}>
          {/* ── Form ──────────────────────────────────────── */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={values.honeypot}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>
                  {t("contact.form.name")} *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("name")}
                  required
                />
                {touched.name && errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>
                  {t("contact.form.email")} *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("email")}
                  required
                />
                {touched.email && errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-company" className={styles.label}>
                  {t("contact.form.company")}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone" className={styles.label}>
                  {t("contact.form.phone")}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-subject" className={styles.label}>
                {t("contact.form.subject")}
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>
                {t("contact.form.message")} *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("message")}
                required
              />
              {touched.message && errors.message && (
                <span className={styles.error}>{errors.message}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? t("contact.form.sending")
                : t("contact.form.submit")}
            </Button>

            {status === "success" && (
              <p className={styles.statusSuccess}>{t("contact.success")}</p>
            )}
            {status === "error" && (
              <p className={styles.statusError}>{t("contact.error")}</p>
            )}
          </form>

          {/* ── Info sidebar ─────────────────────────────── */}
          <aside className={styles.info}>
            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>
                {t("contact.info.addressTitle")}
              </h4>
              <p className={styles.infoText}>{t("contact.info.address")}</p>
            </div>

            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>
                {t("contact.info.emailTitle")}
              </h4>
              <a
                href={`mailto:${t("contact.info.email")}`}
                className={styles.infoLink}
              >
                {t("contact.info.email")}
              </a>
            </div>

            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>
                {t("contact.info.phoneTitle")}
              </h4>
              <a
                href={`tel:${t("contact.info.phone").replace(/\s/g, "")}`}
                className={styles.infoLink}
              >
                {t("contact.info.phone")}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
