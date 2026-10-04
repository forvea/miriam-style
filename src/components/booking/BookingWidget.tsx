import { AnimatePresence, m } from 'motion/react'
import { useState } from 'react'
import { Skeleton } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { useBookingFlow } from '@/hooks'
import { BookingFallback } from './BookingFallback'
import { BookingStepView } from './BookingStepView'
import { StepIndicator } from './StepIndicator'

const STEP_TRANSITION_S = 0.2

/** Orchestratore: un cliente puro del Backend (template-prenotazione §3) */
export function BookingWidget(): React.JSX.Element {
  const flow = useBookingFlow()
  const [notice, setNotice] = useState<string | null>(null)

  if (flow.status === 'unavailable') return <BookingFallback />
  if (flow.status === 'loading' || !flow.tenant) {
    return <div className="grid gap-3" aria-busy="true" aria-label="Caricamento dei servizi">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div>
  }

  function handleSlotTaken(message: string): void {
    setNotice(message)
    flow.clearSlot()
    flow.goTo('datetime')
  }

  return (
    <div className="grid gap-8">
      <StepIndicator steps={flow.steps} current={flow.step} onGoBack={(step) => { setNotice(null); flow.goTo(step) }} />
      {notice && flow.step === 'datetime' && <p role="alert" className="rounded-md bg-accent-light p-3 font-semibold text-accent-dark">{notice}</p>}
      <AnimatePresence mode="wait" initial={false}>
        <m.div key={flow.step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: STEP_TRANSITION_S }}>
          <BookingStepView flow={flow} sendStaff={TEMPLATE_CONFIG.booking.allowStaffSelection} onSlotTaken={handleSlotTaken} />
        </m.div>
      </AnimatePresence>
    </div>
  )
}
