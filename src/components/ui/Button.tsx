import { LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
  className?: string
}

/** Stato "in caricamento" obbligatorio: senza, un doppio clic diventa una doppia azione */
export function Button({
  children, onClick, type = 'button', variant = 'primary', disabled = false,
  loading = false, loadingLabel, className = '',
}: ButtonProps): React.JSX.Element {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`${base} ${className}`}
    >
      {loading && <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  )
}
