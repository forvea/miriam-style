import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import type { ApiBooking } from '@/types'
import { formatDateLong, formatDuration, formatPrice, telHref } from '@/utils'

interface ConfirmedDetailsProps {
  booking: ApiBooking
  price: number | null
}

/** Riepilogo completo: se l'email non arriva, è l'unica cosa che chi prenota ha visto */
export function ConfirmedDetails({ booking, price }: ConfirmedDetailsProps): React.JSX.Element {
  const { business } = TEMPLATE_CONFIG
  const rows: Array<[string, string]> = [
    ['Servizio', booking.service.name],
    ['Operatrice', booking.staff?.name ?? 'Assegnata dal salone'],
    ['Data', formatDateLong(booking.date)],
    ['Ora', booking.time],
    ['Durata', formatDuration(booking.durationMin)],
  ]
  if (price !== null) rows.push(['Prezzo', formatPrice(price)])
  rows.push(['A nome di', booking.customer.name])
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <dl className="grid gap-2 rounded-lg bg-surface p-6">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
            <dt className="text-ink-muted">{label}</dt>
            <dd className="text-right font-semibold first-letter:uppercase">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="rounded-lg border border-line p-6">
        <h2 className="font-display text-xl">Dove ti aspettiamo</h2>
        {/* [SEO] NAP identico al resto del sito */}
        <address className="mt-2 flex flex-col gap-1 not-italic">
          <span className="font-semibold">{business.name}</span>
          <span>{business.street}, {business.cap} {business.city} ({business.province})</span>
          <a className="link-text" href={telHref(business.phone)}>{business.phone}</a>
        </address>
      </div>
    </div>
  )
}
