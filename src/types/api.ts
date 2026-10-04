// Tipi delle risposte del Backend, coerenti con backend.md §3.
// MOTIVO: non riusano i tipi della configurazione: qui diversi campi possono
// essere nulli, nella configurazione no (stack.md §8).

export interface ApiBreak {
  startTime: string
  endTime: string
  label: string | null
}

export interface ApiBusinessDay {
  dayOfWeek: number // 0 = domenica
  isOpen: boolean
  openTime: string | null
  closeTime: string | null
  breaks: ApiBreak[]
}

export interface ApiSpecialClosure {
  dateFrom: string
  dateTo: string
  reason: string | null
  recurrence: string | null
}

export interface ApiTenantConfig {
  tenantId: string
  name: string
  timezone: string
  staffChoiceEnabled: boolean
  minAdvanceHours: number
  minCancellationHours: number
  visibleDaysAhead: number
  bufferMinutes: number
  logoUrl: string | null
  businessHours: ApiBusinessDay[]
  specialClosures: ApiSpecialClosure[]
}

export interface ApiService {
  id: string
  name: string
  category: string | null
  durationMin: number
  price: number | null
  description: string | null
  staffIds: string[]
  active: boolean
}

export interface ApiStaff {
  id: string
  name: string
  role: string | null
  specialization: string | null
  photoUrl: string | null
  active: boolean
}

export interface ApiSlot {
  time: string
  staffId: string | null
  available: boolean
}

export interface ApiAvailabilityDay {
  date: string
  slots: ApiSlot[]
}

export interface ApiCreateBookingRequest {
  serviceId: string
  staffId?: string
  date: string
  time: string
  customer: {
    name: string
    phone: string
    email: string
    notes: string | null
  }
  gdprConsent: true
  gdprConsentVersion: string
}

export interface ApiCreateBookingResponse {
  bookingId: string
  status: string
  cancellationToken: string
}

export type ApiBookingStatus = 'confirmed' | 'cancelled' | 'no_show' | 'completed'

export interface ApiBooking {
  bookingId: string
  status: ApiBookingStatus
  date: string
  time: string
  durationMin: number
  service: { id: string; name: string }
  staff: { id: string; name: string } | null
  customer: { name: string; email: string }
  canCancel: boolean
  cancellationDeadline: string
}

export interface ApiCancelResponse {
  bookingId: string
  status: string
  message: string
}

export interface ApiErrorBody {
  type: string
  message: string
  errors?: Record<string, string[]> | null
}

/** Esito di una chiamata: mai un'eccezione verso i componenti. */
export type ApiFailureKind = 'network' | 'http'

export interface ApiFailure {
  ok: false
  kind: ApiFailureKind
  status: number // 0 per errori di rete o attesa scaduta
  type: string
  message: string
  errors: Record<string, string[]>
}

export interface ApiSuccess<T> {
  ok: true
  data: T
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure
