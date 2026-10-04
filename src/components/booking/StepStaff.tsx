import { Users } from 'lucide-react'
import { Skeleton } from '@/components/ui'
import { needsPhoneFallback, useStaff } from '@/hooks'
import type { ApiStaff } from '@/types'
import { BookingFallback } from './BookingFallback'
import { OptionCard } from './OptionCard'
import { StaffAvatar } from './StaffAvatar'

interface StepStaffProps {
  serviceId: string
  selectedId: string | null
  onChoose: (staff: ApiStaff | null) => void
}

/** Passo 2: "prima disponibile" è sempre la prima opzione */
export function StepStaff({ serviceId, selectedId, onChoose }: StepStaffProps): React.JSX.Element {
  const { staff, loading, failure } = useStaff(serviceId)
  if (failure && needsPhoneFallback(failure)) return <BookingFallback />
  return (
    <fieldset>
      <legend className="font-display text-xl">Con chi vuoi prenotare?</legend>
      <ul className="mt-4 grid gap-3">
        <li>
          <OptionCard selected={selectedId === null} onSelect={() => onChoose(null)}>
            <span className="flex h-16 w-12 shrink-0 items-center justify-center"><Users className="size-6 text-accent-dark" aria-hidden="true" /></span>
            <span>
              <span className="block font-semibold">Prima disponibile</span>
              <span className="block text-sm text-ink-muted">Ti mostriamo tutti gli orari liberi</span>
            </span>
          </OptionCard>
        </li>
        {loading && [0, 1].map((i) => <li key={i}><Skeleton className="h-24" /></li>)}
        {!loading && staff.map((m) => (
          <li key={m.id}>
            <OptionCard selected={m.id === selectedId} onSelect={() => onChoose(m)}>
              <StaffAvatar name={m.name} photoUrl={m.photoUrl} />
              <span>
                <span className="block font-semibold">{m.name}</span>
                {(m.role || m.specialization) && (
                  <span className="block text-sm text-ink-muted">{[m.role, m.specialization].filter(Boolean).join(' · ')}</span>
                )}
              </span>
            </OptionCard>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
