import { Icon, Reveal, SectionHeading } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

const MAX_FEATURES = 3

export function FeaturesSection(): React.JSX.Element {
  // [EDIT] punti di forza: si rendono i primi tre
  const features = TEMPLATE_CONFIG.features.slice(0, MAX_FEATURES)
  return (
    <section aria-labelledby="perche" className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading
          id="perche"
          eyebrow="Perché sceglierci"
          title={`Cosa trovi da ${TEMPLATE_CONFIG.business.name}?`}
        />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={i * 0.08} className="h-full rounded-lg border border-line bg-bg p-6">
                <Icon name={f.iconName} className="size-8 text-accent-dark" />
                <h3 className="mt-4 text-xl">{f.title}</h3>
                <p className="mt-2 text-ink-muted">{f.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
