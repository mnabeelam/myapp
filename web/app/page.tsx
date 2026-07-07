"use client";

import Link from "next/link";
import { Card3D } from "@/components/Card3D";
import {
  Activity,
  ArrowRight,
  Bell,
  Globe,
  Network,
  Power,
  Server,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Live Monitoring",
    desc: "Ping, port checks, and uptime tracking across all lab machines in real time.",
    glow: "cyan" as const,
  },
  {
    icon: Power,
    title: "Power Control",
    desc: "Wake-on-LAN and graceful shutdown with full audit trail and role-based access.",
    glow: "magenta" as const,
  },
  {
    icon: Globe,
    title: "Proxy Management",
    desc: "Monitor proxy health, view configs, and restart services with approval workflows.",
    glow: "purple" as const,
  },
  {
    icon: Network,
    title: "Gateway Control",
    desc: "Change gateways and routes with dry-run preview, confirmation, and rollback.",
    glow: "mixed" as const,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "RBAC, audit logs, MFA-ready auth, and encrypted credential storage.",
    glow: "purple" as const,
  },
  {
    icon: Bell,
    title: "Smart Alerting",
    desc: "Email, Slack, and webhook notifications when machines go down or degrade.",
    glow: "cyan" as const,
  },
];

const stats = [
  { value: "100+", label: "Machines Supported", color: "text-gradient-dynamic" },
  { value: "30s", label: "Ping Interval", color: "text-accent-purple" },
  { value: "7", label: "Dashboard Tabs", color: "text-accent-magenta" },
  { value: "3", label: "User Roles", color: "text-accent" },
];

const tabs = [
  { tab: "Overview", desc: "Stats, uptime summary, quick actions" },
  { tab: "Machines", desc: "Inventory, ping status, WoL, shutdown" },
  { tab: "Proxies", desc: "Health checks, config view, restart" },
  { tab: "Control Panel", desc: "Power, gateway, proxy actions" },
  { tab: "Alerts", desc: "Down machines, latency warnings" },
  { tab: "Audit Log", desc: "Who did what, when" },
  { tab: "Settings", desc: "Users, roles, gateway profiles" },
];

export default function PortfolioPage() {
  return (
    <div className="page-content min-h-screen">
      <nav className="nav-glass sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="icon-3d h-9 w-9">
              <Server className="h-4 w-4 text-accent" />
            </div>
            <span className="text-lg font-bold tracking-tight">myapp</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-[var(--muted)] transition hover:text-white">
              Features
            </a>
            <a href="#architecture" className="text-sm text-[var(--muted)] transition hover:text-white">
              Architecture
            </a>
            <Link href="/login" className="btn-secondary text-sm">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn-primary flex items-center gap-1 text-sm">
              Open Control Panel <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 py-28">
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted/50 px-4 py-2 text-xs backdrop-blur-md">
            <Zap className="h-3 w-3 text-accent animate-glow-pulse" />
            <span className="text-gradient-dynamic font-medium">
              Enterprise Local Network Operations
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Control Your Lab.
            <br />
            <span className="text-gradient-dynamic">Monitor Everything.</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-[var(--muted)]">
            A web-based control panel for local lab machines — ping monitoring,
            power management, proxy control, and gateway routing with
            enterprise-grade security.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base"
            >
              Launch Control Panel <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="btn-secondary px-8 py-3.5 text-base">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(139,92,246,0.15)] px-6 py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-3d">
              <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-bold">
            Platform <span className="text-gradient-dynamic">Features</span>
          </h2>
          <p className="mb-14 text-center text-[var(--muted)]">
            Everything you need to operate a local lab at enterprise standards.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card3D key={f.title} glow={f.glow}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl icon-3d">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{f.desc}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-bold">
            Control Panel <span className="text-gradient-dynamic">Tabs</span>
          </h2>
          <p className="mb-14 text-center text-[var(--muted)]">
            Organized dashboard with dedicated sections for every operation.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tabs.map((t, i) => (
              <Card3D
                key={t.tab}
                glow={(["cyan", "purple", "magenta", "mixed"] as const)[i % 4]}
                className="!p-0"
              >
                <div className="font-mono text-sm font-semibold text-gradient-dynamic">
                  {t.tab}
                </div>
                <div className="mt-1 text-xs text-[var(--muted)]">{t.desc}</div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <Card3D glow="mixed" className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold">
              Ready to manage your <span className="text-gradient-dynamic">lab</span>?
            </h2>
            <p className="mb-8 text-[var(--muted)]">
              Open the control panel to monitor machines, run power actions, and
              manage your local network.
            </p>
            <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
              Open Control Panel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card3D>
      </section>

      <footer className="border-t border-[rgba(139,92,246,0.15)] px-6 py-8 text-center text-sm text-[#5a6488]">
        myapp — Local Network Monitoring & Control
      </footer>
    </div>
  );
}
