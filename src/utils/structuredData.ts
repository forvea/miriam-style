// [SEO] Dati strutturati generati dalla stessa fonte delle sezioni visibili
// (seo.md §6): le domande nei dati coincidono parola per parola con la pagina.
import type { BookingTemplateConfig, OpeningHoursConfig } from '@/types'

type JsonLd = Record<string, unknown>

function absoluteUrl(c: BookingTemplateConfig, path: string): string {
  return `${c.business.newUrl}${path}`
}

function address(c: BookingTemplateConfig): JsonLd {
  const b = c.business
  return {
    '@type': 'PostalAddress', streetAddress: b.street, addressLocality: b.city,
    addressRegion: b.province, postalCode: b.cap, addressCountry: 'IT',
  }
}

function business(c: BookingTemplateConfig, hours: OpeningHoursConfig[], areas: string[]): JsonLd {
  const b = c.business
  return {
    '@context': 'https://schema.org', '@type': c.seo.schemaType, '@id': absoluteUrl(c, '/#attivita'),
    name: b.name, description: c.hero.description, url: absoluteUrl(c, '/'),
    telephone: b.phone, email: b.email, inLanguage: 'it', priceRange: b.priceRange,
    image: absoluteUrl(c, c.seo.ogImage), address: address(c),
    geo: c.seo.coordinates && { '@type': 'GeoCoordinates', latitude: c.seo.coordinates.lat, longitude: c.seo.coordinates.lng },
    areaServed: areas.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
    })),
  }
}

function organization(c: BookingTemplateConfig): JsonLd {
  const sameAs = Object.values(c.business.social).filter(Boolean)
  return {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': absoluteUrl(c, '/#marchio'),
    name: c.business.name, url: absoluteUrl(c, '/'),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

function services(c: BookingTemplateConfig): JsonLd[] {
  return c.services.map((s) => ({
    '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.category,
    description: s.description, provider: { '@id': absoluteUrl(c, '/#attivita') },
    areaServed: c.business.city,
    offers: { '@type': 'Offer', price: s.price.toFixed(2), priceCurrency: 'EUR' },
  }))
}

function people(c: BookingTemplateConfig): JsonLd[] {
  return c.team.map((m) => ({
    '@context': 'https://schema.org', '@type': 'Person', name: m.name, jobTitle: m.role,
    knowsAbout: m.specialization, worksFor: { '@id': absoluteUrl(c, '/#attivita') },
  }))
}

function faq(c: BookingTemplateConfig): JsonLd {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function buildStructuredData(
  c: BookingTemplateConfig, hours: OpeningHoursConfig[], areas: string[],
): JsonLd[] {
  return [business(c, hours, areas), organization(c), ...services(c), ...people(c), faq(c)]
}
