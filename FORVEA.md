Sistema Forvea versione: v1.0.1
Data generazione: 2026-10-03
Template: PRENOTAZIONE
Marchio esistente: no
Livello animazione: base
Token congelati: src/styles/tokens.css

---

## Note per chi riapre il progetto

**Avvio in locale.** `npm install`, poi `npm run dev` (porta 5173, la stessa
registrata sul salone di sviluppo `miriam-style-dev`). Anteprima della build:
`npm run build && npm run preview`.

**La chiave del Backend non è nel codice del browser.** Sta in `.env.local`
(`BOOKING_API_KEY`, non versionato) e la aggiunge il proxy di `vite.config.ts`
alle chiamate verso `/api/booking`. Vale solo per `vite` e `vite preview`.
Deroga a stack.md §9 e backend.md §1, che prevedono `VITE_BOOKING_API_KEY` nel
browser: decisione presa nel collaudo.

**Prima della messa online (bloccante).**
- In produzione `/api/booking/*` va servito da una funzione lato server
  (probabile Cloudflare) che aggiunge `X-Api-Key`. Oggi non esiste.
- Recensioni: SEGNAPOSTO — DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA
  PUBBLICAZIONE (`src/config/templateConfig.ts`).
- Tutti i valori marcati `DA VALIDARE CON IL CLIENTE` in `templateConfig.ts` e
  `src/pages/privacyContent.ts`, comprese le coordinate (OpenStreetMap non ha il
  civico 9: posizione a livello di via).
- Design approvato: NO nella scheda.

**Scelte strutturali fatte qui.**
- Pagine multiple di Vite (`index.html`, `prenota/`, `conferma/`,
  `privacy-policy/`), ognuna con i suoi metadati e il suo robots senza JavaScript.
- Home e privacy prerenderizzate in build (`src/entry-server.tsx`,
  `scripts/prerender.mjs`, solo `react-dom/server`, nessuna dipendenza nuova). Il
  prerender esegue i controlli di interfacce.md §6 e blocca la build se falliscono.
- Dati strutturati generati dalla stessa configurazione delle sezioni: le FAQ
  coincidono parola per parola.
- Orari, chiusure e zone servite: costanti fuori dalle interfacce
  (`src/types/extra.ts`), perché interfacce.md non le prevede.
- `/prenota` fuori dalla sitemap (noindex e Disallow in robots.txt).
- Font ospitati sul sito: Fraunces (istanze fisse 400, SOFT 50) e Figtree.
