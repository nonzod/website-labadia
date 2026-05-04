# Task Backlog

Scomposizione operativa di `bot/blueprit.md` in task ordinati per priorita e dipendenze.

## Ordine di esecuzione consigliato

| ID | Priorita | Stato | Task | Dipende da | Output principale |
| --- | --- | --- | --- | --- | --- |
| T01 | P0 | completato | Scaffold progetto `Next.js + Payload + TypeScript` | - | base applicativa funzionante |
| T02 | P0 | completato | Setup ambiente, `SQLite` e autenticazione admin | T01 | CMS avviabile con persistenza locale |
| T03 | P0 | completato | Setup i18n e routing bilingue `IT/EN` | T01 | architettura locale stabile |
| T04 | P0 | completato | Definizione collection `Media`, `Posts`, `Leads` | T02, T03 | modello dati iniziale nel CMS |
| T05 | P1 | pending | Shell frontend pubblico e layout condiviso | T03 | base UI server-first per pagine pubbliche |
| T06 | P1 | pending | Blog pubblico bilingue | T04, T05 | lista e dettaglio articoli funzionanti |
| T07 | P1 | pending | Pagina contatti e persistenza lead | T04, T05 | form pubblico con salvataggio dati |
| T08 | P1 | pending | Integrazione email `SMTP` per richieste contatto | T07 | invio email post-salvataggio |
| T09 | P1 | pending | SEO tecnico di base | T03, T05, T06 | metadata, sitemap e robots coerenti |
| T10 | P2 | pending | Deploy `Kubernetes` con volume persistente | T02, T08, T09 | manifest e strategia runtime production |
| T11 | P2 | pending | QA finale e checklist di accettazione fase 1 | T06, T07, T08, T09, T10 | verifica end-to-end pronta al rilascio |

## Note di priorita

- `P0`: blocca l'intera baseline tecnica. Va chiuso prima di iniziare le feature pubbliche.
- `P1`: porta il prodotto alla soglia di uso reale per contenuti e lead capture.
- `P2`: completa il percorso verso rilascio e validazione operativa.

## File task

- [T01 - Scaffold progetto](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T01-scaffold-next-payload.md) `completato`
- [T02 - Ambiente, SQLite e admin](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T02-setup-sqlite-admin.md) `completato`
- [T03 - I18n e routing](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T03-i18n-routing.md) `completato`
- [T04 - Collection CMS](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T04-collections-cms.md) `completato`
- [T05 - Shell frontend pubblico](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T05-shell-frontend.md)
- [T06 - Blog pubblico bilingue](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T06-blog-pubblico.md)
- [T07 - Contatti e lead persistence](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T07-contatti-leads.md)
- [T08 - Integrazione SMTP](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T08-smtp-email.md)
- [T09 - SEO tecnico di base](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T09-seo-tecnico.md)
- [T10 - Deploy Kubernetes](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T10-deploy-k8s.md)
- [T11 - QA fase 1](/mnt/XFS1TB/Workspace/io/Badia/bot/tasks/T11-qa-fase1.md)
