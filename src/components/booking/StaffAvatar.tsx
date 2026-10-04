import { InitialsMirror } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { initials, normalizeName } from '@/utils'

interface StaffAvatarProps {
  name: string
  photoUrl: string | null
}

/** Foto dal Backend → foto della configurazione con lo stesso nome → iniziali (interfacce §4) */
export function StaffAvatar({ name, photoUrl }: StaffAvatarProps): React.JSX.Element {
  const local = TEMPLATE_CONFIG.team.find((m) => normalizeName(m.name) === normalizeName(name))?.photoFile
  const src = photoUrl ?? (local ? `/assets/team/${local}` : null)
  if (src) return <img src={src} alt="" className="shape-mirror h-16 w-12 shrink-0 object-cover" />
  return <InitialsMirror initials={initials(name)} small className="h-16 w-12 shrink-0" />
}
