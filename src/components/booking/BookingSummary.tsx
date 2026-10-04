import type { ApiService, ApiStaff } from '@/types'
import { formatDateLong, formatDuration, formatPrice } from '@/utils'

interface BookingSummaryProps {
  service: ApiService
  staff: ApiStaff | null
  date: string
  time: string
}

/** Riepilogo sopra il modulo: chi prenota vede cosa sta confermando */
export function BookingSummary({ service, staff, date, time }: BookingSummaryProps): React.JSX.Element {
  const rows: Array<[string, string]> = [
    ['Servizio', service.name],
    ['Operatrice', staff?.name ?? 'Prima disponibile'],
    ['Quando', `${formatDateLong(date)}, ore ${time}`],
    ['Durata', formatDuration(service.durationMin)],
  ]
  if (service.price !== null) rows.push(['Prezzo', formatPrice(service.price)])
  return (
    <dl className="grid grid-cols-3 gap-x-4 gap-y-2 rounded-lg bg-surface p-4">
      {rows.map(([label, value]) => (
        <div key={label} className="col-span-3 grid grid-cols-subgrid">
          <dt className="text-ink-muted">{label}</dt>
          <dd className="col-span-2 font-semibold first-letter:uppercase">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
