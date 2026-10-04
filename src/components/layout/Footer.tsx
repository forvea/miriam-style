import { CLOSURES_NOTE, OPENING_HOURS } from '@/config/templateConfig'
import { FooterContacts } from './FooterContacts'
import { NAV_ITEMS } from './navigation'

interface FooterProps {
  isHome: boolean
}

// [TOKEN] sezione invertita: --text come fondo, --bg come testo (template-landing §3)
export function Footer({ isHome }: FooterProps): React.JSX.Element {
  const prefix = isHome ? '' : '/'
  return (
    <footer className="bg-ink text-bg">
      <div className="container-site grid gap-8 py-12 md:grid-cols-3">
        <FooterContacts />
        <div>
          <h2 className="font-body text-sm font-semibold tracking-wide text-accent-light uppercase">Orari</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {OPENING_HOURS.map((h) => <li key={h.label}>{h.label}: {h.opens} – {h.closes}</li>)}
            <li>{CLOSURES_NOTE.weekly}</li>
            <li>{CLOSURES_NOTE.holidays}</li>
          </ul>
        </div>
        <nav aria-label="Collegamenti del piè di pagina">
          <h2 className="font-body text-sm font-semibold tracking-wide text-accent-light uppercase">Il sito</h2>
          <ul className="mt-3 flex flex-col gap-1">
            <li><a className="font-semibold text-accent-light underline underline-offset-4" href="/prenota">Prenota</a></li>
            {NAV_ITEMS.map((item) => (
              <li key={item.hash}><a className="underline-offset-4 hover:underline" href={`${prefix}${item.hash}`}>{item.label}</a></li>
            ))}
            <li><a className="underline-offset-4 hover:underline" href="/privacy-policy">Informativa sulla privacy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
