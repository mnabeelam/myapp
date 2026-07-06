# myapp

Local lab network control panel — monitor machines, manage inventory, and sync config via git.

## Quick start

```powershell
# Install dependencies
npm run install:web

# Run locally
npm run dev
```

Open **http://localhost:3000**

| Page | URL |
|------|-----|
| Portfolio | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Control Panel | http://localhost:3000/dashboard |

## Git-synced inventory

Inventory lives in `inventory/` and is tracked by git:

```
inventory/
├── machines.json    # Lab PCs and servers
├── proxies.json     # Proxy servers
└── gateways.json    # Gateway profiles
```

### Workflow

1. **Edit** machines in the dashboard (Machines tab) — saves to `inventory/machines.json` automatically.
2. **Commit** to git:
   ```powershell
   npm run inventory:sync
   ```
   Or use **Settings → Commit Inventory to Git** in the dashboard.
3. **Push** to share with your team:
   ```powershell
   git push
   ```
4. **Pull** on another machine to get the latest inventory:
   ```powershell
   git pull
   npm run dev
   ```

## Project structure

```
myapp/
├── inventory/       # Git-synced JSON inventory
├── web/             # Next.js frontend + API
├── doc/             # Architecture documentation
└── package.json     # Root scripts (npm run dev)
```

## Documentation

See [doc/00-index.md](./doc/00-index.md) for the full step-by-step build guide.
