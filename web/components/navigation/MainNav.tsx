"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasModule, TIER_COLORS } from "@/lib/licensing";
import { getVisibleSections, type SectionTheme } from "@/lib/navigation";
import { usePlatform } from "@/components/platform/PlatformContext";
import { GitBranch, LogOut, RefreshCw, Server, Shield } from "lucide-react";

function NavItem({
  section,
  active,
  alertCount,
}: {
  section: SectionTheme;
  active: boolean;
  alertCount?: number;
}) {
  const Icon = section.icon;
  return (
    <Link
      href={section.path}
      className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200"
      style={
        active
          ? {
              background: section.bgGradient,
              borderLeft: `3px solid ${section.accent}`,
              boxShadow: `0 0 24px ${section.glow}`,
            }
          : { borderLeft: "3px solid transparent" }
      }
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105"
        style={{
          background: active ? `${section.accent}22` : "rgba(255,255,255,0.04)",
          border: `1px solid ${active ? section.border : "transparent"}`,
        }}
      >
        <Icon
          className="h-4 w-4"
          style={{ color: active ? section.accent : "#8b9cb3" }}
        />
      </div>
      <div
        className="min-w-0 flex-1 truncate font-medium"
        style={{ color: active ? section.accent : "#c8d4e8" }}
      >
        {section.label}
      </div>
      {section.id === "monitoring" && alertCount && alertCount > 0 ? (
        <span className="rounded-full bg-amber-500/20 px-1.5 text-xs text-amber-400">
          {alertCount}
        </span>
      ) : null}
    </Link>
  );
}

export function MainNav() {
  const pathname = usePathname();
  const { license, loadInventory, syncMsg, saving, activeAlertCount } =
    usePlatform();

  const visible = getVisibleSections((mod) => hasModule(license, mod));
  const current = visible.find((s) => pathname.startsWith(s.path)) ?? visible[0];

  return (
    <aside
      className="flex w-64 shrink-0 flex-col border-r bg-[#06040f]/95 backdrop-blur-xl"
      style={{
        borderColor: current?.border ?? "rgba(139,92,246,0.12)",
        boxShadow: `inset -1px 0 0 ${current?.glow ?? "transparent"}`,
      }}
    >
      <div
        className="border-b p-4"
        style={{ borderColor: "rgba(139,92,246,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: current?.bgGradient,
              border: `1px solid ${current?.border}`,
            }}
          >
            <Server className="h-5 w-5" style={{ color: current?.accent }} />
          </div>
          <div>
            <div className="font-bold tracking-tight">myapp</div>
            <div className="text-xs text-[var(--muted)]">NMS Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#5a6488]">
          Main Navigation
        </div>
        {visible.map((section) => (
          <NavItem
            key={section.id}
            section={section}
            active={pathname === section.path}
            alertCount={activeAlertCount}
          />
        ))}
      </nav>

      <div
        className="border-t p-3 text-xs"
        style={{ borderColor: "rgba(139,92,246,0.12)" }}
      >
        <div className="mb-2 flex items-center justify-between px-2">
          <span className={TIER_COLORS[license?.tierKey ?? "LICENSEA"]}>
            <Shield className="mr-1 inline h-3 w-3" />
            {license?.tierName ?? "Starter"}
          </span>
          <button
            onClick={() => loadInventory()}
            className="rounded p-1 text-[#8b9cb3] hover:text-white"
            title="Refresh"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
        {syncMsg && (
          <p className="mb-2 truncate px-2 text-green-400">{syncMsg}</p>
        )}
        {saving && <p className="mb-2 px-2 text-[#8b9cb3]">Saving…</p>}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[#8b9cb3] hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" /> Exit
        </Link>
        <p className="mt-2 flex items-center gap-1 px-2 text-[#5a6488]">
          <GitBranch className="h-3 w-3" /> git sync on
        </p>
      </div>
    </aside>
  );
}

export function SectionBanner({
  section,
  action,
}: {
  section: SectionTheme;
  action?: React.ReactNode;
}) {
  const Icon = section.icon;
  return (
    <div
      className="mb-6 flex items-start justify-between rounded-2xl border p-5"
      style={{
        background: section.bgGradient,
        borderColor: section.border,
        boxShadow: `0 8px 32px ${section.glow}`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: `${section.accent}18`,
            border: `1px solid ${section.border}`,
          }}
        >
          <Icon className="h-6 w-6" style={{ color: section.accent }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: section.accent }}>
            {section.label}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{section.description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
