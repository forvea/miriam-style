interface InitialsMirrorProps {
  initials: string
  small?: boolean
  className?: string
}

/** Operatrici senza foto: iniziali nella sagoma dello specchio (scheda §9) */
export function InitialsMirror({ initials, small = false, className = '' }: InitialsMirrorProps): React.JSX.Element {
  return (
    <div className={`shape-mirror flex items-end justify-center bg-accent-light ${small ? 'pb-2' : 'pb-4'} ${className}`} aria-hidden="true">
      <span className={`font-display text-accent-dark italic ${small ? 'text-lg' : 'text-2xl'}`}>{initials}</span>
    </div>
  )
}
