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

type EditorialImageCopy = {
  imageAlt: string
  imageCaption: string
  imageLabel: string
  imageSrc: string
}

export type HomeDoor = EditorialImageCopy & {
  body: string
  ctaLabel: string
  href: PublicRouteKey
  label: string
  number: string
  stats: string[]
  sublabel: string
  title: string
}

export type HomeHeroCopy = EditorialImageCopy & {
  body: string
  eyebrow: string
  metaEnd: string
  metaStart: string
  primaryHref: PublicRouteKey
  primaryLabel: string
  scrollLabel: string
  secondaryHref: PublicRouteKey
  secondaryLabel: string
  title: string
}

export type HomeMediaStoryCopy = EditorialImageCopy & {
  body: string
  eyebrow: string
  id: string
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
  emptyStateBody: string
  eyebrow: string
  items: Array<{
    body: string
    date: string
    schedule: string
    title: string
    venue: string
  }>
  primaryHref: PublicRouteKey
  primaryLabel: string
  title: string
}

export type EditorialPageHeroCopy = {
  body: string
  eyebrow: string
  imageAlt: string
  imageSrc: string
  title: string
}

export type EditorialFactItem = {
  body: string
  title: string
}

export type HomeDetailItem = {
  label: string
  unit: string
  value: string
}

type EditorialEventsSection = {
  body: string
  emptyStateBody: string
  eyebrow: string
  title: string
}

type EditorialFactsPage = {
  facts: EditorialFactItem[]
  factsTitle: string
  hero: EditorialPageHeroCopy
}

type ExperiencesPage = EditorialFactsPage & {
  eventsSection: EditorialEventsSection
}

type StoriesPage = {
  blogBridge: {
    body: string
    eyebrow: string
    primaryLabel: string
    title: string
  }
  hero: EditorialPageHeroCopy
}

type HomeCopy = {
  cta: EditorialImageCopy & {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  detailItems: HomeDetailItem[]
  doors: HomeDoor[]
  doorsEyebrow: string
  doorsSectionLabel: string
  doorsTitle: string
  events: HomeEventsSection
  facts: EditorialFactItem[]
  factsTitle: string
  hero: HomeHeroCopy
  intro: {
    body: string
    eyebrow: string
    title: string
  }
  mediaStories: HomeMediaStoryCopy[]
  proof: HomeProofSection
  reviewsMeta: string[]
}

type ContactCopy = {
  cards: ContactCard[]
  cardsLabel: string
  confirmation: {
    body: string
    eyebrow: string
    primaryLabel: string
    secondaryLabel: string
    title: string
  }
  form: {
    body: string
    eyebrow: string
    errors: {
      desiredPeriod: string
      email: string
      guestCount: string
      message: string
      name: string
      summary: string
    }
    fields: {
      desiredPeriod: {
        label: string
        placeholder: string
      }
      email: {
        label: string
        placeholder: string
      }
      guestCount: {
        label: string
        placeholder: string
      }
      message: {
        label: string
        placeholder: string
      }
      name: {
        label: string
        placeholder: string
      }
      phone: {
        hint: string
        label: string
        placeholder: string
      }
    }
    pendingLabel: string
    submitLabel: string
    title: string
  }
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
  dimora: EditorialFactsPage
  experiences: ExperiencesPage
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
  stories: StoriesPage
  territory: EditorialFactsPage
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
      confirmation: {
        body: 'Your first request is safely with us. We will reply as soon as we can with a more tailored next step.',
        eyebrow: 'Request received',
        primaryLabel: 'Back to the home page',
        secondaryLabel: 'Open the contact page again',
        title: 'Request received.',
      },
      form: {
        body: 'Share your preferred timing, how many guests are travelling, and the atmosphere you have in mind. We store the request before anything else happens.',
        eyebrow: 'Inquiry form',
        errors: {
          desiredPeriod: 'Tell us the period you have in mind.',
          email: 'Enter a valid email address.',
          guestCount: 'Enter a guest count greater than zero.',
          message: 'Add a little more detail to your request.',
          name: 'Enter your name.',
          summary: 'Check the highlighted fields and try again.',
        },
        fields: {
          desiredPeriod: {
            label: 'Desired period',
            placeholder: 'Late September or 24-28 September',
          },
          email: {
            label: 'Email',
            placeholder: 'guest@example.com',
          },
          guestCount: {
            label: 'Guest count',
            placeholder: '4',
          },
          message: {
            label: 'Message',
            placeholder:
              'Tell us about your stay, who is travelling, and any detail that will help us understand the request.',
          },
          name: {
            label: 'Name',
            placeholder: 'Ada Lovelace',
          },
          phone: {
            hint: 'Optional, if you would like to be called back.',
            label: 'Phone',
            placeholder: '+44 7700 900123',
          },
        },
        pendingLabel: 'Sending request...',
        submitLabel: 'Send request',
        title: 'Tell us about your stay.',
      },
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
    dimora: {
      facts: [
        {
          body: 'A whole apartment of around 150 square metres spread across the third and fourth floors, designed for families or small groups who want to stay together.',
          title: 'A complete stay format',
        },
        {
          body: 'Three bedrooms, six beds, a frescoed salon, antique furnishings, and an oval dining table shape the stay with character rather than generic hospitality cues.',
          title: 'Rooms with identity',
        },
        {
          body: 'The Italian garden, the small borgo setting, and the quiet pace of San Venanzo turn the house into a base for slower days in Umbria.',
          title: 'A house tied to its place',
        },
      ],
      factsTitle: 'What defines the stay at La Badia.',
      hero: {
        body: 'La Badia is not a scattered room offer. It is a whole apartment inside a stone house, where family time, shared meals, and quiet routines can unfold with space and character.',
        eyebrow: 'The house',
        imageAlt: 'The stone house of La Badia framed by olive trees at sunset.',
        imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
        title: 'A countryside dimora shaped for staying together.',
      },
    },
    experiences: {
      eventsSection: {
        body: 'Public events stay tied to the scale of the house: a small calendar of dinners, seasonal gatherings, and hosted moments that still feel close to La Badia.',
        emptyStateBody: 'No public events are scheduled right now. Check back for the next gathering at La Badia.',
        eyebrow: 'Events',
        title: 'Public events',
      },
      facts: [
        {
          body: 'Open dinners and small gatherings can welcome local guests and travelers without forcing the house into a large-event logic.',
          title: 'Open moments with measure',
        },
        {
          body: 'Private dinners, tastings, and hosted occasions can be built around the stay itself, keeping the atmosphere intimate and coherent.',
          title: 'Hosted experiences',
        },
        {
          body: 'The goal is not volume. It is a calendar of occasions that feel editorial, seasonal, and genuinely connected to the rhythm of the house.',
          title: 'Seasonal and story-led',
        },
      ],
      factsTitle: 'How experiences can grow from the house.',
      hero: {
        body: 'Experiences at La Badia begin from the scale of the house: small dinners, seasonal gatherings, local tastings, and occasions where guests and place can still feel close to one another.',
        eyebrow: 'Experiences',
        imageAlt: 'Umbrian hills viewed from La Badia in warm evening light.',
        imageSrc: '/images/editorial/vista-colline.jpg',
        title: 'Events, dinners, and hosted moments with a quieter rhythm.',
      },
    },
    footer: {
      links: [
        { href: 'dimora', label: 'The house' },
        { href: 'experiences', label: 'Experiences' },
        { href: 'territory', label: 'Territory' },
        { href: 'stories', label: 'Stories' },
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
        { href: 'dimora', label: 'The house' },
        { href: 'experiences', label: 'Experiences' },
        { href: 'territory', label: 'Territory' },
        { href: 'stories', label: 'Stories' },
      ],
      navigationLabel: 'Primary navigation',
      primaryCtaLabel: 'Book now',
      skipToContentLabel: 'Skip to content',
    },
    home: {
      cta: {
        body: 'Tell us your dates, the number of guests, and whether you are imagining a quiet stay, an open event, or time shaped around the Umbrian hills.',
        eyebrow: 'Start your stay',
        imageAlt: 'Night view from La Badia across the rooftops and Umbrian hills.',
        imageCaption: 'Stone roofs, distant hills, and the quieter side of San Venanzo after sunset.',
        imageLabel: 'After sunset',
        imageSrc: '/images/editorial/vista-colline-notte.jpg',
        primaryLabel: 'Book now',
        secondaryLabel: 'Discover the territory',
        title: 'Begin with the kind of time you want to spend at La Badia.',
      },
      detailItems: [
        { label: 'Whole apartment', unit: 'sqm', value: '150' },
        { label: 'Italian garden', unit: 'sqm', value: '2,000' },
        { label: 'Three rooms, one suite', unit: 'beds', value: '6' },
        { label: 'Frescoed salon', unit: 'sqm', value: '41' },
        { label: 'From the paved road', unit: 'm', value: '100' },
      ],
      doors: [
        {
          body: 'A whole apartment inside a stone house, with frescoes, antique furniture, generous rooms, and the freedom to move between salon and garden at your own rhythm.',
          ctaLabel: 'Discover the house',
          href: 'dimora',
          imageAlt: 'Sunset light over La Badia, olive trees, and the stone garden wall.',
          imageCaption: 'Olive trees, the garden wall, and the first exterior view of the house at golden hour.',
          imageLabel: 'The house from outside',
          imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
          label: 'Stay',
          number: 'I',
          stats: ['150 sqm', '6 beds', '3 rooms', '2,000 sqm garden'],
          sublabel: 'For those looking for where to stay',
          title: 'The house',
        },
        {
          body: 'Open events, private dinners, tastings, local routes, and occasions that turn the stay into a slower way of being in Umbria.',
          ctaLabel: 'Discover the experiences',
          href: 'experiences',
          imageAlt: 'Umbrian hills seen from La Badia in warm evening light.',
          imageCaption: 'The hills begin directly outside the house, before dinner and after it.',
          imageLabel: 'The surrounding landscape',
          imageSrc: '/images/editorial/vista-colline.jpg',
          label: 'Experience',
          number: 'II',
          stats: ['Wine club', 'Concerts', 'Tertulias', 'Apse hall'],
          sublabel: 'For those looking for an experience',
          title: 'Live La Badia',
        },
      ],
      doorsEyebrow: 'Two doors',
      doorsSectionLabel: 'Editorial entry points',
      doorsTitle: 'Two editorial ways to enter La Badia.',
      events: {
        body: 'The frescoed salon, the garden, and the apse hall next door host a first agenda of open evenings, dinners, and measured gatherings. You can join even without staying overnight.',
        emptyStateBody: 'The agenda is ready even when the next public date has not been published yet.',
        eyebrow: 'Agenda · spring — summer 2026',
        items: [
          {
            body: 'A shared dinner in the garden with Umbrian wines and a small table gathered around the season.',
            date: '24 May 2026',
            schedule: '19:30',
            title: 'Long-table dinner',
            venue: 'Italian garden',
          },
          {
            body: 'Readings, conversation, and candlelight in the frescoed room, open to guests and local visitors alike.',
            date: '7 June 2026',
            schedule: '18:30',
            title: 'Editorial evening',
            venue: 'Frescoed salon',
          },
          {
            body: 'A guided tasting followed by a quieter concert in the adjacent hall, kept intentionally limited in size.',
            date: '21 June 2026',
            schedule: '18:00',
            title: 'Wine club and chamber music',
            venue: 'Apse hall',
          },
        ],
        primaryHref: 'experiences',
        primaryLabel: 'Go to experiences',
        title: 'Events open to everyone.',
      },
      facts: [
        {
          body: 'Around 150 square metres across the third and fourth floors, kept as one apartment so families and small groups can live the house together.',
          title: 'A whole-stay format',
        },
        {
          body: 'Three bedrooms, six beds, a frescoed salon, an oval dining table, and direct access to the Italian garden make the stay concrete from the first glance.',
          title: 'House details with character',
        },
        {
          body: 'San Venanzo, local wineries, private cooks, and slower routes through Umbria turn the house into a base, not just a room to sleep in.',
          title: 'A stay tied to place',
        },
      ],
      factsTitle: 'Three concrete details that shape the stay.',
      hero: {
        body: 'A whole apartment in a stone house, between an Italian garden and the Umbrian hills of San Venanzo. Three rooms, six beds, zodiac frescoes, antique furniture, and the quiet of a small borgo.',
        eyebrow: 'La Badia, San Venanzo',
        imageAlt: 'La Badia at sunset, framed by olive trees and the garden wall.',
        imageCaption: 'Olive trees, the stone wall, and the garden edge frame the house before you even step inside.',
        imageLabel: 'Stone house · Italian garden',
        imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
        metaEnd: 'Vocabolo Badia 5 — MMXXVI',
        metaStart: '42°51′N · 12°16′E',
        primaryHref: 'contact',
        primaryLabel: 'Book now',
        scrollLabel: 'Scroll',
        secondaryHref: 'dimora',
        secondaryLabel: 'Discover the house',
        title: 'A countryside dimora to live slowly, together.',
      },
      intro: {
        body: 'At La Badia you do not book a generic stay. You enter a stone house with zodiac frescoes, a 2,000-square-metre garden, and a way of spending time that stays close to the landscape.',
        eyebrow: 'The house',
        title: 'A place for stays, family time, and quiet days in Umbria.',
      },
      mediaStories: [
        {
          body: 'The visual direction needs to make the stay feel grounded immediately: stone walls, low evening light, and the sense that the house belongs to a real borgo rather than a hospitality template. The frescoed salon and the garden matter more once the atmosphere is already believable.',
          eyebrow: 'Stone and quiet',
          id: 'media-house',
          imageAlt: 'La Badia in blue hour light, with stone walls and the quiet garden nearby.',
          imageCaption: 'Stone walls, low lights, and the calm that begins before entering the house.',
          imageLabel: 'Blue hour in the borgo',
          imageSrc: '/images/editorial/hero-notte.jpg',
          title: 'The house should be seen before it is fully explained.',
        },
        {
          body: 'The territory is not a separate excursion layer. It is the horizon that shapes breakfasts, returns, open evenings, and the slower tempo of the stay itself. Showing that horizon in the homepage keeps the narrative tied to Umbria instead of flattening it into generic booking copy.',
          eyebrow: 'Territory in sight',
          id: 'media-territory',
          imageAlt: 'Night view over the rooftops and Umbrian hills seen from La Badia.',
          imageCaption: 'Rooflines, distance, and the slower geography that stays around San Venanzo at night.',
          imageLabel: 'Hills after dark',
          imageSrc: '/images/editorial/vista-colline-notte.jpg',
          title: 'The Umbrian hills stay inside the experience of the house.',
        },
      ],
      proof: {
        body: 'What returns in the reviews is not generic comfort. Guests speak about atmosphere, quiet, and the feeling of inhabiting a real place rather than a hospitality template.',
        eyebrow: 'Guest voices',
        items: [
          {
            quote: 'The house is more beautiful than any photograph. The garden at dawn, with hoopoes calling, is something we still talk about.',
            source: 'Chiara & Matteo · Airbnb · May 2025',
          },
          {
            quote: 'Rare balance: generous spaces, real silence, and a salon that makes dinner feel like part of the stay, not just a practical moment.',
            source: 'Helen R. · Booking · September 2025',
          },
          {
            quote: 'We came for Umbria and ended up rearranging our days around the house itself. That almost never happens.',
            source: 'Luca and friends · Guest note · June 2024',
          },
        ],
        title: 'People return, and then they write back.',
      },
      reviewsMeta: ['Airbnb · 4.98 / 5 · 84 reviews', 'Booking · 9.6 / 10 · 52 reviews', 'Open since 2021'],
    },
    stories: {
      blogBridge: {
        body: 'The journal is where house notes, local routes, and slower seasonal pieces can accumulate over time. This page frames that editorial direction before the archive becomes richer.',
        eyebrow: 'Editorial bridge',
        primaryLabel: 'Open the journal',
        title: 'Stories are the place where stay, landscape, and return visits meet.',
      },
      hero: {
        body: 'Racconti is the editorial threshold for notes from the house, landscape fragments, seasonal observations, and routes that turn a stay into a longer memory.',
        eyebrow: 'Stories',
        imageAlt: 'Night view over the Umbrian hills from La Badia.',
        imageSrc: '/images/editorial/vista-colline.jpg',
        title: 'A narrative surface for the house and the territory around it.',
      },
    },
    territory: {
      facts: [
        {
          body: 'San Venanzo sits between hills, borgos, woods, and practical day routes that can stay close to the house instead of demanding long transfers.',
          title: 'A usable local radius',
        },
        {
          body: 'Wine, food, walking routes, and small Umbrian landmarks matter here when they support a slower stay rather than a checklist itinerary.',
          title: 'Landscape with rhythm',
        },
        {
          body: 'The territory page should help guests understand how the house connects with outings, returns, and quieter days in between.',
          title: 'Stay and place together',
        },
      ],
      factsTitle: 'How the surrounding territory supports the stay.',
      hero: {
        body: 'The territory around La Badia is part of the stay itself: hills, small towns, seasonal routes, and local producers that make Umbria feel close, legible, and never rushed.',
        eyebrow: 'Territory',
        imageAlt: 'Rolling Umbrian hills seen from La Badia at dusk.',
        imageSrc: '/images/editorial/vista-colline.jpg',
        title: 'A house that opens directly onto slower routes through Umbria.',
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
      confirmation: {
        body: 'La tua prima richiesta e gia con noi. Ti risponderemo appena possibile con un prossimo passo piu preciso e su misura.',
        eyebrow: 'Richiesta ricevuta',
        primaryLabel: 'Torna alla home',
        secondaryLabel: 'Apri di nuovo la pagina contatti',
        title: 'Richiesta ricevuta.',
      },
      form: {
        body: 'Condividi il periodo che hai in mente, quante persone viaggiano con te e il tipo di atmosfera che stai cercando. La richiesta viene salvata prima di qualsiasi altro passaggio.',
        eyebrow: 'Modulo richiesta',
        errors: {
          desiredPeriod: 'Indica il periodo desiderato.',
          email: 'Inserisci un indirizzo email valido.',
          guestCount: 'Indica un numero di ospiti maggiore di zero.',
          message: 'Aggiungi qualche dettaglio in piu alla richiesta.',
          name: 'Inserisci il tuo nome.',
          summary: 'Controlla i campi evidenziati e riprova.',
        },
        fields: {
          desiredPeriod: {
            label: 'Periodo desiderato',
            placeholder: 'Fine settembre o 24-28 settembre',
          },
          email: {
            label: 'Email',
            placeholder: 'ospite@example.com',
          },
          guestCount: {
            label: 'Numero di ospiti',
            placeholder: '4',
          },
          message: {
            label: 'Messaggio',
            placeholder:
              'Raccontaci il tipo di soggiorno che immagini, chi viaggia con te e ogni dettaglio utile per capire meglio la richiesta.',
          },
          name: {
            label: 'Nome',
            placeholder: 'Ada Lovelace',
          },
          phone: {
            hint: 'Opzionale, se preferisci essere ricontattato anche al telefono.',
            label: 'Telefono',
            placeholder: '+39 333 1234567',
          },
        },
        pendingLabel: 'Invio in corso...',
        submitLabel: 'Invia la richiesta',
        title: 'Raccontaci il tuo soggiorno.',
      },
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
    dimora: {
      facts: [
        {
          body: 'Un appartamento intero di circa 150 mq tra terzo e quarto piano, pensato per famiglie o piccoli gruppi che vogliono stare insieme.',
          title: 'Un formato di soggiorno completo',
        },
        {
          body: 'Tre camere, sei posti letto, un salone affrescato, arredi antichi e un tavolo ovale danno al soggiorno carattere invece di un ospitalita generica.',
          title: 'Stanze con identita',
        },
        {
          body: 'Il giardino all italiana, il piccolo borgo e il ritmo quieto di San Venanzo fanno della dimora una base naturale per giorni lenti in Umbria.',
          title: 'Una casa legata al luogo',
        },
      ],
      factsTitle: 'Cio che definisce il soggiorno alla Badia.',
      hero: {
        body: 'La Badia non e un offerta di camere sparse. E un appartamento intero dentro una casa in pietra, dove tempo condiviso, pasti lenti e giorni quieti possono prendere forma con spazio e carattere.',
        eyebrow: 'La dimora',
        imageAlt: 'La casa in pietra della Badia tra ulivi e luce di tramonto.',
        imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
        title: 'Una dimora di campagna pensata per stare insieme.',
      },
    },
    experiences: {
      eventsSection: {
        body: 'Gli appuntamenti pubblici restano legati alla scala della casa: un piccolo calendario di cene, incontri stagionali e momenti ospitati che restano vicini alla Badia.',
        emptyStateBody: 'Al momento non ci sono eventi pubblici in calendario. Torna a controllare per il prossimo appuntamento alla Badia.',
        eyebrow: 'Eventi',
        title: 'Appuntamenti pubblici',
      },
      facts: [
        {
          body: 'Cene aperte e piccoli incontri possono accogliere ospiti del territorio e viaggiatori senza trasformare la casa in un luogo da grande evento.',
          title: 'Momenti aperti ma misurati',
        },
        {
          body: 'Cene private, degustazioni e occasioni ospitate possono nascere dal soggiorno stesso, mantenendo l atmosfera raccolta e coerente.',
          title: 'Esperienze ospitate',
        },
        {
          body: 'L obiettivo non e il volume ma un calendario di occasioni stagionali, editoriali e realmente legate al ritmo della dimora.',
          title: 'Un calendario stagionale',
        },
      ],
      factsTitle: 'Come possono nascere le esperienze alla Badia.',
      hero: {
        body: 'Le esperienze alla Badia partono dalla scala della casa: piccole cene, incontri stagionali, degustazioni e occasioni in cui ospiti e luogo possono restare vicini.',
        eyebrow: 'Esperienze',
        imageAlt: 'Le colline umbre viste dalla Badia nella luce calda della sera.',
        imageSrc: '/images/editorial/vista-colline.jpg',
        title: 'Eventi, cene e momenti ospitati con un ritmo piu quieto.',
      },
    },
    footer: {
      links: [
        { href: 'dimora', label: 'La Dimora' },
        { href: 'experiences', label: 'Esperienze' },
        { href: 'territory', label: 'Territorio' },
        { href: 'stories', label: 'Racconti' },
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
        { href: 'dimora', label: 'La Dimora' },
        { href: 'experiences', label: 'Esperienze' },
        { href: 'territory', label: 'Territorio' },
        { href: 'stories', label: 'Racconti' },
      ],
      navigationLabel: 'Navigazione principale',
      primaryCtaLabel: 'Prenota ora',
      skipToContentLabel: 'Vai al contenuto',
    },
    home: {
      cta: {
        body: 'Raccontaci il periodo, il numero di ospiti e se immagini un soggiorno quieto, un evento aperto o giornate costruite attorno alle colline umbre.',
        eyebrow: 'Inizia il soggiorno',
        imageAlt: 'Vista notturna dai tetti della Badia verso le colline umbre.',
        imageCaption: 'Tetti in pietra, colline lontane e il lato piu quieto di San Venanzo dopo il tramonto.',
        imageLabel: 'Dopo il tramonto',
        imageSrc: '/images/editorial/vista-colline-notte.jpg',
        primaryLabel: 'Prenota ora',
        secondaryLabel: 'Scopri il territorio',
        title: 'Parti da come vuoi vivere il tempo alla Badia.',
      },
      detailItems: [
        { label: 'Appartamento intero', unit: 'mq', value: '150' },
        { label: 'Giardino all italiana', unit: 'mq', value: '2.000' },
        { label: 'Tre camere, una suite', unit: 'letti', value: '6' },
        { label: 'Salone con affreschi', unit: 'mq', value: '41' },
        { label: 'Dalla strada asfaltata', unit: 'm', value: '100' },
      ],
      doors: [
        {
          body: 'Un appartamento intero dentro una casa in pietra, con affreschi, mobili antichi, stanze generose e la liberta di passare dal salone al giardino con il proprio ritmo.',
          ctaLabel: 'Scopri la dimora',
          href: 'dimora',
          imageAlt: 'La Badia al tramonto tra ulivi, muro in pietra e giardino.',
          imageCaption: 'Ulivi, muro del giardino e primo affaccio esterno della dimora nella luce calda.',
          imageLabel: 'La dimora da fuori',
          imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
          label: 'Soggiorno',
          number: 'I',
          stats: ['150 mq', '6 posti letto', '3 camere', 'Giardino 2.000 mq'],
          sublabel: 'Per chi cerca dove soggiornare',
          title: 'La dimora',
        },
        {
          body: 'Eventi aperti, cene private, degustazioni, percorsi locali e occasioni che trasformano il soggiorno in un modo piu lento di stare in Umbria.',
          ctaLabel: 'Scopri le esperienze',
          href: 'experiences',
          imageAlt: 'Le colline umbre viste dalla Badia nella luce calda della sera.',
          imageCaption: 'Le colline iniziano subito fuori dalla casa, prima di cena e dopo il rientro.',
          imageLabel: 'Il paesaggio intorno',
          imageSrc: '/images/editorial/vista-colline.jpg',
          label: 'Esperienze',
          number: 'II',
          stats: ['Club del vino', 'Concerti', 'Tertulie', 'Sala abside'],
          sublabel: 'Per chi cerca un esperienza',
          title: 'Vivi La Badia',
        },
      ],
      doorsEyebrow: 'Due porte',
      doorsSectionLabel: 'Ingressi editoriali',
      doorsTitle: 'Due modi editoriali per entrare nella Badia.',
      events: {
        body: 'Il salone affrescato, il giardino e la sala abside adiacente ospitano una prima agenda di cene, serate e incontri misurati. Si puo partecipare anche senza soggiornare.',
        emptyStateBody: 'L agenda resta pronta anche quando la prossima data pubblica non e ancora stata pubblicata.',
        eyebrow: 'Agenda · primavera — estate 2026',
        items: [
          {
            body: 'Una tavolata in giardino con cucina umbra, vini del territorio e un numero volutamente contenuto di ospiti.',
            date: '24 maggio 2026',
            schedule: '19:30',
            title: 'Cena conviviale in giardino',
            venue: 'Giardino all italiana',
          },
          {
            body: 'Letture, conversazione e luce di candela nel salone con affreschi, aperte a chi e gia in casa e a chi arriva solo per la serata.',
            date: '7 giugno 2026',
            schedule: '18:30',
            title: 'Serata editoriale',
            venue: 'Salone affrescato',
          },
          {
            body: 'Una degustazione guidata seguita da un piccolo concerto, con ritmo raccolto e posti limitati.',
            date: '21 giugno 2026',
            schedule: '18:00',
            title: 'Club del vino e musica da camera',
            venue: 'Sala abside',
          },
        ],
        primaryHref: 'experiences',
        primaryLabel: 'Vai alle esperienze',
        title: 'Eventi aperti a tutti.',
      },
      facts: [
        {
          body: 'Circa 150 mq tra terzo e quarto piano, vissuti come appartamento unico cosi famiglie e piccoli gruppi possono abitare la casa insieme.',
          title: 'Un formato di soggiorno intero',
        },
        {
          body: 'Tre camere, sei posti letto, salone affrescato, tavolo ovale antico e accesso diretto al giardino all italiana rendono l esperienza concreta fin dal primo sguardo.',
          title: 'Dettagli di casa con carattere',
        },
        {
          body: 'San Venanzo, cantine vicine, cuochi privati e percorsi lenti in Umbria trasformano la dimora in una base da vivere, non in una stanza da occupare.',
          title: 'Un soggiorno legato al luogo',
        },
      ],
      factsTitle: 'Tre elementi concreti che danno forma al soggiorno.',
      hero: {
        body: 'Un appartamento intero in una casa di pietra, tra giardino all italiana e colline umbre a San Venanzo. Tre camere, sei posti letto, affreschi zodiacali, mobili antichi e la quiete di un piccolo borgo.',
        eyebrow: 'La Badia, San Venanzo',
        imageAlt: 'La Badia al tramonto, tra il giardino e gli ulivi.',
        imageCaption: 'Ulivi, muro in pietra e bordo del giardino incorniciano la casa prima ancora di entrarci.',
        imageLabel: 'Casa in pietra · giardino all italiana',
        imageSrc: '/images/editorial/hero-ulivi-tramonto.jpg',
        metaEnd: 'Vocabolo Badia 5 — MMXXVI',
        metaStart: '42°51′N · 12°16′E',
        primaryHref: 'contact',
        primaryLabel: 'Prenota ora',
        scrollLabel: 'Continua',
        secondaryHref: 'dimora',
        secondaryLabel: 'Scopri la dimora',
        title: 'Una dimora di campagna da vivere insieme, con lentezza.',
      },
      intro: {
        body: 'Alla Badia non si prenota un soggiorno generico. Si entra in una casa di pietra con affreschi zodiacali, un giardino di duemila metri e un modo di stare che resta vicino al paesaggio.',
        eyebrow: 'La dimora',
        title: 'Un luogo per stare, ritrovarsi e attraversare l Umbria con calma.',
      },
      mediaStories: [
        {
          body: 'La direzione visiva deve rendere il soggiorno concreto ancora prima dei dettagli: mura in pietra, luce bassa, quiete del borgo e il senso che la casa appartenga davvero al luogo. Affreschi, salone e giardino acquistano peso proprio quando l atmosfera smette di sembrare astratta.',
          eyebrow: 'Pietra e quiete',
          id: 'media-house',
          imageAlt: 'La Badia nella luce blu della sera, tra muri in pietra e giardino quieto.',
          imageCaption: 'Muri in pietra, luci basse e la calma che comincia prima di entrare nella dimora.',
          imageLabel: 'Ora blu nel borgo',
          imageSrc: '/images/editorial/hero-notte.jpg',
          title: 'La casa va vista prima di essere spiegata fino in fondo.',
        },
        {
          body: 'Il territorio non e un blocco separato da visitare dopo. E l orizzonte che da forma alle colazioni, ai rientri, alle serate aperte e al ritmo lento del soggiorno stesso. Mostrarlo dentro la homepage tiene la narrazione agganciata all Umbria invece di ridurla a una promessa generica.',
          eyebrow: 'Territorio in vista',
          id: 'media-territory',
          imageAlt: 'Vista notturna sui tetti del borgo e sulle colline umbre dalla Badia.',
          imageCaption: 'Linee di tetto, distanza e geografia lenta che resta attorno a San Venanzo di notte.',
          imageLabel: 'Colline dopo il buio',
          imageSrc: '/images/editorial/vista-colline-notte.jpg',
          title: 'Le colline umbre restano dentro l esperienza della casa.',
        },
      ],
      proof: {
        body: 'Nelle recensioni non torna un comfort generico. Tornano atmosfera, silenzio, affaccio sul giardino e il senso di abitare un luogo vero invece di un format ospitale qualsiasi.',
        eyebrow: 'Voci degli ospiti',
        items: [
          {
            quote: 'La casa e piu bella di qualunque fotografia. Il giardino all alba, con il canto delle upupe, e una cosa che non si dimentica.',
            source: 'Chiara e Matteo · Airbnb · maggio 2025',
          },
          {
            quote: 'Raro equilibrio: spazi generosi, vero silenzio e un salone che rende la cena parte del soggiorno, non solo un momento pratico.',
            source: 'Helen R. · Booking · settembre 2025',
          },
          {
            quote: 'Siamo arrivati per vedere l Umbria e abbiamo finito per organizzare le giornate attorno alla casa stessa. Succede di rado.',
            source: 'Luca e amici · Guest note · giugno 2024',
          },
        ],
        title: 'Chi torna, poi scrive.',
      },
      reviewsMeta: ['Airbnb · 4.98 / 5 · 84 recensioni', 'Booking · 9.6 / 10 · 52 recensioni', 'Aperti dal 2021'],
    },
    stories: {
      blogBridge: {
        body: 'Il blog e il luogo dove possono accumularsi appunti dalla casa, percorsi locali e testi stagionali. Questa pagina introduce quella direzione editoriale prima che l archivio si allarghi.',
        eyebrow: 'Ponte editoriale',
        primaryLabel: 'Apri il blog',
        title: 'I racconti sono il punto in cui soggiorno, paesaggio e ritorno si incontrano.',
      },
      hero: {
        body: 'Racconti e la soglia editoriale per appunti dalla dimora, frammenti di paesaggio, note stagionali e percorsi che trasformano il soggiorno in una memoria piu lunga.',
        eyebrow: 'Racconti',
        imageAlt: 'Vista serale sulle colline umbre dalla Badia.',
        imageSrc: '/images/editorial/vista-colline.jpg',
        title: 'Una superficie narrativa per la dimora e il territorio che la circonda.',
      },
    },
    territory: {
      facts: [
        {
          body: 'San Venanzo si trova tra colline, borghi, boschi e percorsi praticabili in giornata, senza imporre spostamenti lunghi o frenetici.',
          title: 'Un raggio locale davvero utile',
        },
        {
          body: 'Vino, cucina, cammini e piccoli riferimenti umbri contano quando sostengono un soggiorno lento invece di una lista da spuntare.',
          title: 'Paesaggio con ritmo',
        },
        {
          body: 'La pagina territorio deve aiutare a capire come la casa si lega alle uscite, ai ritorni e alle giornate piu quiete in mezzo.',
          title: 'Dimora e luogo insieme',
        },
      ],
      factsTitle: 'Come il territorio accompagna il soggiorno.',
      hero: {
        body: 'Il territorio attorno alla Badia fa parte del soggiorno stesso: colline, piccoli paesi, percorsi stagionali e produttori locali che rendono l Umbria vicina, leggibile e mai forzata.',
        eyebrow: 'Territorio',
        imageAlt: 'Le colline umbre viste dalla Badia al calare della sera.',
        imageSrc: '/images/editorial/vista-colline.jpg',
        title: 'Una casa che si apre direttamente su percorsi lenti in Umbria.',
      },
    },
  },
}
