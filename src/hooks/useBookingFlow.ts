// Stato del widget: vive in memoria, non si salva da nessuna parte
// (template-prenotazione §3). Si torna indietro senza perdere le scelte.
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import type { ApiService, ApiStaff, ApiTenantConfig } from '@/types'
import { normalizeName } from '@/utils'
import { useBookingApi } from './useBookingApi'

export type BookingStep = 'service' | 'staff' | 'datetime' | 'details'

export interface BookingFlow {
  status: 'loading' | 'ready' | 'unavailable'
  tenant: ApiTenantConfig | null
  services: ApiService[]
  steps: BookingStep[]
  step: BookingStep
  service: ApiService | null
  staff: ApiStaff | null // null = prima disponibile
  date: string | null
  time: string | null
  chooseService: (service: ApiService) => void
  chooseStaff: (staff: ApiStaff | null) => void
  chooseSlot: (date: string, time: string) => void
  clearSlot: () => void
  goTo: (step: BookingStep) => void
}

const ALL_STEPS: BookingStep[] = ['service', 'staff', 'datetime', 'details']

/** Preselezione: corrispondenza esatta sul nome normalizzato, o niente (§2) */
function preselected(services: ApiService[]): ApiService | null {
  const label = new URLSearchParams(window.location.search).get('service')
  if (!label) return null
  return services.find((s) => normalizeName(s.name) === normalizeName(label)) ?? null
}

export function useBookingFlow(): BookingFlow {
  const api = useBookingApi()
  const steps = useMemo(
    () => ALL_STEPS.filter((s) => s !== 'staff' || TEMPLATE_CONFIG.booking.allowStaffSelection), [],
  )
  const [status, setStatus] = useState<BookingFlow['status']>('loading')
  const [tenant, setTenant] = useState<ApiTenantConfig | null>(null)
  const [services, setServices] = useState<ApiService[]>([])
  const [step, setStep] = useState<BookingStep>('service')
  const [service, setService] = useState<ApiService | null>(null)
  const [staff, setStaff] = useState<ApiStaff | null>(null)
  const [slot, setSlot] = useState<{ date: string; time: string } | null>(null)

  useEffect(() => {
    void Promise.all([api.getTenantConfig(), api.getServices()]).then(([t, s]) => {
      if (!t.ok || !s.ok) return setStatus('unavailable')
      setTenant(t.data)
      setServices(s.data)
      const match = preselected(s.data)
      if (match) { setService(match); setStep(steps[1]) }
      setStatus('ready')
    })
  }, [api, steps])

  const next = useCallback((from: BookingStep) => setStep(steps[steps.indexOf(from) + 1]), [steps])

  return {
    status, tenant, services, steps, step, service, staff,
    date: slot?.date ?? null, time: slot?.time ?? null,
    chooseService: (s) => { if (s.id !== service?.id) { setStaff(null); setSlot(null) } setService(s); next('service') },
    chooseStaff: (s) => { if (s?.id !== staff?.id) setSlot(null); setStaff(s); next('staff') },
    chooseSlot: (date, time) => { setSlot({ date, time }); next('datetime') },
    clearSlot: () => setSlot(null),
    goTo: setStep,
  }
}

