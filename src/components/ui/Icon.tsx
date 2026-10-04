import {
  Activity, Award, Briefcase, Calendar, Clock, Mail, MapPin, Phone, Scissors,
  ShieldCheck, Sparkles, Star, Stethoscope, UserCheck, Users, type LucideIcon,
} from 'lucide-react'
import type { SupportedIcon } from '@/types'

const ICONS: Record<SupportedIcon, LucideIcon> = {
  Activity, Award, Briefcase, Calendar, Clock, Mail, MapPin, Phone, Scissors,
  ShieldCheck, Sparkles, Star, Stethoscope, UserCheck, Users,
}

interface IconProps {
  name: SupportedIcon
  className?: string
}

/** Icone decorative: il significato è sempre anche nel testo accanto */
export function Icon({ name, className }: IconProps): React.JSX.Element {
  const Component = ICONS[name]
  return <Component className={className} aria-hidden="true" strokeWidth={1.75} />
}
