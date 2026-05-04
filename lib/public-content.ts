import type { AppLocale } from '@/lib/i18n'

import { getLocalizedPathname } from '@/lib/i18n'

export const publicPathnames = {
  blog: '/blog',
  contact: '/contatti',
  home: '/',
} as const

export const publicRouteKeys = Object.keys(publicPathnames) as Array<keyof typeof publicPathnames>

export const getPublicHref = (
  route: keyof typeof publicPathnames,
  locale: AppLocale,
): string => {
  return getLocalizedPathname(publicPathnames[route], locale)
}

type SectionFeature = {
  body: string
  eyebrow: string
  items: string[]
  mediaBody: string
  mediaKicker: string
  mediaTitle: string
  title: string
}

type ContactCard = {
  body: string
  title: string
}

type FooterLink = {
  href: keyof typeof publicPathnames
  label: string
}

type HomeCopy = {
  cta: {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  features: SectionFeature[]
  hero: {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  highlights: string[]
  highlightsLabel: string
  intro: {
    body: string
    eyebrow: string
    title: string
  }
}

type ContactCopy = {
  cards: ContactCard[]
  cardsLabel: string
  hero: {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  process: {
    eyebrow: string
    items: string[]
    title: string
  }
}

type BlogCopy = {
  backToBlogLabel: string
  emptyBody: string
  emptyTitle: string
  hero: {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  list: {
    body: string
    eyebrow: string
    title: string
  }
  metadataLabel: string
  postAnchorLabel: string
  readMoreLabel: string
}

type PublicCopy = {
  blog: BlogCopy
  contact: ContactCopy
  footer: {
    links: FooterLink[]
    navigationLabel: string
    note: string
    title: string
  }
  header: {
    brandKicker: string
    languageSwitcherLabel: string
    navigation: FooterLink[]
    navigationLabel: string
    primaryCtaLabel: string
    skipToContentLabel: string
  }
  home: HomeCopy
}

export const publicContent: Record<AppLocale, PublicCopy> = {
  en: {
    blog: {
      backToBlogLabel: 'Back to the journal',
      emptyBody: 'Published stories from the house and the territory will appear here as soon as they are available in the CMS.',
      emptyTitle: 'The journal is ready for its first article.',
      hero: {
        body: 'A bilingual editorial surface for stories, notes from the house, and local routes worth reading before or after a stay.',
        eyebrow: 'Journal',
        primaryLabel: 'Open contact page',
        secondaryLabel: 'Browse articles',
        title: 'Stories that connect the house with the surrounding landscape.',
      },
      list: {
        body: 'Published entries are listed server-side, ordered by publication date, and prepared for future SEO enrichment.',
        eyebrow: 'Published articles',
        title: 'A public archive fed directly by Payload.',
      },
      metadataLabel: 'Published',
      postAnchorLabel: 'Go to article list',
      readMoreLabel: 'Read article',
    },
    contact: {
      cards: [
        {
          body: 'For quiet stays, family gatherings, and time shaped around landscape, food, and slow rhythms.',
          title: 'Stays and tailored inquiries',
        },
        {
          body: 'For private dinners, small celebrations, and hosted moments that need a more intimate setting.',
          title: 'Private occasions',
        },
        {
          body: 'For guests looking for local routes, seasonal suggestions, and ways to experience Umbria beyond the obvious.',
          title: 'Territory and planning',
        },
      ],
      cardsLabel: 'Inquiry areas',
      hero: {
        body: 'This page prepares the public contact area before the persistent lead form is introduced. The tone, structure, and calls to action are already aligned with the hospitality narrative.',
        eyebrow: 'Contact',
        primaryLabel: 'Back to the home page',
        secondaryLabel: 'Browse the public shell',
        title: 'A calm, direct place for requests and first conversations.',
      },
      process: {
        eyebrow: 'How inquiries should feel',
        items: [
          'Start from the stay, not from a generic form field list.',
          'Make room for timing, group size, and type of experience.',
          'Keep expectations clear before introducing automation.',
        ],
        title: 'The next step will connect this page to lead persistence without changing the public narrative.',
      },
    },
    footer: {
      links: [
        { href: 'home', label: 'Home' },
        { href: 'blog', label: 'Journal' },
        { href: 'contact', label: 'Contact' },
      ],
      navigationLabel: 'Footer navigation',
      note: 'Public shell for La Badia, designed as a warm editorial foundation for bilingual pages, storytelling, and direct conversion.',
      title: 'La Badia, San Venanzo, Umbria',
    },
    header: {
      brandKicker: 'Country house',
      languageSwitcherLabel: 'Language switcher',
      navigation: [
        { href: 'home', label: 'Home' },
        { href: 'blog', label: 'Journal' },
        { href: 'contact', label: 'Contact' },
      ],
      navigationLabel: 'Primary navigation',
      primaryCtaLabel: 'Plan your stay',
      skipToContentLabel: 'Skip to content',
    },
    home: {
      cta: {
        body: 'The shell is ready for editorial pages, conversion pages, and future CMS-fed sections without forcing page-specific components.',
        eyebrow: 'Shared CTA',
        primaryLabel: 'Open contact page',
        secondaryLabel: 'View admin',
        title: 'A shared foundation, built to grow into the full site.',
      },
      features: [
        {
          body: 'The public layer starts from atmosphere, pace, and trust signals rather than generic hotel patterns. It leaves room for photography, long-form content, and modular storytelling.',
          eyebrow: 'Hospitality',
          items: ['Warm serif-led rhythm', 'Reusable call-to-action patterns', 'Image-ready editorial sections'],
          mediaBody: 'Space for immersive photography, captions, and room or estate highlights.',
          mediaKicker: 'Visual frame',
          mediaTitle: 'Light, stone, landscape',
          title: 'The house should feel lived in before a booking starts.',
        },
        {
          body: 'The site structure is prepared for content that links the property with the surrounding area: places, seasons, routes, and reasons to stay longer.',
          eyebrow: 'Territory',
          items: ['Long-form sections for place-based narratives', 'Cards ready for routes and seasonal suggestions', 'Shared layout language across marketing and editorial pages'],
          mediaBody: 'A modular visual zone for future maps, image sequences, or regional highlights.',
          mediaKicker: 'Editorial frame',
          mediaTitle: 'Stories beyond the house',
          title: 'The destination narrative is part of the product, not an extra.',
        },
      ],
      hero: {
        body: 'A bilingual, server-first public shell for La Badia with reusable layout parts, conversion primitives, and room for rich editorial content.',
        eyebrow: 'La Badia',
        primaryLabel: 'Open contact page',
        secondaryLabel: 'Explore the foundation',
        title: 'A warm front-end baseline for hospitality, place, and conversion.',
      },
      highlights: [
        'Shared header, footer, and language switcher for IT and EN.',
        'Public routes ready for editorial and lead-generation pages.',
        'Foundational tokens and sections designed for both mobile and desktop.',
      ],
      highlightsLabel: 'What this shell already provides',
      intro: {
        body: 'The first public task is no longer a technical landing page. It is now an actual site shell that can absorb future content without resetting structure or tone.',
        eyebrow: 'Shared shell',
        title: 'Built to hold narrative pages, content depth, and conversion points in the same visual system.',
      },
    },
  },
  it: {
    blog: {
      backToBlogLabel: 'Torna al blog',
      emptyBody: 'Qui compariranno gli articoli pubblicati dal CMS, dedicati alla dimora, al territorio e ai ritmi del soggiorno.',
      emptyTitle: 'Il blog e pronto per il primo articolo.',
      hero: {
        body: 'Una superficie editoriale bilingue per racconti, appunti dalla dimora e itinerari locali da leggere prima o dopo il soggiorno.',
        eyebrow: 'Blog',
        primaryLabel: 'Apri la pagina contatti',
        secondaryLabel: 'Vai agli articoli',
        title: 'Storie che tengono insieme dimora, paesaggio e territorio.',
      },
      list: {
        body: 'Gli articoli pubblicati sono elencati lato server, ordinati per data di pubblicazione e pronti per l arricchimento SEO dei prossimi task.',
        eyebrow: 'Articoli pubblicati',
        title: 'Un archivio pubblico alimentato direttamente da Payload.',
      },
      metadataLabel: 'Pubblicato',
      postAnchorLabel: 'Vai alla lista articoli',
      readMoreLabel: 'Leggi articolo',
    },
    contact: {
      cards: [
        {
          body: 'Per soggiorni lenti, ritrovi di famiglia e richieste costruite attorno a paesaggio, cucina e tempi distesi.',
          title: 'Soggiorni e richieste su misura',
        },
        {
          body: 'Per cene private, piccoli momenti da celebrare e occasioni che richiedono un contesto piu raccolto.',
          title: 'Occasioni private',
        },
        {
          body: 'Per chi cerca percorsi locali, suggerimenti stagionali e un modo di vivere l Umbria oltre il gia visto.',
          title: 'Territorio e pianificazione',
        },
      ],
      cardsLabel: 'Ambiti di richiesta',
      hero: {
        body: 'Questa pagina prepara l area contatti pubblica prima dell introduzione del form con persistenza. Tono, struttura e CTA sono gia allineati alla narrativa di ospitalita.',
        eyebrow: 'Contatti',
        primaryLabel: 'Torna alla home',
        secondaryLabel: 'Esplora la shell pubblica',
        title: 'Uno spazio calmo e diretto per richieste e prime conversazioni.',
      },
      process: {
        eyebrow: 'Come deve funzionare la richiesta',
        items: [
          'Partire dal soggiorno, non da un modulo generico.',
          'Lasciare spazio a periodo, numero di ospiti e tipo di esperienza.',
          'Rendere chiaro cosa aspettarsi prima di introdurre automazioni.',
        ],
        title: 'Il prossimo step colleghera questa pagina alla persistenza lead senza cambiare la narrativa pubblica.',
      },
    },
    footer: {
      links: [
        { href: 'home', label: 'Home' },
        { href: 'blog', label: 'Blog' },
        { href: 'contact', label: 'Contatti' },
      ],
      navigationLabel: 'Navigazione footer',
      note: 'Shell pubblica per La Badia, pensata come fondazione editoriale calda per pagine bilingui, storytelling e conversione diretta.',
      title: 'La Badia, San Venanzo, Umbria',
    },
    header: {
      brandKicker: 'Dimora rurale',
      languageSwitcherLabel: 'Cambio lingua',
      navigation: [
        { href: 'home', label: 'Home' },
        { href: 'blog', label: 'Blog' },
        { href: 'contact', label: 'Contatti' },
      ],
      navigationLabel: 'Navigazione principale',
      primaryCtaLabel: 'Richiedi informazioni',
      skipToContentLabel: 'Vai al contenuto',
    },
    home: {
      cta: {
        body: 'La shell e pronta per pagine editoriali, pagine di conversione e sezioni future alimentate dal CMS senza forzare componenti legati a una singola pagina.',
        eyebrow: 'CTA condivisa',
        primaryLabel: 'Apri la pagina contatti',
        secondaryLabel: 'Apri admin',
        title: 'Una fondazione condivisa, pronta a crescere nel sito completo.',
      },
      features: [
        {
          body: 'Il layer pubblico parte da atmosfera, ritmo e segnali di fiducia invece di ripetere pattern alberghieri generici. Lascia spazio a fotografia, testi estesi e storytelling modulare.',
          eyebrow: 'Ospitalita',
          items: ['Ritmo tipografico caldo e curato', 'Pattern CTA riusabili', 'Sezioni editoriali predisposte per immagini'],
          mediaBody: 'Spazio per fotografia immersiva, didascalie e highlights futuri di camere o dimora.',
          mediaKicker: 'Cornice visiva',
          mediaTitle: 'Luce, pietra, paesaggio',
          title: 'La dimora deve farsi percepire prima ancora che inizi la prenotazione.',
        },
        {
          body: 'La struttura del sito e predisposta per contenuti che tengono insieme la proprieta e il territorio: luoghi, stagioni, percorsi e motivi per fermarsi di piu.',
          eyebrow: 'Territorio',
          items: ['Sezioni lunghe per racconti legati al luogo', 'Card pronte per itinerari e suggerimenti stagionali', 'Linguaggio condiviso tra pagine marketing ed editoriali'],
          mediaBody: 'Una zona visiva modulare pronta per mappe, sequenze fotografiche o focus territoriali.',
          mediaKicker: 'Cornice editoriale',
          mediaTitle: 'Storie oltre la dimora',
          title: 'Il racconto della destinazione e parte del prodotto, non un extra.',
        },
      ],
      hero: {
        body: 'Una shell pubblica bilingue e server-first per La Badia, con layout riusabile, primitive di conversione e spazio per contenuti editoriali ricchi.',
        eyebrow: 'La Badia',
        primaryLabel: 'Apri la pagina contatti',
        secondaryLabel: 'Esplora la base',
        title: 'Una baseline calda per ospitalita, territorio e conversione.',
      },
      highlights: [
        'Header, footer e cambio lingua condivisi tra IT ed EN.',
        'Route pubbliche pronte per pagine editoriali e lead generation.',
        'Token iniziali e sezioni pensate per mobile e desktop.',
      ],
      highlightsLabel: 'Cosa offre gia questa shell',
      intro: {
        body: 'Il primo task pubblico non e piu una landing tecnica. Ora e una vera shell di sito capace di assorbire i contenuti futuri senza riscrivere struttura o tono.',
        eyebrow: 'Shell condivisa',
        title: 'Pensata per tenere insieme pagine narrative, profondita di contenuto e punti di conversione nello stesso sistema visivo.',
      },
    },
  },
}
