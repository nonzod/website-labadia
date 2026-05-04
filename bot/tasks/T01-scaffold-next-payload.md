# T01 - Scaffold progetto `Next.js + Payload + TypeScript`

## Priorita

`P0`

## Stato

`completato` il `2026-05-04`

## Obiettivo

Creare la base applicativa unica del progetto con `Next.js`, `Payload CMS`, `App Router` e configurazione `TypeScript` strict.

## Scope

- inizializzare il progetto applicativo
- configurare `Next.js` con `App Router`
- integrare `Payload` nello stesso runtime
- impostare struttura cartelle iniziale coerente con il blueprint
- definire la baseline di configurazione locale

## Deliverable

- repository applicativo avviabile in locale
- struttura cartelle iniziale
- `payload.config.ts`
- `next.config.*`
- `tsconfig.json` con impostazioni strict
- script base di sviluppo e build

## Dipendenze

- nessuna

## Criteri di accettazione

- il progetto installa e compila
- `Next.js` parte in locale
- l'integrazione `Payload` e presente nel progetto
- la struttura iniziale separa chiaramente frontend pubblico, admin e librerie condivise

## Note operative

- evitare client component non necessari
- mantenere il progetto server-first
- non introdurre ancora feature editoriali o di contatto
