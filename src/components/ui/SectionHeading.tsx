import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  intro?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, intro }: SectionHeadingProps): React.JSX.Element {
  return (
    <header className="max-w-prose">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl md:text-3xl">{title}</h2>
      {intro && <div className="mt-4 text-lg text-ink-muted">{intro}</div>}
    </header>
  )
}
