import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ApiAvailabilityDay } from '@/types'
import { addMonths, formatDateLong, formatMonthLabel, monthGrid } from '@/utils'
import { CalendarDay } from './CalendarDay'

interface MonthCalendarProps {
  month: string
  minMonth: string
  maxMonth: string
  days: Map<string, ApiAvailabilityDay>
  loading: boolean
  selectedDate: string | null
  onSelectDate: (date: string) => void
  onMonthChange: (month: string) => void
}

const WEEKDAYS = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica']
const NAV_BUTTON = 'inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40'

export function MonthCalendar(props: MonthCalendarProps): React.JSX.Element {
  const { month, minMonth, maxMonth, days, loading, selectedDate, onSelectDate, onMonthChange } = props
  return (
    <div>
      <div className="flex items-center justify-between">
        <button type="button" className={NAV_BUTTON} disabled={month <= minMonth} onClick={() => onMonthChange(addMonths(month, -1))} aria-label="Mese precedente">
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <p className="font-display text-lg capitalize" aria-live="polite">{formatMonthLabel(month)}</p>
        <button type="button" className={NAV_BUTTON} disabled={month >= maxMonth} onClick={() => onMonthChange(addMonths(month, 1))} aria-label="Mese successivo">
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => <abbr key={d} title={d} className="text-xs font-semibold text-ink-muted uppercase no-underline">{d.slice(0, 3)}</abbr>)}
        {monthGrid(month).map((date, i) =>
          date === null ? <span key={`vuoto-${i}`} /> : (
            <CalendarDay
              key={date}
              day={Number(date.slice(8, 10))}
              label={formatDateLong(date)}
              available={!loading && days.has(date)}
              loading={loading}
              selected={date === selectedDate}
              onSelect={() => onSelectDate(date)}
            />
          ),
        )}
      </div>
    </div>
  )
}
