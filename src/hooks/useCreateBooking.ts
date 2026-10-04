// Invio della prenotazione e reazione a ogni risposta (template-prenotazione §3).
import { useState } from 'react'
import type { ApiCreateBookingRequest, ApiFailure } from '@/types'
import { needsPhoneFallback } from './bookingClient'
import { useBookingApi } from './useBookingApi'

export type CustomerField = 'name' | 'phone' | 'email' | 'notes'

export interface CreateBookingState {
  submitting: boolean
  formError: string | null
  fieldErrors: Partial<Record<CustomerField, string>>
  fallback: boolean
  submit: (request: ApiCreateBookingRequest) => Promise<void>
}

const FIELDS: CustomerField[] = ['name', 'phone', 'email', 'notes']

/** Le chiavi del Backend hanno forme varie: confronto senza maiuscole (backend.md §4) */
function mapFieldErrors(errors: Record<string, string[]>): Partial<Record<CustomerField, string>> {
  const mapped: Partial<Record<CustomerField, string>> = {}
  for (const [key, messages] of Object.entries(errors)) {
    const field = FIELDS.find((f) => key.toLowerCase().endsWith(f))
    if (field && messages.length > 0) mapped[field] = messages[0]
  }
  return mapped
}

export function useCreateBooking(onSlotTaken: (message: string) => void): CreateBookingState {
  const api = useBookingApi()
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<CustomerField, string>>>({})
  const [fallback, setFallback] = useState(false)

  function handleFailure(failure: ApiFailure): void {
    setSubmitting(false)
    if (needsPhoneFallback(failure)) return setFallback(true)
    if (failure.type === 'slot_unavailable') return onSlotTaken('Questo orario non è più disponibile. Scegline un altro.')
    const details = mapFieldErrors(failure.errors)
    if (Object.keys(details).length > 0) return setFieldErrors(details)
    setFormError(failure.message || 'Non è stato possibile completare la prenotazione.')
  }

  async function submit(request: ApiCreateBookingRequest): Promise<void> {
    setSubmitting(true); setFormError(null); setFieldErrors({}); setFallback(false)
    let result = await api.createBooking(request)
    // Richiesta concorrente sullo stesso cliente: si riprova lo STESSO orario, una volta
    if (!result.ok && result.type === 'customer_link_contended') result = await api.createBooking(request)
    if (!result.ok) return handleFailure(result)
    const { bookingId, cancellationToken } = result.data
    // Subito alla conferma; il pulsante resta occupato fino al cambio pagina
    window.location.assign(`/conferma?id=${encodeURIComponent(bookingId)}&token=${encodeURIComponent(cancellationToken)}`)
  }

  return { submitting, formError, fieldErrors, fallback, submit }
}
