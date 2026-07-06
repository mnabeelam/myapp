# Inventory (Git-synced)

Lab machine and network inventory for **myapp**. These JSON files are the source of truth.

| File | Contents |
|------|----------|
| `machines.json` | Lab PCs and servers |
| `proxies.json` | Proxy servers |
| `gateways.json` | Gateway profiles |

## Sync workflow

1. Edit inventory in the dashboard (Machines tab) — changes save here automatically.
2. Commit and push to share with your team:

```bash
# From project root
npm run inventory:sync
git push
```

Or manually:

```bash
git add inventory/
git commit -m "sync: update inventory"
git push
```

## CSV import format

```csv
hostname,ip,mac,os,role,tags,subnet
lab-pc-01,192.168.1.10,AA:BB:CC:DD:EE:01,linux,workstation,lab-a,192.168.1.0/24
```
