interface OsmMapProps {
  lat: number
  lng: number
  title: string
}

// Riquadro intorno al punto: circa 400 m per lato
const BBOX_DELTA = 0.0025

/**
 * Mappa OpenStreetMap incorporata: nessun cookie di profilazione.
 * Decorativa: l'indirizzo in testo puro sta sempre accanto (template-landing §5).
 */
export function OsmMap({ lat, lng, title }: OsmMapProps): React.JSX.Element {
  const bbox = [lng - BBOX_DELTA, lat - BBOX_DELTA, lng + BBOX_DELTA, lat + BBOX_DELTA].join('%2C')
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="aspect-4/3 w-full rounded-lg border border-line sm:aspect-auto sm:h-full"
    />
  )
}
