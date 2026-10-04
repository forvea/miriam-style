import { StrictMode, type ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import type { PageName } from '@/pages'
import '@/styles/index.css'

// Ogni pagina reale è un pacchetto separato, caricato solo dove serve
const PAGES: Record<PageName, () => Promise<{ default: ComponentType }>> = {
  home: () => import('@/pages/Home'),
  prenota: () => import('@/pages/Prenota'),
  conferma: () => import('@/pages/Conferma'),
  privacy: () => import('@/pages/PrivacyPolicy'),
}

function isPageName(value: string | undefined): value is PageName {
  return value !== undefined && value in PAGES
}

async function start(): Promise<void> {
  const root = document.getElementById('root')
  const name = document.documentElement.dataset.page
  if (!root || !isPageName(name)) return
  const { default: Page } = await PAGES[name]()
  const app = <StrictMode><Page /></StrictMode>
  // Home e privacy arrivano già scritte dal prerender: si idratano, non si riscrivono
  if (root.firstElementChild) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

void start()
