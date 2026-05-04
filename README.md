# La Badia Web

Applicazione `Next.js + Payload CMS` per il sito de La Badia.

## Setup locale

1. Copia `.env.example` in `.env`.
2. Imposta `PAYLOAD_SECRET` con un secret reale.
3. Mantieni `DATABASE_URL=file:./data/badia.db` oppure punta a un altro file `SQLite` persistente.
4. Avvia il progetto con `npm run dev`.
5. Apri `http://localhost:3000/admin` e completa il bootstrap del primo utente admin dal flusso nativo di `Payload`.

## Variabili minime

- `PAYLOAD_SECRET`: secret applicativo obbligatorio.
- `DATABASE_URL`: URL del database `SQLite`, da puntare a file persistente.

## Admin

- Admin `Payload`: `http://localhost:3000/admin`
- API REST `Payload`: `http://localhost:3000/api`
- Frontend pubblico `IT`: `http://localhost:3000/it`
- Frontend pubblico `EN`: `http://localhost:3000/en`

## Note operative

- Il progetto usa `SQLite`: in locale e in produzione va mantenuta una sola istanza scrivente.
- Il file database viene ignorato da Git e deve vivere su storage persistente.
- Il routing pubblico e locale-prefixed: le route senza prefisso vengono redirette verso `it`.
- `Payload` e configurato con `it` come `defaultLocale` e fallback esplicito verso `it` per i campi localizzati mancanti in `en`.
