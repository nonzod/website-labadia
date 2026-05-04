# T03 - Setup i18n e routing bilingue `IT/EN`

## Priorita

`P0`

## Obiettivo

Definire l'architettura bilingue del sito, sia lato routing `Next.js` sia lato contenuti gestiti nel CMS.

## Scope

- introdurre `it` e `en` come lingue supportate
- impostare routing con prefisso lingua
- definire layout e navigazione locale-aware
- creare utility condivise per risoluzione lingua, fallback e switch locale
- predisporre la localizzazione nei contenuti `Payload`

## Deliverable

- struttura `/app/[lang]/...`
- utility `lib/i18n.*`
- configurazione `Payload` per campi localizzati
- convenzioni chiare per URL e fallback

## Dipendenze

- T01

## Criteri di accettazione

- il sito risponde su `/it/...` e `/en/...`
- la lingua e disponibile a layout, pagine e componenti
- il CMS supporta campi localizzati per i contenuti previsti
- il fallback tra lingue e definito in modo esplicito

## Note operative

- `it` e lingua primaria
- evitare di modellare due record separati per ogni articolo
