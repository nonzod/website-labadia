# T10 - Deploy `Kubernetes` con volume persistente

## Priorita

`P2`

## Obiettivo

Preparare l'applicazione al deploy su cluster `Kubernetes` Infomaniak rispettando i vincoli critici di `SQLite`.
La struttura dei manifest deve rispettare l'attuale implementazione già presente per altri applicativi nel namespace "http" qui `/mnt/XFS1TB/Workspace/k3s/infomaniak/base/http`, prendere come esempio e riferimento questi manifest.

## Scope

- definire manifest o chart minimi di deploy
- fissare `replicas: 1`
- configurare `PersistentVolumeClaim` per `SQLite`
- mappare `Secret` e variabili ambiente
- definire assetto ingress e runtime production

## Deliverable

- manifest `Deployment`
- manifest `PVC`
- manifest `Secret` o convenzione di gestione secret
- manifest `Ingress`
- note operative su backup e restore del volume

## Dipendenze

- T02
- T08
- T09

## Criteri di accettazione

- l'app puo essere configurata con volume persistente per il database
- il deployment impedisce scaling multi-replica accidentale
- tutte le variabili ambiente richieste sono documentate
- la strategia di backup del file database e esplicitata

## Note operative

- questo task non deve introdurre assunzioni di horizontal scaling
- i rollout non devono sostituire o distruggere il volume dati
