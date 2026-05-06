# T14b - Allineamento layout homepage al riferimento standalone

## Priorita

`P0 urgente`

## Obiettivo

Allineare la homepage pubblica al layout e al ritmo editoriale del riferimento in `analisi/La Badia/Homepage-standalone-src.html` e `analisi/La Badia/homepage.jsx` prima di proseguire con media, navigazione e ulteriori rifiniture.

## Scope

- trasformare il hero attuale in un hero `full-bleed` con immagine immersiva, overlay testuale e header sovrapposto
- riallineare la sequenza delle sezioni home al riferimento: `Hero`, `IntroStrip`, `TwoDoors`, `DetailStrip`, `Reviews`, `EventsPreview`, `Closing`, `Footer`
- rendere la sezione `Due porte` il vero centro della homepage, con impianto asimmetrico e gerarchia editoriale coerente
- introdurre una `detail strip` orizzontale per i numeri chiave della dimora
- introdurre un blocco `reviews` con resa editoriale e struttura credibile
- trasformare il closing in una sezione immersiva image-led, distinta dal semplice `cta band`
- riallineare la gerarchia tipografica al riferimento: narrativa in serif, UI/meta in mono

## Deliverable

- homepage pubblica con struttura e proporzioni coerenti con il riferimento standalone
- hero e closing immersivi, non piu trattati come semplici moduli in colonna
- impianto `Due porte` allineato alla logica editoriale del concept
- strip metriche e sezione recensioni presenti e integrate nel flusso della pagina

## Dipendenze

- T13
- T14

## Criteri di accettazione

- il primo viewport della homepage comunica il concept del riferimento: hero fotografico, overlay narrativo e header sovrapposto
- la homepage include `DetailStrip`, `Reviews` e `Closing` come sezioni distinte e non surrogate da card generiche
- la sezione `Due porte` non e una semplice griglia simmetrica di card ma una composizione editoriale con peso e ritmo
- il `body` narrativo della homepage non usa il mono come font principale; `DM Mono` resta limitato a kicker, meta e UI
- il confronto con `homepage.jsx` non mostra piu scostamenti strutturali maggiori su hero, doors, reviews, events e closing

## Urgenza operativa

- questo task blocca l'avanzamento di `T15` e `T16`
- non proseguire con nuove integrazioni media o CTA finche l'impianto layout non e stato riallineato
- eventuali rifiniture di palette o copy vanno subordinate alla correzione della struttura

## Note operative

- usare `analisi/La Badia/homepage.jsx` come riferimento principale per struttura, ordine, proporzioni e densita dei moduli
- usare `Homepage-standalone-src.html` solo come entrypoint del prototipo; il comportamento reale e definito nel JSX
- evitare di “simulare” le sezioni mancanti con card riadattate: servono componenti distinti per `DetailStrip`, `Reviews` e `Closing`
- preservare il routing e l'infrastruttura contenuti gia introdotti, ma cambiare senza esitazione il layer di composizione della homepage
