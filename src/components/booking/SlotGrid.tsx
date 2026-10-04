import type { ApiSlot } from '@/types'

interface SlotGridProps {
  dateLabel: string
  slots: ApiSlot[]
  selectedTime: string | null
  onSelect: (time: string) => void
}

/** Orari come stringhe, mostrati così come arrivano (backend.md §6) */
export function SlotGrid({ dateLabel, slots, selectedTime, onSelect }: SlotGridProps): React.JSX.Element {
  const anyFree = slots.some((s) => s.available)
  return (
    <fieldset>
      <legend className="font-semibold first-letter:uppercase">{dateLabel}</legend>
      {!anyFree && <p className="mt-2 text-ink-muted">Tutti gli orari di questo giorno sono già occupati.</p>}
      <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => (
          <li key={slot.time}>
            <button
              type="button"
              disabled={!slot.available}
              aria-pressed={slot.time === selectedTime}
              aria-label={`${slot.time}${slot.available ? '' : ', occupato'}`}
              onClick={() => onSelect(slot.time)}
              className={`min-h-11 w-full rounded-md border text-base tabular-nums transition-colors duration-150 disabled:cursor-not-allowed disabled:border-line disabled:text-ink-muted disabled:line-through ${
                slot.time === selectedTime ? 'border-ink bg-ink font-semibold text-bg' : 'border-accent hover:bg-accent-light'
              }`}
            >
              {slot.time}
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
