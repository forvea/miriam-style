// Pagina di conferma: prenotazione (con il token dall'indirizzo), prezzo dal
// listino del Backend, regole del salone per il calendario di spostamento.
import { useCallback, useEffect, useState } from 'react'
import type { ApiBooking, ApiTenantConfig } from '@/types'
import { useBookingApi } from './useBookingApi'

export interface ManagedBooking {
  status: 'loading' | 'ready' | 'not_found' | 'unavailable'
  booking: ApiBooking | null
  price: number | null
  tenant: ApiTenantConfig | null
  replace: (booking: ApiBooking) => void
  reload: () => void
}

export function useManagedBooking(id: string | null, token: string | null): ManagedBooking {
  const api = useBookingApi()
  const [state, setState] = useState<Omit<ManagedBooking, 'replace' | 'reload'>>({ status: 'loading', booking: null, price: null, tenant: null })
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!id || !token) return setState((s) => ({ ...s, status: 'not_found' }))
    void Promise.all([api.getBooking(id, token), api.getTenantConfig(), api.getServices()]).then(([b, t, s]) => {
      // Messaggio neutro per token sbagliato, id inesistente o token malformato (backend.md §3)
      if (!b.ok) return setState((st) => ({ ...st, status: b.status === 404 || b.status === 400 ? 'not_found' : 'unavailable' }))
      const price = s.ok ? s.data.find((x) => x.id === b.data.service.id)?.price ?? null : null
      setState({ status: 'ready', booking: b.data, price, tenant: t.ok ? t.data : null })
    })
  }, [api, id, token, version])

  const replace = useCallback((booking: ApiBooking) => setState((s) => ({ ...s, booking })), [])
  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return { ...state, replace, reload }
}
