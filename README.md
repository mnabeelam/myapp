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

## Push to GitHub (inventory included)

Inventory is in git locally at `inventory/`. If it does not appear on GitHub, the repo was likely never pushed.

```powershell
cd "e:\Nabeel Data\myapp"

# 1. Add your GitHub repo (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/myapp.git

# 2. Push everything — including inventory/
git push -u origin main
```

Verify before pushing:

```powershell
git ls-files inventory/
# Should list: machines.json, proxies.json, gateways.json, README.md
```

If `git remote add` fails because origin exists, update the URL:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/myapp.git
git push -u origin main
```

After editing inventory in the dashboard, commit and push again:

```powershell
npm run inventory:sync
git push
```

## Documentation

See [doc/00-index.md](./doc/00-index.md) for the full step-by-step build guide.
