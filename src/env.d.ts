/// <reference types="vite/client" />

interface ImportMetaEnv {
  // MOTIVO: opzionale, nessun codice di statistica per questo cliente (COLLAUDO)
  readonly VITE_ANALYTICS_ID?: string

  // solo template prenotazione.
  // MOTIVO: è un percorso dello stesso sito (/api/booking), servito dal proxy.
  // VITE_BOOKING_API_KEY non esiste: la chiave resta lato server (BOOKING_API_KEY
  // in .env.local, letta solo da vite.config.ts). Deroga a stack.md §9, COLLAUDO.
  readonly VITE_BOOKING_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
