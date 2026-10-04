import { useState } from 'react'
import { FaqItem, SectionHeading } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

export function FaqSection(): React.JSX.Element {
  // [EDIT] la stessa lista alimenta i dati strutturati: testi identici (seo.md §6)
  const { faq } = TEMPLATE_CONFIG
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section id="domande" aria-labelledby="titolo-domande" className="section-y bg-bg">
      <div className="container-site">
        <SectionHeading id="titolo-domande" eyebrow="Domande frequenti" title="Hai qualche dubbio prima di prenotare?" />
        <div className="mt-8 max-w-3xl border-t border-line">
          {faq.map((item, i) => (
            <FaqItem
              key={item.question}
              id={`faq-${i}`}
              question={item.question}
              answer={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
