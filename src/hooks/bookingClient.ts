// Chiamate al Backend: attesa massima, forma degli errori, un solo tentativo
// automatico sulle letture (backend.md §4, §9).
// MOTIVO: l'indirizzo è un percorso dello stesso sito (/api/booking). La chiave
// la aggiunge il proxy lato server: nel codice del browser non c'è mai.
import type { ApiErrorBody, ApiFailure, ApiResult } from '@/types'

// MOTIVO: .env non è nel repository, quindi la build su Cloudflare non ha la
// variabile; il percorso è sempre lo stesso, servito dal Worker (worker/index.js)
const BASE_URL = import.meta.env.VITE_BOOKING_API_URL || '/api/booking'
const TIMEOUT_MS = 8000
const SERVER_ERROR = 500

function failure(kind: ApiFailure['kind'], status: number, body?: ApiErrorBody): ApiFailure {
  return {
    ok: false, kind, status,
    type: body?.type ?? (kind === 'network' ? 'network_error' : 'unknown'),
    message: body?.message ?? '',
    errors: body?.errors ?? {},
  }
}

function isErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === 'object' && value !== null && 'type' in value && 'message' in value
}

async function readBody(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

async function send<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const body = await readBody(response)
    if (response.ok) return { ok: true, data: body as T } // MOTIVO: forma garantita dal contratto backend.md §3
    return failure('http', response.status, isErrorBody(body) ? body : undefined)
  } catch {
    return failure('network', 0)
  }
}

function isTransient(result: ApiResult<unknown>): boolean {
  return !result.ok && (result.kind === 'network' || result.status >= SERVER_ERROR)
}

/** Letture: un tentativo automatico in più su rete, attesa scaduta o errore del server */
export async function getJson<T>(path: string): Promise<ApiResult<T>> {
  const first = await send<T>(path, { method: 'GET' })
  return isTransient(first) ? send<T>(path, { method: 'GET' }) : first
}

/** Scritture: nessun tentativo automatico qui; i casi ammessi li decide chi chiama */
export function writeJson<T>(method: 'POST' | 'PUT' | 'DELETE', path: string, payload?: unknown): Promise<ApiResult<T>> {
  return send<T>(path, { method, body: payload === undefined ? undefined : JSON.stringify(payload) })
}

/** Il Backend non risponde o è configurato male: si passa subito al telefono */
export function needsPhoneFallback(failure: ApiFailure): boolean {
  return failure.kind === 'network' || failure.status >= SERVER_ERROR || failure.status === 401 || failure.type === 'forbidden'
}
