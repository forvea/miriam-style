import { Reveal, SectionHeading, ServiceCard } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { formatDuration, formatPrice } from '@/utils'

export function ServicesSection(): React.JSX.Element {
  // [EDIT] listino: fotografia per i motori di ricerca; nel widget fa fede il Backend
  const { services, business } = TEMPLATE_CONFIG
  return (
    <section id="servizi" aria-labelledby="titolo-servizi" className="section-y bg-bg">
      <div className="container-site">
        <SectionHeading
          id="titolo-servizi"
          eyebrow="Servizi e prezzi"
          title={`Quanto costano taglio, colore e piega a ${business.city}?`}
          intro="Per ogni servizio trovi prezzo e durata. Scegli quello che ti serve e prenota direttamente l’orario."
        />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <ServiceCard
                  name={s.name}
                  description={s.description}
                  price={formatPrice(s.price)}
                  duration={s.durationMin ? formatDuration(s.durationMin) : undefined}
                  iconName={s.iconName}
                  bookingHref={`/prenota?service=${encodeURIComponent(s.name)}`}
                  bookingLabel={`Prenota ${s.name}, ${formatPrice(s.price)}`}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
