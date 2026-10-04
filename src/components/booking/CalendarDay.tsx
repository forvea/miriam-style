interface CalendarDayProps {
  day: number
  label: string
  available: boolean
  loading: boolean
  selected: boolean
  onSelect: () => void
}

/** Giorno assente dalla risposta → non selezionabile, senza inventare un motivo */
export function CalendarDay({ day, label, available, loading, selected, onSelect }: CalendarDayProps): React.JSX.Element {
  const state = selected
    ? 'bg-ink font-semibold text-bg'
    : available ? 'border border-accent text-ink hover:bg-accent-light' : 'text-ink-muted line-through decoration-ink-muted'
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!available}
      aria-pressed={selected}
      aria-label={loading ? `${label}, caricamento` : `${label}${available ? '' : ', non disponibile'}`}
      className={`flex aspect-square min-h-11 items-center justify-center rounded-md text-base transition-colors duration-150 disabled:cursor-not-allowed ${loading ? 'animate-pulse text-ink-muted motion-reduce:animate-none' : state}`}
    >
      {day}
    </button>
  )
}
