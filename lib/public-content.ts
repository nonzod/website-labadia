import type { AppLocale } from '@/lib/i18n'

import type { PublicRouteKey } from '@/lib/public-pages'

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
  href: PublicRouteKey
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
      emptyBody: 'Stories from the house, the garden, and the Umbrian hills will appear here soon.',
      emptyTitle: 'The journal is ready for its first article.',
      hero: {
        body: 'A bilingual editorial surface for stories, notes from the house, and local routes worth reading before or after a stay.',
        eyebrow: 'Journal',
        primaryLabel: 'Open contact page',
        secondaryLabel: 'Browse articles',
        title: 'Stories that connect the house with the surrounding landscape.',
      },
      list: {
        body: 'Notes from the house, local routes, and seasonal suggestions live here, ready to accompany a stay or inspire the next one.',
        eyebrow: 'Published articles',
        title: 'A journal of place, seasons, and slow itineraries.',
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
        body: 'Use this page to tell us when you would like to come, who is travelling, and whether you are planning a stay, a private occasion, or time shaped around the territory.',
        eyebrow: 'Contact',
        primaryLabel: 'Back to the home page',
        secondaryLabel: 'See inquiry areas',
        title: 'A calm, direct place for requests and first conversations.',
      },
      process: {
        eyebrow: 'How inquiries should feel',
        items: [
          'Start from the stay, not from a generic form field list.',
          'Make room for timing, group size, and type of experience.',
          'Keep expectations clear from the very first exchange.',
        ],
        title: 'The first exchange should already feel clear, warm, and tailored.',
      },
    },
    footer: {
      links: [
        { href: 'home', label: 'Home' },
        { href: 'blog', label: 'Journal' },
        { href: 'contact', label: 'Contact' },
      ],
      navigationLabel: 'Footer navigation',
      note: 'A stone house in San Venanzo, between garden, quiet, and the slower rhythm of the Umbrian hills.',
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
        body: 'Tell us your dates, the number of guests, and whether you are imagining a quiet stay, a private dinner, or time built around Umbria.',
        eyebrow: 'Start your stay',
        primaryLabel: 'Request information',
        secondaryLabel: 'Discover the territory',
        title: 'Begin with the kind of time you want to spend at La Badia.',
      },
      features: [
        {
          body: 'La Badia is rented as a whole apartment inside a stone house in the countryside borgo of San Venanzo. The stay is shaped by generous rooms, antique furniture, new bathrooms, and the freedom to move between house and garden at your own rhythm.',
          eyebrow: 'Stay',
          items: [
            'Around 150 sqm across the third and fourth floors',
            'Six beds across three rooms, including an upper-floor suite',
            'Frescoed salon, oval dining table, and access to the Italian garden',
          ],
          mediaBody: 'A stay here is not room by room. It is the feeling of having the house, the garden, and the slower rhythm of the borgo around you.',
          mediaKicker: 'Where to stay',
          mediaTitle: 'Stone, frescoes, quiet',
          title: 'A house to inhabit fully, not a standard overnight stop.',
        },
        {
          body: 'Beyond the stay, La Badia opens onto local wines, countryside walks, private dinners, and days shaped around Umbria rather than a fixed program.',
          eyebrow: 'Territory',
          items: [
            'Local wine selection, partner wineries, and nearby restaurants',
            'Private cooks, tastings, guided visits, and transfers on request',
            'The frescoed salon, the garden, and the adjoining apse hall for intimate gatherings',
          ],
          mediaBody: 'The territory begins at the gate: olive trees, stone roofs, wild orchids, and routes worth taking slowly.',
          mediaKicker: 'Experiences',
          mediaTitle: 'Umbria at a human pace',
          title: 'The surrounding landscape is part of the stay, not an optional extra.',
        },
      ],
      hero: {
        body: 'A whole apartment in a stone house, between an Italian garden and the Umbrian hills of San Venanzo. Three rooms, six beds, zodiac frescoes, antique furniture, and the quiet of a small borgo.',
        eyebrow: 'La Badia, San Venanzo',
        primaryLabel: 'Request your stay',
        secondaryLabel: 'Discover the house',
        title: 'A countryside dimora to live slowly, together.',
      },
      highlights: [
        'Whole apartment of around 150 sqm, rented as a whole and not by the room.',
        'Italian garden of 2,000 sqm with olive trees and a circular stone rose bed.',
        'Six beds, three rooms, frescoes, local wines, and the Umbrian countryside just outside the door.',
      ],
      highlightsLabel: 'At a glance',
      intro: {
        body: 'At La Badia you do not book a generic stay. You enter a stone house with zodiac frescoes, a 2,000-square-metre garden, and a way of spending time that stays close to the landscape.',
        eyebrow: 'The house',
        title: 'A place for stays, family time, and quiet days in Umbria.',
      },
    },
  },
  it: {
    blog: {
      backToBlogLabel: 'Torna al blog',
      emptyBody: 'Qui arriveranno presto storie dalla dimora, dal giardino e dalle colline umbre.',
      emptyTitle: 'Il blog e pronto per il primo articolo.',
      hero: {
        body: 'Una superficie editoriale bilingue per racconti, appunti dalla dimora e itinerari locali da leggere prima o dopo il soggiorno.',
        eyebrow: 'Blog',
        primaryLabel: 'Apri la pagina contatti',
        secondaryLabel: 'Vai agli articoli',
        title: 'Storie che tengono insieme dimora, paesaggio e territorio.',
      },
      list: {
        body: 'Qui trovano posto appunti dalla dimora, percorsi sul territorio e suggerimenti stagionali da leggere prima di partire o da portare con se al ritorno.',
        eyebrow: 'Articoli pubblicati',
        title: 'Un taccuino di luogo, stagioni e itinerari lenti.',
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
        body: 'Qui puoi raccontarci quando vorresti venire, chi viaggia con te e se stai pensando a un soggiorno, a un occasione privata o a tempo costruito attorno al territorio.',
        eyebrow: 'Contatti',
        primaryLabel: 'Torna alla home',
        secondaryLabel: 'Vedi gli ambiti di richiesta',
        title: 'Uno spazio calmo e diretto per richieste e prime conversazioni.',
      },
      process: {
        eyebrow: 'Come deve funzionare la richiesta',
        items: [
          'Partire dal soggiorno, non da un modulo generico.',
          'Lasciare spazio a periodo, numero di ospiti e tipo di esperienza.',
          'Rendere chiaro cosa aspettarsi fin dal primo scambio.',
        ],
        title: 'Il primo contatto deve gia sembrare chiaro, caldo e su misura.',
      },
    },
    footer: {
      links: [
        { href: 'home', label: 'Home' },
        { href: 'blog', label: 'Blog' },
        { href: 'contact', label: 'Contatti' },
      ],
      navigationLabel: 'Navigazione footer',
      note: 'Una casa in pietra a San Venanzo, tra giardino, quiete e ritmo lento delle colline umbre.',
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
        body: 'Raccontaci il periodo, il numero di ospiti e se immagini un soggiorno quieto, una cena privata o giornate costruite attorno all Umbria.',
        eyebrow: 'Inizia il soggiorno',
        primaryLabel: 'Richiedi informazioni',
        secondaryLabel: 'Scopri il territorio',
        title: 'Parti da come vuoi vivere il tempo alla Badia.',
      },
      features: [
        {
          body: 'La Badia si affitta come appartamento intero dentro una casa in pietra nel borgo di campagna di San Venanzo. Il soggiorno prende forma tra stanze generose, mobili antichi, bagni nuovi e la liberta di passare dal salone al giardino con il proprio ritmo.',
          eyebrow: 'Soggiorno',
          items: [
            'Circa 150 mq tra terzo e quarto piano',
            'Sei posti letto tra tre camere e una suite al piano superiore',
            'Salone affrescato, tavolo ovale antico e accesso al giardino all italiana',
          ],
          mediaBody: 'Qui non si prenota una camera soltanto: si entra in una casa con il giardino, il silenzio e il ritmo lento del borgo tutto intorno.',
          mediaKicker: 'Dove stare',
          mediaTitle: 'Pietra, affreschi, quiete',
          title: 'Una casa da abitare interamente, non una sosta standard.',
        },
        {
          body: 'Oltre al soggiorno, La Badia apre verso vini del territorio, camminate di campagna, cene private e giornate costruite sull Umbria invece che su un programma fisso.',
          eyebrow: 'Territorio',
          items: [
            'Selezione di vini locali, cantine partner e tavole dei dintorni',
            'Cuoco privato, degustazioni, visite guidate e transfer su richiesta',
            'Il salone affrescato, il giardino e la sala abside adiacente per momenti raccolti',
          ],
          mediaBody: 'Il territorio comincia dal cancello: ulivi, tetti di pietra, orchidee selvatiche e strade da prendere con lentezza.',
          mediaKicker: 'Esperienze',
          mediaTitle: 'Umbria a misura umana',
          title: 'Il paesaggio attorno fa parte del soggiorno, non e un extra opzionale.',
        },
      ],
      hero: {
        body: 'Un appartamento intero in una casa di pietra, tra giardino all italiana e colline umbre a San Venanzo. Tre camere, sei posti letto, affreschi zodiacali, mobili antichi e la quiete di un piccolo borgo.',
        eyebrow: 'La Badia, San Venanzo',
        primaryLabel: 'Richiedi il tuo soggiorno',
        secondaryLabel: 'Scopri la dimora',
        title: 'Una dimora di campagna da vivere insieme, con lentezza.',
      },
      highlights: [
        'Appartamento intero di circa 150 mq, affittato nella sua interezza e non a camere.',
        'Giardino all italiana di 2000 mq con ulivi e roseto circolare in pietra.',
        'Sei posti letto, tre camere, salone affrescato, vini del territorio e campagna umbra appena fuori dalla porta.',
      ],
      highlightsLabel: 'In breve',
      intro: {
        body: 'Alla Badia non si prenota un soggiorno generico. Si entra in una casa di pietra con affreschi zodiacali, un giardino di duemila metri e un modo di stare che resta vicino al paesaggio.',
        eyebrow: 'La dimora',
        title: 'Un luogo per stare, ritrovarsi e attraversare l Umbria con calma.',
      },
    },
  },
}
