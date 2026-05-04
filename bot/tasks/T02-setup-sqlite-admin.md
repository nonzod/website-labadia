# T02 - Setup ambiente, `SQLite` e autenticazione admin

## Priorita

`P0`

## Stato

`completato` il `2026-05-04`

## Obiettivo

Rendere il CMS persistente e accessibile tramite admin, con configurazione locale basata su `SQLite` e variabili ambiente.

## Scope

- configurare `DATABASE_URL` verso file `SQLite`
- collegare `@payloadcms/db-sqlite`
- predisporre file env di esempio
- abilitare autenticazione admin
- verificare il bootstrap del database e del primo utente admin

## Deliverable

- connessione `SQLite` funzionante
- file `.env.example`
- documentazione variabili minime
- accesso admin protetto e testato

## Dipendenze

- T01

## Criteri di accettazione

- il progetto parte con database locale configurabile
- l'admin `Payload` e accessibile
- il database sopravvive ai riavvii applicativi in locale
- i secret non sono hardcodati

## Note operative

- preparare gia i nomi env compatibili con produzione
- mantenere esplicito il vincolo di singola istanza scrivente
