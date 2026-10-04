import { InitialsMirror } from './InitialsMirror'

interface TeamCardProps {
  name: string
  role: string
  specialization: string
  initials: string
  photoSrc?: string
  detail?: string
}

/** Foto se esiste, altrimenti iniziali nella sagoma dello specchio */
export function TeamCard({ name, role, specialization, initials, photoSrc, detail }: TeamCardProps): React.JSX.Element {
  return (
    <article className="flex h-full items-center gap-4 rounded-lg bg-bg p-4 md:flex-col md:items-start md:p-6">
      {photoSrc ? (
        <img src={photoSrc} alt={`${name}, ${role}`} loading="lazy" className="shape-mirror h-24 w-18 object-cover md:h-32 md:w-24" />
      ) : (
        <InitialsMirror initials={initials} className="h-24 w-18 shrink-0 md:h-32 md:w-24" />
      )}
      <div>
        <h3 className="text-xl">{name}</h3>
        <p className="text-sm font-semibold text-accent-dark">{role}</p>
        <p className="mt-1 text-ink-muted">Specializzata in: {specialization.toLowerCase()}</p>
        {detail && <p className="mt-1 text-sm text-ink-muted">{detail}</p>}
      </div>
    </article>
  )
}
