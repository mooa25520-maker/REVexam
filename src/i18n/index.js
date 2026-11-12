/* ============================================================
   i18n configuration — Digital Bang
   French is the default and fallback language.
   Language detection is disabled; we always start in French.
   The selected language is stored in localStorage.
   ============================================================ */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import en from './locales/en.json';

/* Retrieve saved language or default to French */
const savedLanguage = localStorage.getItem('i18nextLng') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: savedLanguage,       // Always start with saved or French
    fallbackLng: 'fr',        // Fallback to French
    interpolation: {
      escapeValue: false,      // React already escapes
    },
    react: {
      useSuspense: false,      // Avoid flash during init
    },
  });

/* Keep <html lang> in sync and persist choice */
const updateDocLang = (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('i18nextLng', lng);
};

/* Set initial lang attribute */
updateDocLang(i18n.language);

/* Listen for future changes */
i18n.on('languageChanged', updateDocLang);

export default i18n;
