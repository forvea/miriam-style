// Date "yyyy-MM-dd" e orari "HH:mm" restano stringhe (backend.md §6).
// MOTIVO: qui si costruiscono oggetti Date solo da date pure, in UTC, per la
// navigazione del calendario. Mai combinando data e ora.

const MS_PER_DAY = 86_400_000

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Oggi nel fuso del salone, non in quello del dispositivo */
export function todayInTimeZone(timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date())
}

export function addDays(iso: string, days: number): string {
  return toIsoDate(new Date(parseIsoDate(iso).getTime() + days * MS_PER_DAY))
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

export function addMonths(month: string, delta: number): string {
  const [y, m] = month.split('-').map(Number)
  return toIsoDate(new Date(Date.UTC(y, m - 1 + delta, 1))).slice(0, 7)
}

export function lastDayOfMonth(month: string): string {
  const [y, m] = month.split('-').map(Number)
  return toIsoDate(new Date(Date.UTC(y, m, 0)))
}

/** Celle del mese da lunedì a domenica; null per le celle vuote iniziali */
export function monthGrid(month: string): Array<string | null> {
  const first = parseIsoDate(`${month}-01`)
  const leading = (first.getUTCDay() + 6) % 7
  const days = Number(lastDayOfMonth(month).slice(8, 10))
  const cells: Array<string | null> = Array.from({ length: leading }, () => null)
  for (let d = 1; d <= days; d += 1) cells.push(`${month}-${String(d).padStart(2, '0')}`)
  return cells
}

const LONG_DATE = new Intl.DateTimeFormat('it-IT', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
})
const MONTH_LABEL = new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric', timeZone: 'UTC' })

export function formatDateLong(iso: string): string {
  return LONG_DATE.format(parseIsoDate(iso))
}

export function formatMonthLabel(month: string): string {
  return MONTH_LABEL.format(parseIsoDate(`${month}-01`))
}

/** "2026-07-27T10:30:00" → "lunedì 27 luglio 2026 alle 10:30", senza conversioni di fuso */
export function formatLocalDateTime(value: string): string {
  const [date, time = ''] = value.split('T')
  return `${formatDateLong(date)} alle ${time.slice(0, 5)}`
}
