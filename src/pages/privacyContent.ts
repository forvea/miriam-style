// Informativa scritta dall'agente sui dati della scheda.
// DA VALIDARE CON IL CLIENTE (e con un consulente: tempi di conservazione,
// responsabili del trattamento e fornitore di hosting non sono nella scheda).
import { TEMPLATE_CONFIG } from '@/config/templateConfig'

export interface PrivacyBlock {
  title: string
  paragraphs: string[]
}

const { business, legal } = TEMPLATE_CONFIG
const address = `${business.street}, ${business.cap} ${business.city} (${business.province})`

export const PRIVACY_UPDATED = '3 ottobre 2026'

export const PRIVACY_BLOCKS: PrivacyBlock[] = [
  { title: 'Chi tratta i tuoi dati', paragraphs: [
    `Titolare del trattamento è ${legal.companyName}, P.IVA ${legal.vatNumber}, con sede in ${address}. Puoi scrivere a ${business.email} o chiamare il ${business.phone}.`,
  ] },
  { title: 'Quali dati raccogliamo e perché', paragraphs: [
    'Quando prenoti online raccogliamo nome e cognome, numero di telefono, indirizzo email ed eventuali note. Li usiamo solo per gestire l’appuntamento: registrarlo, inviarti la conferma e il promemoria via email, avvisarti in caso di cambiamenti e permetterti di spostarlo o disdirlo.',
    'La base giuridica è l’esecuzione di misure richieste da te prima e durante il servizio (art. 6, par. 1, lett. b del Regolamento UE 2016/679). Senza questi dati non è possibile prenotare online: puoi sempre prenotare per telefono.',
  ] },
  { title: 'Chi riceve i dati', paragraphs: [
    'Le prenotazioni sono gestite da un sistema di prenotazione fornito da un fornitore esterno, che agisce come responsabile del trattamento per conto del salone e invia le email di conferma e promemoria. I dati non vengono venduti né usati per pubblicità.',
  ] },
  { title: 'Per quanto tempo', paragraphs: [
    'Conserviamo i dati della prenotazione per il tempo necessario a gestire l’appuntamento e gli adempimenti di legge collegati, poi li cancelliamo.',
  ] },
  { title: 'Cookie e servizi esterni', paragraphs: [
    'Il sito non usa cookie di profilazione né strumenti di statistica. I caratteri tipografici sono ospitati sul sito stesso. La mappa della sezione “Dove siamo” è fornita da OpenStreetMap: quando la visualizzi, il tuo browser si collega ai server di OpenStreetMap, che ricevono il tuo indirizzo IP.',
  ] },
  { title: 'I tuoi diritti', paragraphs: [
    `Puoi chiedere in ogni momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento o riceverne una copia, scrivendo a ${business.email}. Se ritieni che il trattamento non sia corretto, puoi presentare reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).`,
  ] },
]
