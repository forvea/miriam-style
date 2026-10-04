import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import type { ReactNode } from 'react'
import { MirrorDefs } from '@/components/ui'
import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
  isHome?: boolean
  showBookingLink?: boolean
}

// MOTIVO: reducedMotion="user" riduce le animazioni a semplici dissolvenze con
// prefers-reduced-motion, invece di eliminarle (design-system §10).
export function Layout({ children, isHome = false, showBookingLink = true }: LayoutProps): React.JSX.Element {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <MirrorDefs />
        <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-bg focus:p-3">
          Vai al contenuto
        </a>
        <Header isHome={isHome} showBookingLink={showBookingLink} />
        <main id="contenuto">{children}</main>
        <Footer isHome={isHome} />
      </MotionConfig>
    </LazyMotion>
  )
}
