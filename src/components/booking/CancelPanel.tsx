import { useState } from 'react'
import { Button } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { needsPhoneFallback, useBookingApi } from '@/hooks'
import { telHref } from '@/utils'

interface CancelPanelProps {
  id: string
  token: string
  onCancelled: () => void
}

/** Disdetta con conferma esplicita: è un'azione che non si annulla */
export function CancelPanel({ id, token, onCancelled }: CancelPanelProps): React.JSX.Element {
  const api = useBookingApi()
  const [asking, setAsking] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const phone = TEMPLATE_CONFIG.business.phone

  async function cancel(): Promise<void> {
    setBusy(true); setError(null)
    const result = await api.cancelBooking(id, token)
    setBusy(false)
    if (result.ok) return onCancelled()
    setError(needsPhoneFallback(result) ? `Non riusciamo a disdire online. Chiamaci al ${phone}.` : `${result.message} Per aiuto chiama il ${phone}.`)
  }

  if (!asking) return <Button variant="secondary" onClick={() => setAsking(true)}>Disdici la prenotazione</Button>
  return (
    <div role="alertdialog" aria-labelledby="disdetta-titolo" className="rounded-lg border border-error p-4">
      <p id="disdetta-titolo" className="font-semibold">Vuoi davvero disdire? L’operazione non si può annullare.</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => void cancel()} loading={busy} loadingLabel="Disdetta in corso…">Sì, disdici</Button>
        <Button variant="secondary" onClick={() => setAsking(false)} disabled={busy}>No, mantieni l’appuntamento</Button>
      </div>
      {error && <p role="alert" className="mt-3 text-error">{error} <a className="link-text" href={telHref(phone)}>Chiama</a></p>}
    </div>
  )
}
