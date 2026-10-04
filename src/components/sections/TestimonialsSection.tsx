import { Quote } from 'lucide-react'
import { PlaceholderBadge, Reveal, SectionHeading } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

const MAX_TESTIMONIALS = 3

export function TestimonialsSection(): React.JSX.Element | null {
  // [EDIT] solo testimonianze presenti in configurazione; nessuna → nessuna sezione
  const items = (TEMPLATE_CONFIG.testimonials ?? []).slice(0, MAX_TESTIMONIALS)
  if (items.length === 0) return null
  return (
    // [TOKEN] --accent molto trasparente (template-landing §3)
    <section aria-labelledby="recensioni" className="section-y bg-accent/8">
      <div className="container-site">
        <SectionHeading id="recensioni" eyebrow="Recensioni" title="Cosa dicono le clienti?" />
        <PlaceholderBadge />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="flex h-full flex-col rounded-lg bg-bg p-6">
                  <Quote className="size-6 text-accent" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-lg">{t.text}</blockquote>
                  <figcaption className="mt-4 font-semibold">{t.name}</figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
