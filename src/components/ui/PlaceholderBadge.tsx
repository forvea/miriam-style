/**
 * Ricorda che le recensioni sono segnaposto. MOTIVO: resta visibile anche nella
 * build di produzione finché il sito è di test; da togliere insieme alle
 * recensioni inventate prima della pubblicazione reale.
 */
export function PlaceholderBadge(): React.JSX.Element {
  return (
    <p className="mt-2 rounded-sm border border-dashed border-warning px-2 py-1 text-xs text-warning">
      SEGNAPOSTO – DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA PUBBLICAZIONE
    </p>
  )
}
