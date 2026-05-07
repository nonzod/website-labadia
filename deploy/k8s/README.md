# Deploy Kubernetes — La Badia

## Struttura dei manifest

```
deploy/k8s/
├── base/                        # Base manifest (dev/staging/default)
│   ├── kustomization.yaml       # Kustomize wrapper
│   ├── namespace.yaml           # Namespace `labadia`
│   ├── configmap.yaml           # Non-sensitive config (NODE_ENV)
│   ├── secret.yaml              # Secret template (env vars)
│   ├── pvc.yaml                 # PVC per SQLite (1Gi, ReadWriteOnce)
│   ├── deployment.yaml          # Next.js deployment (2 replicas)
│   ├── service.yaml             # ClusterIP service (port 80 → 3000)
│   └── ingress.yaml             # Ingress with TLS (labadia.it)
├── overlays/
│   └── prod/
│       ├── kustomization.yaml   # Production overlay
│       └── deployment-patch.yaml# Resource limits, anti-affinity
└── README.md                    # Questo file
```

## Deploy con kubectl + kustomize

### Deploy base (dev/staging)
```bash
kubectl apply -k deploy/k8s/base/
```

### Deploy produzione
```bash
kubectl apply -k deploy/k8s/overlays/prod/
```

### Destroy
```bash
kubectl delete -k deploy/k8s/overlays/prod/
kubectl delete -k deploy/k8s/base/
```

## Gestione dei secret

### Opzione 1: Sealed Secrets (consigliato)
1. Creare il secret su cluster con `kubectl create secret generic labadia-secret ...`
2. Catturarlo con `kubeseal` per ottenere un `SealedSecret` versionabile
3. Il file `secret.yaml` nella base serve come template; **non committare** valori reali

### Opzione 2: Manuale (senza Sealed Secrets)
```bash
kubectl apply -k deploy/k8s/base/ --dry-run=client -o yaml \
  | kubectl create --namespace labadia --dry-run=client -o yaml --save-config
```
Applicare poi i secret con:
```bash
kubectl create secret generic labadia-secret \
  --namespace labadia \
  --from-literal=PAYLOAD_SECRET='...' \
  --from-literal=DATABASE_URL='file:./data/badia.db' \
  --from-literal=SMTP_HOST='...' \
  --from-literal=SMTP_PORT='587' \
  --from-literal=SMTP_USER='...' \
  --from-literal=SMTP_PASS='...' \
  --from-literal=SMTP_FROM='"La Badia" <noreply@labadia.it>' \
  --from-literal=NOTIFY_EMAIL='owner@labadia.it'
```

### Variabili d'ambiente richieste
| Variabile | Descrizione | Fonte |
|-----------|-------------|-------|
| `PAYLOAD_SECRET` | CMS signing secret | Secret |
| `DATABASE_URL` | SQLite connection string | Secret |
| `SMTP_HOST` | SMTP server | Secret |
| `SMTP_PORT` | SMTP port | Secret |
| `SMTP_USER` | SMTP username | Secret |
| `SMTP_PASS` | SMTP password | Secret |
| `SMTP_FROM` | Sender address | Secret |
| `NOTIFY_EMAIL` | Notification recipient | Secret |
| `NODE_ENV` | Environment mode | ConfigMap |

## Backup strategia per SQLite

⚠️ **Critico**: L'app usa SQLite su file. Il PVC è l'unica copia del database.

### Backup automatico (cronjob da aggiungere)
Schedulare un cronjob Kubernetes che esegua:
```bash
kubectl exec deploy/labadia --namespace labadia -- \
  sh -c 'cp /app/data/badia.db /app/data/backups/badia-$(date +%Y%m%d-%H%M%S).db'
```

### Backup manuale
```bash
# Copia del file via PVC
kubectl exec deploy/labadia --namespace labadia -- \
  sh -c 'cat /app/data/badia.db' > ./badia-backup-$(date +%Y%m%d).db

# Dump SQLite
kubectl exec deploy/labadia --namespace labadia -- \
  sh -c 'sqlite3 /app/data/badia.db ".backup /tmp/dump.db" && cat /tmp/dump.db' > ./badia-dump.db
```

### Restore
```bash
kubectl cp ./badia-backup.db labadia-0:/app/data/badia.db --namespace labadia
kubectl rollout restart deploy/labadia --namespace labadia
```

### Raccomandazioni
- Storage class `csi-cinder-sc-retain` → il PV **non** viene eliminato con il PVC
- Montare lo stesso PVC su un job di backup separato per dump giornalieri
- Conservare backup settimanali esterni al cluster

## Logs e rollback

### Accesso ai log
```bash
# Ultimi log
kubectl logs deploy/labadia --namespace labadia --tail=50

# Log in tempo reale
kubectl logs -f deploy/labadia --namespace labadia

# Log di un container specifico
kubectl logs -f deploy/labadia --namespace labadia -c nextjs
```

### Rollback
```bash
# Storico revisioni
kubectl rollout history deploy/labadia --namespace labadia

# Rollback all'ultima revisione stabile
kubectl rollout undo deploy/labadia --namespace labadia

# Rollback a una revisione specifica
kubectl rollout undo deploy/labadia --namespace labadia --to-revision=2

# Verifica stato rollout
kubectl rollout status deploy/labadia --namespace labadia
```

## Note

- **Repliche**: In produzione `replicas: 3` con pod anti-affinity. SQLite è file-based, quindi solo una replica scrive. Le altre repliche leggono dallo stesso PV montato in `ReadWriteMany`.
- **Init container**: Il container `volume-permissions` corregge ownership del volume prima che l'app parta.
- **Non usare scaling orizzontale** con SQLite come database primario. Per scaling vero, migrare a PostgreSQL.