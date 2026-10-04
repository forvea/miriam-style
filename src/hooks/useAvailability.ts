// Disponibilità per il mese visibile, in una sola chiamata (template-prenotazione §3).
// Il calendario gestisce la data ASSENTE, mai un elenco vuoto (backend.md §3).
import { useCallback, useEffect, useState } from 'react'
import type { ApiAvailabilityDay, ApiFailure, ApiTenantConfig } from '@/types'
import { addDays, lastDayOfMonth, monthKey, todayInTimeZone } from '@/utils'
import { useBookingApi } from './useBookingApi'

export interface AvailabilityState {
  month: string
  minMonth: string
  maxMonth: string
  days: Map<string, ApiAvailabilityDay>
  loading: boolean
  failure: ApiFailure | null
  setMonth: (month: string) => void
  reload: () => void
}

interface Params {
  tenant: ApiTenantConfig
  serviceId: string
  staffId?: string
}

function range(month: string, today: string, lastBookable: string): [string, string] {
  const from = `${month}-01` < today ? today : `${month}-01`
  const end = lastDayOfMonth(month)
  return [from, end > lastBookable ? lastBookable : end]
}

export function useAvailability({ tenant, serviceId, staffId }: Params): AvailabilityState {
  const api = useBookingApi()
  const today = todayInTimeZone(tenant.timezone)
  const lastBookable = addDays(today, tenant.visibleDaysAhead)
  const [month, setMonth] = useState(monthKey(today))
  const [days, setDays] = useState(new Map<string, ApiAvailabilityDay>())
  const [loading, setLoading] = useState(true)
  const [failure, setFailure] = useState<ApiFailure | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let active = true
    const [dateFrom, dateTo] = range(month, today, lastBookable)
    setLoading(true)
    void api.getAvailability({ serviceId, staffId, dateFrom, dateTo }).then((result) => {
      if (!active) return
      setFailure(result.ok ? null : result)
      setDays(new Map(result.ok ? result.data.map((d) => [d.date, d]) : []))
      setLoading(false)
    })
    return () => { active = false }
  }, [api, month, today, lastBookable, serviceId, staffId, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return {
    month, minMonth: monthKey(today), maxMonth: monthKey(lastBookable),
    days, loading, failure, setMonth, reload,
  }
}
