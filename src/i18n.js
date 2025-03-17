import { createI18n } from 'vue-i18n';
import translations from './locales.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en', // Default language
  fallbackLocale: 'en',
  messages: translations
});

export default i18n;
