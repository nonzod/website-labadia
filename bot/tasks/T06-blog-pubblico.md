# T06 - Blog pubblico bilingue

## Priorita

`P1`

## Obiettivo

Rendere gli articoli creati nel CMS visibili nel sito pubblico con lista e dettaglio localizzati.

## Scope

- implementare pagina lista blog per lingua
- implementare pagina dettaglio articolo per lingua
- collegare frontend e collection `Posts`
- gestire slug localizzati
- mostrare metadata editoriali minimi

## Deliverable

- route blog locali
- query server-side ai contenuti `Payload`
- template lista articoli
- template dettaglio articolo

## Dipendenze

- T04
- T05

## Criteri di accettazione

- un articolo pubblicato in admin compare nel frontend
- la lista articoli e ordinata per data di pubblicazione
- gli slug funzionano per `IT` e `EN`
- i contenuti non pubblicati non sono esposti pubblicamente

## Note operative

- usare rendering server-side dove possibile
- predisporre da subito i punti di integrazione SEO per articolo
