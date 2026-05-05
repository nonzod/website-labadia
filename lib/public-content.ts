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

export type HomeDoor = {
  body: string
  href: PublicRouteKey
  imageAlt: string
  imageSrc: string
  label: string
  title: string
}

export type HomeHeroCopy = {
  body: string
  eyebrow: string
  imageAlt: string
  imageSrc: string
  primaryHref: PublicRouteKey
  primaryLabel: string
  secondaryHref: PublicRouteKey
  secondaryLabel: string
  title: string
}

export type HomeProofSection = {
  body: string
  eyebrow: string
  items: Array<{
    quote: string
    source: string
  }>
  title: string
}

export type HomeEventsSection = {
  body: string
  eyebrow: string
  items: Array<{
    body: string
    title: string
  }>
  primaryHref: PublicRouteKey
  primaryLabel: string
  title: string
}

type HomeCopy = {
  cta: {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  doors: HomeDoor[]
  doorsSectionLabel: string
  events: HomeEventsSection
  hero: HomeHeroCopy
  intro: {
    body: string
    eyebrow: string
    title: string
  }
  proof: HomeProofSection
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
        body: 'Tell us your dates, the number of guests, and whether you are imagining a quiet stay, an open event, or time shaped around the Umbrian hills.',
        eyebrow: 'Start your stay',
        primaryLabel: 'Request information',
        secondaryLabel: 'Discover the territory',
        title: 'Begin with the kind of time you want to spend at La Badia.',
      },
      doors: [
        {
          body: 'A whole apartment inside a stone house, with frescoes, antique furniture, generous rooms, and the freedom to move between salon and garden at your own rhythm.',
          href: 'dimora',
          imageAlt: 'Sunset light over La Badia, olive trees, and the stone garden wall.',
          imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
          label: 'Stay',
          title: 'The house',
        },
        {
          body: 'Open events, private dinners, tastings, local routes, and occasions that turn the stay into a slower way of being in Umbria.',
          href: 'experiences',
          imageAlt: 'Umbrian hills seen from La Badia in warm evening light.',
          imageSrc: '/images/editorial/vista-colline.jpg',
          label: 'Experience',
          title: 'Live La Badia',
        },
      ],
      doorsSectionLabel: 'Editorial entry points',
      events: {
        body: 'Some dates will stay open to local guests and travelers alike: long-table dinners, seasonal gatherings, and small cultural evenings shaped for this house.',
        eyebrow: 'Open moments',
        items: [
          {
            body: 'Small evenings where food, wine, and conversation stay close to the house and its slower pace.',
            title: 'Open dinners',
          },
          {
            body: 'Readings, seasonal notes, and intimate gatherings designed for guests already here and for people arriving just for the event.',
            title: 'Editorial evenings',
          },
          {
            body: 'Events remain intentionally limited in size, so the atmosphere stays quiet, warm, and coherent with the place.',
            title: 'A measured rhythm',
          },
        ],
        primaryHref: 'experiences',
        primaryLabel: 'Go to experiences',
        title: 'Events open to everyone will arrive here.',
      },
      hero: {
        body: 'A whole apartment in a stone house, between an Italian garden and the Umbrian hills of San Venanzo. Three rooms, six beds, zodiac frescoes, antique furniture, and the quiet of a small borgo.',
        eyebrow: 'La Badia, San Venanzo',
        imageAlt: 'La Badia at sunset, framed by olive trees and the garden wall.',
        imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
        primaryHref: 'contact',
        primaryLabel: 'Request your stay',
        secondaryHref: 'dimora',
        secondaryLabel: 'Discover the house',
        title: 'A countryside dimora to live slowly, together.',
      },
      intro: {
        body: 'At La Badia you do not book a generic stay. You enter a stone house with zodiac frescoes, a 2,000-square-metre garden, and a way of spending time that stays close to the landscape.',
        eyebrow: 'The house',
        title: 'A place for stays, family time, and quiet days in Umbria.',
      },
      proof: {
        body: 'Even in this first editorial version, the promise needs to feel concrete: a whole apartment, a real garden, and a pace that already belongs to the place.',
        eyebrow: 'Why it feels credible',
        items: [
          {
            quote: 'Around 150 sqm across the third and fourth floors, rented as a whole apartment and not room by room.',
            source: 'Stay format',
          },
          {
            quote: 'Six beds across three rooms, with a frescoed salon, oval dining table, and access to the Italian garden.',
            source: 'House details',
          },
          {
            quote: 'Local wines, private cooks, nearby routes, and a small Umbrian borgo just outside the door.',
            source: 'Territory and rhythm',
          },
        ],
        title: 'The stay is specific, not generic.',
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
        body: 'Raccontaci il periodo, il numero di ospiti e se immagini un soggiorno quieto, un evento aperto o giornate costruite attorno alle colline umbre.',
        eyebrow: 'Inizia il soggiorno',
        primaryLabel: 'Richiedi informazioni',
        secondaryLabel: 'Scopri il territorio',
        title: 'Parti da come vuoi vivere il tempo alla Badia.',
      },
      doors: [
        {
          body: 'Un appartamento intero dentro una casa in pietra, con affreschi, mobili antichi, stanze generose e la liberta di passare dal salone al giardino con il proprio ritmo.',
          href: 'dimora',
          imageAlt: 'La Badia al tramonto tra ulivi, muro in pietra e giardino.',
          imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
          label: 'Soggiorno',
          title: 'La dimora',
        },
        {
          body: 'Eventi aperti, cene private, degustazioni, percorsi locali e occasioni che trasformano il soggiorno in un modo piu lento di stare in Umbria.',
          href: 'experiences',
          imageAlt: 'Le colline umbre viste dalla Badia nella luce calda della sera.',
          imageSrc: '/images/editorial/vista-colline.jpg',
          label: 'Esperienze',
          title: 'Vivi La Badia',
        },
      ],
      doorsSectionLabel: 'Ingressi editoriali',
      events: {
        body: 'Alcune date resteranno aperte anche a chi non soggiorna: tavolate stagionali, piccoli incontri e serate culturali costruite sul ritmo di questa casa.',
        eyebrow: 'Momenti aperti',
        items: [
          {
            body: 'Serate raccolte dove cucina, vino e conversazione restano vicini alla casa e al suo passo piu lento.',
            title: 'Cene aperte',
          },
          {
            body: 'Letture, appunti stagionali e piccoli incontri pensati per chi soggiorna e per chi arriva solo per l evento.',
            title: 'Serate editoriali',
          },
          {
            body: 'Il numero resta contenuto, cosi l atmosfera puo rimanere quieta, calda e coerente con il luogo.',
            title: 'Un ritmo misurato',
          },
        ],
        primaryHref: 'experiences',
        primaryLabel: 'Vai alle esperienze',
        title: 'Eventi aperti a tutti arriveranno qui.',
      },
      hero: {
        body: 'Un appartamento intero in una casa di pietra, tra giardino all italiana e colline umbre a San Venanzo. Tre camere, sei posti letto, affreschi zodiacali, mobili antichi e la quiete di un piccolo borgo.',
        eyebrow: 'La Badia, San Venanzo',
        imageAlt: 'La Badia al tramonto, tra il giardino e gli ulivi.',
        imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
        primaryHref: 'contact',
        primaryLabel: 'Richiedi il tuo soggiorno',
        secondaryHref: 'dimora',
        secondaryLabel: 'Scopri la dimora',
        title: 'Una dimora di campagna da vivere insieme, con lentezza.',
      },
      intro: {
        body: 'Alla Badia non si prenota un soggiorno generico. Si entra in una casa di pietra con affreschi zodiacali, un giardino di duemila metri e un modo di stare che resta vicino al paesaggio.',
        eyebrow: 'La dimora',
        title: 'Un luogo per stare, ritrovarsi e attraversare l Umbria con calma.',
      },
      proof: {
        body: 'Anche in questa prima superficie editoriale la promessa deve restare concreta: un appartamento intero, un giardino reale e un ritmo che appartiene gia al luogo.',
        eyebrow: 'Perche appare credibile',
        items: [
          {
            quote: 'Circa 150 mq tra terzo e quarto piano, affittati come appartamento intero e non a camere.',
            source: 'Formato del soggiorno',
          },
          {
            quote: 'Sei posti letto tra tre camere, con salone affrescato, tavolo ovale antico e accesso al giardino all italiana.',
            source: 'Dettagli della casa',
          },
          {
            quote: 'Vini del territorio, cuoco privato, percorsi vicini e il piccolo borgo umbro appena fuori dalla porta.',
            source: 'Territorio e ritmo',
          },
        ],
        title: 'Il soggiorno e specifico, non generico.',
      },
    },
  },
}
