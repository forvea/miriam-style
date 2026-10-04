interface WordmarkProps {
  name: string
  className?: string
}

/**
 * Logo testuale (nessun file del logo, scheda §9). Riprende l'insegna:
 * "Miriam" in corsivo, "STYLE" in maiuscoletto con il rosso come dettaglio minimo.
 */
export function Wordmark({ name, className = '' }: WordmarkProps): React.JSX.Element {
  const [first, ...rest] = name.split(' ')
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className="font-display text-xl italic">{first}</span>
      {rest.length > 0 && (
        <span className="text-xs font-semibold tracking-widest text-detail uppercase">{rest.join(' ')}</span>
      )}
    </span>
  )
}
