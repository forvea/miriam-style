import { Star } from 'lucide-react'
import { PlaceholderBadge } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

/**
 * Segnale di fiducia in prima schermata (template-landing §4): nessuna
 * valutazione pubblica né anni del salone → la testimonianza più breve.
 */
interface HeroTrustProps {
  className?: string
}

export function HeroTrust({ className = '' }: HeroTrustProps): React.JSX.Element | null {
  const testimonials = TEMPLATE_CONFIG.testimonials ?? []
  if (testimonials.length === 0) return null
  const shortest = [...testimonials].sort((a, b) => a.text.length - b.text.length)[0]
  return (
    <figure className={`border-l-2 border-accent pl-4 ${className}`}>
      {/* Stelle solo con una valutazione reale: mai dedotte dal testo */}
      {shortest.rating && (
        <div className="mb-1 flex gap-1 text-accent" role="img" aria-label={`${shortest.rating} stelle su 5`}>
          {Array.from({ length: shortest.rating }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden="true" />)}
        </div>
      )}
      <blockquote className="font-display text-lg italic">“{shortest.text}”</blockquote>
      <figcaption className="mt-1 text-sm text-ink-muted">{shortest.name}, cliente del salone</figcaption>
      <PlaceholderBadge />
    </figure>
  )
}
