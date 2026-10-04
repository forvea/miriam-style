import { useState } from 'react'
import { Button } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { needsPhoneFallback, useBookingApi } from '@/hooks'
import type { ApiBooking, ApiTenantConfig } from '@/types'
import { formatDateLong } from '@/utils'
import { DateTimePicker } from './DateTimePicker'

interface ReschedulePanelProps {
  booking: ApiBooking
  token: string
  tenant: ApiTenantConfig
  onMoved: (booking: ApiBooking) => void
}

/** Si cambiano solo data e ora: servizio e operatrice restano quelli prenotati */
export function ReschedulePanel({ booking, token, tenant, onMoved }: ReschedulePanelProps): React.JSX.Element {
  const api = useBookingApi()
  const [open, setOpen] = useState(false)
  const [slot, setSlot] = useState<{ date: string; time: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pickerKey, setPickerKey] = useState(0)
  const phone = TEMPLATE_CONFIG.business.phone

  async function move(): Promise<void> {
    if (!slot) return
    setBusy(true); setError(null)
    const result = await api.rescheduleBooking(booking.bookingId, token, slot.date, slot.time)
    setBusy(false)
    if (result.ok) { setOpen(false); setSlot(null); return onMoved(result.data) }
    if (needsPhoneFallback(result)) return setError(`Non riusciamo a spostare online. Chiamaci al ${phone}.`)
    if (result.type === 'slot_unavailable') { setSlot(null); setPickerKey((k) => k + 1) }
    const suffix = result.type === 'cancellation_deadline_exceeded' ? ` Chiamaci al ${phone}.` : ''
    setError(`${result.message || 'Non è stato possibile spostare l’appuntamento.'}${suffix}`)
  }

  if (!open) return <Button variant="secondary" onClick={() => setOpen(true)}>Sposta a un altro giorno o orario</Button>
  return (
    <section aria-labelledby="sposta-titolo" className="rounded-lg border border-line p-4 md:p-6">
      <h2 id="sposta-titolo" className="font-display text-xl">Scegli il nuovo giorno e orario</h2>
      <p className="mt-1 text-ink-muted">
        Restano {booking.service.name}{booking.staff ? ` con ${booking.staff.name}` : ''}. Per cambiare servizio, disdici e prenota di nuovo.
      </p>
      <div className="mt-4">
        <DateTimePicker key={pickerKey} tenant={tenant} serviceId={booking.service.id} staffId={booking.staff?.id}
          selectedDate={slot?.date ?? null} selectedTime={slot?.time ?? null} onChoose={(date, time) => setSlot({ date, time })} />
      </div>
      {error && <p role="alert" className="mt-4 text-error">{error}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => void move()} disabled={!slot} loading={busy} loadingLabel="Spostamento in corso…">
          {slot ? `Sposta a ${formatDateLong(slot.date)}, ore ${slot.time}` : 'Scegli un orario'}
        </Button>
        <Button variant="secondary" onClick={() => { setOpen(false); setSlot(null); setError(null) }} disabled={busy}>Annulla</Button>
      </div>
    </section>
  )
}
