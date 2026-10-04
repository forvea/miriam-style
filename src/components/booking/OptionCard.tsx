import type { ReactNode } from 'react'

interface OptionCardProps {
  selected: boolean
  onSelect: () => void
  children: ReactNode
}

/** Scheda selezionabile dei passi servizio e operatrice */
export function OptionCard({ selected, onSelect, children }: OptionCardProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-h-11 w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors duration-150 ${
        selected ? 'border-accent-dark bg-accent-light' : 'border-line bg-bg hover:border-accent hover:bg-surface'
      }`}
    >
      {children}
    </button>
  )
}
