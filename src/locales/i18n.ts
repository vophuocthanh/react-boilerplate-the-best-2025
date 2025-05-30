import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import authEN from './en/auth.json'
import commonEN from './en/common.json'
import homeEN from './en/home.json'
import { type Language } from './types'
import authVI from './vi/auth.json'
import commonVI from './vi/common.json'
import homeVI from './vi/home.json'

const resources = {
  en: {
    common: commonEN,
    auth: authEN,
    home: homeEN
  },
  vi: {
    common: commonVI,
    auth: authVI,
    home: homeVI
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: (localStorage.getItem('language') as Language) || 'en',
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
