import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { telHref } from '@/utils'

// [TOKEN] unica sezione con l'accento pieno (template-landing §3).
// MOTIVO: qui il pulsante principale è invertito (--bg su --accent), perché il
// fondo è già l'accento.
export function CtaFinalSection(): React.JSX.Element {
  const { ctaFinal, business } = TEMPLATE_CONFIG
  return (
    <section aria-labelledby="titolo-cta" className="bg-accent text-accent-contrast">
      <div className="container-site flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-prose">
          <h2 id="titolo-cta" className="text-2xl text-accent-contrast md:text-3xl">{ctaFinal.title}</h2>
          <p className="mt-3 text-lg">{ctaFinal.subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <a
            href="/prenota"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-bg px-6 py-3 font-semibold text-accent-dark transition-colors duration-150 hover:bg-accent-light focus-visible:outline-bg"
          >
            {ctaFinal.ctaLabel}
          </a>
          {ctaFinal.ctaSecondaryLabel && (
            <a
              href={telHref(business.phone)}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-accent-contrast px-6 py-3 font-semibold transition-colors duration-150 hover:bg-accent-dark focus-visible:outline-bg"
            >
              {ctaFinal.ctaSecondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
