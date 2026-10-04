import { m } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

// MOTIVO: data-reveal permette al <noscript> di index.html di mostrare il
// contenuto se lo script non parte (design-system §10).
const OFFSET_Y = 16
const DURATION_S = 0.4

export function Reveal({ children, delay = 0, className }: RevealProps): React.JSX.Element {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: OFFSET_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: DURATION_S, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
