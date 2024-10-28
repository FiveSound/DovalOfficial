import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import english from './english.json';
import spanish from './spanish.json';
import portuguese from './portuguese.json';
import french from './franch.json';

const deviceLanguage = Localization.getLocales()[0].languageCode;

const resources = {
  en: { translation: english },
  es: { translation: spanish },
  pt: { translation: portuguese },
  fr: { translation: french },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: deviceLanguage || 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
