# Task Backlog

Scomposizione operativa di `bot/blueprit.md` in task ordinati per priorita e dipendenze.

## Ordine di esecuzione consigliato

| ID | Priorita | Stato | Task | Dipende da | Output principale |
| --- | --- | --- | --- | --- | --- |
| T01 | P0 | completato | Scaffold progetto `Next.js + Payload + TypeScript` | - | base applicativa funzionante |
| T02 | P0 | completato | Setup ambiente, `SQLite` e autenticazione admin | T01 | CMS avviabile con persistenza locale |
| T03 | P0 | completato | Setup i18n e routing bilingue `IT/EN` | T01 | architettura locale stabile |
| T04 | P0 | completato | Definizione collection `Media`, `Posts`, `Leads` | T02, T03 | modello dati iniziale nel CMS |
| T05 | P1 | completato | Shell frontend pubblico e layout condiviso | T03 | base UI server-first per pagine pubbliche |
| T06 | P1 | completato | Blog pubblico bilingue | T04, T05 | lista e dettaglio articoli funzionanti |
| T12 | P1 | completato | Riposizionamento homepage e copy pubblica | T05 | narrativa home coerente con la dimora |
| T13 | P1 | completato | Ristrutturazione homepage: hero, due porte, proof, eventi | T05, T12 | homepage allineata all'architettura editoriale |
| T14 | P1 | completato | Allineamento design system pubblico a palette ufficiale | T05 | token, tipografia e stati UI coerenti |
| T14b | P0 | completato | Allineamento layout homepage al riferimento standalone | T13, T14 | hero, sequenza sezioni e ritmo editoriale coerenti |
| T15 | P1 | completato | Integrazione fotografia e media narrativi in homepage | T12, T13, T14, T14b | homepage visualmente immersiva |
| T16 | P1 | completato | Navigazione pubblica e CTA di conversione | T12, T13, T14, T14b | header e percorsi pubblici piu orientati a soggiorno ed esperienze |
| T07 | P1 | completato | Pagina contatti e persistenza lead | T04, T05 | form pubblico con salvataggio dati |
| T08 | P1 | completato | Integrazione email `SMTP` per richieste contatto | T07 | invio email post-salvataggio |
| T09 | P1 | completato | SEO tecnico di base | T03, T05, T06 | metadata, sitemap e robots coerenti |
| T10 | P2 | completato | Deploy `Kubernetes` con volume persistente | T02, T08, T09 | manifest e strategia runtime production |
| T11 | P2 | completato | QA finale e checklist di accettazione fase 1 | T07, T08, T09, T10, T12, T13, T14, T15, T16 | verifica end-to-end pronta al rilascio |

## Note di priorita

- `P0`: blocca l'intera baseline tecnica. Va chiuso prima di iniziare le feature pubbliche.
- `P1`: porta il prodotto alla soglia di uso reale per contenuti e lead capture.
- `P2`: completa il percorso verso rilascio e validazione operativa.

## File task

- [T01 - Scaffold progetto](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T01-scaffold-next-payload.md) `completato`
- [T02 - Ambiente, SQLite e admin](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T02-setup-sqlite-admin.md) `completato`
- [T03 - I18n e routing](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T03-i18n-routing.md) `completato`
- [T04 - Collection CMS](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T04-collections-cms.md) `completato`
- [T05 - Shell frontend pubblico](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T05-shell-frontend.md) `completato`
- [T06 - Blog pubblico bilingue](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T06-blog-pubblico.md) `completato`
- [T12 - Riposizionamento homepage e copy pubblica](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T12-homepage-copy-positioning.md) `completato`
- [T13 - Ristrutturazione homepage](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T13-homepage-ia-sections.md) `completato`
- [T14 - Allineamento design system pubblico](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T14-design-system-pubblico.md) `completato`
- [T14b - Allineamento layout homepage al riferimento standalone](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T14b-homepage-layout-allineamento-riferimento.md) `completato`
- [T15 - Integrazione fotografia e media narrativi](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T15-homepage-media-fotografia.md) `completato`
- [T16 - Navigazione pubblica e CTA di conversione](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T16-nav-cta-conversione.md)
- [T07 - Contatti e lead persistence](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T07-contatti-leads.md) `completato`
- [T08 - Integrazione SMTP](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T08-smtp-email.md)
- [T09 - SEO tecnico di base](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T09-seo-tecnico.md)
- [T10 - Deploy Kubernetes](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T10-deploy-k8s.md)
- [T11 - QA fase 1](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T11-qa-fase1.md)

## Nuovi interventi homepage

I task `T12-T16` e `T14b` derivano dalla review comparativa tra stato attuale, riferimento `Homepage-standalone-src.html` e palette ufficiale in `analisi/remixed-c8b29026.html`.

## Implementazioni extra

- **Day/Night mode** (da analisi sezione "Giorno / Notte"): tema duale CSS, ThemeProvider + Toggle in header, palette scura completa, transizioni fluide. Non è un task separato ma requisito dell'analisi.

- obiettivo: trasformare la home da shell tecnica calda a vera homepage hospitality/editoriale
- focus: narrativa della dimora, architettura a due porte, proof e conversione, palette ufficiale, tipografia brand, fotografia reale
- criterio guida: nessun linguaggio tecnico o admin-facing deve emergere nel layer pubblico
- urgenza: `T14b` va chiuso prima di proseguire con `T15` e `T16`, per evitare di consolidare media e CTA sopra un impianto layout ancora divergente dal riferimento
