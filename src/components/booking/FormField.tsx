import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

/** Etichetta sempre visibile sopra il campo, errore in testo collegato (design-system §8) */
export function FormField({ id, label, hint, error, children }: FormFieldProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {hint && <p id={`${id}-hint`} className="text-sm text-ink-muted">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-error">{error}</p>}
    </div>
  )
}

/** aria-describedby coerente con FormField */
export function describedBy(id: string, hint: boolean, error: boolean): string | undefined {
  const ids = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean)
  return ids.length > 0 ? ids.join(' ') : undefined
}
