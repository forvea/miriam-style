// Unico punto di accesso al Backend (stack.md §8). Contratti in backend.md §3.
import type {
  ApiAvailabilityDay, ApiBooking, ApiCancelResponse, ApiCreateBookingRequest,
  ApiCreateBookingResponse, ApiResult, ApiService, ApiStaff, ApiTenantConfig,
} from '@/types'
import { getJson, writeJson } from './bookingClient'

const API = '/api/v1'

export interface AvailabilityQuery {
  serviceId: string
  dateFrom: string
  dateTo: string
  staffId?: string
}

export interface BookingApi {
  getTenantConfig: () => Promise<ApiResult<ApiTenantConfig>>
  getServices: () => Promise<ApiResult<ApiService[]>>
  getStaff: (serviceId: string) => Promise<ApiResult<ApiStaff[]>>
  getAvailability: (query: AvailabilityQuery) => Promise<ApiResult<ApiAvailabilityDay[]>>
  createBooking: (request: ApiCreateBookingRequest) => Promise<ApiResult<ApiCreateBookingResponse>>
  getBooking: (id: string, token: string) => Promise<ApiResult<ApiBooking>>
  rescheduleBooking: (id: string, token: string, date: string, time: string) => Promise<ApiResult<ApiBooking>>
  cancelBooking: (id: string, token: string) => Promise<ApiResult<ApiCancelResponse>>
}

function tokenQuery(token: string): string {
  return `token=${encodeURIComponent(token)}`
}

function availabilityPath(q: AvailabilityQuery): string {
  const params = new URLSearchParams({ serviceId: q.serviceId, dateFrom: q.dateFrom, dateTo: q.dateTo })
  if (q.staffId) params.set('staffId', q.staffId)
  return `${API}/availability?${params.toString()}`
}

const BOOKING_API: BookingApi = {
  getTenantConfig: () => getJson(`${API}/tenant/config`),
  getServices: () => getJson(`${API}/services`),
  getStaff: (serviceId) => getJson(`${API}/staff?serviceId=${encodeURIComponent(serviceId)}`),
  getAvailability: (query) => getJson(availabilityPath(query)),
  createBooking: (request) => writeJson('POST', `${API}/bookings`, request),
  getBooking: (id, token) => getJson(`${API}/bookings/${encodeURIComponent(id)}?${tokenQuery(token)}`),
  rescheduleBooking: (id, token, date, time) =>
    writeJson('PUT', `${API}/bookings/${encodeURIComponent(id)}/reschedule?${tokenQuery(token)}`, { date, time }),
  cancelBooking: (id, token) => writeJson('DELETE', `${API}/bookings/${encodeURIComponent(id)}?${tokenQuery(token)}`),
}

export function useBookingApi(): BookingApi {
  return BOOKING_API
}
