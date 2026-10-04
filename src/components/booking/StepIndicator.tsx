import { Check } from 'lucide-react'
import type { BookingStep } from '@/hooks'

export const STEP_LABELS: Record<BookingStep, string> = {
  service: 'Servizio',
  staff: 'Operatrice',
  datetime: 'Data e ora',
  details: 'I tuoi dati',
}

interface StepIndicatorProps {
  steps: BookingStep[]
  current: BookingStep
  onGoBack: (step: BookingStep) => void
}

/** Sempre visibile; i passi già fatti si riaprono senza perdere le scelte */
export function StepIndicator({ steps, current, onGoBack }: StepIndicatorProps): React.JSX.Element {
  const currentIndex = steps.indexOf(current)
  return (
    <nav aria-label="Passi della prenotazione">
      <ol className="flex flex-wrap gap-2">
        {steps.map((step, i) => {
          const done = i < currentIndex
          const label = `${i + 1}. ${STEP_LABELS[step]}`
          return (
            <li key={step}>
              {done ? (
                <button type="button" onClick={() => onGoBack(step)} className="inline-flex min-h-11 items-center gap-1 rounded-full bg-accent-light px-4 text-sm font-semibold text-accent-dark">
                  <Check className="size-4" aria-hidden="true" />{label}<span className="sr-only"> (completato, modifica)</span>
                </button>
              ) : (
                <span
                  aria-current={i === currentIndex ? 'step' : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ${i === currentIndex ? 'bg-ink font-semibold text-bg' : 'border border-line text-ink-muted'}`}
                >
                  {label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
