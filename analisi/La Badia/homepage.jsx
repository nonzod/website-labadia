/* global React, ReactDOM */
const { useState, useEffect, useRef, createContext, useContext, useMemo } = React;

// ─────────────────────────────────────────────────────────────────────────────
// BRAND TOKENS — day & night palettes
// ─────────────────────────────────────────────────────────────────────────────
const PALETTE_DAY = {
  cotto: '#C4674A',
  cottoDeep: '#8F3E26',
  cottoSoft: '#E8C3B2',
  glicine: '#9D8EC9',
  glicineSoft: '#E6DFF2',
  narciso: '#F0C84E',
  narcisoSoft: '#F7E8B5',
  venanzite: '#6E7B72',
  venanziteDeep: '#3A433E',
  verde: '#7A9458',
  verdeSoft: '#D9E2CA',
  ivory: '#F6F0E6',
  cream: '#FAF5EB',
  paper: '#EFE7D7',
  ink: '#2A2E2B',
  muted: '#8A867B',
  rule: '#D8CDB8',
  // semantic — surface vs reverse
  pageBg: '#F6F0E6',
  pageInk: '#2A2E2B',
  reverseBg: '#3A433E',
  reverseInk: '#F6F0E6'
};

const PALETTE_NIGHT = {
  cotto: '#D67A5C',
  cottoDeep: '#A04A2E',
  cottoSoft: '#5A2818',
  glicine: '#B5A6DD',
  glicineSoft: '#3E3556',
  narciso: '#F4D870',
  narcisoSoft: '#574a1f',
  venanzite: '#9DAAA1',
  venanziteDeep: '#1A1F1C',
  verde: '#9BB079',
  verdeSoft: '#2E3826',
  ivory: '#EDE4D2',
  cream: '#241F18',
  paper: '#1F1B14',
  ink: '#EDE4D2',
  muted: '#8A867B',
  rule: '#3D3528',
  pageBg: '#1A1611',
  pageInk: '#EDE4D2',
  reverseBg: '#0E0B07',
  reverseInk: '#EDE4D2'
};

// Theme context — `C` becomes a hook so the rest of the file can stay readable
const ThemeContext = createContext({ mode: 'day', C: PALETTE_DAY, lang: 'it' });
const useTheme = () => useContext(ThemeContext);

// Default `C` reference for module-scope code paths still using it directly
// (we keep it for the few literal references; component code reads from useTheme)
let C = PALETTE_DAY;

// ─────────────────────────────────────────────────────────────────────────────
// COPY — IT / EN
// ─────────────────────────────────────────────────────────────────────────────
const STRINGS = {
  it: {
    nav: ['La Badia', 'La Dimora', 'Esperienze', 'Territorio', 'Racconti'],
    book: 'Prenota ora',
    bookArrow: 'Prenota ora →',
    locality: 'San Venanzo · Umbria',
    heroKicker: '— Casa in pietra · affreschi zodiacali · giardino all\'italiana',
    heroKickerNight: '— Le notti del borgo · stelle sopra gli ulivi',
    heroTitleA: 'Una antica ',
    heroTitleEm1: 'dimora',
    heroTitleB: ' in pietra e ',
    heroTitleEm2: 'cotto',
    heroTitleC: ' tra le colline umbre.',
    heroTitleNightA: 'La notte ',
    heroTitleNightEm1: 'scende',
    heroTitleNightB: ' sul ',
    heroTitleNightEm2: 'borgo',
    heroTitleNightC: ' antico.',
    heroSide: 'Un appartamento al terzo e quarto piano, con il giardino e il silenzio. Si affitta intero.',
    heroSideNight: 'Le stelle sopra il roseto, il fuoco nel salone, il vino dell\'angolo bar. La quiete dell\'Umbria, di notte.',
    continua: 'continua',
    introLabel: '§ Il progetto',
    intro: 'La Badia è un appartamento in una casa di pietra, dentro un piccolo borgo di campagna a San Venanzo. Si affitta intero, non a camere. C\'è un giardino di duemila metri, un angolo bar con i vini del territorio, e un salone con gli affreschi zodiacali.',
    doorsKicker: '◦ Due porte d\'ingresso ◦',
    doorsTitle: 'Da dove vuoi ',
    doorsTitleEm: 'entrare',
    doorsTitleEnd: '?',
    door1Kicker: 'Porta prima',
    door1Title: 'La Dimora',
    door1Sub: 'Per chi cerca dove soggiornare',
    door1Body: 'L\'intero appartamento, al terzo e quarto piano. Sei posti letto, bagni nuovi, mobili antichi, l\'accesso libero al giardino e al salone affrescato.',
    door1Meta: ['150 mq', '6 posti letto', '3 camere', 'Giardino 2000 mq'],
    door1Cta: 'Scopri la Dimora',
    door1Caption: 'Camera Glicine · 3º piano',
    door2Kicker: 'Porta seconda',
    door2Title: 'Vivi la Badia',
    door2Sub: 'Per chi cerca un\'esperienza',
    door2Body: 'Club del vino, tertulie nel salone affrescato, concerti di musica classica, workshop di cucina umbra. Aperti anche a chi non soggiorna.',
    door2Meta: ['Club del vino', 'Concerti', 'Tertulie', 'Sala abside'],
    door2Cta: 'Scopri le esperienze',
    door2Caption: 'Tertulia nel salone',
    detailItems: [
      ['150', 'mq', 'Appartamento intero'],
      ['2.000', 'mq', 'Giardino all\'italiana'],
      ['6', 'posti letto', 'Tre camere, una suite'],
      ['41', 'mq', 'Salone con affreschi'],
      ['100', 'm', 'Dalla strada asfaltata']
    ],
    reviewsKicker: '§ Voci degli ospiti',
    reviewsTitleA: 'Chi è ',
    reviewsTitleEm1: 'tornato',
    reviewsTitleB: ',',
    reviewsTitleC: 'chi ci ',
    reviewsTitleEm2: 'scrive',
    reviewsTitleEnd: '.',
    reviewsMeta: ['Airbnb · 4.98 / 5 · 84 recensioni', 'Booking · 9.6 / 10 · 52 recensioni', '— aperti dal 2021'],
    eventsKicker: '§ Agenda · primavera — estate 2026',
    eventsTitleA: 'Eventi ',
    eventsTitleEm: 'aperti a tutti',
    eventsTitleEnd: '.',
    eventsLead: 'Il salone affrescato, il giardino, la sala abside adiacente. Si può partecipare anche senza soggiornare.',
    eventsCta: 'Calendario completo →',
    closingKicker: '◦ duemila metri di giardino ◦',
    closingKickerNight: '◦ il borgo sotto la luna ◦',
    closingTitleA: 'Roseti, querce,',
    closingTitleEm: 'upupe che nidificano',
    closingTitleB: 'tra i rami.',
    closingTitleNightA: 'Le stelle sopra',
    closingTitleNightEm: 'i tetti di pietra',
    closingTitleNightB: 'di San Venanzo.',
    closingBody: 'Glicini, iris, narcisi, orchidee selvatiche, ulivi. Un giardino all\'italiana con un roseto circolare in pietra, al centro del borgo.',
    closingBodyNight: 'Quando le luci del borgo si accendono e i grilli cantano, la Badia diventa un altro luogo: più silenzioso, più antico, più nostro.',
    closingCtaPrimary: 'Prenota ora →',
    closingCtaSecondary: 'Raccontaci il tuo viaggio',
    footerCols: [
      ['— Soggiorno', ['La Dimora', 'Camere e suite', 'Il giardino', 'Come arrivare']],
      ['— Vivi la Badia', ['Eventi aperti', 'Sala abside', 'Club del vino', 'Workshop']],
      ['— Contatti', ['+39 075 800 0000', 'ciao@labadia.it', 'WhatsApp diretto', '@labadia_umbria']]
    ],
    footerRights: '© mmxxvi La Badia · tutti i diritti riservati',
    footerLinks: ['Privacy', 'Cookie', 'Credits']
  },
  en: {
    nav: ['La Badia', 'The House', 'Experiences', 'The Land', 'Stories'],
    book: 'Book now',
    bookArrow: 'Book now →',
    locality: 'San Venanzo · Umbria',
    heroKicker: '— Stone house · zodiac frescoes · Italian garden',
    heroKickerNight: '— Nights of the borgo · stars above the olive trees',
    heroTitleA: 'An ancient ',
    heroTitleEm1: 'dimora',
    heroTitleB: ' of stone and ',
    heroTitleEm2: 'terracotta',
    heroTitleC: ' among the Umbrian hills.',
    heroTitleNightA: 'Night ',
    heroTitleNightEm1: 'falls',
    heroTitleNightB: ' on the ',
    heroTitleNightEm2: 'old',
    heroTitleNightC: ' borgo.',
    heroSide: 'An apartment on the third and fourth floor, with the garden and the silence. Rented as a whole.',
    heroSideNight: 'Stars above the rose garden, fire in the salon, wine from the bar corner. The quiet of Umbria, by night.',
    continua: 'scroll',
    introLabel: '§ The project',
    intro: 'La Badia is an apartment inside a stone house, within a small countryside borgo in San Venanzo. We rent it whole, not by the room. There is a two-thousand-square-metre garden, a wine corner stocked with local vintages, and a salon painted with zodiac frescoes.',
    doorsKicker: '◦ Two doorways ◦',
    doorsTitle: 'How will you ',
    doorsTitleEm: 'enter',
    doorsTitleEnd: '?',
    door1Kicker: 'Doorway one',
    door1Title: 'The House',
    door1Sub: 'For those looking for where to stay',
    door1Body: 'The whole apartment, on the third and fourth floor. Six beds, new bathrooms, antique furniture, free access to the garden and the frescoed salon.',
    door1Meta: ['150 sqm', '6 beds', '3 rooms', '2000 sqm garden'],
    door1Cta: 'Discover the House',
    door1Caption: 'Glicine room · 3rd floor',
    door2Kicker: 'Doorway two',
    door2Title: 'Live La Badia',
    door2Sub: 'For those looking for an experience',
    door2Body: 'Wine club, tertulias in the frescoed salon, classical music concerts, Umbrian cooking workshops. Open also to those who do not stay.',
    door2Meta: ['Wine club', 'Concerts', 'Tertulias', 'Apse hall'],
    door2Cta: 'Discover the experiences',
    door2Caption: 'Tertulia in the salon',
    detailItems: [
      ['150', 'sqm', 'Whole apartment'],
      ['2,000', 'sqm', 'Italian garden'],
      ['6', 'beds', 'Three rooms, one suite'],
      ['41', 'sqm', 'Frescoed salon'],
      ['100', 'm', 'From the paved road']
    ],
    reviewsKicker: '§ Voices of our guests',
    reviewsTitleA: 'Who came ',
    reviewsTitleEm1: 'back',
    reviewsTitleB: ',',
    reviewsTitleC: 'who ',
    reviewsTitleEm2: 'writes',
    reviewsTitleEnd: ' to us.',
    reviewsMeta: ['Airbnb · 4.98 / 5 · 84 reviews', 'Booking · 9.6 / 10 · 52 reviews', '— open since 2021'],
    eventsKicker: '§ Agenda · spring — summer 2026',
    eventsTitleA: 'Events ',
    eventsTitleEm: 'open to all',
    eventsTitleEnd: '.',
    eventsLead: 'The frescoed salon, the garden, the adjoining apse hall. You can attend even without staying.',
    eventsCta: 'Full calendar →',
    closingKicker: '◦ two thousand metres of garden ◦',
    closingKickerNight: '◦ the borgo under the moon ◦',
    closingTitleA: 'Rose beds, oak trees,',
    closingTitleEm: 'hoopoes nesting',
    closingTitleB: 'in the branches.',
    closingTitleNightA: 'Stars above',
    closingTitleNightEm: 'the stone roofs',
    closingTitleNightB: 'of San Venanzo.',
    closingBody: 'Wisterias, irises, daffodils, wild orchids, olive trees. An Italian garden with a circular stone rose bed at the heart of the borgo.',
    closingBodyNight: 'When the borgo lights come on and the crickets sing, La Badia becomes a different place: quieter, older, more ours.',
    closingCtaPrimary: 'Book now →',
    closingCtaSecondary: 'Tell us about your trip',
    footerCols: [
      ['— Stay', ['The House', 'Rooms and suite', 'The garden', 'How to reach us']],
      ['— Live La Badia', ['Open events', 'Apse hall', 'Wine club', 'Workshops']],
      ['— Contact', ['+39 075 800 0000', 'ciao@labadia.it', 'WhatsApp', '@labadia_umbria']]
    ],
    footerRights: '© mmxxvi La Badia · all rights reserved',
    footerLinks: ['Privacy', 'Cookies', 'Credits']
  }
};
const useStrings = () => STRINGS[useTheme().lang];

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER: flat color block — solid fill from brand palette.
// Photos go here once available. No gradients, no grain.
// ─────────────────────────────────────────────────────────────────────────────
function Photo({ tone = 'stone', label, caption, style, children, ratio }) {
  const TONES = {
    stone: { bg: C.cottoSoft, ink: C.cottoDeep },
    garden: { bg: C.verde, ink: C.ivory },
    fresco: { bg: C.cotto, ink: C.ivory },
    dusk: { bg: C.venanzite, ink: C.ivory },
    rose: { bg: C.cottoDeep, ink: C.ivory },
    iris: { bg: C.glicine, ink: C.ivory },
    olive: { bg: C.verdeSoft, ink: C.venanziteDeep },
    salon: { bg: C.narciso, ink: C.venanziteDeep },
    window: { bg: C.narcisoSoft, ink: C.venanziteDeep }
  };
  const t = TONES[tone] || TONES.stone;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio || '4 / 5',
        background: t.bg,
        overflow: 'hidden',
        ...style
      }}>
      
      {/* Subtle photo-placeholder mark: corner ticks + crosshair */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22, pointerEvents: 'none' }}>
        <g stroke={t.ink} strokeWidth="0.25" fill="none">
          <path d="M2 2 L8 2 M2 2 L2 8" />
          <path d="M98 2 L92 2 M98 2 L98 8" />
          <path d="M2 98 L8 98 M2 98 L2 92" />
          <path d="M98 98 L92 98 M98 98 L98 92" />
          <path d="M50 46 L50 54 M46 50 L54 50" />
        </g>
      </svg>
      {children}
      {(label || caption) &&
      <div style={{
        position: 'absolute', left: 14, bottom: 12,
        display: 'flex', flexDirection: 'column', gap: 2,
        color: t.ink,
        opacity: 0.85,
        fontFamily: '"DM Mono", monospace',
        fontSize: 9,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        pointerEvents: 'none'
      }}>
          {label && <span>{label}</span>}
          {caption && <span style={{ opacity: 0.7, textTransform: 'none', letterSpacing: '0.04em' }}>{caption}</span>}
        </div>
      }
    </div>);

}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function Header({ scrolled, mode, setMode, lang, setLang, autoMode, setAutoMode }) {
  const { C: theme } = useTheme();
  const S = useStrings();
  const isNight = mode === 'night';
  const inkOnHero = isNight ? '#EDE4D2' : '#FAEFD6';
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 50,
      padding: '14px 56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? (isNight ? 'rgba(20,18,14,0.88)' : 'rgba(246,240,230,0.92)') : 'transparent',
      borderBottom: scrolled ? `1px solid ${theme.rule}` : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      transition: 'background 300ms, border-color 300ms',
      color: scrolled ? theme.ink : inkOnHero
    }}>
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 22,
        letterSpacing: '0.02em',
        fontStyle: 'italic',
        fontWeight: 500
      }}>
        La Badia
        <span style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginLeft: 14,
          opacity: 0.7,
          fontStyle: 'normal'
        }}>{S.locality}</span>
      </div>
      <nav style={{
        display: 'flex', gap: 28, alignItems: 'center',
        fontFamily: '"DM Mono", monospace',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase'
      }}>
        {S.nav.map((link) =>
        <a key={link} href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85 }}>{link}</a>
        )}

        {/* LANG SWITCH */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          border: `1px solid currentColor`, opacity: 0.7,
          fontSize: 9, letterSpacing: '0.18em'
        }}>
          {['it','en'].map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)} style={{
              background: lang === l ? 'currentColor' : 'transparent',
              color: lang === l ? (scrolled ? theme.pageBg : (isNight ? '#1A1611' : '#3A2818')) : 'inherit',
              border: 'none', padding: '5px 9px', cursor: 'pointer',
              fontFamily: 'inherit', letterSpacing: 'inherit', textTransform: 'uppercase'
            }}>{l}</button>
          ))}
        </div>

        {/* DAY/NIGHT SWITCH */}
        <button type="button" title={autoMode ? 'Auto · click per fissare' : 'Manuale · click per auto'}
          onClick={() => { setAutoMode(!autoMode); }}
          style={{
            background: 'transparent', border: `1px solid currentColor`, color: 'inherit',
            padding: '5px 10px', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 8, opacity: 0.7
          }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: isNight ? '#F4D870' : '#C4674A'
          }} />
          {isNight ? 'notte' : 'giorno'}
          {autoMode && <span style={{ opacity: 0.55 }}>· auto</span>}
        </button>
        <button type="button" onClick={() => { setAutoMode(false); setMode(isNight ? 'day' : 'night'); }}
          style={{
            background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer',
            opacity: 0.6, fontSize: 14, padding: 0
          }}
          title={isNight ? 'Passa a giorno' : 'Passa a notte'}
        >{isNight ? '☀' : '☾'}</button>

        <a href="#" style={{
          marginLeft: 4,
          padding: '10px 18px',
          background: theme.cotto,
          color: '#F6F0E6',
          textDecoration: 'none',
          fontSize: 10,
          letterSpacing: '0.18em',
          border: `1px solid ${theme.cotto}`
        }}>{S.bookArrow}</a>
      </nav>
    </header>);

}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — full-bleed, editorial
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ variant = 'overlay' }) {
  if (variant === 'split') return <HeroSplit />;
  if (variant === 'quiet') return <HeroQuiet />;
  return <HeroOverlay />;
}

function HeroOverlay() {
  const { mode } = useTheme();
  const S = useStrings();
  const isNight = mode === 'night';
  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: 640,
      width: '100%',
      overflow: 'hidden',
      background: isNight ? '#0E0B07' : '#3A2818'
    }}>
      <img
        src={isNight ? 'photos/hero-notte.jpg' : 'photos/hero-ulivi-tramonto.jpg'}
        alt={isNight ? 'Il borgo de La Badia di notte' : 'Tramonto sugli ulivi — La Badia, San Venanzo'}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 60%',
          opacity: isNight ? 0.85 : 1,
          transition: 'opacity 600ms'
        }} />
      
      {/* darken for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isNight
          ? 'linear-gradient(180deg, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.25) 30%, rgba(8,6,4,0.4) 55%, rgba(0,0,0,0.85) 100%)'
          : 'linear-gradient(180deg, rgba(20,18,14,0.35) 0%, rgba(20,18,14,0.1) 25%, rgba(20,18,14,0.1) 55%, rgba(20,18,14,0.75) 100%)'
      }} />
      {/* dark lower gradient */}
      <div style={{
        position: 'absolute', inset: 0, background: "linear-gradient(rgba(0, 0, 0, 0.25) 0%, transparent 30%, transparent 55%, rgba(20, 15, 10, 0.65) 100%) 0% 0% / cover"

      }} />

      {/* top markers */}
      <div style={{
        position: 'absolute', top: 120, left: 56, right: 56,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: '"DM Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(250,245,235,0.7)'
      }}>
        <span>42°51′N · 12°16′E</span>
        <span>Vocabolo Badia 5 — mmxxvi</span>
      </div>

      {/* bottom block */}
      <div style={{
        position: 'absolute', left: 56, right: 56, bottom: 72,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'end',
        gap: 48,
        color: C.ivory
      }}>
        <div>
          <div style={{


            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            opacity: 0.75,
            marginBottom: 24, fontFamily: "\"Cormorant Garamond\"", fontSize: "14px", color: "rgb(233, 242, 242)"
          }}>
            {isNight ? S.heroKickerNight : S.heroKicker}
          </div>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontSize: 'clamp(64px, 9vw, 148px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            margin: 0, color: "rgb(233, 242, 242)"
          }}>
            {isNight ? (
              <>
                {S.heroTitleNightA}<em style={{ color: C.narciso, fontWeight: 400 }}>{S.heroTitleNightEm1}</em>{S.heroTitleNightB}<br />
                <em style={{ fontWeight: 400 }}>{S.heroTitleNightEm2}</em>{S.heroTitleNightC}
              </>
            ) : (
              <>
                {S.heroTitleA}<em style={{ color: C.narciso, fontWeight: 400 }}>{S.heroTitleEm1}</em>{S.heroTitleB}<br />
                <em style={{ fontWeight: 400 }}>{S.heroTitleEm2}</em>{S.heroTitleC}
              </>
            )}
          </h1>
        </div>
        <div style={{
          maxWidth: 320,
          paddingLeft: 32,
          borderLeft: `1px solid rgba(246,240,230,0.35)`
        }}>
          <p style={{

            fontSize: 19,
            fontStyle: 'italic',
            lineHeight: 1.45,
            margin: 0,
            opacity: 0.92, fontFamily: "\"Cormorant Garamond\"", color: "rgb(233, 242, 242)"
          }}>{isNight ? S.heroSideNight : S.heroSide}

          </p>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 24,
        transform: 'translateX(-50%)',
        fontFamily: '"DM Mono", monospace',
        fontSize: 9,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(246,240,230,0.6)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10
      }}>
        <span>{S.continua}</span>
        <span style={{ width: 1, height: 34, background: 'rgba(246,240,230,0.5)' }} />
      </div>
    </section>);

}

function HeroQuiet() {
  return (
    <section style={{
      padding: '160px 56px 96px',
      background: C.ivory,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 72,
      alignItems: 'center'
    }}>
      <div>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: C.cotto,
          marginBottom: 40
        }}>
          ◦ La Badia · San Venanzo · Umbria
        </div>
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 400,
          fontSize: 'clamp(56px, 7.5vw, 120px)',
          lineHeight: 0.95,
          letterSpacing: '-0.015em',
          margin: 0,
          color: C.venanziteDeep
        }}>
          Una casa in <em style={{ color: C.cotto, fontWeight: 500 }}>pietra</em>,<br />
          un giardino <em style={{ fontWeight: 400 }}>all'italiana</em>,<br />
          il tempo che <em style={{ fontWeight: 400 }}>rallenta</em>.
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 22,
          fontStyle: 'italic',
          lineHeight: 1.45,
          color: C.muted,
          maxWidth: 520,
          marginTop: 40
        }}>
          L'intero appartamento al terzo e quarto piano di un borgo di campagna. Sei posti letto, affreschi zodiacali, duemila metri di rose e ulivi.
        </p>
      </div>
      <Photo tone="salon" ratio="4 / 5" label="Il salone · 41 mq" caption="Affreschi zodiacali, inizio '800" />
    </section>);

}

function HeroSplit() {
  return (
    <section style={{ height: '100vh', minHeight: 640, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{
        background: C.ivory,
        padding: '140px 56px 64px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div />
        <div>
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: C.cotto,
            marginBottom: 32
          }}>
            N° 01 — La Badia
          </div>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontSize: 'clamp(48px, 6vw, 96px)',
            lineHeight: 0.96,
            margin: 0,
            color: C.venanziteDeep,
            letterSpacing: '-0.015em'
          }}>
            Un borgo<br />in pietra,<br /><em>per intero</em>.
          </h1>
        </div>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.muted,
          display: 'flex', justifyContent: 'space-between'
        }}>
          <span>42°51′N · 12°16′E</span>
          <span>Umbria · Italia</span>
        </div>
      </div>
      <Photo tone="fresco" ratio={null} style={{ aspectRatio: 'auto', height: '100%' }} label="Il salone affrescato" caption="La Dimora, terzo piano" />
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO STRIP — single paragraph, generous
// ─────────────────────────────────────────────────────────────────────────────
function IntroStrip() {
  const S = useStrings();
  const { mode } = useTheme();
  return (
    <section style={{
      padding: '120px 56px',
      background: mode === 'night' ? C.cream : C.ivory,
      borderTop: `1px solid ${C.rule}`,
      borderBottom: `1px solid ${C.rule}`
    }}>
      <div style={{
        maxWidth: 980,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '180px 1fr',
        gap: 48,
        alignItems: 'start'
      }}>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: C.cotto,
          paddingTop: 10
        }}>
          {S.introLabel}
        </div>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(24px, 2.4vw, 34px)',
          lineHeight: 1.4,
          color: mode === 'night' ? C.ivory : C.venanziteDeep,
          margin: 0,
          fontWeight: 400,
          textWrap: 'pretty'
        }}>{S.intro}</p>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// TWO DOORS — the centerpiece
// ─────────────────────────────────────────────────────────────────────────────
function TwoDoors({ layout = 'asymmetric' }) {
  const S = useStrings();
  const doors = [
  {
    n: 'I',
    kicker: S.door1Kicker,
    title: S.door1Title,
    sub: S.door1Sub,
    body: S.door1Body,
    meta: S.door1Meta,
    cta: S.door1Cta,
    tone: 'stone',
    caption: S.door1Caption
  },
  {
    n: 'II',
    kicker: S.door2Kicker,
    title: S.door2Title,
    sub: S.door2Sub,
    body: S.door2Body,
    meta: S.door2Meta,
    cta: S.door2Cta,
    tone: 'garden',
    caption: S.door2Caption
  }];


  return (
    <section style={{ padding: '140px 56px 120px', background: C.cream }}>
      {/* Section header */}
      <div style={{
        maxWidth: 1240, margin: '0 auto 72px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32
      }}>
        <div style={{ height: 1, background: C.rule }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: C.cotto,
            marginBottom: 20
          }}>
            {S.doorsKicker}
          </div>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: C.venanziteDeep,
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            {S.doorsTitle}<em>{S.doorsTitleEm}</em>{S.doorsTitleEnd}
          </h2>
        </div>
        <div style={{ height: 1, background: C.rule }} />
      </div>

      {/* Doors */}
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: layout === 'asymmetric' ? '1.15fr 1fr' : '1fr 1fr',
        gap: layout === 'asymmetric' ? 48 : 32,
        alignItems: layout === 'asymmetric' ? 'start' : 'stretch'
      }}>
        {doors.map((d, i) =>
        <DoorCard key={d.n} door={d} offset={layout === 'asymmetric' && i === 1 ? 72 : 0} />
        )}
      </div>
    </section>);

}

function DoorCard({ door, offset = 0 }) {
  const [hover, setHover] = useState(false);
  const isSecond = door.n === 'II';
  const accent = isSecond ? C.verde : C.cotto;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginTop: offset,
        cursor: 'pointer'
      }}>
      
      {/* Image with framed treatment */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Photo
          tone={door.tone}
          ratio="5 / 6"
          label={door.title}
          caption={door.caption}
          style={{
            transform: hover ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)'
          }} />
        
        {/* Roman numeral */}
        <div style={{
          position: 'absolute', top: 20, right: 24,
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 64,
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(246,240,230,0.88)',
          lineHeight: 1,
          textShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
          {door.n}
        </div>
      </div>

      {/* Text under the photo — editorial */}
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: accent
          }}>
            — {door.kicker}
          </span>
          <div style={{ flex: 1, height: 1, background: C.rule }} />
        </div>

        <h3 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 400,
          fontSize: 'clamp(40px, 4.5vw, 64px)',
          lineHeight: 0.98,
          margin: 0,
          color: C.venanziteDeep,
          letterSpacing: '-0.015em'
        }}>
          {door.title}
        </h3>

        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 20,
          fontStyle: 'italic',
          color: accent
        }}>
          {door.sub}
        </div>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 18,
          lineHeight: 1.55,
          color: C.ink,
          margin: 0,
          maxWidth: 480,
          textWrap: 'pretty'
        }}>
          {door.body}
        </p>

        {/* meta ticks */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 0,
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.muted,
          marginTop: 4
        }}>
          {door.meta.map((m, i) =>
          <span key={m} style={{
            display: 'flex', alignItems: 'center'
          }}>
              {i > 0 && <span style={{ margin: '0 14px', opacity: 0.5 }}>·</span>}
              {m}
            </span>
          )}
        </div>

        {/* CTA */}
        <a href="#" style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          marginTop: 12,
          paddingBottom: 10,
          borderBottom: `1px solid ${accent}`,
          alignSelf: 'start',
          color: accent,
          fontFamily: '"DM Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textDecoration: 'none'
        }}>
          {door.cta}
          <span style={{
            display: 'inline-block',
            transform: hover ? 'translateX(6px)' : 'translateX(0)',
            transition: 'transform 300ms'
          }}>→</span>
        </a>
      </div>
    </article>);

}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL STRIP — a horizontal rhythm of small facts about the house
// ─────────────────────────────────────────────────────────────────────────────
function DetailStrip() {
  const items = [
  { n: '150', unit: 'mq', label: 'Appartamento intero' },
  { n: '2.000', unit: 'mq', label: 'Giardino all\'italiana' },
  { n: '6', unit: 'posti letto', label: 'Tre camere, una suite' },
  { n: '41', unit: 'mq', label: 'Salone con affreschi' },
  { n: '100', unit: 'm', label: 'Dalla strada asfaltata' }];

  return (
    <section style={{
      padding: '48px 56px',
      background: C.venanziteDeep,
      color: C.ivory
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: 32
      }}>
        {items.map((it, i) =>
        <div key={i} style={{
          paddingLeft: 20,
          borderLeft: `1px solid rgba(246,240,230,0.22)`
        }}>
            <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 48,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}>
              {it.n}
              <span style={{ fontSize: 18, fontStyle: 'italic', marginLeft: 6, opacity: 0.8 }}>{it.unit}</span>
            </div>
            <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: 12,
            opacity: 0.7
          }}>
              {it.label}
            </div>
          </div>
        )}
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEWS — handset, editorial
// ─────────────────────────────────────────────────────────────────────────────
function Reviews() {
  const S = useStrings();
  const reviews = [
  {
    text: 'La casa è più bella di qualunque fotografia. Il giardino all\'alba, con il canto delle upupe, è una cosa che non si dimentica.',
    author: 'Chiara e Matteo',
    origin: 'Milano · Aprile 2026',
    platform: 'Airbnb'
  },
  {
    text: 'We spent a week and felt like guests of a friend, not clients. The frescoed salon at night, with candles, was magic.',
    author: 'Emma Holloway',
    origin: 'London · October 2025',
    platform: 'Booking'
  },
  {
    text: 'Il vino locale, la cena con il cuoco privato, le camminate tra le orchidee selvatiche. Torneremo in autunno.',
    author: 'Famiglia Bertolini',
    origin: 'Torino · Maggio 2025',
    platform: 'Airbnb'
  }];


  return (
    <section style={{ padding: '140px 56px', background: C.ivory }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64,
          alignItems: 'end',
          marginBottom: 72
        }}>
          <div>
            <div style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: C.cotto,
              marginBottom: 16
            }}>
              {S.reviewsKicker}
            </div>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 400,
              fontSize: 'clamp(40px, 4.2vw, 64px)',
              lineHeight: 1,
              color: C.venanziteDeep,
              margin: 0,
              letterSpacing: '-0.015em'
            }}>
              {S.reviewsTitleA}<em>{S.reviewsTitleEm1}</em>{S.reviewsTitleB}<br />{S.reviewsTitleC}<em>{S.reviewsTitleEm2}</em>{S.reviewsTitleEnd}
            </h2>
          </div>
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: C.muted,
            textAlign: 'right',
            display: 'flex', flexDirection: 'column', gap: 6
          }}>
            <div>{S.reviewsMeta[0]}</div>
            <div>{S.reviewsMeta[1]}</div>
            <div style={{ color: C.cotto, marginTop: 4 }}>{S.reviewsMeta[2]}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: C.rule }}>
          {reviews.map((r, i) =>
          <div key={i} style={{
            background: C.ivory,
            padding: '40px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 340
          }}>
              <div style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 48,
              color: C.cotto,
              lineHeight: 0.5,
              fontStyle: 'italic',
              marginBottom: 8
            }}>"</div>
              <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 20,
              lineHeight: 1.45,
              color: C.ink,
              margin: 0,
              fontStyle: 'italic',
              flex: 1,
              textWrap: 'pretty'
            }}>
                {r.text}
              </p>
              <div style={{
              marginTop: 28,
              paddingTop: 20,
              borderTop: `1px solid ${C.rule}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
            }}>
                <div>
                  <div style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 17,
                  color: C.venanziteDeep
                }}>
                    {r.author}
                  </div>
                  <div style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: C.muted,
                  marginTop: 4
                }}>
                    {r.origin}
                  </div>
                </div>
                <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: C.cotto
              }}>
                  ↗ {r.platform}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// EVENTS PREVIEW — calendar-style
// ─────────────────────────────────────────────────────────────────────────────
function EventsPreview() {
  const S = useStrings();
  const events = [
  {
    day: '18', month: 'Mag', year: '26',
    dow: 'Sabato',
    title: 'Club del vino — annata 2022',
    kind: 'Degustazione',
    time: '19:00 — 22:30',
    place: 'Angolo bar e giardino',
    color: C.cotto,
    tone: 'rose'
  },
  {
    day: '07', month: 'Giu', year: '26',
    dow: 'Domenica',
    title: 'Tertulia: la letteratura del mito',
    kind: 'Tertulia',
    time: '17:30 — 20:00',
    place: 'Salone affrescato',
    color: C.glicine,
    tone: 'iris'
  },
  {
    day: '21', month: 'Giu', year: '26',
    dow: 'Domenica',
    title: 'Concerto di solstizio · quartetto d\'archi',
    kind: 'Musica classica',
    time: '21:00 — 22:30',
    place: 'Giardino al tramonto',
    color: C.verde,
    tone: 'olive'
  }];


  return (
    <section style={{
      padding: '140px 56px',
      background: C.paper,
      borderTop: `1px solid ${C.rule}`
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end',
          marginBottom: 56, gap: 32
        }}>
          <div>
            <div style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: C.cotto,
              marginBottom: 16
            }}>
              {S.eventsKicker}
            </div>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 400,
              fontSize: 'clamp(40px, 4.2vw, 64px)',
              lineHeight: 1,
              color: C.venanziteDeep,
              margin: 0,
              letterSpacing: '-0.015em'
            }}>
              {S.eventsTitleA}<em>{S.eventsTitleEm}</em>{S.eventsTitleEnd}
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 19,
              fontStyle: 'italic',
              color: C.muted,
              marginTop: 20,
              maxWidth: 540
            }}>
              Il salone affrescato, il giardino, la sala abside adiacente. Si può partecipare anche senza soggiornare.
            </p>
          </div>
          <a href="#" style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.cotto,
            borderBottom: `1px solid ${C.cotto}`,
            paddingBottom: 8,
            textDecoration: 'none'
          }}>
            {S.eventsCta}
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {events.map((e, i) =>
          <EventCard key={i} event={e} />
          )}
        </div>
      </div>
    </section>);

}

function EventCard({ event }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.ivory,
        border: `1px solid ${C.rule}`,
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 300ms, border-color 300ms',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        borderColor: hover ? event.color : C.rule
      }}>
      
      <Photo tone={event.tone} ratio="16 / 9" />
      <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 20,
          paddingBottom: 16,
          borderBottom: `1px solid ${C.rule}`
        }}>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 52,
            lineHeight: 0.9,
            color: event.color,
            fontWeight: 400,
            letterSpacing: '-0.02em'
          }}>
            {event.day}
          </div>
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.muted,
            lineHeight: 1.6
          }}>
            <div>{event.month} · '{event.year}</div>
            <div style={{ opacity: 0.7 }}>{event.dow}</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: event.color,
            padding: '4px 10px',
            border: `1px solid ${event.color}`
          }}>
            {event.kind}
          </div>
        </div>
        <h3 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1.15,
          color: C.venanziteDeep,
          margin: 0,
          textWrap: 'pretty'
        }}>
          {event.title}
        </h3>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.muted,
          lineHeight: 1.8
        }}>
          ◷ {event.time}<br />
          ◦ {event.place}
        </div>
      </div>
    </article>);

}

// ─────────────────────────────────────────────────────────────────────────────
// CLOSING — the garden
// ─────────────────────────────────────────────────────────────────────────────
function Closing() {
  const { mode } = useTheme();
  const S = useStrings();
  const isNight = mode === 'night';
  return (
    <section style={{
      position: 'relative',
      padding: '160px 56px',
      overflow: 'hidden',
      background: isNight ? '#0A0805' : C.venanziteDeep
    }}>
      <img
        src={isNight ? 'photos/vista-colline-notte.jpg' : 'photos/vista-colline.jpg'}
        alt={isNight ? 'Il borgo di San Venanzo sotto le stelle' : 'Vista sulle colline umbre dai tetti del borgo'}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          opacity: isNight ? 0.55 : 0.7,
          transition: 'opacity 600ms'
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: isNight
          ? 'linear-gradient(180deg, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.85) 100%)'
          : 'linear-gradient(180deg, rgba(30,40,30,0.4) 0%, rgba(30,40,30,0.7) 100%)'
      }} />

      <div style={{
        position: 'relative',
        maxWidth: 960, margin: '0 auto',
        textAlign: 'center',
        color: C.ivory
      }}>
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          opacity: 0.75,
          marginBottom: 32
        }}>
          {isNight ? S.closingKickerNight : S.closingKicker}
        </div>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 400,
          fontSize: 'clamp(44px, 5.5vw, 84px)',
          lineHeight: 1.02,
          margin: 0,
          letterSpacing: '-0.015em'
        }}>
          {isNight ? (
            <>
              {S.closingTitleNightA}<br />
              <em style={{ color: C.narciso }}>{S.closingTitleNightEm}</em><br />
              {S.closingTitleNightB}
            </>
          ) : (
            <>
              {S.closingTitleA}<br />
              <em style={{ color: C.narciso }}>{S.closingTitleEm}</em><br />
              {S.closingTitleB}
            </>
          )}
        </h2>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 22,
          fontStyle: 'italic',
          lineHeight: 1.45,
          maxWidth: 640,
          margin: '40px auto 0',
          opacity: 0.9
        }}>
          {isNight ? S.closingBodyNight : S.closingBody}
        </p>
        <div style={{
          marginTop: 56,
          display: 'flex', justifyContent: 'center', gap: 20
        }}>
          <a href="#" style={{
            padding: '16px 28px',
            background: C.cotto,
            color: C.ivory,
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: `1px solid ${C.cotto}`
          }}>
            {S.closingCtaPrimary}
          </a>
          <a href="#" style={{
            padding: '16px 28px',
            color: C.ivory,
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: `1px solid rgba(246,240,230,0.4)`
          }}>
            {S.closingCtaSecondary}
          </a>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const S = useStrings();
  return (
    <footer style={{
      background: C.ink,
      color: C.ivory,
      padding: '72px 56px 36px'
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          paddingBottom: 56,
          borderBottom: `1px solid rgba(246,240,230,0.15)`
        }}>
          <div>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 36,
              fontStyle: 'italic',
              fontWeight: 500,
              marginBottom: 16
            }}>
              La Badia
            </div>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 17,
              lineHeight: 1.5,
              opacity: 0.75,
              maxWidth: 320
            }}>
              Vocabolo Badia 5<br />
              05010 San Venanzo (TR)<br />
              Umbria · Italia
            </div>
          </div>

          {S.footerCols.map(([title, links]) =>
          <div key={title}>
              <div style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: 20
            }}>
                {title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((l) =>
              <li key={l}>
                    <a href="#" style={{
                  color: C.ivory,
                  opacity: 0.85,
                  textDecoration: 'none',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 17
                }}>{l}</a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div style={{
          marginTop: 32,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          opacity: 0.55
        }}>
          <div>{S.footerRights}</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: C.ivory, textDecoration: 'none' }}>{S.footerLinks[0]}</a>
            <a href="#" style={{ color: C.ivory, textDecoration: 'none' }}>{S.footerLinks[1]}</a>
            <a href="#" style={{ color: C.ivory, textDecoration: 'none' }}>{S.footerLinks[2]}</a>
          </div>
        </div>
      </div>
    </footer>);

}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
function detectDayNight() {
  const h = new Date().getHours();
  // Day: 6:00 → 19:59 · Night: 20:00 → 5:59
  return h >= 6 && h < 20 ? 'day' : 'night';
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [mode, setMode] = useState(detectDayNight());
  const [lang, setLang] = useState(() => {
    const stored = (typeof localStorage !== 'undefined') && localStorage.getItem('labadia.lang');
    if (stored === 'it' || stored === 'en') return stored;
    const nav = (typeof navigator !== 'undefined' && navigator.language || 'it').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'it';
  });

  // when auto, re-detect every minute
  useEffect(() => {
    if (!autoMode) return;
    setMode(detectDayNight());
    const id = setInterval(() => setMode(detectDayNight()), 60_000);
    return () => clearInterval(id);
  }, [autoMode]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('labadia.lang', lang);
  }, [lang]);

  const defaults = window.__TWEAK_DEFAULTS || { heroVariant: 'overlay', doorsLayout: 'asymmetric', showEvents: true };
  const tweaks = window.useTweaks ?
  window.useTweaks(defaults) :
  [defaults, () => {}];
  const [t, setTweak] = tweaks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active palette — also published into module-scope `C` so existing
  // components that read `C.*` directly pick up the right colors on every render.
  const palette = mode === 'night' ? PALETTE_NIGHT : PALETTE_DAY;
  C = palette;

  // sync body bg / color so areas outside the React tree match the theme
  useEffect(() => {
    document.body.style.background = palette.pageBg;
    document.body.style.color = palette.pageInk;
    document.documentElement.dataset.theme = mode;
  }, [mode, palette]);

  const ctx = useMemo(() => ({ mode, C: palette, lang }), [mode, palette, lang]);

  const TP = window.TweaksPanel;
  const TSection = window.TweakSection;
  const TRadio = window.TweakRadio;
  const TToggle = window.TweakToggle;

  return (
    <ThemeContext.Provider value={ctx}>
    <div style={{
      background: palette.pageBg,
      color: palette.pageInk,
      fontFamily: '"Cormorant Garamond", serif',
      minHeight: '100vh',
      transition: 'background 600ms ease, color 600ms ease'
    }}>
      <Header
        scrolled={scrolled}
        mode={mode}
        setMode={setMode}
        lang={lang}
        setLang={setLang}
        autoMode={autoMode}
        setAutoMode={setAutoMode} />
      <Hero variant={t.heroVariant} />
      <IntroStrip />
      <TwoDoors layout={t.doorsLayout} />
      <DetailStrip />
      <Reviews />
      {t.showEvents && <EventsPreview />}
      <Closing />
      <Footer />

      {TP &&
      <TP title="Tweaks">
          <TSection label="Hero">
            <TRadio
            label="Variante"
            value={t.heroVariant}
            onChange={(v) => setTweak('heroVariant', v)}
            options={[
            { value: 'overlay', label: 'Foto intera' },
            { value: 'quiet', label: 'Editoriale' },
            { value: 'split', label: 'Split' }]
            } />
          
          </TSection>
          <TSection label="Due porte">
            <TRadio
            label="Layout"
            value={t.doorsLayout}
            onChange={(v) => setTweak('doorsLayout', v)}
            options={[
            { value: 'asymmetric', label: 'Asimmetrico' },
            { value: 'symmetric', label: 'Simmetrico' }]
            } />
          
          </TSection>
          <TSection label="Sezioni">
            <TToggle
            label="Mostra eventi"
            value={t.showEvents}
            onChange={(v) => setTweak('showEvents', v)} />
          
          </TSection>
        </TP>
      }
    </div>
    </ThemeContext.Provider>);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);