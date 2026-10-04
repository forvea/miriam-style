// Operatrici che eseguono il servizio scelto, sempre dal Backend.
import { useEffect, useState } from 'react'
import type { ApiFailure, ApiStaff } from '@/types'
import { useBookingApi } from './useBookingApi'

export interface StaffState {
  staff: ApiStaff[]
  loading: boolean
  failure: ApiFailure | null
}

export function useStaff(serviceId: string): StaffState {
  const api = useBookingApi()
  const [state, setState] = useState<StaffState>({ staff: [], loading: true, failure: null })
  useEffect(() => {
    let active = true
    setState((s) => ({ ...s, loading: true }))
    void api.getStaff(serviceId).then((result) => {
      if (!active) return
      setState(result.ok
        ? { staff: result.data.filter((m) => m.active), loading: false, failure: null }
        : { staff: [], loading: false, failure: result })
    })
    return () => { active = false }
  }, [api, serviceId])
  return state
}
