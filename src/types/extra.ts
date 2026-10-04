// MOTIVO: interfacce.md non prevede gli orari di apertura nella configurazione
// ("le regole del salone arrivano dal Backend"), ma seo.md §4 e §6 chiedono gli
// orari nella pagina al primo caricamento e nei dati strutturati. Questo tipo
// copre solo quel bisogno; il widget continua a usare gli orari del Backend.
// Segnalato come COLLAUDO per l'evoluzione di interfacce.md.

export type WeekDay =
  | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'
  | 'Friday' | 'Saturday' | 'Sunday'

/** Un gruppo di giorni con lo stesso orario. I giorni di chiusura si omettono. */
export interface OpeningHoursConfig {
  days: WeekDay[]
  label: string // leggibile: "martedì – sabato"
  opens: string // "HH:mm"
  closes: string // "HH:mm"
}

/** Chiusure dichiarate a parole, per la pagina */
export interface ClosuresNoteConfig {
  weekly: string
  holidays: string
}
