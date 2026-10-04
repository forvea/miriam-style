import { MessageCircle, Phone } from 'lucide-react'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { telHref, whatsappHref } from '@/utils'

interface BookingFallbackProps {
  message?: string
}

/**
 * Il Backend non risponde: subito il telefono, non un generico "riprova".
 * Non è un caso raro (backend.md §9). Una prenotazione persa è un cliente perso.
 */
export function BookingFallback({ message }: BookingFallbackProps): React.JSX.Element {
  // [EDIT] recapiti e testo di riserva
  const { business, booking } = TEMPLATE_CONFIG
  const text = message ?? booking.fallbackText ?? 'La prenotazione online è momentaneamente non disponibile.'
  return (
    <div role="alert" className="rounded-lg border border-line bg-surface p-6">
      <p className="text-lg">{text}</p>
      <p className="mt-2 text-ink-muted">Chiamaci al {business.phone} per prenotare.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a className="btn-primary" href={telHref(business.phone)}>
          <Phone className="size-5" aria-hidden="true" /> Chiama {business.phone}
        </a>
        {business.whatsapp && (
          <a className="btn-secondary" href={whatsappHref(business.whatsapp)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" aria-hidden="true" /> Scrivi su WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
