# T07 - Pagina contatti e persistenza lead

## Stato

`completato`

## Priorita

`P1`

## Obiettivo

Implementare il flusso base di acquisizione contatti con validazione server-side e persistenza nel database.

## Scope

- creare pagina contatti bilingue
- costruire il form pubblico
- validare input lato server
- salvare il lead nel database
- restituire feedback utente coerente

## Deliverable

- UI pagina contatti
- server action o endpoint dedicato
- validazione form
- salvataggio in collection `Leads`

## Dipendenze

- T04
- T05

## Criteri di accettazione

- un utente puo inviare il form da frontend
- il lead viene salvato prima di ogni altra azione secondaria
- il record contiene almeno lingua, pagina sorgente e timestamp
- l'utente riceve un esito chiaro a schermo

## Note operative

- prevedere da subito campi compatibili con workflow futuri
- non dipendere dall'email per considerare la richiesta acquisita
