// [EDIT] L'unico file con i dati del cliente: Miriam Style, Rescaldina (MI).
// Fonte: cliente-miriam-style.md. I valori marcati "scritto dall'agente" non
// vengono dalla scheda; quelli marcati DA VALIDARE CON IL CLIENTE vanno
// approvati prima della messa online.
import type {
  BookingTemplateConfig,
  ClosuresNoteConfig,
  OpeningHoursConfig,
} from '@/types'

export const TEMPLATE_CONFIG: BookingTemplateConfig = {
  business: {
    name: 'Miriam Style',
    email: 'info@miriamstyle.it',
    phone: '+39 347 838 4366',
    whatsapp: '+39 347 838 4366',
    street: 'Via Don Luigi Repetti 9',
    cap: '20027',
    city: 'Rescaldina',
    province: 'MI',
    // scritto dall'agente: la via è nella frazione Rescalda secondo OpenStreetMap
    neighborhood: 'Rescalda',
    newUrl: 'https://miriamstyle.it',
    // scritto dall'agente dal listino (22–55 €) // DA VALIDARE CON IL CLIENTE
    priceRange: '€€',
    social: {},
  },

  legal: {
    companyName: 'Miriam Style di Miriam Dino',
    vatNumber: '00000000000',
  },

  assets: {
    heroImage: '/assets/images/parrucchiere-donna-rescaldina-piega-mossa.webp',
    // MOTIVO: le interfacce non hanno un campo per le foto delle singole sezioni.
    // [0] → sezione Chi siamo, [1] → sezione Dove siamo (scheda §9). Con meno
    // di 3 immagini la galleria non esiste (template-landing §2).
    gallery: [
      '/assets/images/salone-miriam-style-rescaldina-reception.webp',
      '/assets/images/miriam-style-rescaldina-ingresso-via-repetti-9.webp',
    ],
  },

  // scritto dall'agente // DA VALIDARE CON IL CLIENTE
  hero: {
    badge: 'Su appuntamento, dal martedì al sabato',
    titleStandard: 'Parrucchiere donna a Rescaldina',
    titleAccented: 'Miriam Style',
    description:
      'Taglio su misura con consulenza a 35 €, colore completo a 55 €, piega a 22 €. ' +
      'Miriam fa la parrucchiera da 10 anni: prima ti ascolta, poi ti consiglia. ' +
      'Scegli giorno, ora e operatrice online, senza telefonare.',
    ctaPrimary: 'Prenota il tuo appuntamento',
    ctaSecondary: 'Scrivi su WhatsApp',
    showWhatsappCta: true,
    showPhoneCta: true,
  },

  // scritto dall'agente da "cosa la distingue" (scheda §8) // DA VALIDARE CON IL CLIENTE
  features: [
    {
      iconName: 'UserCheck',
      title: 'Prima ti ascolta, poi taglia',
      description:
        'Ogni taglio parte da una consulenza: come porti i capelli ogni giorno, quanto tempo ' +
        'hai la mattina, cosa vuoi cambiare. Il taglio si costruisce su questo.',
    },
    {
      iconName: 'Clock',
      title: 'Orario continuato, 9:00 – 18:30',
      description:
        'Dal martedì al sabato senza pausa pranzo: puoi venire anche nell’intervallo dal ' +
        'lavoro, o il sabato mattina.',
    },
    {
      iconName: 'Users',
      title: 'Una cliente alla volta',
      description:
        'Tre operatrici, ognuna segue una sola cliente per volta. Il tempo del tuo ' +
        'appuntamento è tutto per te, in un ambiente tranquillo.',
    },
  ],

  services: [
    {
      id: 'taglio-donna',
      name: 'Taglio donna',
      category: 'Taglio',
      price: 35,
      durationMin: 45,
      description: 'Taglio su misura, con consulenza prima di iniziare.',
      iconName: 'Scissors',
    },
    {
      id: 'colore',
      name: 'Colore',
      category: 'Colore',
      price: 55,
      durationMin: 90,
      description: 'Colorazione completa, tempo di posa compreso.',
      iconName: 'Sparkles',
    },
    {
      id: 'piega',
      name: 'Piega',
      category: 'Piega',
      price: 22,
      durationMin: 30,
      description: 'Asciugatura e piega.',
      iconName: 'Star',
    },
  ],

  about: {
    // scritto dall'agente
    title: 'Chi è Miriam, e perché le clienti tornano?',
    // scritto dall'agente dalla storia in scheda §8 // DA VALIDARE CON IL CLIENTE
    text:
      'Miriam Dino fa la parrucchiera da 10 anni e si è formata in una scuola per hair ' +
      'stylist. Nel salone di Via Don Luigi Repetti 9 lavora con Giulia, che segue il ' +
      'colore, e Sara, specializzata in pieghe e acconciature.\n' +
      'Qui si lavora con gentilezza e senza fretta: l’obiettivo è che tu esca più sicura ' +
      'di te, con un taglio che sai portare anche a casa.',
  },

  team: [
    {
      id: 'miriam-dino',
      name: 'Miriam Dino',
      role: 'Titolare, hair stylist',
      specialization: 'Taglio e consulenza d’immagine',
      yearsOfExperience: 10,
    },
    {
      id: 'giulia',
      name: 'Giulia',
      role: 'Hair stylist',
      specialization: 'Colore',
    },
    {
      id: 'sara',
      name: 'Sara',
      role: 'Hair stylist',
      specialization: 'Piega e acconciature',
    },
  ],

  // SEGNAPOSTO – DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA PUBBLICAZIONE
  // Testi inventati per il collaudo (scheda §8); cognomi inventati su richiesta.
  testimonials: [
    {
      // SEGNAPOSTO – DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA PUBBLICAZIONE
      name: 'Chiara Morelli',
      text:
        'Finalmente una parrucchiera che ascolta davvero cosa voglio. Miriam mi ha ' +
        'consigliato un taglio che non avrei mai provato, e ora non torno indietro.',
    },
    {
      // SEGNAPOSTO – DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA PUBBLICAZIONE
      name: 'Elena Rossetti',
      text: 'Ambiente tranquillo, si sta bene. Giulia sul colore è precisissima.',
    },
    {
      // SEGNAPOSTO – DA SOSTITUIRE CON RECENSIONI REALI PRIMA DELLA PUBBLICAZIONE
      name: 'Francesca Bianchi',
      text: 'Prenoto sempre la piega del sabato da Sara: puntuali e gentili.',
    },
  ],

  // scritte dall'agente: la scheda non ne fornisce // DA VALIDARE CON IL CLIENTE
  faq: [
    {
      question: 'Quanto costa un taglio donna da Miriam Style a Rescaldina?',
      answer:
        'Il taglio donna costa 35 € e dura circa 45 minuti, consulenza compresa. Prima di ' +
        'iniziare si decide insieme il taglio. Puoi prenotarlo online scegliendo giorno e ora.',
      needsApproval: true,
    },
    {
      question: 'Come si prenota un appuntamento?',
      answer:
        'Si prenota online dalla pagina Prenota: scegli il servizio, l’operatrice o la prima ' +
        'disponibile, il giorno e l’orario. Ricevi subito un’email di conferma. Se preferisci, ' +
        'puoi anche chiamare o scrivere su WhatsApp al +39 347 838 4366.',
      needsApproval: true,
    },
    {
      question: 'Quali sono gli orari del salone?',
      answer:
        'Il salone è aperto dal martedì al sabato, dalle 9:00 alle 18:30, con orario ' +
        'continuato. È chiuso la domenica, il lunedì e nelle festività nazionali.',
      needsApproval: true,
    },
    {
      question: 'Posso spostare o disdire una prenotazione?',
      answer:
        'Sì, fino a 2 ore prima dell’appuntamento. Usa il collegamento “Gestisci la ' +
        'prenotazione” nell’email di conferma: puoi cambiare giorno e ora o disdire. Più ' +
        'tardi, chiama il salone.',
      needsApproval: true,
    },
    {
      question: 'Quanto dura un appuntamento per il colore?',
      answer:
        'Il colore dura circa 90 minuti, tempo di posa compreso, e costa 55 €. Se vuoi anche ' +
        'la piega, prenotala come appuntamento separato subito dopo.',
      needsApproval: true,
    },
    {
      question: 'Dove si trova Miriam Style?',
      answer:
        'Miriam Style è in Via Don Luigi Repetti 9, 20027 Rescaldina (MI), nella frazione ' +
        'Rescalda. È comodo da Gerenzano, Uboldo, Cislago e Castellanza.',
      needsApproval: true,
    },
  ],

  // scritto dall'agente // DA VALIDARE CON IL CLIENTE
  ctaFinal: {
    title: 'Il tuo prossimo taglio è a due passi da casa',
    subtitle:
      'Orario continuato dal martedì al sabato, 9:00 – 18:30. Scegli tu l’operatrice e ' +
      'l’orario che ti è comodo.',
    ctaLabel: 'Scegli giorno e ora',
    ctaSecondaryLabel: 'Chiama il salone',
  },

  // scritto dall'agente secondo seo.md
  seo: {
    title: 'Parrucchiere donna a Rescaldina | Miriam Style',
    description:
      'Miriam Style, parrucchiere donna a Rescaldina (MI): taglio con consulenza 35 €, ' +
      'colore 55 €, piega 22 €. Aperto mar–sab 9–18:30. Prenota il tuo turno online.',
    ogImage: '/assets/images/og-miriam-style-parrucchiere-rescaldina.jpg',
    schemaType: 'HairSalon',
    // ricavate da OpenStreetMap a livello di via (il civico 9 non è mappato)
    // DA VALIDARE CON IL CLIENTE
    coordinates: { lat: 45.6319494, lng: 8.938435 },
  },

  booking: {
    allowStaffSelection: true,
    allowReschedule: true,
  },
}

// [EDIT] Dati fuori dalle interfacce: vedi src/types/extra.ts (COLLAUDO).
export const OPENING_HOURS: OpeningHoursConfig[] = [
  {
    days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    label: 'Martedì – sabato',
    opens: '09:00',
    closes: '18:30',
  },
]

export const CLOSURES_NOTE: ClosuresNoteConfig = {
  weekly: 'Domenica e lunedì chiuso',
  holidays: 'Chiuso nelle festività nazionali',
}

export const AREAS_SERVED: string[] = [
  'Rescaldina', 'Rescalda', 'Gerenzano', 'Uboldo', 'Cislago', 'Castellanza',
]
