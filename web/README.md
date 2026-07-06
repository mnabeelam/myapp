# LabOps Web

Portfolio website and control panel for local lab network monitoring.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Portfolio landing page |
| `/login` | Sign-in with required fields (email, password, role) |
| `/dashboard` | Full control panel with tabs |

## Dashboard Tabs

1. **Overview** — Stats, machine status summary, recent alerts
2. **Machines** — Inventory table with add/edit form (required fields)
3. **Proxies** — Proxy health cards and restart
4. **Control Panel** — Ping, WoL, shutdown, proxy, gateway actions
5. **Alerts** — Active and acknowledged notifications
6. **Audit Log** — Action history
7. **Settings** — Monitoring config, roles, gateway profiles

## Run Locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3
- Lucide icons
- TypeScript

## Project Structure

```
web/
├── app/
│   ├── page.tsx          # Portfolio
│   ├── login/page.tsx    # Login form
│   └── dashboard/page.tsx # Control panel
├── components/
│   ├── ui.tsx            # Shared UI helpers
│   └── tabs/             # Tab panel components
└── lib/
    ├── types.ts          # TypeScript types
    └── data.ts           # Mock data
```
