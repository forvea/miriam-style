import { Clock, MapPin, Navigation } from 'lucide-react'
import { OsmMap } from '@/components/ui'
import { AREAS_SERVED, CLOSURES_NOTE, OPENING_HOURS, TEMPLATE_CONFIG } from '@/config/templateConfig'
import { mapsDirectionsHref } from '@/utils'

const PHOTO_WIDTH = 765
const PHOTO_HEIGHT = 1020

export function MapSection(): React.JSX.Element | null {
  // [EDIT] coordinate, indirizzo, orari, foto dell'ingresso (assets.gallery[1])
  const { business, seo, assets } = TEMPLATE_CONFIG
  if (!seo.coordinates) return null
  const { lat, lng } = seo.coordinates
  const photo = assets.gallery?.[1]
  return (
    <section id="dove-siamo" aria-labelledby="titolo-dove" className="section-y bg-surface">
      <div className="container-site grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Dove siamo</p>
          <h2 id="titolo-dove" className="mt-2 text-2xl md:text-3xl">Dove si trova {business.name}?</h2>
          <p className="mt-4 flex gap-2 text-lg">
            <MapPin className="mt-1 size-5 shrink-0 text-accent-dark" aria-hidden="true" />
            <span>{business.street}, {business.cap} {business.city} ({business.province}), frazione {business.neighborhood}.</span>
          </p>
          <p className="mt-3 flex gap-2">
            <Clock className="mt-1 size-5 shrink-0 text-accent-dark" aria-hidden="true" />
            <span>
              {OPENING_HOURS.map((h) => `${h.label}, ${h.opens} – ${h.closes}`).join('; ')}, orario continuato.{' '}
              {CLOSURES_NOTE.weekly}; {CLOSURES_NOTE.holidays.toLowerCase()}.
            </span>
          </p>
          <p className="mt-3 text-ink-muted">Comodo anche da {AREAS_SERVED.filter((a) => a !== business.city && a !== business.neighborhood).join(', ')}.</p>
          <a className="btn-secondary mt-6" href={mapsDirectionsHref(lat, lng)} target="_blank" rel="noopener noreferrer">
            <Navigation className="size-5" aria-hidden="true" /> Calcola il percorso
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:col-span-7">
          {photo && (
            <img
              src={photo}
              width={PHOTO_WIDTH}
              height={PHOTO_HEIGHT}
              loading="lazy"
              decoding="async"
              className="aspect-3/4 w-full rounded-lg object-cover"
              alt={`Ingresso del salone ${business.name} in ${business.street} a ${business.city}, con l’insegna sopra la porta`}
            />
          )}
          <OsmMap lat={lat} lng={lng} title={`Mappa: ${business.name}, ${business.street}, ${business.city}`} />
        </div>
      </div>
    </section>
  )
}
