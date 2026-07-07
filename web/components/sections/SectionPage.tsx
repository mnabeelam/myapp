"use client";

import { usePathname } from "next/navigation";
import { getSectionByPath } from "@/lib/navigation";
import { SectionBanner } from "@/components/navigation/MainNav";
import { ModuleGate } from "@/components/ModuleGate";
import { usePlatform } from "@/components/platform/PlatformContext";

export function SectionPage({
  children,
  action,
  moduleId,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  moduleId?: string | null;
}) {
  const pathname = usePathname();
  const section = getSectionByPath(pathname);
  const { license } = usePlatform();

  const content = moduleId ? (
    <ModuleGate moduleId={moduleId} license={license}>
      {children}
    </ModuleGate>
  ) : (
    children
  );

  return (
    <>
      <SectionBanner section={section} action={action} />
      {content}
    </>
  );
}

export function SectionPlaceholder({
  features,
}: {
  features: string[];
}) {
  const pathname = usePathname();
  const section = getSectionByPath(pathname);

  return (
    <div
      className="rounded-xl border p-8"
      style={{
        background: section.bgGradient,
        borderColor: section.border,
      }}
    >
      <p className="mb-4 text-[var(--muted)]">
        This module is available on higher license tiers. Planned features:
      </p>
      <ul className="space-y-2">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-sm"
            style={{ color: section.accent }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: section.accent }}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
