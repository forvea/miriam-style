import type { BookingFlow } from '@/hooks'
import { DateTimePicker } from './DateTimePicker'
import { StepDetails } from './StepDetails'
import { StepService } from './StepService'
import { StepStaff } from './StepStaff'

interface BookingStepViewProps {
  flow: BookingFlow
  sendStaff: boolean
  onSlotTaken: (message: string) => void
}

/** Il passo corrente; ogni passo riceve solo le scelte già fatte */
export function BookingStepView({ flow, sendStaff, onSlotTaken }: BookingStepViewProps): React.JSX.Element | null {
  const { step, service, tenant } = flow
  if (step === 'service' || !service || !tenant) {
    return <StepService services={flow.services} selectedId={service?.id ?? null} onChoose={flow.chooseService} />
  }
  if (step === 'staff') {
    return <StepStaff serviceId={service.id} selectedId={flow.staff?.id ?? null} onChoose={flow.chooseStaff} />
  }
  if (step === 'datetime' || !flow.date || !flow.time) {
    return (
      <section aria-labelledby="titolo-data">
        <h2 id="titolo-data" className="font-display text-xl">Quando vuoi venire?</h2>
        <p className="mt-1 text-ink-muted">I giorni barrati non sono disponibili.</p>
        <div className="mt-4">
          <DateTimePicker
            tenant={tenant}
            serviceId={service.id}
            staffId={sendStaff ? flow.staff?.id : undefined}
            selectedDate={flow.date}
            selectedTime={flow.time}
            onChoose={flow.chooseSlot}
          />
        </div>
      </section>
    )
  }
  return <StepDetails service={service} staff={flow.staff} date={flow.date} time={flow.time} sendStaff={sendStaff} onSlotTaken={onSlotTaken} />
}
