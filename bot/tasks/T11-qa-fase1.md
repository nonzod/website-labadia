# T11 - QA finale e checklist di accettazione fase 1

## Priorita

`P2`

## Obiettivo

Verificare che la baseline definita nel blueprint sia stata realmente raggiunta in modo end-to-end, non solo a livello di implementazione parziale.

## Scope

- validare avvio locale
- validare accesso admin
- testare creazione articolo bilingue
- testare visibilita articolo nel frontend
- testare invio form contatti
- testare persistenza lead e comportamento email
- validare routing e metadata `IT/EN`

## Deliverable

- checklist QA fase 1
- esiti test manuali o automatizzabili
- elenco gap residui prima del rilascio

## Dipendenze

- T06
- T07
- T08
- T09
- T10

## Criteri di accettazione

- tutti i criteri di fase 1 del blueprint risultano verificati
- eventuali gap sono esplicitati con severita e blocco rilascio
- esiste una checklist riutilizzabile per regressioni future

## Note operative

- includere casi di fallback email
- includere almeno una verifica sui contenuti incompleti tra `IT` e `EN`
