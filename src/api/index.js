import i18n from '../i18n'
import apiClient from '../lib/apiClient'

/** Returns a function that fetches a locale-scoped endpoint. */
const localeGet =
  (endpoint) =>
  (locale = i18n.language) =>
    apiClient.get(
      `/${locale}/${endpoint}`,
    )

/**
 * Fetches benefits for a given locale.
 * @param {'en'|'ru'} locale
 * @example
 * getBenefits()        // → GET /en/benefits
 * getBenefits('ru')    // → GET /ru/benefits
 */
export const getBenefits =
  localeGet('benefits')
export const getMultiply =
  localeGet('multiply')
export const getTasks =
  localeGet('tasks')

/**
 * Submits the contact / callback form.
 * @param {{ name?: string, contact: string, method: 'telegram'|'whatsapp'|'email' }} payload
 * @example
 * submitContactForm({ contact: '@username', method: 'telegram' })
 * submitContactForm({ name: 'Alex', contact: 'alex@mail.com', method: 'email' })
 */
export const submitContactForm = (
  payload,
) => apiClient.post('/form', payload)
