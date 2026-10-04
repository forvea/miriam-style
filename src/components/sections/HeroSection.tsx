import { MessageCircle } from 'lucide-react'
import { ButtonLink, MirrorFrame } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { telHref, whatsappHref } from '@/utils'
import { HeroTrust } from './HeroTrust'

const HERO_WIDTH = 765
const HERO_HEIGHT = 1020

export function HeroSection(): React.JSX.Element {
  // [EDIT] prima schermata
  const { hero, business, assets } = TEMPLATE_CONFIG
  return (
    <section aria-labelledby="titolo-principale" className="bg-bg">
      <div className="container-site grid items-center gap-8 py-6 md:grid-cols-12 md:py-16">
        {/* MOTIVO: su mobile l'ordine è azione principale → fiducia → contatti, perché
            titolo, azione e fiducia stiano nei primi 550 px (seo.md §10).
            Da sm in su torna l'ordine del documento. */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {hero.badge && <p className="eyebrow hidden sm:block">{hero.badge}</p>}
          {/* [SEO] unico h1: servizio + città + nome dell'attività */}
          <h1 id="titolo-principale" className="text-2xl sm:text-3xl lg:text-4xl">
            {hero.titleStandard}{' '}
            <span className="block text-accent-dark italic">{hero.titleAccented}</span>
          </h1>
          <p className="max-w-prose text-base text-ink-muted md:text-lg">{hero.description}</p>
          <div className="contents sm:mt-2 sm:flex sm:gap-3">
            <ButtonLink href="/prenota" className="order-1 sm:order-none">
              {hero.ctaPrimary}
            </ButtonLink>
            {hero.showWhatsappCta && business.whatsapp && (
              <ButtonLink href={whatsappHref(business.whatsapp)} className="order-3 sm:order-none" variant="secondary" external>
                <MessageCircle className="size-5" aria-hidden="true" />
                {hero.ctaSecondary}
              </ButtonLink>
            )}
          </div>
          {hero.showPhoneCta && (
            <p className="order-4 text-sm text-ink-muted sm:order-none">
              Preferisci telefonare? <a className="link-text" href={telHref(business.phone)}>{business.phone}</a>
            </p>
          )}
          <HeroTrust className="order-2 sm:order-none sm:mt-2" />
        </div>
        {assets.heroImage && (
          <div className="md:col-span-5">
            <MirrorFrame className="mx-auto aspect-3/4 w-full max-w-sm">
              {/* [SEO] immagine principale: caricata subito, con dimensioni dichiarate */}
              <img
                src={assets.heroImage}
                width={HERO_WIDTH}
                height={HERO_HEIGHT}
                fetchPriority="high"
                className="size-full object-cover"
                alt={`Piega mossa su capelli castano dorati, davanti a uno specchio a punta del salone ${business.name} a ${business.city}`}
              />
            </MirrorFrame>
          </div>
        )}
      </div>
    </section>
  )
}
