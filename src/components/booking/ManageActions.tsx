import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import type { ApiBooking, ApiTenantConfig } from '@/types'
import { formatLocalDateTime, telHref } from '@/utils'
import { CancelPanel } from './CancelPanel'
import { ReschedulePanel } from './ReschedulePanel'

interface ManageActionsProps {
  booking: ApiBooking
  token: string
  tenant: ApiTenantConfig | null
  onMoved: (booking: ApiBooking) => void
  onCancelled: () => void
}

/** "Sposta" si mostra esattamente quando si può disdire: stessa condizione (backend.md §3) */
export function ManageActions({ booking, token, tenant, onMoved, onCancelled }: ManageActionsProps): React.JSX.Element | null {
  const phone = TEMPLATE_CONFIG.business.phone
  if (booking.status !== 'confirmed') return null
  if (!booking.canCancel) {
    return (
      <p className="rounded-md bg-surface p-4">
        Il termine per disdire o spostare online è scaduto ({formatLocalDateTime(booking.cancellationDeadline)}).
        Per qualunque cambiamento chiamaci al <a className="link-text" href={telHref(phone)}>{phone}</a>.
      </p>
    )
  }
  return (
    <div className="grid gap-4">
      {/* Il termine si dice prima, non solo dopo l'errore */}
      <p>Puoi disdire o spostare online fino a <strong>{formatLocalDateTime(booking.cancellationDeadline)}</strong>.</p>
      <div className="flex flex-col gap-4">
        {TEMPLATE_CONFIG.booking.allowReschedule && tenant && (
          <ReschedulePanel booking={booking} token={token} tenant={tenant} onMoved={onMoved} />
        )}
        <CancelPanel id={booking.bookingId} token={token} onCancelled={onCancelled} />
      </div>
    </div>
  )
}
