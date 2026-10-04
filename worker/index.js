// Worker del sito di test: fa da proxy verso il Backend per /api/booking/* (come
// il proxy di vite.config.ts) e serve tutto il resto dagli asset statici di ./dist.
// MOTIVO: la chiave X-Api-Key si aggiunge qui, lato server; il browser non la vede mai.
const API_PREFIX = '/api/booking'
const BACKEND_URL = 'https://backend-production-70c0.up.railway.app'

/** /api/booking/api/v1/services?x → https://…/api/v1/services?x, stesso metodo, intestazioni e corpo */
function proxyToBackend(request, env, url) {
  const target = `${BACKEND_URL}${url.pathname.slice(API_PREFIX.length)}${url.search}`
  const proxied = new Request(target, request)
  proxied.headers.set('X-Api-Key', env.BOOKING_API_KEY ?? '')
  return fetch(proxied)
}

/** Sito di test con dati inventati: nessuna risposta deve finire nei motori di ricerca */
function noindex(response) {
  const headers = new Headers(response.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const isApi = url.pathname === API_PREFIX || url.pathname.startsWith(`${API_PREFIX}/`)
    const response = isApi ? await proxyToBackend(request, env, url) : await env.ASSETS.fetch(request)
    return noindex(response)
  },
}
