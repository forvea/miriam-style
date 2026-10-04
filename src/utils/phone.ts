// Telefono: prefisso +39 fisso, l'utente digita solo il numero (backend.md §3).
// MOTIVO: il Backend non valida il formato e oltre 50 caratteri risponde con un
// falso "orario non disponibile". La validazione è nostra.

export const PHONE_PREFIX = '+39'
const PHONE_DIGITS = /^\d{9,11}$/

export function cleanPhoneDigits(input: string): string {
  return input.replace(/[\s.-]/g, '')
}

export function phoneError(input: string): string | null {
  const digits = cleanPhoneDigits(input)
  if (digits.length === 0) return 'Inserisci il numero di telefono.'
  if (!PHONE_DIGITS.test(digits)) return 'Il numero deve avere da 9 a 11 cifre, senza prefisso.'
  return null
}

export function fullPhone(input: string): string {
  return `${PHONE_PREFIX}${cleanPhoneDigits(input)}`
}
