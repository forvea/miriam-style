interface ConsentFieldProps {
  checked: boolean
  error?: string
  onChange: (checked: boolean) => void
}

/** Testo informativo e collegamento: senza, la casella non è un consenso valido */
export function ConsentField({ checked, error, onChange }: ConsentFieldProps): React.JSX.Element {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id="consenso"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'consenso-error' : undefined}
          className="mt-1 size-5 shrink-0 accent-accent-dark"
        />
        <label htmlFor="consenso" className="text-sm">
          Ho letto l’
          <a href="/privacy-policy" target="_blank" rel="noopener" className="link-text">
            informativa sulla privacy<span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>{' '}
          e acconsento al trattamento dei miei dati per la gestione della prenotazione.
        </label>
      </div>
      {error && <p id="consenso-error" role="alert" className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}
