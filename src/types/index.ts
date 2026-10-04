// FILE: src/types/index.ts
// Si copiano da qui senza modifiche.

/** Icone disponibili. Questo elenco è la fonte unica. */
export type SupportedIcon =
  | 'Scissors' | 'Sparkles' | 'Stethoscope' | 'Activity' | 'Briefcase'
  | 'UserCheck' | 'Calendar' | 'ShieldCheck' | 'Award' | 'Users'
  | 'MapPin' | 'Phone' | 'Mail' | 'Clock' | 'Star'

/** Identità e contatti dell'attività */
export interface BusinessConfig {
  name: string
  email: string
  phone: string                   // leggibile: "+39 331 123 4567"
  whatsapp?: string
  street: string
  cap: string
  city: string
  province: string                // sigla
  neighborhood?: string           // quartiere o zona, per la ricerca locale
  newUrl: string                  // dominio del sito, con lo schema
  foundedYear?: number
  clientsServed?: string          // testo libero: "oltre 800"
  priceRange?: '€' | '€€' | '€€€'
  paymentMethods?: string
  social: SocialConfig
}

/** Solo profili realmente attivi. Tutti assenti → nessuna sezione social. */
export interface SocialConfig {
  instagram?: string
  facebook?: string
  linkedin?: string
  tiktok?: string
}

/** Dati legali — obbligatori nel piè di pagina */
export interface LegalConfig {
  companyName: string
  vatNumber: string
  legalAddress?: string           // solo se diversa dalla sede operativa
}

/** Materiali visivi */
export interface AssetsConfig {
  heroImage?: string              // in /assets/images/
  logoFile?: string               // in /assets/logo/ — assente → logo testuale
  gallery?: string[]              // assente o vuoto → nessuna galleria
}

/** La prima schermata */
export interface HeroConfig {
  badge?: string
  titleStandard: string           // parte non evidenziata del titolo
  titleAccented: string           // parte evidenziata col colore accento
  description: string             // la proposta di valore, con dati concreti
  ctaPrimary: string
  ctaSecondary?: string
  showWhatsappCta: boolean        // vero solo se whatsapp è definito
  showPhoneCta: boolean
}

/** Punto di forza — si rendono i primi 3 */
export interface FeatureConfig {
  iconName: SupportedIcon
  title: string
  description: string
}

/** Servizio — solo per le sezioni del sito, mai per il widget */
export interface ServiceConfig {
  id: string                      // etichetta nostra: "taglio-classico"
  name: string
  category: string
  price: number                   // in euro
  durationMin?: number            // obbligatorio nel template prenotazione
  description?: string
  iconName: SupportedIcon
}

/** Operatore — solo per le sezioni del sito, mai per il widget */
export interface TeamMemberConfig {
  id: string                      // etichetta nostra: "marco-rossi"
  name: string                    // nome e cognome
  role: string
  specialization: string
  yearsOfExperience?: number
  bio?: string
  photoFile?: string              // in /assets/team/
}

/** Chi siamo */
export interface AboutConfig {
  title: string
  text: string
  guarantees?: string[]           // massimo 3
  values?: Array<{ title: string; description: string }>   // massimo 3
}

/** Testimonianza — solo reale e autorizzata. Mai generata. */
export interface TestimonialConfig {
  name: string                    // nome e cognome, mai iniziali
  context?: string                // "Cliente abituale"
  text: string                    // concreto, mai generico
  rating?: 1 | 2 | 3 | 4 | 5
  date?: string                   // "AAAA-MM"
}

/** Domanda frequente */
export interface FaqConfig {
  question: string
  answer: string
  needsApproval?: boolean         // vero se scritta dall'agente e non ancora validata
}

/** Richiamo finale all'azione — testi diversi da quelli della prima schermata */
export interface CtaFinalConfig {
  title: string
  subtitle: string
  ctaLabel: string                // diverso da hero.ctaPrimary
  ctaSecondaryLabel?: string
}

/** Metadati per i motori di ricerca */
export interface SeoConfig {
  title: string                   // massimo 60 caratteri
  description: string             // tra 150 e 160 caratteri
  ogImage: string                 // immagine 1200x630
  schemaType: string              // da seo.md
  coordinates?: { lat: number; lng: number }
  aggregateRating?: { value: number; count: number }   // solo se reale
}

/** LA CONFIGURAZIONE BASE — il template vetrina usa esattamente questa */
export interface TemplateConfig {
  business: BusinessConfig
  legal: LegalConfig
  assets: AssetsConfig
  hero: HeroConfig
  features: FeatureConfig[]       // minimo 3
  services: ServiceConfig[]       // minimo 3
  about: AboutConfig
  team?: TeamMemberConfig[]       // assente → nessuna sezione team
  testimonials?: TestimonialConfig[]   // assente → nessuna sezione
  faq: FaqConfig[]                // minimo 5
  ctaFinal: CtaFinalConfig
  seo: SeoConfig
}

/**
 * Scelte di interfaccia del widget. Nient'altro.
 * Servizi, operatori, prezzi e disponibilità arrivano solo dal Backend.
 */
export interface BookingWidgetConfig {
  /** Il cliente può scegliere l'operatore.
   *  Se è falso, il sito non deve MAI inviare un operatore: il Backend lo
   *  accetterebbe comunque, il controllo è nostro. Vedi backend.md §3. */
  allowStaffSelection: boolean

  /** Mostra il pulsante per spostare la prenotazione nella pagina di conferma.
   *  Si mostra solo quando la prenotazione è ancora disdicibile: sono la stessa
   *  condizione. Vedi backend.md §3. */
  allowReschedule: boolean

  /** Testo mostrato quando il Backend non risponde.
   *  Assente → "Chiamaci al [telefono] per prenotare" */
  fallbackText?: string
}

/** LA CONFIGURAZIONE CON PRENOTAZIONE */
export interface BookingTemplateConfig extends TemplateConfig {
  booking: BookingWidgetConfig
  services: ServiceConfig[]       // durationMin obbligatorio su ognuno
  team: TeamMemberConfig[]        // obbligatorio, almeno 1
}

// ─────────────────────────────────────────────────────────────────────────
// MOTIVO: le interfacce sopra sono copiate da interfacce.md senza modifiche.
// Le righe seguenti non aggiungono campi alla configurazione: espongono da qui
// i tipi delle risposte del Backend (stack.md §8) e il dato degli orari,
// che le interfacce non prevedono (segnalato come COLLAUDO).
export * from './api'
export * from './extra'
