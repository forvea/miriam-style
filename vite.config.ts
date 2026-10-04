import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Connect, type Plugin, type ProxyOptions } from 'vite'

const ROOT = import.meta.dirname
const API_PREFIX = '/api/booking'
const KEY_PATTERN = /^bk_live_[0-9a-f]{32}$/

/**
 * Proxy verso il Backend: il browser chiama /api/booking sullo stesso sito, la
 * chiave X-Api-Key si aggiunge qui, lato server. MOTIVO: la chiave non deve mai
 * arrivare al browser. Vale per `vite` e `vite preview`; in produzione serve una
 * funzione lato server equivalente (COLLAUDO).
 */
function bookingProxy(env: Record<string, string>): Record<string, ProxyOptions> {
  return {
    [API_PREFIX]: {
      target: env.BOOKING_API_URL,
      changeOrigin: true,
      rewrite: (path) => path.slice(API_PREFIX.length),
      headers: { 'X-Api-Key': env.BOOKING_API_KEY ?? '' },
    },
  }
}

const PAGE_PATHS = ['/prenota', '/conferma', '/privacy-policy']

/** /prenota?x → /prenota/index.html?x: ogni pagina ha il suo HTML con i suoi metadati */
const rewritePages: Connect.NextHandleFunction = (req, _res, next) => {
  const [path, query = ''] = (req.url ?? '').split('?')
  const page = PAGE_PATHS.find((p) => path === p || path === `${p}/`)
  if (page) req.url = `${page}/index.html${query ? `?${query}` : ''}`
  next()
}

const pagesPlugin: Plugin = {
  name: 'forvea-pagine',
  configureServer: (server) => { server.middlewares.use(rewritePages) },
  configurePreviewServer: (server) => { server.middlewares.use(rewritePages) },
}

const CHUNKS: Array<[string, RegExp]> = [
  ['vendor', /node_modules\/(react|react-dom|scheduler)\//],
  ['icons', /node_modules\/lucide-react\//],
  ['motion', /node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//],
]

function chunkFor(id: string): string | undefined {
  return CHUNKS.find(([, pattern]) => pattern.test(id))?.[0]
}

export default defineConfig(({ mode }) => {
  // Prefisso vuoto: legge anche le variabili senza VITE_, che restano lato server
  const env = loadEnv(mode, ROOT, '')
  if (!KEY_PATTERN.test(env.BOOKING_API_KEY ?? '')) {
    // Solo un avviso sulla forma: il valore non si stampa mai
    process.stderr.write('[forvea] BOOKING_API_KEY assente o non nella forma bk_live_… in .env.local\n')
  }
  const proxy = bookingProxy(env)
  return {
    plugins: [pagesPlugin, react(), tailwindcss()],
    resolve: { alias: { '@': resolve(ROOT, 'src') } },
    server: { port: 5173, strictPort: true, proxy },
    preview: { port: 5173, strictPort: true, proxy },
    build: {
      target: 'es2020',
      rollupOptions: {
        input: {
          home: resolve(ROOT, 'index.html'),
          prenota: resolve(ROOT, 'prenota/index.html'),
          conferma: resolve(ROOT, 'conferma/index.html'),
          privacy: resolve(ROOT, 'privacy-policy/index.html'),
        },
        output: {
          // MOTIVO: Vite 8 (Rolldown) accetta manualChunks solo come funzione;
          // la forma a oggetto di stack.md §10 non compila più (COLLAUDO)
          manualChunks: chunkFor,
        },
      },
      chunkSizeWarningLimit: 500,
    },
  }
})
