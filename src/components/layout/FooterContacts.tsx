import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { telHref } from '@/utils'

/** [SEO] nome, indirizzo e telefono in testo puro, identici ovunque (seo.md §7) */
export function FooterContacts(): React.JSX.Element {
  const { business, legal } = TEMPLATE_CONFIG
  return (
    <address className="flex flex-col gap-1 not-italic">
      <span className="font-display text-xl">{business.name}</span>
      <span>{business.street}, {business.cap} {business.city} ({business.province})</span>
      <a className="underline-offset-4 hover:underline" href={telHref(business.phone)}>{business.phone}</a>
      <a className="underline-offset-4 hover:underline" href={`mailto:${business.email}`}>{business.email}</a>
      <span className="mt-2 text-xs">{legal.companyName} — P.IVA {legal.vatNumber}</span>
    </address>
  )
}
