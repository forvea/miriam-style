// Etichette fisse dell'interfaccia: vivono nel codice, non nella configurazione.
export interface NavItem {
  hash: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { hash: '#servizi', label: 'Servizi e prezzi' },
  { hash: '#team', label: 'Team' },
  { hash: '#chi-siamo', label: 'Chi siamo' },
  { hash: '#domande', label: 'Domande' },
  { hash: '#dove-siamo', label: 'Dove siamo' },
]
