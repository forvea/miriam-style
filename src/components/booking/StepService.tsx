import type { ApiService } from '@/types'
import { formatDuration, formatPrice } from '@/utils'
import { OptionCard } from './OptionCard'

interface StepServiceProps {
  services: ApiService[]
  selectedId: string | null
  onChoose: (service: ApiService) => void
}

/** Passo 1: i servizi arrivano dal Backend, con i loro prezzi attuali */
export function StepService({ services, selectedId, onChoose }: StepServiceProps): React.JSX.Element {
  return (
    <fieldset>
      <legend className="font-display text-xl">Quale servizio vuoi prenotare?</legend>
      <ul className="mt-4 grid gap-3">
        {services.map((s) => (
          <li key={s.id}>
            <OptionCard selected={s.id === selectedId} onSelect={() => onChoose(s)}>
              <span className="flex-1">
                <span className="block font-semibold">{s.name}</span>
                {s.description && <span className="block text-sm text-ink-muted">{s.description}</span>}
              </span>
              <span className="text-right">
                {s.price !== null && <span className="block font-semibold">{formatPrice(s.price)}</span>}
                <span className="block text-sm text-ink-muted">{formatDuration(s.durationMin)}</span>
              </span>
            </OptionCard>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
