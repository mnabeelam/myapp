"use client";

import Link from "next/link";
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
  },
  {
    icon: Power,
    title: "Power Control",
    desc: "Wake-on-LAN and graceful shutdown with full audit trail and role-based access.",
  },
  {
    icon: Globe,
    title: "Proxy Management",
    desc: "Monitor proxy health, view configs, and restart services with approval workflows.",
  },
  {
    icon: Network,
    title: "Gateway Control",
    desc: "Change gateways and routes with dry-run preview, confirmation, and rollback.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "RBAC, audit logs, MFA-ready auth, and encrypted credential storage.",
  },
  {
    icon: Bell,
    title: "Smart Alerting",
    desc: "Email, Slack, and webhook notifications when machines go down or degrade.",
  },
];

const stats = [
  { value: "100+", label: "Machines Supported" },
  { value: "30s", label: "Ping Interval" },
  { value: "5", label: "Dashboard Tabs" },
  { value: "3", label: "User Roles" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#2a3548] bg-[#0a0e14]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Server className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">myapp</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-[#8b9cb3] hover:text-white">
              Features
            </a>
            <a href="#architecture" className="text-sm text-[#8b9cb3] hover:text-white">
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

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e3a5f33,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-1.5 text-xs text-accent">
            <Zap className="h-3 w-3" /> Enterprise Local Network Operations
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Control Your Lab.
            <br />
            <span className="text-accent">Monitor Everything.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#8b9cb3]">
            A web-based control panel for local lab machines — ping monitoring,
            power management, proxy control, and gateway routing with
            enterprise-grade security.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="btn-primary flex items-center gap-2 px-6 py-3 text-base"
            >
              Launch Control Panel <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="btn-secondary px-6 py-3 text-base">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#2a3548] bg-surface px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-accent">{s.value}</div>
              <div className="mt-1 text-sm text-[#8b9cb3]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-bold">Platform Features</h2>
          <p className="mb-12 text-center text-[#8b9cb3]">
            Everything you need to operate a local lab at enterprise standards.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card group transition hover:border-accent/40">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#8b9cb3]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="border-t border-[#2a3548] bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-bold">Control Panel Tabs</h2>
          <p className="mb-12 text-center text-[#8b9cb3]">
            Organized dashboard with dedicated sections for every operation.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { tab: "Overview", desc: "Stats, uptime summary, quick actions" },
              { tab: "Machines", desc: "Inventory, ping status, WoL, shutdown" },
              { tab: "Proxies", desc: "Health checks, config view, restart" },
              { tab: "Control Panel", desc: "Power, gateway, proxy actions" },
              { tab: "Alerts", desc: "Down machines, latency warnings" },
              { tab: "Audit Log", desc: "Who did what, when" },
              { tab: "Settings", desc: "Users, roles, gateway profiles" },
            ].map((t) => (
              <div
                key={t.tab}
                className="rounded-lg border border-[#2a3548] bg-surface-raised p-4"
              >
                <div className="mb-1 font-mono text-sm text-accent">{t.tab}</div>
                <div className="text-xs text-[#8b9cb3]">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-accent/30 bg-accent-muted p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold">Ready to manage your lab?</h2>
          <p className="mb-6 text-[#8b9cb3]">
            Open the control panel to monitor machines, run power actions, and
            manage your local network.
          </p>
          <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
            Open Control Panel <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a3548] px-6 py-8 text-center text-sm text-[#5a6a82]">
        myapp — Local Network Monitoring & Control
      </footer>
    </div>
  );
}
