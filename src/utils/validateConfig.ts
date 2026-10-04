import type { BookingTemplateConfig } from '@/types'

// I controlli che i tipi non esprimono (interfacce.md §6).
// Eseguiti nel prerender: un controllo non superato blocca la build.

const ID_PATTERN = /^[a-z0-9-]+$/
const PLACEHOLDER_PATTERN = /lorem|ipsum|todo|xxx|\[da completare|inserire qui/i
const TESTIMONIAL_DATE = /^\d{4}-(0[1-9]|1[0-2])$/

function checkCounts(c: BookingTemplateConfig): string[] {
  const errors: string[] = []
  if (c.features.length < 3) errors.push('features: almeno 3')
  if (c.services.length < 3) errors.push('services: almeno 3')
  if (c.faq.length < 5) errors.push('faq: almeno 5')
  if (c.team.length < 1) errors.push('team: almeno un operatore')
  return errors
}

function checkSeo(c: BookingTemplateConfig): string[] {
  const errors: string[] = []
  const descLength = c.seo.description.length
  if (c.seo.title.length > 60) errors.push(`seo.title: ${c.seo.title.length} caratteri, massimo 60`)
  if (descLength < 150 || descLength > 160) errors.push(`seo.description: ${descLength} caratteri, servono 150–160`)
  if (c.hero.showWhatsappCta && !c.business.whatsapp) errors.push('hero.showWhatsappCta senza business.whatsapp')
  return errors
}

function checkTestimonials(c: BookingTemplateConfig): string[] {
  return (c.testimonials ?? []).flatMap((t) => {
    const errors: string[] = []
    if (t.name.trim().split(/\s+/).length < 2) errors.push(`testimonianza "${t.name}": servono nome e cognome`)
    if (t.date && !TESTIMONIAL_DATE.test(t.date)) errors.push(`testimonianza "${t.name}": data non AAAA-MM`)
    return errors
  })
}

function checkIds(c: BookingTemplateConfig): string[] {
  const ids = [...c.services.map((s) => s.id), ...c.team.map((m) => m.id)]
  const errors = ids.filter((id) => !ID_PATTERN.test(id)).map((id) => `identificativo non valido: "${id}"`)
  if (new Set(ids).size !== ids.length) errors.push('identificativi duplicati')
  const noDuration = c.services.filter((s) => !s.durationMin || s.durationMin <= 0)
  return [...errors, ...noDuration.map((s) => `servizio "${s.name}": durata mancante`)]
}

function checkPlaceholders(c: BookingTemplateConfig): string[] {
  const serialized = JSON.stringify(c)
  return PLACEHOLDER_PATTERN.test(serialized) ? ['la configurazione contiene testo segnaposto'] : []
}

export function validateConfig(c: BookingTemplateConfig): string[] {
  return [
    ...checkCounts(c),
    ...checkSeo(c),
    ...checkTestimonials(c),
    ...checkIds(c),
    ...checkPlaceholders(c),
  ]
}
