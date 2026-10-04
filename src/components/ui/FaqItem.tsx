import { m } from 'motion/react'
import { ChevronDown } from 'lucide-react'

interface FaqItemProps {
  id: string
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}

// Apertura sotto i 200 ms (template-landing §5)
const OPEN_DURATION_S = 0.18

/**
 * MOTIVO: la risposta resta sempre nell'HTML, anche chiusa: i dati strutturati
 * FAQPage devono coincidere parola per parola con la pagina (seo.md §6).
 * Chiusa è inert: fuori dalla tabulazione e dai lettori di schermo.
 */
export function FaqItem({ id, question, answer, open, onToggle }: FaqItemProps): React.JSX.Element {
  return (
    <div className="border-b border-line">
      <h3 className="font-body text-lg font-semibold">
        <button
          type="button"
          id={`${id}-domanda`}
          aria-expanded={open}
          aria-controls={`${id}-risposta`}
          onClick={onToggle}
          className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left"
        >
          {question}
          <ChevronDown className={`size-5 shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <m.div
        id={`${id}-risposta`}
        role="region"
        aria-labelledby={`${id}-domanda`}
        inert={!open}
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: OPEN_DURATION_S }}
        className={`overflow-hidden ${open ? '' : 'h-0 opacity-0'}`}
      >
        <p className="max-w-prose pb-4 text-ink-muted">{answer}</p>
      </m.div>
    </div>
  )
}
