import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui'
import { useCreateBooking } from '@/hooks'
import type { ApiService, ApiStaff } from '@/types'
import { fullPhone, validateCustomer, type CustomerErrors, type CustomerInput } from '@/utils'
import { BookingFallback } from './BookingFallback'
import { BookingSummary } from './BookingSummary'
import { ConsentField } from './ConsentField'
import { CustomerFields } from './CustomerFields'

interface StepDetailsProps {
  service: ApiService
  staff: ApiStaff | null
  date: string
  time: string
  sendStaff: boolean
  onSlotTaken: (message: string) => void
}

// Versione dell'informativa accettata, registrata con la prenotazione
const GDPR_CONSENT_VERSION = 'privacy-2026-10-03'
const EMPTY: CustomerInput = { name: '', phone: '', email: '', notes: '', consent: false }

export function StepDetails({ service, staff, date, time, sendStaff, onSlotTaken }: StepDetailsProps): React.JSX.Element {
  const [values, setValues] = useState<CustomerInput>(EMPTY)
  const [errors, setErrors] = useState<CustomerErrors>({})
  const booking = useCreateBooking(onSlotTaken)

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    const found = validateCustomer(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    await booking.submit({
      serviceId: service.id,
      // Scelta dell'operatrice non permessa → MAI inviare un operatore (backend.md §3)
      ...(sendStaff && staff ? { staffId: staff.id } : {}),
      date, time,
      customer: { name: values.name.trim(), phone: fullPhone(values.phone), email: values.email.trim(), notes: values.notes.trim() || null },
      gdprConsent: true,
      gdprConsentVersion: GDPR_CONSENT_VERSION,
    })
  }

  if (booking.fallback) return <BookingFallback message="Non siamo riusciti a registrare la prenotazione online." />
  const fieldErrors = { ...errors, ...booking.fieldErrors }
  return (
    <form noValidate onSubmit={(e) => void handleSubmit(e)} className="grid max-w-xl gap-6">
      <h2 className="font-display text-xl">Ci siamo quasi: a chi intestiamo l’appuntamento?</h2>
      <BookingSummary service={service} staff={staff} date={date} time={time} />
      <CustomerFields values={values} errors={fieldErrors} onChange={(field, value) => setValues((v) => ({ ...v, [field]: value }))} />
      <ConsentField checked={values.consent} error={fieldErrors.consent} onChange={(consent) => setValues((v) => ({ ...v, consent }))} />
      {booking.formError && <p role="alert" className="rounded-md bg-surface p-3 text-error">{booking.formError}</p>}
      <Button type="submit" loading={booking.submitting} loadingLabel="Invio in corso…" disabled={!values.consent}>
        Conferma la prenotazione
      </Button>
    </form>
  )
}
