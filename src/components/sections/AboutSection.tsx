import { MirrorFrame, Reveal } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

const PHOTO_WIDTH = 765
const PHOTO_HEIGHT = 1020

/**
 * MOTIVO: il template prevede questa sezione invertita (scura), ma la scheda
 * chiede "niente sezioni scure a tutto schermo" (luce naturale). Sul gusto
 * comanda la scheda (SKILL §3): fondo --surface-2, il crema più profondo.
 */
export function AboutSection(): React.JSX.Element {
  // [EDIT] storia e foto del salone (assets.gallery[0], vedi templateConfig)
  const { about, assets, business } = TEMPLATE_CONFIG
  const photo = assets.gallery?.[0]
  return (
    <section id="chi-siamo" aria-labelledby="titolo-chi-siamo" className="section-y bg-surface-2">
      <div className="container-site grid items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">Chi siamo</p>
          <h2 id="titolo-chi-siamo" className="mt-2 text-2xl md:text-3xl">{about.title}</h2>
          {about.text.split('\n').map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 max-w-prose text-lg">{paragraph}</p>
          ))}
        </div>
        {photo && (
          <Reveal className="md:col-span-5">
            <MirrorFrame className="mx-auto aspect-3/4 w-full max-w-xs">
              <img
                src={photo}
                width={PHOTO_WIDTH}
                height={PHOTO_HEIGHT}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
                alt={`Bancone d’ingresso bianco e crema davanti alla parete in stucco ocra del salone ${business.name} a ${business.city}`}
              />
            </MirrorFrame>
          </Reveal>
        )}
      </div>
    </section>
  )
}
