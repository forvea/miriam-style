import type { ReactNode } from 'react'

interface MirrorFrameProps {
  children: ReactNode
  className?: string
}

/**
 * Cornice a forma di specchio: una sagoma chiara esterna (il vetro satinato
 * degli specchi del salone) e il contenuto ritagliato dentro.
 */
export function MirrorFrame({ children, className = '' }: MirrorFrameProps): React.JSX.Element {
  return (
    <div className={`shape-mirror bg-accent-light p-2 ${className}`}>
      <div className="shape-mirror size-full overflow-hidden bg-surface">{children}</div>
    </div>
  )
}
