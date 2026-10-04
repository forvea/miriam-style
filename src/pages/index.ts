// MOTIVO: ogni pagina reale è un pacchetto a sé (stack.md §10), caricato con
// import() da main.tsx; da qui si esportano solo i tipi di pagina.
export type PageName = 'home' | 'prenota' | 'conferma' | 'privacy'
