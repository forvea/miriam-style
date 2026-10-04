import { ArrowRight, Clock } from 'lucide-react'
import type { SupportedIcon } from '@/types'
import { Icon } from './Icon'

interface ServiceCardProps {
  name: string
  description?: string
  price: string
  duration?: string
  iconName: SupportedIcon
  bookingHref: string
  bookingLabel: string
}

/** Tutta la scheda è cliccabile e porta alla prenotazione con il servizio scelto */
export function ServiceCard({
  name, description, price, duration, iconName, bookingHref, bookingLabel,
}: ServiceCardProps): React.JSX.Element {
  return (
    <a
      href={bookingHref}
      aria-label={bookingLabel}
      className="group flex h-full flex-col rounded-lg border border-line bg-bg p-6 transition-colors duration-150 hover:border-accent hover:bg-surface"
    >
      <div className="flex items-start justify-between gap-4">
        <Icon name={iconName} className="size-8 text-accent-dark" />
        <span className="font-display text-2xl text-ink">{price}</span>
      </div>
      <h3 className="mt-4 text-xl">{name}</h3>
      {description && <p className="mt-2 line-clamp-2 text-ink-muted">{description}</p>}
      <div className="mt-6 flex items-center justify-between gap-4 text-sm">
        {duration && (
          <span className="inline-flex items-center gap-1 text-ink-muted">
            <Clock className="size-4" aria-hidden="true" />{duration}
          </span>
        )}
        <span className="inline-flex items-center gap-1 font-semibold text-accent-dark">
          Prenota <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}
