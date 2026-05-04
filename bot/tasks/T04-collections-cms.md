# T04 - Definizione collection `Media`, `Posts`, `Leads`

## Priorita

`P0`

## Obiettivo

Tradurre il blueprint in un modello dati minimo ma completo dentro `Payload`, pronto per blog e raccolta lead.

## Scope

- definire collection `Media`
- definire collection `Posts`
- definire collection `Leads`
- definire `Users` per accesso admin se non gia coperta dal bootstrap
- impostare campi, validazioni e ordinamenti minimi
- configurare viste admin utili per uso non tecnico

## Deliverable

- file collection separati
- campi localizzati nei post
- stato lead con valori iniziali
- upload media riutilizzabile
- configurazione admin con campi essenziali e label leggibili

## Dipendenze

- T02
- T03

## Criteri di accettazione

- si puo creare un post bilingue con immagine e stato
- si puo salvare un lead con metadati base
- l'admin puo filtrare o ordinare i lead per stato e data
- la media library e utilizzabile dai post

## Note operative

- niente categorie o tag in questa fase
- il salvataggio lead deve restare indipendente dall'invio email
