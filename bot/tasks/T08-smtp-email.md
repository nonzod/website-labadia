# T08 - Integrazione email `SMTP`

## Priorita

`P1`

## Obiettivo

Aggiungere l'invio email come step successivo al salvataggio del lead, senza mettere a rischio la persistenza delle richieste.

## Scope

- integrare trasporto `SMTP`
- definire template email minimo per notifica contatto
- collegare invio al flusso del form
- gestire errori senza perdere il lead
- loggare esito essenziale dell'operazione

## Deliverable

- utility email server-side
- configurazione env `SMTP_*`
- notifica email inviata dopo il salvataggio lead
- gestione fallback in caso di errore

## Dipendenze

- T07

## Criteri di accettazione

- con credenziali valide il sistema invia email dopo la creazione lead
- se l'email fallisce il lead resta salvato e visibile in admin
- il frontend non espone dettagli tecnici dell'errore

## Note operative

- mantenere il trasporto semplice e classico
- evitare accoppiamenti forti tra UI e provider email
