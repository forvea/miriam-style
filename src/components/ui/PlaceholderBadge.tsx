/**
 * Visibile solo in sviluppo: ricorda in revisione che le recensioni sono
 * segnaposto. Non entra mai nella build di produzione.
 */
export function PlaceholderBadge(): React.JSX.Element | null {
  if (!import.meta.env.DEV) return null
  return (
    <p className="mt-2 rounded-sm border border-dashed border-warning px-2 py-1 text-xs text-warning">
      SEGNAPOSTO – DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA PUBBLICAZIONE
    </p>
  )
}
