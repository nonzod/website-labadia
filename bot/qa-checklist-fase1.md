# QA Checklist — Fase 1

> File: `bot/qa-checklist-fase1.md`
> Task: T11
> Scopo: Verifica end-to-end della baseline prima del rilascio
> Istruzioni: spuntare `[x]` per ogni test superato, `[ ]` per gap da risolvere

---

## 1. Checklist funzionale — Task P0/P1

### Navigazione e routing

- [ ] **NAV-01** — Header: tutti i link puntano a pagine esistenti (nessun 404)
- [ ] **NAV-02** — Locale switcher IT/EN cambia lingua e persiste nella sessione
- [ ] **NAV-03** — CTA "Prenota ora" visibile in ogni pagina (desktop header / mobile bottom bar)
- [ ] **NAV-04** — Breadcrumb o indicatori di posizione funzionano (se implementati)

### Homepage (T12, T13, T14b, T15, T16)

- [ ] **HOME-01** — Sezione Hero: titolo, sottotitolo, CTA primaria renderizzati
- [ ] **HOME-02** — Sezione "Due Porte" (La Dimora / Esperienze): entrambi i link funzionano
- [ ] **HOME-03** — Sezione Proof/Recensioni: contenuti dinamici o placeholder visibili
- [ ] **HOME-04** — Sezione Eventi: card eventi renderizzate con date corrette
- [ ] **HOME-05** — Sezione CTA finale / Newsletter (se presente): bottone funzionante
- [ ] **HOME-06** — Fotografia in homepage: tutte le immagini caricano (nessun broken asset)

### Pagine pubbliche (T05)

- [ ] **PUB-01** — `/it/la-badia` (storia, borghetto, giardino) carica correttamente
- [ ] **PUB-02** — `/it/la-dimora` (appartamento, camere, suite) carica correttamente
- [ ] **PUB-03** — `/it/esperienze` (ospiti, eventi aperti, abside) carica correttamente
- [ ] **PUB-04** — `/it/territorio` carica correttamente
- [ ] **PUB-05** — `/it/racconti` carica correttamente
- [ ] **PUB-06** — `/en/*` — ogni pagina ha corrispettivo inglese funzionante

### Blog (T06)

- [ ] **BLOG-01** — Lista articoli: `/it/blog` mostra articoli pubblicati
- [ ] **BLOG-02** — Dettaglio articolo: `/it/blog/:slug` carica contenuto e metadata
- [ ] **BLOG-03** — Blog EN: `/en/blog` e `/en/blog/:slug` funzionanti
- [ ] **BLOG-04** — Articolo bilingue: stesso contenuto visibile in IT e EN

### Contatti e Lead (T07, T08)

- [ ] **CONT-01** — Form contatti: `/it/contatti` carica e mostra il form
- [ ] **CONT-02** — Invio form: dati salvati nella collection Leads (SQLite)
- [ ] **CONT-03** — Persistenza lead: i dati sopravvivono al riavvio del container
- [ ] **CONT-04** — Email notifica: invio SMTP dopo salvataggio lead (T08)
- [ ] **CONT-05** — Fallback email: se SMTP fallisce, lead comunque persistito (nessun silent failure)
- [ ] **CONT-06** — Validazione frontend: campi obbligatori, formato email

### Day/Night toggle (T14)

- [ ] **DN-01** — Toggle day/night visibile e cliccabile
- [ ] **DN-02** — Passa a tema notte: sfondo, testi, bordi cambiati secondo palette ufficiale
- [ ] **DN-03** — Passa a tema giorno: ritorno alla palette light
- [ ] **DN-04** — Persistenza: tema scelto resta dopo ricarica pagina (localStorage)
- [ ] **DN-05** — Persistenza cross-pagina: navigando tra pagine il tema rimane coerente
- [ ] **DN-06** — Fotografia notturna: se disponibile, immagini notturne sostituiscono quelle diurne
- [ ] **DN-07** — Auto-detect: all'avvio sceglie day/night in base all'ora (6:00–19:59 day, 20:00–5:59 night)

---

## 2. Checklist visiva / Design

### Allineamento al riferimento standalone (T14b)

- [ ] **VIS-01** — Homepage visivamente identica a `Homepage-standalone-src.html`
- [ ] **VIS-02** — Sequenza sezioni: Hero → Due Porte → Proof → Eventi → CTA (stesso ordine)
- [ ] **VIS-03** — Spaziatura e ritmo editoriale corrispondono al riferimento

### Tipografia

- [ ] **VIS-04** — Titoli in `Cormorant Garamond` (serif) con peso 400/500/600
- [ ] **VIS-05** — Corpo e label in `DM Mono` (monospace) con peso 300/400/500
- [ ] **VIS-06** — Italic disponibili per Cormorant Garamond (400, 500, 600 italic)

### Palette colore (T14)

- [ ] **VIS-07** — Colori giorno: `#c8b89a` (stone), `#8b7355` (earth), `#2a2218` (dark), `#3d3325` (ink), `#7a6e62` (muted), `#f5f0e8` (pale), `#faf7f2` (cream), `#ffffff` (white)
- [ ] **VIS-08** — Colori accento giorno: `#6b5b8a` (iris), `#4a6741` (green), `#2a5a48` (teal), `#8a6a2a` (amber), `#8a3a2a` (coral)
- [ ] **VIS-09** — Colori notte: sfondo Narciso Ch.1 / Venanzite Ch.1, testi Venanzite Sc.2 / Sc.1
- [ ] **VIS-10** — Tono generale: autentico, caldo, non istituzionale (no template hospitality generico)

### Responsive

- [ ] **VIS-11** — Mobile (< 640px): layout usabile, testo leggibile senza zoom
- [ ] **VIS-12** — Tablet (640–1024px): layout adatto, CTA accessibile
- [ ] **VIS-13** — Desktop (> 1024px): layout completo come da riferimento
- [ ] **VIS-14** — CTA "Prenota ora" mobile: barra persistente in fondo allo schermo

### Fotografia (T15)

- [ ] **VIS-15** — Tutte le immagini caricano senza broken asset
- [ ] **VIS-16** — Aspect ratio e ritaglio corrispondono al design
- [ ] **VIS-17** — Versioni day/night delle immagini (se presenti) funzionano

---

## 3. Checklist SEO (T09)

- [ ] **SEO-01** — Ogni pagina ha `<title>` unico e `<meta name="description">`
- [ ] **SEO-02** — Ogni pagina ha `<meta name="viewport">` corretto
- [ ] **SEO-03** — `/sitemap.xml` accessibile e valido (W3C)
- [ ] **SEO-04** — `/robots.txt` accessibile e serve correttamente
- [ ] **SEO-05** — Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`) presenti in ogni pagina
- [ ] **SEO-06** — Blog post: metadata per articolo (`article:published_time`, `article:author`, etc.)
- [ ] **SEO-07** — URL slug definiti e puliti (no ID, no parametri)
- [ ] **SEO-08** — Hreflang tags: `it`/`en` alternate correttamente
- [ ] **SEO-09** — Heading gerarchia corretta (h1 → h2 → h3) in ogni pagina
- [ ] **SEO-10** — Nessun contenuto IT/EN incompleto rispetto alla controparte

---

## 4. Checklist tecnica

### TypeScript e build

- [ ] **TECH-01** — `npm run compile` termina senza errori TypeScript
- [ ] **TECH-02** — `npm run lint` passa senza warning/error
- [ ] **TECH-03** — `npm run build` produce bundle senza errori

### Browser

- [ ] **TECH-04** — Nessun errore o warning in console browser (tutte le pagine)
- [ ] **TECH-05** — Nessun 404 per asset statici (JS, CSS, font, immagini)
- [ ] **TECH-06** — Nessun broken link interno

### Performance (Lighthouse)

- [ ] **TECH-07** — Lighthouse Accessibility ≥ 90
- [ ] **TECH-08** — Lighthouse Best Practices ≥ 90
- [ ] **TECH-09** — Lighthouse SEO ≥ 90
- [ ] **TECH-10** — Performance score ≥ 70 (mobile)

---

## 5. Checklist Admin / CMS

### Accesso

- [ ] **ADMIN-01** — Pannello admin `/admin` accessibile con credenziali valide
- [ ] **ADMIN-02** — Autenticazione funziona (login/logout/sessione)

### Gestione contenuti

- [ ] **ADMIN-03** — Creazione articolo blog (IT + EN) completa con salvataggio
- [ ] **ADMIN-04** — Modifica articolo esistente e republish
- [ ] **ADMIN-05** — Creazione evento visibile in homepage
- [ ] **ADMIN-06** — Lead capture: visualizzazione lead nel CMS dopo invio form
- [ ] **ADMIN-07** — Media library: upload immagini funzionante
- [ ] **ADMIN-08** — Impostazioni editoriali: modifica homepage content (hero, proof, etc.)

---

## 6. Checklist Deployment (T10)

### Kubernetes

- [ ] **DEPLOY-01** — Manifest K8s validi (validazione con `kubectl apply --dry-run=server`)
- [ ] **DEPLOY-02** — PVC definita e funzionante: dati persistono tra riavvii pod
- [ ] **DEPLOY-03** — Ingress routing: tutti i path (`/`, `/it/*`, `/en/*`, `/admin`) instradati correttamente
- [ ] **DEPLOY-04** — Service: porta corretta esposta, readiness probe funzionante
- [ ] **DEPLOY-05** — ConfigMap/Secret per variabili ambiente (DB, SMTP, JWT)

### Backup

- [ ] **DEPLOY-06** — Backup SQLite documentato (cron o script)
- [ ] **DEPLOY-07** — Backup Media library documentato
- [ ] **DEPLOY-08** — Strategia restore testata almeno una volta

---

## 7. Gap e blocchi al rilascio

| ID | Severità | Descrizione | Task riferito |
|---|---|---|---|
| — | blocker/critical/major/minor | — | — |

> Compilare dopo esecuzione dei test: ogni gap non risolto prima del rilascio va qui con severità esplicita.

---

## Esito finale

- [ ] **TUTTI i test funzionali P0/P1 superati**
- [ ] **Nessun blocker o critical gap aperto**
- [ ] **Checklist pronta per regressioni future**

---

*Documento creato da T11-qa-fase1.md. Aggiornare dopo ogni change di feature P0/P1.*