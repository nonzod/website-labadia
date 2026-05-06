# T16 Design: Navigazione pubblica e CTA di conversione

## Contesto

La homepage pubblica e gia stata riallineata su impianto editoriale e fotografico nei task precedenti. `T16` chiude il tratto di conversione leggibile: orientamento globale, percorsi d'ingresso e call to action coerenti con un'azione reale disponibile oggi.

La conversione reale disponibile in questa fase non e una prenotazione diretta ma una richiesta di informazioni o soggiorno attraverso la pagina contatti. I task `T07` e `T08` restano separati e non vengono anticipati qui.

## Obiettivo

Rendere navigazione e CTA pubbliche coerenti con gli assi narrativi del sito e con un funnel semplice:

- orientamento globale verso `La Dimora`, `Esperienze`, `Territorio`, `Racconti`
- CTA primaria sempre orientata a `contatti`
- CTA secondarie dedicate alla scoperta editoriale
- nessun riferimento admin-facing nella superficie pubblica

## Decisioni

### 1. Navigazione primaria

L'header pubblico espone solo quattro poli narrativi:

- `La Dimora`
- `Esperienze`
- `Territorio`
- `Racconti`

La CTA globale dell'header e `Richiedi informazioni` e punta sempre a `/{locale}/contatti`.

### 2. Distinzione tra conversione e scoperta

La homepage deve separare chiaramente:

- `soggiorno/conversione`: hero primaria verso contatti, prove concrete del soggiorno, closing CTA finale
- `scoperta/editoriale`: accessi a `Dimora`, `Esperienze`, `Territorio`, `Racconti`

Le CTA secondarie non devono competere con la primaria. Devono accompagnare la comprensione del luogo e dell'offerta.

### 3. Mapping CTA approvato

- header primary CTA -> `contatti`
- hero primary CTA -> `contatti`
- hero secondary CTA -> `dimora`
- door 1 CTA -> `dimora`
- door 2 CTA -> `esperienze`
- events CTA -> `esperienze`
- closing primary CTA -> `contatti`
- closing secondary CTA -> `territorio`

### 4. Vincoli di copy

Le label CTA devono descrivere un'azione reale dell'utente, non il sistema:

- ammesso: `Richiedi informazioni`, `Richiedi il tuo soggiorno`, `Scopri la dimora`
- non ammesso: copy vaghi come `Scopri di piu`
- non ammesso: riferimenti a admin, CMS, superfici tecniche o percorsi interni

## Implementazione prevista

### Dati e localizzazione

`lib/public-content.ts` resta la fonte unica per:

- label CTA
- destinazioni logiche
- microcopy di header e homepage

Non vengono introdotte nuove pagine o nuove route in `T16`.

### Componenti

- `components/public/SiteHeader.tsx`
  - conferma della navigazione narrativa
  - conferma della CTA primaria globale verso `contatti`
  - variante visiva homepage solo come rifinitura coerente con il primo scroll
- `app/[lang]/page.tsx`
  - conferma dell'ordine narrativo home
  - conferma dell'aggancio CTA ai route pubblici localizzati
- sezioni homepage collegate
  - nessun redesign aggiuntivo
  - solo chiusura della gerarchia tra CTA primaria e secondarie

### Route e semantica

`lib/public-pages.ts` resta il mapping canonico degli href pubblici. I test devono verificare gli href localizzati attraverso il mapping applicativo, non attraverso stringhe duplicate sparse.

## Strategia di test

Approccio `TDD` sui test mirati gia presenti:

1. estendere i test header per verificare poli narrativi e CTA primaria verso `contatti`
2. estendere i test homepage per verificare il mapping completo delle CTA
3. aggiungere un'asserzione anti-regressione per assenza di testo/link admin-facing nella home
4. eseguire la suite mirata e solo dopo aggiornare il backlog

## Criteri di accettazione

- la navigazione principale espone chiaramente `La Dimora`, `Esperienze`, `Territorio`, `Racconti`
- la CTA primaria globale e la CTA primaria hero puntano a `contatti`
- le CTA secondarie della home distinguono `soggiorno` da `scoperta`
- nessun testo o link admin-facing compare nella homepage pubblica
- `T16` puo essere marcato completato in `bot/TASKS.md`

## Fuori scope

- booking engine o prenotazione diretta
- persistenza lead
- invio email
- nuove pagine pubbliche oltre quelle gia presenti
- ulteriore redesign strutturale oltre alle rifiniture CTA e navigazione
