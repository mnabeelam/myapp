"use client";

import { usePathname } from "next/navigation";
import { getSectionByPath } from "@/lib/navigation";
import { MainNav } from "@/components/navigation/MainNav";
import { usePlatform } from "./PlatformContext";
import { RefreshCw } from "lucide-react";

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = getSectionByPath(pathname);
  const { loading } = usePlatform();

  return (
    <div
      className="page-content flex min-h-screen"
      data-section={section.id}
      style={
        {
          "--section-accent": section.accent,
          "--section-glow": section.glow,
          "--section-border": section.border,
        } as React.CSSProperties
      }
    >
      <MainNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="relative z-10 flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div
                className="flex items-center justify-center py-32"
                style={{ color: section.accent }}
              >
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                Loading platform data…
              </div>
            ) : (
              children
            )}
          </div>
        </main>
        <footer
          className="border-t px-6 py-2 text-center text-xs text-[#5a6488]"
          style={{ borderColor: section.border }}
        >
          <span style={{ color: section.accent }}>{section.label}</span>
          {" · "}myapp NMS · github.com/mnabeelam/myapp
        </footer>
      </div>
    </div>
  );
}
