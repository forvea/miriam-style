interface SkeletonProps {
  className?: string
}

/** Sagoma del contenuto in arrivo, al posto di una rotellina (template-prenotazione §3) */
export function Skeleton({ className = '' }: SkeletonProps): React.JSX.Element {
  return <div className={`animate-pulse rounded-md bg-surface-2 motion-reduce:animate-none ${className}`} aria-hidden="true" />
}
