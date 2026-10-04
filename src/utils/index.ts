export { validateConfig } from './validateConfig'
export {
  todayInTimeZone, addDays, monthKey, addMonths, lastDayOfMonth, monthGrid,
  formatDateLong, formatMonthLabel, formatLocalDateTime,
} from './dates'
export {
  formatPrice, formatDuration, initials, normalizeName, telHref, whatsappHref, mapsDirectionsHref,
} from './format'
export { PHONE_PREFIX, cleanPhoneDigits, phoneError, fullPhone } from './phone'
export { buildStructuredData } from './structuredData'
export { validateCustomer, NAME_MAX_LENGTH } from './validateCustomer'
export type { CustomerInput, CustomerErrors } from './validateCustomer'
