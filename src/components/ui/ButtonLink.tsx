import type { ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  ariaLabel?: string
  external?: boolean
  className?: string
}

export function ButtonLink({
  href, children, variant = 'primary', ariaLabel, external = false, className = '',
}: ButtonLinkProps): React.JSX.Element {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
