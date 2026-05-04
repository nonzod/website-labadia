# Blueprint Base

## Obiettivo

Definire la baseline tecnica e operativa per realizzare il sito web de La Badia con:

- frontend React basato su `Next.js`
- area `Blog` gestita da backoffice per utenti non developer
- archivio locale delle richieste contatto
- supporto bilingue completo `IT` e `EN`
- deploy su infrastruttura `Kubernetes` gia disponibile su Infomaniak

Questo documento serve come base da spacchettare in task separati.

## Decisioni Architetturali

- Framework frontend: `Next.js` con `App Router`
- Linguaggio: `TypeScript`
- CMS/backoffice: `Payload CMS` integrato nello stesso progetto
- Database: `SQLite`
- Email transazionali: `SMTP` classico
- Gestione contenuti:
  - pagine principali del sito gestite in codice
  - blog gestito da backoffice
  - richieste contatto archiviate nel backoffice
- Modello di deploy: applicazione unica

## Motivazioni Della Scelta

- `Next.js` mantiene React come stack di riferimento ma aggiunge una base molto piu solida per SEO, metadata, routing e rendering server-side.
- `Payload` permette di avere backoffice, API e modello dati nello stesso progetto applicativo.
- Il blog e semplice e saltuario: non serve un CMS separato o una piattaforma editoriale piu pesante.
- Le richieste contatto devono essere gestite in modo ordinato e persistente, non solo via email.
- Le pagine istituzionali non devono essere editabili da backoffice nella prima fase, quindi e corretto mantenerle code-managed.

## Vincoli Tecnici

- Il sito deve supportare `IT` e `EN` ovunque, incluso il blog.
- Il database puo essere solo `SQLite` o, in alternativa futura, una soluzione diversa da rivalutare; per questa fase si assume `SQLite`.
- L'applicazione verra rilasciata su cluster `Kubernetes` esistente.
- Il sistema email deve usare `SMTP`.
- Il backoffice deve essere semplice e adatto a un utente non tecnico.

## Vincolo Critico: SQLite Su Kubernetes

`SQLite` e compatibile con questa fase solo con i seguenti vincoli:

- una sola replica scrivente dell'applicazione
- `PersistentVolume` dedicato per il file database
- backup regolari del volume
- rollout e deploy che non distruggano o sostituiscano il volume

Questo approccio e accettabile per un sito editoriale leggero con basso volume di scritture concorrenti.
Non e adatto a scaling orizzontale reale.

## Ambito Della Fase 1

La prima fase deve consegnare:

- progetto `Next.js` configurato
- `Payload CMS` integrato e accessibile
- database `SQLite` funzionante
- blog bilingue funzionante
- form contatti con salvataggio lead nel database
- invio email SMTP su richiesta contatto
- pannello admin per visualizzare articoli e lead
- SEO tecnico di base
- configurazione pronta al deploy su `k8s`

## Fuori Ambito Della Fase 1

- integrazione con booking engine
- workflow avanzati CRM
- tagging, categorie e tassonomie blog
- editing da backoffice delle pagine principali
- scalabilita multi-replica
- dashboard analytics o reportistica avanzata

## Struttura Applicativa Prevista

Un solo progetto con questi blocchi logici:

- sito pubblico `Next.js`
- admin e API `Payload`
- collection per blog
- collection per lead
- media library
- utility SEO e i18n

### Struttura cartelle iniziale suggerita

```text
/app
  /[lang]
    /blog
      /[slug]
    /contatti
    layout.tsx
    page.tsx
  /(payload)
  /api
/collections
  Posts.ts
  Leads.ts
  Media.ts
/components
/lib
  i18n.ts
  seo.ts
  payload.ts
/styles
/public
payload.config.ts
next.config.mjs
```

## Scelte SEO E Routing

- Routing locale esplicito con prefisso lingua:
  - `/it/...`
  - `/en/...`
- Blog localizzato per lingua
- Metadata per pagina e articolo
- `sitemap.xml` generata
- `robots.txt` configurato
- URL puliti e semanticamente chiari
- `Open Graph` e condivisione social di base

## Strategia I18n

La localizzazione va gestita su due livelli:

- UI e routing nel frontend `Next.js`
- contenuti localizzati nel CMS `Payload`

Scelta proposta:

- `it` come lingua primaria del progetto
- `en` come seconda lingua obbligatoria
- i contenuti del blog usano campi localizzati nello stesso record

Vantaggi:

- un solo articolo logico con contenuti per piu lingue
- gestione admin piu semplice
- minore rischio di disallineamento tra versioni

## Modello Dati Iniziale

### Collection `posts`

Scopo: gestione articoli blog.

Campi previsti:

- `title` localizzato
- `slug` localizzato
- `excerpt` localizzato
- `content` localizzato
- `seoTitle` localizzato
- `seoDescription` localizzato
- `coverImage`
- `publishedAt`
- `status`

Note:

- niente categorie o tag nella fase iniziale
- la lista articoli sara ordinata per data di pubblicazione

### Collection `leads`

Scopo: archiviare le richieste provenienti dal form contatti.

Campi previsti:

- `name`
- `email`
- `phone` opzionale
- `message`
- `lang`
- `sourcePage`
- `status`
- `createdAt`
- `internalNotes` opzionale

Valori iniziali suggeriti per `status`:

- `new`
- `read`
- `archived`

Note:

- il salvataggio sul database deve avvenire prima del tentativo di invio email
- l'admin deve poter filtrare o ordinare almeno per stato e data

### Collection `media`

Scopo: gestire immagini del blog e asset editoriali caricati via admin.

Funzioni minime:

- upload file
- metadati base
- riuso immagine nei post

### Collection `users`

Scopo: accesso al backoffice.

Funzioni minime:

- login protetto
- profilo admin base

## Flussi Funzionali Minimi

### Pubblicazione articolo

1. L'utente admin accede al backoffice.
2. Crea o modifica un articolo.
3. Compila contenuti in `IT` e `EN`.
4. Imposta data, immagine e stato.
5. Pubblica.
6. L'articolo compare nelle liste e nella pagina dettaglio.

### Invio richiesta contatto

1. L'utente compila il form pubblico.
2. Il server valida i dati.
3. Il lead viene salvato nel database.
4. Parte l'invio email via `SMTP`.
5. L'utente riceve conferma a schermo.
6. Il team trova la richiesta nel backoffice anche se l'email fallisce.

## Backoffice Minimo

Il pannello admin deve offrire:

- login
- gestione articoli
- gestione media
- vista richieste contatto

La vista lead deve essere semplice:

- elenco richieste
- dettaglio singola richiesta
- stato modificabile
- eventuali note interne facoltative

## Infrastruttura E Deploy

### Target

- cluster `Kubernetes` Infomaniak gia disponibile

### Requisiti minimi di deployment

- `Deployment` con `replicas: 1`
- `PersistentVolumeClaim` per file `SQLite`
- `Secret` per:
  - credenziali admin iniziali
  - variabili SMTP
  - secret applicativi
- `Ingress` o routing equivalente
- gestione ambiente `production`

### Variabili ambiente previste

- `PAYLOAD_SECRET`
- `DATABASE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `NEXT_PUBLIC_SITE_URL`

Note:

- `DATABASE_URL` per `SQLite` puntera a un file su volume persistente
- i secret non vanno hardcodati

## Dipendenze Principali Attese

- `next`
- `react`
- `react-dom`
- `payload`
- `@payloadcms/next`
- `@payloadcms/db-sqlite`
- `@payloadcms/richtext-lexical`
- `sharp`
- libreria validazione form
- eventuale libreria email SMTP

## Decisioni Di Implementazione Consigliate

- usare `TypeScript` strict
- mantenere il frontend pubblico il piu server-first possibile
- evitare di rendere client component parti che non ne hanno bisogno
- tenere il form contatti con endpoint server-side semplice
- non introdurre una complessita CMS piu ampia del necessario

## Rischi E Mitigazioni

### Rischio 1: SQLite su storage non persistente

Impatto:

- perdita dati blog o lead

Mitigazione:

- usare solo `PersistentVolume`
- documentare backup e restore

### Rischio 2: scaling accidentale a piu repliche

Impatto:

- contese file DB
- comportamenti non affidabili

Mitigazione:

- fissare `replicas: 1`
- documentare il vincolo nel deployment

### Rischio 3: contenuti bilingue incompleti

Impatto:

- esperienza incoerente tra `IT` e `EN`

Mitigazione:

- rendere evidenti i campi localizzati nel backoffice
- prevedere una policy editoriale minima

### Rischio 4: dipendenza dall'email per i lead

Impatto:

- perdita o disallineamento richieste

Mitigazione:

- salvare sempre il lead prima dell'invio email
- gestire l'email come step secondario

## Roadmap Di Implementazione

### Fase 1A - Fondazioni

- scaffold progetto `Next.js`
- integrazione `Payload`
- setup `SQLite`
- setup autenticazione admin
- setup localizzazione base

### Fase 1B - Modello Dati

- definizione collection `posts`
- definizione collection `leads`
- definizione collection `media`
- validazioni minime

### Fase 1C - Frontend Pubblico

- routing bilingue
- layout base sito
- pagina lista blog
- pagina dettaglio articolo
- pagina contatti
- metadata SEO

### Fase 1D - Lead Capture

- form contatti
- action o endpoint server-side
- salvataggio lead
- invio email SMTP
- feedback utente

### Fase 1E - Produzione

- env production
- manifest `k8s`
- `PVC` per database
- test deploy

## Sotto-Task Da Estrarre

Questo blueprint si presta ad essere diviso almeno in questi task:

1. Scaffold iniziale progetto `Next.js + Payload`
2. Configurazione `SQLite` e storage persistente
3. Setup localizzazione `IT/EN`
4. Definizione collection `posts`
5. Definizione collection `leads`
6. Implementazione blog pubblico
7. Implementazione form contatti con persistenza lead
8. Integrazione `SMTP`
9. SEO tecnico di base
10. Manifest `k8s` e strategia deploy

## Criteri Di Accettazione Della Fase 1

- il progetto gira localmente
- l'admin `Payload` e accessibile
- si puo creare un articolo bilingue
- l'articolo e visibile nel frontend pubblico
- il form contatti salva una richiesta nel database
- la richiesta e visibile nel backoffice
- l'app usa `SQLite` su path configurabile
- il progetto e predisposto al deploy su `k8s`
- il sito espone metadata e routing coerenti per `IT` e `EN`

## Decisione Finale

La baseline approvata per il progetto e:

- `Next.js`
- `Payload CMS`
- `SQLite`
- `SMTP`
- deploy su `Kubernetes` Infomaniak

Con questa combinazione si privilegiano:

- semplicita operativa
- un solo progetto
- backoffice utile ma non invasivo
- gestione ordinata dei lead
- base SEO e bilingue adeguata al progetto
