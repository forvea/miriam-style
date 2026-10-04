// Prerender di home e privacy: il contenuto è nell'HTML prima di qualunque
// script (seo.md §5). Usato solo in build da scripts/prerender.mjs.
import { renderToString } from 'react-dom/server'
import { AREAS_SERVED, OPENING_HOURS, TEMPLATE_CONFIG } from '@/config/templateConfig'
import { Home } from '@/pages/Home'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { buildStructuredData, validateConfig } from '@/utils'

export function renderHome(): string {
  return renderToString(<Home />)
}

export function renderPrivacy(): string {
  return renderToString(<PrivacyPolicy />)
}

export function structuredDataScripts(): string {
  return buildStructuredData(TEMPLATE_CONFIG, OPENING_HOURS, AREAS_SERVED)
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')
}

export function configProblems(): string[] {
  return validateConfig(TEMPLATE_CONFIG)
}
