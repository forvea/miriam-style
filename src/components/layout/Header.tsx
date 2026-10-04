import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Wordmark } from '@/components/ui'
import { TEMPLATE_CONFIG } from '@/config/templateConfig'
import { NAV_ITEMS } from './navigation'

interface HeaderProps {
  isHome: boolean
  showBookingLink: boolean
}

export function Header({ isHome, showBookingLink }: HeaderProps): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const prefix = isHome ? '' : '/'
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="container-site flex min-h-16 items-center justify-between gap-4">
        {/* [EDIT] nome dell'attività */}
        <a href="/" className="text-ink" title="Torna alla home">
          <Wordmark name={TEMPLATE_CONFIG.business.name} />
        </a>
        <nav aria-label="Sezioni del sito" className="hidden lg:block">
          <ul className="flex gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.hash}><a className="hover:text-accent-dark" href={`${prefix}${item.hash}`}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {showBookingLink && <a href="/prenota" className="btn-secondary px-4 py-2 text-sm">Prenota</a>}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Sezioni del sito" className="border-t border-line lg:hidden">
          <ul className="container-site flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.hash}>
                <a className="flex min-h-11 items-center" href={`${prefix}${item.hash}`} onClick={() => setOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
