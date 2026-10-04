const PRICE = new Intl.NumberFormat('it-IT', {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2,
})

export function formatPrice(euro: number): string {
  return PRICE.format(euro)
}

export function formatDuration(minutes: number): string {
  return `${minutes} min`
}

/** "Miriam Dino" → "MD"; "Giulia" → "G" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

/** Confronto esatto tra nomi di servizio (template-prenotazione §2) */
export function normalizeName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

export function mapsDirectionsHref(lat: number, lng: number): string {
  return `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}#map=17/${lat}/${lng}`
}
