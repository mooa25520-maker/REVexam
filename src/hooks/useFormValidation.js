/* ============================================================
   useFormValidation — controlled contact form validation
   Rules: name ≥ 2 chars, valid email, message ≥ 10 chars.
   All error messages come from i18n translation keys.
   ============================================================ */
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = {
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',    // hidden anti-spam field
};

export default function useFormValidation() {
    const { t } = useTranslation();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    /* ── Update a field value ──────────────────────────── */
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        /* Clear error once user starts typing */
        setErrors((prev) => {
            if (prev[name]) {
                const next = { ...prev };
                delete next[name];
                return next;
            }
            return prev;
        });
    }, []);

    /* ── Mark a field as touched on blur ───────────────── */
    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    }, []);

    /* ── Validate all required fields ──────────────────── */
    const validate = useCallback(() => {
        const newErrors = {};

        /* Name */
        if (!values.name.trim()) {
            newErrors.name = t('contact.validation.nameRequired');
        } else if (values.name.trim().length < 2) {
            newErrors.name = t('contact.validation.nameMin');
        }

        /* Email */
        if (!values.email.trim()) {
            newErrors.email = t('contact.validation.emailRequired');
        } else if (!EMAIL_REGEX.test(values.email.trim())) {
            newErrors.email = t('contact.validation.emailInvalid');
        }

        /* Message */
        if (!values.message.trim()) {
            newErrors.message = t('contact.validation.messageRequired');
        } else if (values.message.trim().length < 10) {
            newErrors.message = t('contact.validation.messageMin');
        }

        setErrors(newErrors);

        /* Mark all required fields as touched */
        setTouched({ name: true, email: true, message: true });

        return Object.keys(newErrors).length === 0;
    }, [values, t]);

    /* ── Reset the form ────────────────────────────────── */
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, []);

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validate,
        resetForm,
    };
}
