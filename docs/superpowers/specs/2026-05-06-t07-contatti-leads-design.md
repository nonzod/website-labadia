# T07 Design: Pagina contatti e persistenza lead

## Contesto

La route pubblica `app/[lang]/contatti/page.tsx` esiste gia come superficie editoriale bilingue, ma oggi non acquisisce alcun dato. La collection `Leads` esiste gia in Payload, ma riflette un modello troppo generico rispetto al caso d'uso approvato per questa fase.

`T07` introduce il primo flusso reale di conversione del sito: una richiesta di soggiorno o informazioni che viene acquisita lato server e salvata nel database prima di qualsiasi azione secondaria.

## Obiettivo

Rendere operativa la pagina contatti come punto di acquisizione lead con questi vincoli:

- form pubblico bilingue sulla route `/{locale}/contatti`
- validazione server-side dei campi
- salvataggio immediato nella collection `Leads`
- redirect verso una pagina dedicata di conferma
- nessuna dipendenza da invio email, integrazioni esterne o workflow successivi

## Decisioni

### 1. Architettura del submit

Il form usa una `server action` collegata direttamente alla pagina contatti.

Ordine obbligatorio del flusso:

1. leggere `FormData`
2. validare input lato server
3. creare il record in `Leads`
4. fare redirect verso la pagina di conferma

Il lead deve essere salvato prima di ogni altra azione. Nessuna email, webhook o automazione entra in `T07`.

### 2. Struttura del form pubblico

Il form raccoglie solo i dati approvati per questa fase:

- `name`
- `email`
- `phone` opzionale
- `desiredPeriod`
- `guestCount`
- `message`

Non viene introdotto `requestType`. Il form resta volutamente centrato sul primo contatto legato al soggiorno, senza tassonomie premature.

### 3. Modello dati lead

La collection `Leads` deve contenere almeno:

- `name`
- `email`
- `phone`
- `desiredPeriod`
- `guestCount`
- `message`
- `lang`
- `sourcePage`
- `status`
- `createdAt`

`lang` e `sourcePage` vengono valorizzati dal contesto della route pubblica, non da input manipolabile dal browser. `status` puo restare inizializzato a `new`.

### 4. Gestione delle date

Le date non vengono modellate come `checkIn` e `checkOut`. Il dato richiesto e un solo campo testuale `desiredPeriod`, coerente con la richiesta approvata: l'utente puo descrivere liberamente il periodo desiderato.

### 5. Esito utente

In caso di submit valido, l'utente non resta sulla pagina del form. Il flusso termina con redirect verso una nuova route pubblica bilingue di conferma, ad esempio `/{locale}/contatti/conferma`.

Questa pagina conferma che la richiesta e stata ricevuta e che il primo contatto e stato acquisito. Non promette ancora email inviate o altre azioni automatiche.

## Implementazione prevista

### Pagina contatti

`app/[lang]/contatti/page.tsx` evolve da pagina puramente editoriale a pagina ibrida:

- mantiene hero e contesto narrativo
- aggiunge un blocco form leggibile e orientato all'azione
- mostra errori inline in lingua
- preserva i valori inseriti se la validazione fallisce

I campi devono essere presentati con etichette e microcopy localizzati, coerenti con il tono pubblico del progetto ma senza sacrificare chiarezza operativa.

### Server action

La logica di submit vive in una `server action` dedicata al contesto contatti. La action:

- riceve `FormData`
- normalizza stringhe e numero ospiti
- valida i campi richiesti
- costruisce il payload di persistenza includendo `lang` e `sourcePage`
- salva il lead tramite Payload
- fa redirect alla conferma in caso di successo

Se la validazione fallisce, la action restituisce uno state serializzabile con:

- errori per campo
- eventuale errore form-level
- valori inviati, per ripopolare il form

### Collection `Leads`

`collections/Leads.ts` viene aggiornata per allineare lo schema al form pubblico:

- aggiunta di `desiredPeriod`
- aggiunta di `guestCount`
- conferma di `sourcePage` e `lang` come campi richiesti
- mantenimento di `phone` opzionale
- mantenimento di `status` con default `new`

La collection resta admin-only sul piano access control. L'acquisizione pubblica passa dalla server action, non dall'apertura diretta della collection.

### Pagina conferma

Va introdotta una route pubblica dedicata alla conferma, localizzata per `it` e `en`, con contenuto essenziale:

- conferma di ricezione
- tono caldo ma concreto
- CTA di ritorno sensata, ad esempio verso homepage o sezioni editoriali

La pagina non deve mostrare dati sensibili del lead nella URL o nell'interfaccia.

## Validazione

La validazione server-side deve coprire almeno:

- `name` obbligatorio
- `email` obbligatoria e in formato valido
- `desiredPeriod` obbligatorio
- `guestCount` obbligatorio, intero, maggiore di zero
- `message` obbligatorio
- `phone` opzionale

Sono ammessi controlli di lunghezza minima sensati per evitare submit vuoti o quasi vuoti. La validazione lato client puo esistere come supporto HTML di base, ma non sostituisce quella server-side.

## Strategia di test

Approccio `TDD` con copertura mirata:

1. test del rendering della pagina contatti in `it` e `en`, inclusa presenza dei campi del form
2. test della validazione server-side per payload valido e payload invalido
3. test della costruzione del record persistito, verificando presenza di `lang`, `sourcePage`, `desiredPeriod`, `guestCount` e timestamp di sistema
4. test della pagina di conferma localizzata
5. verifica che il redirect avvenga solo dopo il successo della persistenza

I test devono isolare la logica di submit senza dipendere da email o servizi esterni.

## Criteri di accettazione

- un utente puo inviare il form da `/{locale}/contatti`
- il lead viene salvato prima di qualsiasi azione secondaria
- il record contiene almeno lingua, pagina sorgente e timestamp oltre ai campi del form
- il form raccoglie anche `periodo desiderato` e `numero ospiti`
- in caso di errore lato server l'utente resta sul form con feedback chiaro
- in caso di successo l'utente arriva su una pagina dedicata di conferma

## Fuori scope

- invio email SMTP
- classificazione della richiesta con `tipo richiesta`
- booking engine o disponibilita in tempo reale
- CRM, webhook o automazioni post-submit
- dashboard pubbliche o tracking commerciale avanzato
