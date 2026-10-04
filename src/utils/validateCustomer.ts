import { phoneError } from './phone'

export interface CustomerInput {
  name: string
  phone: string
  email: string
  notes: string
  consent: boolean
}

export type CustomerErrors = Partial<Record<keyof CustomerInput, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const NAME_MAX_LENGTH = 255

/** Validazione prima dell'invio: mai un invio al buio (stack.md §7) */
export function validateCustomer(input: CustomerInput): CustomerErrors {
  const errors: CustomerErrors = {}
  const name = input.name.trim()
  if (name.length < 2) errors.name = 'Inserisci nome e cognome.'
  else if (name.length > NAME_MAX_LENGTH) errors.name = 'Il nome è troppo lungo.'
  const phone = phoneError(input.phone)
  if (phone) errors.phone = phone
  if (!EMAIL_PATTERN.test(input.email.trim())) errors.email = 'Inserisci un indirizzo email valido, ad esempio nome@esempio.it.'
  if (!input.consent) errors.consent = 'Per prenotare serve il consenso al trattamento dei dati.'
  return errors
}
