import { CalendarCheck, CalendarX } from 'lucide-react'
import { useState } from 'react'
import { Skeleton } from '@/components/ui'
import { useManagedBooking } from '@/hooks'
import type { ApiBookingStatus } from '@/types'
import { BookingFallback } from './BookingFallback'
import { ConfirmedDetails } from './ConfirmedDetails'
import { ManageActions } from './ManageActions'

const STATUS_TITLE: Record<ApiBookingStatus, string> = {
  confirmed: 'Prenotazione confermata',
  cancelled: 'Prenotazione disdetta',
  completed: 'Appuntamento concluso',
  no_show: 'Appuntamento non effettuato',
}

interface ConfirmationViewProps {
  id: string | null
  token: string | null
}

/** Nessun dato della prenotazione nella memoria del browser: tutto arriva dall'indirizzo */
export function ConfirmationView({ id, token }: ConfirmationViewProps): React.JSX.Element {
  const managed = useManagedBooking(id, token)
  const [notice, setNotice] = useState<string | null>(null)
  if (managed.status === 'loading') return <div className="grid gap-4" aria-busy="true"><Skeleton className="h-12 w-2/3" /><Skeleton className="h-64" /></div>
  if (managed.status === 'not_found') return <p role="alert" className="text-lg">Prenotazione non trovata.</p>
  if (managed.status === 'unavailable' || !managed.booking || !token) {
    return <BookingFallback message="Non riusciamo a caricare la prenotazione." />
  }
  const { booking } = managed
  const Icon = booking.status === 'confirmed' ? CalendarCheck : CalendarX
  return (
    <div className="grid gap-8">
      <header>
        <Icon className="size-10 text-accent-dark" aria-hidden="true" />
        <h1 className="mt-2 text-2xl md:text-3xl">{STATUS_TITLE[booking.status]}</h1>
        {booking.status === 'confirmed' && (
          <p className="mt-2 max-w-prose text-ink-muted">
            Ti abbiamo inviato un’email di riepilogo a <strong className="text-ink">{booking.customer.email}</strong> con il
            collegamento per gestire la prenotazione. Se non la trovi, controlla nella posta indesiderata: qui hai comunque tutti i dati.
          </p>
        )}
        {notice && <p role="status" className="mt-4 rounded-md bg-accent-light p-3 font-semibold text-accent-dark">{notice}</p>}
      </header>
      <ConfirmedDetails booking={booking} price={managed.price} />
      <ManageActions
        booking={booking}
        token={token}
        tenant={managed.tenant}
        onMoved={(moved) => { managed.replace(moved); setNotice('Appuntamento spostato. Riceverai un’email con i dati aggiornati.') }}
        onCancelled={() => { setNotice('La prenotazione è stata disdetta.'); managed.reload() }}
      />
      <a href="/" className="link-text">Torna al sito</a>
    </div>
  )
}
