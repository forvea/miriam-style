import { useEffect, useState } from 'react'
import { needsPhoneFallback, useAvailability } from '@/hooks'
import type { ApiTenantConfig } from '@/types'
import { formatDateLong, monthKey } from '@/utils'
import { BookingFallback } from './BookingFallback'
import { MonthCalendar } from './MonthCalendar'
import { SlotGrid } from './SlotGrid'

interface DateTimePickerProps {
  tenant: ApiTenantConfig
  serviceId: string
  staffId?: string
  selectedDate: string | null
  selectedTime: string | null
  onChoose: (date: string, time: string) => void
}

/** Calendario e orari: usato dal widget (passo 3) e dallo spostamento in conferma */
export function DateTimePicker(props: DateTimePickerProps): React.JSX.Element {
  const { tenant, serviceId, staffId, selectedTime, onChoose } = props
  const availability = useAvailability({ tenant, serviceId, staffId })
  const { days, loading, failure, month } = availability
  const [date, setDate] = useState<string | null>(props.selectedDate)

  // Mese caricato senza giorno scelto: si propone il primo giorno disponibile
  useEffect(() => {
    if (loading) return
    if (date && monthKey(date) === month && days.has(date)) return
    setDate(days.keys().next().value ?? null)
  }, [loading, days, month, date])

  if (failure && needsPhoneFallback(failure)) return <BookingFallback />
  const day = date ? days.get(date) : undefined
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <MonthCalendar
        month={month}
        minMonth={availability.minMonth}
        maxMonth={availability.maxMonth}
        days={days}
        loading={loading}
        selectedDate={date}
        onSelectDate={setDate}
        onMonthChange={availability.setMonth}
      />
      <div aria-live="polite">
        {failure && <p role="alert" className="text-error">{failure.message || 'Non riusciamo a caricare gli orari.'}</p>}
        {!loading && !failure && !day && <p className="text-ink-muted">In questo mese non ci sono giorni disponibili. Prova il mese successivo.</p>}
        {day && date && (
          <SlotGrid
            dateLabel={formatDateLong(date)}
            slots={day.slots}
            selectedTime={date === props.selectedDate ? selectedTime : null}
            onSelect={(time) => onChoose(date, time)}
          />
        )}
      </div>
    </div>
  )
}
