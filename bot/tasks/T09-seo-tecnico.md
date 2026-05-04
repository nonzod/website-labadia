# T09 - SEO tecnico di base

## Priorita

`P1`

## Obiettivo

Portare la baseline SEO prevista dal blueprint dentro l'applicazione, sia a livello globale sia sulle pagine chiave.

## Scope

- metadata globali e per pagina
- metadata per articoli blog
- `sitemap.xml`
- `robots.txt`
- URL puliti e semantici
- `Open Graph` minimo

## Deliverable

- utility `seo.*`
- metadata per layout e pagine principali
- sitemap generata
- robots configurato

## Dipendenze

- T03
- T05
- T06

## Criteri di accettazione

- le pagine pubbliche espongono title e description coerenti
- gli articoli blog espongono metadata locali corretti
- sitemap e robots sono raggiungibili
- la struttura URL resta coerente con la lingua

## Note operative

- non trattare la SEO come post-processing finale
- mantenere la generazione metadata vicina alle route che li consumano
